package resources

import (
	"encoding/json"
	"net/http"

	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/hustler"
	"github.com/dopedao/dope-monorepo/packages/api/ent/wallet"
	"github.com/dopedao/dope-monorepo/packages/api/util"
	"github.com/gorilla/mux"
)

func WalletHustlersHandler(client *ent.Client) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		ctx, log := util.LogFor(ctx)

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
