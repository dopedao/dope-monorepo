// Methods for syncing Hustlers

package alchemy

import (
	"context"
	"encoding/json"
	"fmt"
	"math/big"
	"strconv"
	"strings"

	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/hustler"
	"github.com/rs/zerolog/log"
)

// HUSTLERS
var baseUrl = "https://opt-mainnet.g.alchemy.com/nft/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG"
var hustlerContractAddr = "0xDbfEaAe58B6dA8901a8a40ba0712bEB2EE18368E"

func SyncHustlers(ctx context.Context) error {
	ownersWithTokenBalances := GetHustlerOwners()
	numOwners := len(ownersWithTokenBalances)
	for i := 0; i < numOwners; i++ {
		owner := ownersWithTokenBalances[i]
		log.Info().Msgf(
			"%v - %v tokens\n",
			owner.Address,
			len(owner.TokenBalances))

		tokens := GetHustlerMetaForOwner(owner)

		log.Info().
			Msgf(
				"Hustler Sync Completion %0.3f%%\n",
				float64(i)/float64(numOwners))

		for j := 0; j < len(tokens); j++ {
			currToken := tokens[j]
			UpsertHustlerFromAlchemy(ctx, currToken)
			// 🚨 TODO 🚨
			//
			// PROCESS AND STORE INFO LIKE THE HUSTLER INDEXER
			//   indexer/processor/hustler.go
			// Ideally this should call similar code that runs for
			//   ProcessMetadataUpdate,  ProcessTransferSingle
		}
	}
	return nil
}

func UpsertHustlerFromAlchemy(ctx context.Context, t Nft) {
	dbClient := dbprovider.Ent()

	// pp.Print(t)
	tokenId, err := hexStringToInteger(t.Id.TokenId)
	if err != nil {
		log.Error().Msgf("Error converting tokenId to int %v", err)
		return
	}
	// Get some attributes required to save model
	typ := hustler.TypeREGULAR
	if 500 > tokenId {
		typ = hustler.TypeORIGINAL_GANGSTA
	}

	sex := hustler.SexMALE
	if valueForAttribute(t.Metadata.Attributes, "Sex") == "Female" {
		sex = hustler.SexFEMALE
	}
	// Convert age attr string to uint
	ageAttr := valueForAttribute(t.Metadata.Attributes, "Initiation")
	age, err := strconv.ParseUint(fmt.Sprint(ageAttr), 10, 64)
	if err != nil {
		age = 0
	}

	log.Info().
		Int64("tokenId", tokenId).
		Str("name", t.Metadata.Name).
		Msg("Saving Hustler")

	// Make sure Wallet exists
	dbClient.Wallet.Create().
		SetID(t.OwnerAddress).
		OnConflict().
		DoNothing().
		Exec(ctx)

	// Create Hustler
	hustlerErr := dbClient.Hustler.Create().
		SetWalletID(t.OwnerAddress).
		SetID(fmt.Sprint(tokenId)).
		SetAge(age).
		SetSex(sex).
		SetType(typ).
		SetOrder(hustler.DefaultOrder).
		SetViewbox(hustler.DefaultViewbox).
		SetName(t.Metadata.Name).
		SetSvg(t.Metadata.Image).
		OnConflictColumns(hustler.FieldID).
		UpdateNewValues().
		Exec(ctx)

	if hustlerErr != nil {
		log.Error().
			Int64("tokenId", tokenId).
			Err(err).
			Interface("attributes", t.Metadata.Attributes).
			Msg("Failed Saving Hustler")
	}
}

func valueForAttribute(attrs []NftAttribute, searchKey string) interface{} {
	for i := range attrs {
		if attrs[i].TraitType == searchKey {
			return attrs[i].Value
		}
	}
	return nil
}

// Convert strings like 0x000000..1 to integers
func hexStringToInteger(hexString string) (int64, error) {
	// replace 0x or 0X with empty String
	numStr := strings.Replace(hexString, "0x", "", -1)
	numStr = strings.Replace(numStr, "0X", "", -1)
	return strconv.ParseInt(numStr, 16, 64)
}

// https://docs.alchemy.com/reference/getownersforcollection
func GetHustlerOwners() []OwnerAddress {
	url := fmt.Sprintf(
		"%v/getOwnersForCollection?contractAddress=%v&withTokenBalances=true",
		baseUrl,
		hustlerContractAddr)

	log.Info().Msg("GETTING OWNERS")

	body := makeGetRequest(url)

	// Decode it
	var responsePage OwnerAddressResponsePage
	if err := json.Unmarshal(body, &responsePage); err != nil {
		log.Error().
			Str("body", string(body)).
			Msgf("Unmarshaling HustlerOwners: %v", err)
	}

	log.Info().Msgf("Found %v wallets\n", len(responsePage.Owners))
	return responsePage.Owners
}

func GetHustlerMetaForOwner(owner OwnerAddress) []Nft {
	var allTokens []Nft
	url := fmt.Sprintf("%v/getNFTMetadataBatch", baseUrl)
	// Endpoint only supports 100 tokens per request
	tokenLimit := 100
	tokenBalanceChunks := chunkTokenBalances(owner.TokenBalances, tokenLimit)

	// Need to chunk requests in batches of `tokenLimit`
	// or Alchemy API will reject it
	for _, chunk := range tokenBalanceChunks {
		var tokenPayload TokenPayloadRequest
		for j := 0; j < len(chunk); j++ {
			tb := owner.TokenBalances[j]
			p := TokenPayload{
				ContractAddress: hustlerContractAddr,
				TokenId:         tb.TokenId,
			}
			tokenPayload.Tokens = append(tokenPayload.Tokens, p)
		}
		jsonPayload, _ := json.Marshal(tokenPayload)

		body := makePostRequest(url, jsonPayload)

		// Decode it
		var tokens []Nft
		if err := json.Unmarshal(body, &tokens); err != nil {
			log.Warn().
				Str("body", string(body)).
				Msgf("Unmarshaling NFTMetaBatch: %v", err)
		}
		allTokens = append(allTokens, tokens...)
	}

	// Add owner address to each token
	for i := 0; i < len(allTokens); i++ {
		allTokens[i].OwnerAddress = owner.Address
	}
	return allTokens
}

// Gets meta for one token ID passed in.
// Used elsewhere to get meta for a single token.
// Here we use the getNFTMetadataBatch method instead.
func GetHustlerMetaForTokenId(id big.Int) []byte {
	url := fmt.Sprintf(
		"%v/getNFTMetadata?contractAddress=%v&tokenId=%v",
		baseUrl,
		hustlerContractAddr,
		id.String())

	body := makeGetRequest(url)

	return body
}

// Split slices into chunks of predetermined size
func chunkTokenBalances(slice []TokenBalance, chunkSize int) [][]TokenBalance {
	var chunks [][]TokenBalance
	for i := 0; i < len(slice); i += chunkSize {
		end := i + chunkSize
		// necessary check to avoid slicing beyond
		// slice capacity
		if end > len(slice) {
			end = len(slice)
		}
		chunks = append(chunks, slice[i:end])
	}
	return chunks
}
