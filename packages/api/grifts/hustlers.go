package grifts

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/dopedao/dope-monorepo/packages/api/jobs/alchemy"
	"github.com/k0kubun/pp/v3"

	g "github.com/markbates/grift/grift"
)

var _ = g.Namespace("hustlers", func() {
	g.Desc("sync", "Sync Hustler owners")
	g.Add("sync", func(c *g.Context) error {
		getTokensFromAlchemy()
		// for i, token := range tokens {
		// 	meta := processMetadata(token)
		// 	bodyParts := processBodyParts(token)
		// 	viewbox := processViewBox(token)
		// }

		return nil
	})
})

func getTokensFromAlchemy() {
	startTokenId := "0x00"
	numFetched := 0
	limit := 10
	baseUrl := "https://opt-mainnet.g.alchemy.com/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG"
	hustlerAddress := "0xDbfEaAe58B6dA8901a8a40ba0712bEB2EE18368E"

	for {
		url := fmt.Sprintf(
			"%v/getNFTsForCollection?contractAddress=%v&withMetadata=true&startToken=%v&limit=%v",
			baseUrl,
			hustlerAddress,
			startTokenId,
			limit)

		fmt.Printf("GETTING %v\n", startTokenId)

		// Get Alchemy API page
		req, _ := http.NewRequest("GET", url, nil)
		req.Header.Add("accept", "application/json")
		res, requestErr := http.DefaultClient.Do(req)
		if requestErr != nil {
			log.Fatal("Request Error: ", requestErr)
		}
		// Read it
		defer res.Body.Close()
		body, readErr := ioutil.ReadAll(res.Body)
		if readErr != nil {
			log.Fatal("Request Error: ", readErr)
		}
		// Decode it
		var nftPage alchemy.NftResponsePage
		err := json.Unmarshal(body, &nftPage)
		if err != nil {
			log.Fatal("Unmarshaling response: ", err)
		}
		numFetched += len(nftPage.Nfts)
		for i := 0; i < len(nftPage.Nfts); i++ {
			nft := nftPage.Nfts[i]
			pp.Print(nft)
		}
		// Move on to next page of tokens
		startTokenId = nftPage.NextTokenId
	}
}
func processMetadata()  {}
func processBodyParts() {}
func processViewBox()   {}
