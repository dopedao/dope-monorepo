package reservoir

import (
	"encoding/json"
	"fmt"

	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
)

func GetAllTokens(config ReservoirConfig) ([]Token, error) {
	// https://docs.reservoir.tools/reference/gettokensv7
	path := "/tokens/v7"
	limit := 1000         // max 1k when sorted by updatedAt
	continuationKey := "" // returned by api to get next page
	page := 1             // for logging
	tokens := []Token{}

	pageLimit := 10 // for now break after this many pages

	for {
		// Newest items first, so we get the ones that changed hands first
		// This could be optimized by checking updatedAt after timestamps
		// from inside the database
		url := fmt.Sprintf("%s%s?collection=%s&sortBy=updatedAt&sortDirection=desc&limit=%d",
			config.baseUrl, path, config.contractAddress, limit)
		// can't be empty on first request
		if continuationKey != "" {
			url = fmt.Sprintf("%s&continuation=%s", url, continuationKey)
		}

		logger.Log.Debug().Msgf("%v - Get tokens: %d", config.name, page)

		body, err := makeHttpRequest(url)
		if err != nil {
			logger.Log.Err(err).Msg("Failed getting tokens")
			return tokens, err
		}

		var tr TokenResponse
		err = json.Unmarshal(body, &tr)
		if err != nil {
			logger.Log.Err(err).Msg("Failed parsing tokens")
			return tokens, err
		}
		// at the end of the list
		if len(tr.Tokens) == 0 || page >= pageLimit {
			break
		}
		tokens = append(tokens, tr.Tokens...)
		continuationKey = tr.Continuation
		page++
	}

	return tokens, nil
}
