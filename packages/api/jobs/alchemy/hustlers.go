package alchemy

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/k0kubun/pp/v3"
)

// HUSTLERS
var baseUrl = "https://opt-mainnet.g.alchemy.com/nft/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG"
var contractAddress = "0xDbfEaAe58B6dA8901a8a40ba0712bEB2EE18368E"

func SyncHustlers() error {
	ownersWithTokenBalances := GetHustlerOwners()
	numOwners := len(ownersWithTokenBalances)
	for i := 0; i < numOwners; i++ {
		tokens := GetHustlerMetaForOwner(ownersWithTokenBalances[i])
		fmt.Printf("%0.3f%%\n",
			float64(i)/float64(numOwners))
		fmt.Printf("%v - %v tokens\n",
			ownersWithTokenBalances[i].Address,
			len(tokens))
		for j := 0; j < len(tokens); j++ {
			currToken := tokens[j]
			UpsertHustlerFromAlchemy(currToken)
			// 🚨 TODO: PROCESS AND STORE INFO AS IN HUSTLER INDEXER TO DB
			//          indexer/processor/hustler.go
			// meta := processMetadata(token)
			// bodyParts := processBodyParts(token)
			// viewbox := processViewBox(token)
		}
	}
	return nil
}

// https://docs.alchemy.com/reference/getownersforcollection
func GetHustlerOwners() []OwnerAddress {
	url := fmt.Sprintf(
		"%v/getOwnersForCollection?contractAddress=%v&withTokenBalances=true",
		baseUrl,
		contractAddress)

	fmt.Println("GETTING OWNERS")
	body := makeGetRequest(url)

	// Decode it
	var responsePage OwnerAddressResponsePage
	err := json.Unmarshal(body, &responsePage)
	if err != nil {
		log.Fatal("Unmarshaling response: ", err)
	}
	fmt.Printf("Found %v wallets\n", len(responsePage.Owners))
	return responsePage.Owners
}

func GetHustlerMetaForOwner(owner OwnerAddress) []Nft {
	url := fmt.Sprintf("%v/getNFTMetadataBatch", baseUrl)

	var tokenPayload TokenPayloadRequest
	for i := 0; i < len(owner.TokenBalances); i++ {
		tb := owner.TokenBalances[i]
		p := TokenPayload{
			ContractAddress: contractAddress,
			TokenId:         tb.TokenId,
		}
		tokenPayload.Tokens = append(tokenPayload.Tokens, p)
	}
	jsonPayload, _ := json.Marshal(tokenPayload)

	body := makePostRequest(url, jsonPayload)

	// Decode it
	var tokens []Nft
	err := json.Unmarshal(body, &tokens)
	if err != nil {
		log.Fatal("Unmarshaling response: ", err)
	}
	// Add owner address to each token
	for i := 0; i < len(tokens); i++ {
		tokens[i].OwnerAddress = owner.Address
	}
	// fmt.Printf("…meta %v\n", len(tokens))

	return tokens
}

func UpsertHustlerFromAlchemy(t Nft) {
	pp.Print(t.Metadata)

}
