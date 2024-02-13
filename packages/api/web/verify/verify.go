package verify

import (
	"encoding/json"
	"errors"
	"net/http"
	"net/url"
	"strings"

	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/go-redis/redis/v8"
)

/* Structs */
type discordOAuthObj struct {
	Access_token  string `json:"access_token"`
	Expires_in    int    `json:"expires_in"`
	Refresh_token string `json:"refresh_token"`
	Scope         string `json:"scope"`
	Token_type    string `json:"token_type"`
}

type discordApiUser struct {
	Username      string `json:"username"`
	Discriminator string `json:"discriminator"`
	Id            string `json:"id"`
}

type discordGuild struct {
	Id string `json:"id"`
}

/* We send this to dopebot */
type dopeBotData struct {
	Id            string `json:"id"` /* Discord User Id */
	WalletAddress string `json:"walletaddress"`
	PaperCount    int    `json:"papercount"`
	DopeCount     int    `json:"dopecount"`
	HustlerCount  int    `json:"hustlercount"`
	IsOg          bool   `json:"isog"`
}

/* We get this from dopewars.gg/verify  */
type verifyRequest struct {
	DiscordToken  string `json:"discordtoken"`
	WalletAddress string `json:"walletaddress"`
	PaperCount    int    `json:"papercount"`
	DopeCount     int    `json:"dopecount"`
	HustlerCount  int    `json:"hustlercount"`
	IsOg          bool   `json:"isog"`
}

/* We send this back dopewars.gg/verify when we are done */
type verifyResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

/* function implementations */
func HandleVerifyRequest(redisClient *redis.Client) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		log := logger.Log

		decoder := json.NewDecoder(r.Body)
		decoder.DisallowUnknownFields()

		var verifyReq verifyRequest
		if err := decoder.Decode(&verifyReq); err != nil {
			log.Err(err)
			sendErr("Something went wrong", w)
			return
		}

		if !(len(verifyReq.WalletAddress) > 0) {
			log.Err(errors.New("Walletaddress is null"))
			sendErr("Wallet not found.", w)
			return
		}

		accessToken, err := fetchDiscordAccesToken(verifyReq.DiscordToken)
		if err != nil {
			log.Err(err)
			sendErr("Something went wrong", w)
			return
		}

		discUser, err := fetchDiscordUser(accessToken)
		if err != nil {
			log.Err(err)
			sendErr("Something went wrong", w)
			return
		}

		isInGuild, err := isUserInGuild(accessToken)
		if err != nil {
			log.Err(err)
			sendErr("Something went wrong", w)
			return
		}

		if !isInGuild {
			log.Debug().Msgf("User %s - %s#%s is not in the guild", discUser.Id, discUser.Username, discUser.Discriminator)
			sendErr("User not in guild", w)
			return
		}

		var dopeBotData dopeBotData
		dopeBotData.Id = discUser.Id
		dopeBotData.DopeCount = verifyReq.DopeCount
		dopeBotData.HustlerCount = verifyReq.HustlerCount
		dopeBotData.IsOg = verifyReq.IsOg
		dopeBotData.PaperCount = verifyReq.PaperCount
		dopeBotData.WalletAddress = verifyReq.WalletAddress

		encAuthReq, err := json.Marshal(dopeBotData)
		if err != nil {
			log.Err(err)
			sendErr("Something went wrong", w)
			return
		}

		err = redisClient.Publish(ctx, "discord", encAuthReq).Err()
		if err != nil {
			log.Err(err)
			sendErr("Something went wrong", w)
			return
		}

		authRes := verifyResponse{Success: true}
		encAuthRes, err := json.Marshal(authRes)
		if err != nil {
			sendErr("Something went wrong", w)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(encAuthRes))
	}
}

func sendErr(message string, w http.ResponseWriter) {
	authRes := verifyResponse{Message: message, Success: false}
	encAuthRes, _ := json.Marshal(authRes)

	w.WriteHeader(http.StatusInternalServerError)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(encAuthRes))
}

func fetchDiscordAccesToken(discordToken string) (string, error) {
	payload := url.Values{
		"client_id":     {envcfg.DbotClientId},
		"client_secret": {envcfg.DbotAuthSecret},
		"grant_type":    {"authorization_code"},
		"code":          {discordToken},
		"scope":         {"identify", "guilds"},
		"redirect_uri":  {envcfg.DbotRedirectUri},
	}

	resp, err := http.Post("https://discord.com/api/oauth2/token", "application/x-www-form-urlencoded", strings.NewReader(payload.Encode()))
	if err != nil {
		return "", err
	}

	decoder := json.NewDecoder(resp.Body)
	var discOauthObj discordOAuthObj
	if err := decoder.Decode(&discOauthObj); err != nil {
		return "", err
	}

	return discOauthObj.Access_token, nil
}

func fetchDiscordUser(accessToken string) (*discordApiUser, error) {
	req, err := http.NewRequest("GET", "https://discord.com/api/users/@me", nil)
	if err != nil {
		return nil, err
	}
	req.Header.Add("Authorization", "Bearer "+accessToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	var discApiUser discordApiUser
	decoder := json.NewDecoder(resp.Body)
	if err := decoder.Decode(&discApiUser); err != nil {
		return nil, err
	}

	return &discApiUser, nil
}

func isUserInGuild(accessToken string) (bool, error) {
	req, err := http.NewRequest("GET", "https://discord.com/api/users/@me/guilds", nil)
	if err != nil {
		return false, err
	}

	req.Header.Add("Authorization", "Bearer "+accessToken)
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return false, err
	}

	var discGuilds []discordGuild
	decoder := json.NewDecoder(resp.Body)
	if err := decoder.Decode(&discGuilds); err != nil {
		return false, err
	}

	for _, guild := range discGuilds {
		if guild.Id == envcfg.DbotGuildId {
			return true, nil
		}
	}

	return false, nil
}
