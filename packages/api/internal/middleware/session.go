package middleware

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"

	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/gorilla/sessions"
	"github.com/jiulongw/siwe-go"
)

const Key = "session"

const firebaseSigninURL string = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key="

var apikey string = os.Getenv("FIREBASE_API_KEY")

type sessionContextKey struct{}

var Store = NewCookieStore([]byte("session_secret"))
var sessionCtxKey = &sessionContextKey{}

type SessionContext struct {
	W http.ResponseWriter
	R *http.Request
	S sessions.Store
}

func (sc *SessionContext) Get(name string) (*sessions.Session, error) {
	return sc.S.Get(sc.R, name)
}

func (sc *SessionContext) Save(ss *sessions.Session) error {
	return sc.S.Save(sc.R, sc.W, ss)
}

func NewCookieStore(keyPairs ...[]byte) sessions.Store {
	store := sessions.NewCookieStore(keyPairs...)

	store.Options.Path = "/"

	return store
}

func WithStore(ctx context.Context, s sessions.Store, r *http.Request, w http.ResponseWriter) context.Context {
	return context.WithValue(ctx, sessionCtxKey, SessionContext{S: s, R: r, W: w})
}

func SessionFor(ctx context.Context) SessionContext {
	return ctx.Value(sessionCtxKey).(SessionContext)
}

// IsAuthenticated.
func IsAuthenticated(ctx context.Context, client *auth.Client) bool {
	_, log := logger.LogFor(ctx)

	log.Debug().Msg("authentication starts")

	sc := SessionFor(ctx)
	session, err := sc.Get(Key)
	if err != nil {
		log.Err(err).Msgf("get session key error")
		return false
	}

	// Retrieve the session cookie from the session
	sessionCookie, ok := session.Values["wallet"]
	if !ok {
		log.Debug().Msg("session cookie not found in session")
		return false
	}

	// Convert sessionCookie from interface{} to string
	sessionCookieStr, ok := sessionCookie.(string)
	if !ok {
		log.Debug().Msg("session cookie is not a string")
		return false
	}

	log.Debug().Msgf("sessionCookie = %v\n ", sessionCookieStr)

	if err := FirebaseVerify(ctx, client, sessionCookieStr); err != nil {
		log.Err(err).Msgf("verify error")
		return false
	}

	return true
}

// wallet address
func SetWallet(ctx context.Context, wallet string) error {
	sc := SessionFor(ctx)
	session, err := sc.Get(Key)
	if err != nil {
		return err
	}

	session.Values["wallet"] = wallet

	if err := sc.Save(session); err != nil {
		return err
	}

	return nil
}

// FirebaseAuth authenticate a user.
func FirebaseAuth(ctx context.Context, client *auth.Client, wallet string) (string, error) {
	// Check if the user exists using the wallet address (UID = Wallet)
	_, log := logger.LogFor(ctx)

	if _, err := client.GetUser(ctx, wallet); err != nil {
		// User not found create a new user here with ETH UID
		log.Debug().Msg("create new firebase user")

		params := (&auth.UserToCreate{}).UID(wallet)
		user, err := client.CreateUser(context.TODO(), params)
		if err != nil {
			return "", err
		}
		log.Debug().Msgf("Successfully created user with Ethereum address: %v\n", user.UID)
	}

	// Create custom token for the user with claims.
	claims := map[string]interface{}{
		"wallet": wallet,
	}

	token, err := client.CustomTokenWithClaims(context.TODO(), wallet, claims)
	if err != nil {
		return "", err
	}

	log.Debug().Msg(fmt.Sprintf("token = %v", token))

	if apikey == "" {
		return "", fmt.Errorf("no api key provided")
	}

	url := firebaseSigninURL + apikey

	log.Debug().Msgf("signin URL %v\n", url)

	jsonBody := struct {
		Token             string `json:"token"`
		ReturnSecureToken bool   `json:"returnSecureToken"`
	}{token, true}

	data, err := json.Marshal(jsonBody)
	if err != nil {
		return "", err
	}

	body := bytes.NewBuffer(data)

	req, err := http.NewRequest(http.MethodPost, url, body)
	if err != nil {
		return "", err
	}

	httpClient := &http.Client{}
	resp, err := httpClient.Do(req)
	if err != nil {
		return "", err
	}

	defer resp.Body.Close()

	data, err = io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("failed to sign in user [%v] [%v]", resp.StatusCode, string(data))
	}

	signInResp := struct {
		IdToken   string `json:"idToken"`
		ExpiresIn string `json:"expiresIn"`
	}{}

	if err := json.Unmarshal(data, &signInResp); err != nil {
		return "", err
	}

	log.Debug().Msgf("token = %v", signInResp.IdToken)

	return signInResp.IdToken, nil
}

// FirebaseInit returns a firebase auth client or an error if it fails.
func FirebaseInit(ctx context.Context) (*auth.Client, error) {
	_, log := logger.LogFor(ctx)
	log.Debug().Msg("initialization of firebase")

	app, err := firebase.NewApp(context.Background(), nil)
	if err != nil {
		return nil, fmt.Errorf("error initializing app: %v", err)
	}

	return app.Auth(context.TODO())
}

// FirebaseVerify verifies whether the custom token exists and not expired.
func FirebaseVerify(ctx context.Context, client *auth.Client, sessionCookie string) error {

	_, log := logger.LogFor(ctx)
	log.Debug().Msg("verification")

	if _, err := client.VerifyIDTokenAndCheckRevoked(ctx, sessionCookie); err != nil {
		log.Debug().Msgf("Verify Error %v", err)
		return err
	}

	// Authentication successful
	log.Debug().Msg("auth successful")
	return nil
}

func Wallet(ctx context.Context) (string, error) {
	sc := SessionFor(ctx)
	session, err := sc.Get(Key)
	if err != nil {
		return "", err
	}

	token := session.Values["wallet"]
	if token == nil {
		return "", errors.New("unauthorized")
	}

	return token.(string), nil
}

func SetSiwe(ctx context.Context, message string) error {
	sc := SessionFor(ctx)
	session, err := sc.Get(Key)
	if err != nil {
		return err
	}

	session.Values["siwe"] = message

	if err := sc.Save(session); err != nil {
		return err
	}

	return nil
}

func Siwe(ctx context.Context) (*siwe.Message, error) {
	sc := SessionFor(ctx)
	session, err := sc.Get(Key)
	if err != nil {
		return nil, err
	}

	siweMessage := session.Values["siwe"]
	if siweMessage == nil {
		return nil, errors.New("unauthorized")
	}

	parsedMessage, err := siwe.MessageFromString(siweMessage.(string))
	if err != nil {
		return nil, err
	}
	return parsedMessage, nil
}

func Session(store sessions.Store) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := context.WithValue(r.Context(), sessionCtxKey, SessionContext{w, r, store})
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}

func Clear(ctx context.Context) error {
	sc := ctx.Value(sessionCtxKey).(SessionContext)
	session, err := sc.Get(Key)
	if err != nil {
		return err
	}

	session.Options.MaxAge = -1
	if err := sc.Save(session); err != nil {
		return err
	}

	return nil
}
