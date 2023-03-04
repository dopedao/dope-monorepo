package hustler

import (
	"io"
	"math/big"
	"net/http"
	"strconv"

	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	svgrender "github.com/dopedao/dope-monorepo/packages/api/internal/svg-render"
	"github.com/gorilla/mux"
)

func SvgHandler() func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		_, log := logger.LogFor(ctx)

		vars := mux.Vars(r)
		id := vars["id"]

		idInt, err := strconv.Atoi(id)
		if err != nil {
			http.Error(w, "unexpected error", http.StatusInternalServerError)
			log.Err(err).Msgf("converting id to int: %v", id)
		}

		svg, err := svgrender.GetOffchainRender(big.NewInt(int64(idInt)))
		if err != nil {
			http.Error(w, "unexpected error rendering hustler", http.StatusInternalServerError)
			log.Err(err)
			return
		}

		w.Header().Set("Content-Type", "image/svg+xml")
		w.WriteHeader(http.StatusOK)
		io.WriteString(w, svg)
	}
}
