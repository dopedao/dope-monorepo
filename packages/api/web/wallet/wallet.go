package wallet

import (
	"encoding/json"
	"net/http"

	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/hustler"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/wallet"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/gorilla/mux"
)

func HandleHustlers(client *ent.Client) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		log := logger.Log.With().
			Str("method", "HandleHustlers").
			Logger()

		vars := mux.Vars(r)
		address := vars["address"]

		hustlers, err := client.Hustler.Query().
			Where(hustler.HasWalletWith(wallet.IDEQ(address))).
			All(ctx)
		if err != nil {
			if ent.IsNotFound(err) {
				http.Error(w, "not found", http.StatusNotFound)
				return
			}
			log.Err(err).Msgf("Getting wallet with address: %s", address)
			http.Error(w, "unexpected error", http.StatusInternalServerError)
			return
		}

		b, err := json.Marshal(hustlers)
		if err != nil {
			log.Err(err).Msgf("Marshalling hustlers.")
			http.Error(w, "unexpected error", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		w.Write(b)
	}
}
