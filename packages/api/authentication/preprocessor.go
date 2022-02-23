package authentication

import (
	"context"
	"net/http"

	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/wallet"
	"github.com/jiulongw/siwe-go"
)

type authWalletCtxKey struct{}

// preprocess all upcoming requests
func PreProcessor(client *ent.Client) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			session, err := store.Get(r, "session")
			// we could check if the session is new to know
			// if the user is authenticated or not but lets check
			// if siwe signed message is present instead
			if err != nil || session.Values["siwe"] == nil {
				next.ServeHTTP(w, r)
				return
			}

			// get wallet data
			siweMessage := session.Values["siwe"].(siwe.Message)
			wallet, err := client.Wallet.Query().Where(wallet.ID(siweMessage.Address.String())).Only(r.Context())
			if err != nil {
				next.ServeHTTP(w, r)
				return
			}

			// set siwe message as data for now
			ctx := context.WithValue(r.Context(), authWalletCtxKey{}, wallet)

			r = r.WithContext(ctx)
			next.ServeHTTP(w, r)
		})
	}
}

// ForContext finds the user from the context. REQUIRES Middleware to have run.
func ForContext(ctx context.Context) *ent.Wallet {
	raw, _ := ctx.Value(authWalletCtxKey{}).(*ent.Wallet)
	return raw
}
