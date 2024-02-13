package reservoir

import (
	"io"
	"net/http"

	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
)

func makeHttpRequest(url string) ([]byte, error) {
	body := []byte{}

	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Add("accept", "*/*")
	req.Header.Add("x-api-key", apiKey)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		logger.Log.Err(err).Msg("Error making request")
		return body, err
	}

	defer res.Body.Close()
	body, err = io.ReadAll(res.Body)
	if err != nil {
		logger.Log.Err(err).Msg("Failed reading token owners response body")
		return body, err
	}
	return body, nil
}
