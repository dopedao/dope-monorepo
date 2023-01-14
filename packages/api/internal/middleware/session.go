package middleware

import (
	"context"
	"errors"
	"fmt"
	"net/http"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"

	//"google.golang.org/api/option"

	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/gorilla/sessions"
	"github.com/jiulongw/siwe-go"
)

const Key = "session"

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

func IsAuthenticated(ctx context.Context) bool {
	sc := SessionFor(ctx)
	session, err := sc.Get(Key)
	if err != nil {
		return false
	}

	return session.Values["wallet"] != nil
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

func FirebaseInit(ctx context.Context, wallet string) (string, error) {

	_, log := logger.LogFor(ctx)
	log.Debug().Msg("FIREBASE INIT")

	// path := "C:/Users/tmarot-m/AppData/Roaming/gcloud/application_default_credentials.json"
	// _, err := os.Stat(path)
	// if err != nil {
	// 	return "", fmt.Errorf("error initializing app: %v\nCredentials file not found in path: %s", err, path)
	// }

	//opt := option.WithCredentialsFile(path)
	app, err := firebase.NewApp(context.Background(), nil) //, opt)
	if err != nil {
		return "", fmt.Errorf("error initializing app: %v", err)
	}

	client, err := app.Auth(context.TODO())
	if err != nil {
		return "", err
	}

	// an other way to deal with Custom Token
	// claims := map[string]interface{}{
	// 	"wallet": wallet,
	// }
	// token, err := client.CustomTokenWithClaims(context.TODO(), wallet, claims)
	// if err != nil {
	// 	return "", err
	// }

	token, err := client.CustomToken(context.TODO(), wallet)
	if err != nil {
		return "", err
	}

	FirebaseVerify(ctx, wallet, client)

	return token, nil
}

func FirebaseCreateUser(ctx context.Context, client *auth.Client, wallet string) error {

	_, log := logger.LogFor(ctx)
	log.Debug().Msg("CREATING USER")

	// Create a new user with ETH UID
	params := (&auth.UserToCreate{}).UID(wallet)
	user, err := client.CreateUser(context.TODO(), params)
	if err != nil {
		return err
	}

	fmt.Printf("Successfully created user with Ethereum address: %v\n", user.UID)
	return nil
}

func FirebaseVerify(ctx context.Context, wallet string, client *auth.Client) error {

	_, log := logger.LogFor(ctx)
	log.Debug().Msg("FIREBASE VERIFY")

	token, err := client.VerifyIDToken(ctx, wallet)
	if err != nil {
		log.Debug().Msg(fmt.Sprintf("Verify Error %v", err))
		FirebaseCreateUser(ctx, client, wallet)
		return nil
	}

	// Check that the UID in the custom token corresponds to the expected user
	if token.UID != wallet {
		log.Debug().Msg("UID DOES NOT CORRESPOND")
		return fmt.Errorf("error: unexpected UID in custom token, got %s, want %s", token.UID, wallet)
	}

	// Authentication successful
	log.Debug().Msg("SUCCESSFUL AUTH")
	return nil
}

func Wallet(ctx context.Context) (string, error) {
	sc := SessionFor(ctx)
	session, err := sc.Get(Key)
	if err != nil {
		return "", err
	}

	wallet := session.Values["wallet"]
	if wallet == nil {
		return "", errors.New("unauthorized")
	}

	return wallet.(string), nil
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
