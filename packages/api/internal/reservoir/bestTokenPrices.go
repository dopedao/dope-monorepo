package reservoir

import (
	"encoding/json"
	"fmt"

	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
)

func GetTokenPricesForContract(config ReservoirConfig) (PriceResponse, error) {
	// https://docs.reservoir.tools/reference/gettokensfloorv1
	var path = "/tokens/floor/v1"

	var resp PriceResponse

	url := fmt.Sprintf("%s%s?contract=%s",
		config.baseUrl, path, config.contractAddress)

	body, err := makeHttpRequest(url)
	if err != nil {
		logger.Log.Err(err).Msg("Failed getting token prices")
		return resp, err
	}

	err = json.Unmarshal(body, &resp)
	if err != nil {
		logger.Log.Err(err).Msg("Error parsing token prices")
		return resp, err
	}

	logger.Log.Debug().Msgf("\n\n%s\n%v", config.name, resp.TokenPrices)

	// exclude blur for DOPE listings
	// if config.name == "DOPE" {
	// 	resp.TokenPrices = RemoveInvalidTokenPrices(config, resp)
	// }

	return resp, nil
}

// We want to exclude listings from Blur because the Reservoir API
// is currently not working well with them and returns error.
func RemoveInvalidTokenPrices(config ReservoirConfig, tokenPriceResponse PriceResponse) TokenPriceMap {
	var validPrices = make(TokenPriceMap)
	// https://docs.reservoir.tools/reference/getordersasksv4
	for tokenId, price := range tokenPriceResponse.TokenPrices {
		logger.Log.Info().Msgf("Checking token %s", tokenId)
		var path = "/orders/asks/v5"
		var resp OrdersResponse
		url := fmt.Sprintf("%s%s?token=%s:%s",
			config.baseUrl, path, config.contractAddress, tokenId)

		body, err := makeHttpRequest(url)
		if err != nil {
			logger.Log.Err(err).Msg("Failed getting asks")
			continue
		}
		err = json.Unmarshal(body, &resp)
		if err != nil {
			logger.Log.Err(err).Msg("Error parsing asks")
			continue
		}
		// If there are no asks, we can assume the token is invalid
		if len(resp.Orders) == 0 {
			continue
		}

		if resp.Orders[0].Kind == "blur" {
			// log.Warn().Msgf("Token %s is blur", tokenId)
			continue
		}
		validPrices[tokenId] = price
	}
	return validPrices
}
