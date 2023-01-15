package middleware

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"strings"

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

// IsAuthenticated.
func IsAuthenticated(ctx context.Context, client *auth.Client) bool {
	_, log := logger.LogFor(ctx)

	sc := SessionFor(ctx)
	session, err := sc.Get(Key)
	if err != nil {
		return false
	}

	if session.Values["wallet"] == nil {
		log.Debug().Msg("wallet = nil")
		return false
	}

	log.Debug().Msg(fmt.Sprintf("wallet = %v\n ", session.Values["wallet"].(string)))

	if err := FirebaseVerify(ctx, client, session.Values["wallet"].(string)); err != nil {
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
	_, err := client.GetUser(ctx, wallet)
	if err != nil && strings.Contains(err.Error(), "user-not-found") {
		// User not found create a new user here with ETH UID
		_, log := logger.LogFor(ctx)
		log.Debug().Msg("CREATING USER")

		params := (&auth.UserToCreate{}).UID(wallet)
		user, err := client.CreateUser(context.TODO(), params)
		if err != nil {
			return "", err
		}
		log.Debug().Msg(fmt.Sprintf("Successfully created user with Ethereum address: %v\n", user.UID))
	}

	if err != nil {
		_, log := logger.LogFor(ctx)
		log.Debug().Msg(fmt.Sprintf("%v", err))
		return "", err
	}

	// Create custom token for the user with claims.
	claims := map[string]interface{}{
		"wallet": wallet,
	}

	token, err := client.CustomTokenWithClaims(context.TODO(), wallet, claims)
	if err != nil {
		return "", err
	}

	_, log := logger.LogFor(ctx)
	log.Debug().Msg(fmt.Sprintf("token = %v", token))

	return token, nil
}

// FirebaseInit returns a firebase auth client or an error if it fails.
func FirebaseInit(ctx context.Context) (*auth.Client, error) {
	_, log := logger.LogFor(ctx)
	log.Debug().Msg("FIREBASE INIT")

	app, err := firebase.NewApp(context.Background(), nil)
	if err != nil {
		return nil, fmt.Errorf("error initializing app: %v", err)
	}

	return app.Auth(context.TODO())
}

// FirebaseVerify verifies whether the custom token exists and not expired.
func FirebaseVerify(ctx context.Context, client *auth.Client, customToken string) error {

	_, log := logger.LogFor(ctx)
	log.Debug().Msg("FIREBASE VERIFY")

	if _, err := client.VerifyIDTokenAndCheckRevoked(ctx, customToken); err != nil {
		log.Debug().Msg(fmt.Sprintf("Verify Error %v", err))
		return err
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
