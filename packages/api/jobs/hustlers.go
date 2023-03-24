// Methods for syncing Hustlers

package jobs

import (
	"context"
	"encoding/json"
	"fmt"
	"math/big"
	"strconv"
	"strings"

	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/hustler"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	a "github.com/dopedao/dope-monorepo/packages/api/jobs/alchemy"
	"github.com/ethereum/go-ethereum/common"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

// HUSTLERS
var baseUrl = "https://opt-mainnet.g.alchemy.com/nft/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG"
var hustlerContractAddr = "0xDbfEaAe58B6dA8901a8a40ba0712bEB2EE18368E"

func SyncHustlers() {
	ctx := context.Background()
	ownersWithTokenBalances := GetHustlerOwners()
	numOwners := len(ownersWithTokenBalances)

	// Tagged logger
	_, log := logger.LogFor(
		ctx,
		func(zctx *zerolog.Context) zerolog.Context {
			return zctx.Str("Job", "SyncHustlers")
		})

	// hContractBinding := GetHustlerContractBinding(log)

	for i := 0; i < numOwners; i++ {
		owner := ownersWithTokenBalances[i]
		log.Info().
			Msgf(
				"%v - %v tokens\n",
				owner.Address,
				len(owner.TokenBalances))

		tokens := GetHustlerMetaForOwner(owner)

		log.Info().
			Msgf(
				"Hustler Sync Completion %0.3f%%\n",
				(float64(i)/float64(numOwners))*100)

		for j := 0; j < len(tokens); j++ {
			currToken := tokens[j]
			UpsertHustlerFromAlchemy(ctx, currToken)
			// 🚨 TODO 🚨
			//
			// PROCESS AND STORE INFO LIKE THE HUSTLER INDEXER
			//   indexer/processor/hustler.go
			//
			// This does not currently store information
			// for gear that belongs to a hustler.
			// Doing so causes issues with the front-end
			// as gear does not appear to belong to that hustler.
			//
			// Something like…
			//
			// if err := processor.RefreshEquipment(
			// 	ctx,
			// 	p.Eth,
			// 	tx,
			// 	currToken.Id,
			// 	hustlerAddr,
			// 	new(big.Int).SetUint64(raw.BlockNumber)); err != nil {
			// 	return err
			// }
		}
	}
}

func UpsertHustlerFromAlchemy(ctx context.Context, t a.Nft) {
	// pp.Print(t)
	tokenId, err := hexStringToInteger(t.Id.TokenId)
	if err != nil {
		log.Error().
			Str("Job", "SyncHustlers").
			Msgf("Error converting tokenId to int %v", err)
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

	// This needs to be an EIP-55 compliant address
	// or it causes issues for us down the line elsewhere.
	walletAddress := common.HexToAddress(t.OwnerAddress).Hex()

	log.Info().
		Str("Job", "SyncHustlers").
		Int64("tokenId", tokenId).
		Str("name", t.Metadata.Name).
		Msg("Saving Hustler")

	// Make sure Wallet exists
	dbClient.Wallet.Create().
		SetID(walletAddress).
		OnConflict().
		DoNothing().
		Exec(ctx)

	// Create Hustler
	hustlerErr := dbClient.Hustler.Create().
		SetWalletID(walletAddress).
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
			Str("Job", "SyncHustlers").
			Int64("tokenId", tokenId).
			Err(err).
			Interface("attributes", t.Metadata.Attributes).
			Msg("Failed Saving Hustler")
	}
}

func valueForAttribute(attrs []a.NftAttribute, searchKey string) interface{} {
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
func GetHustlerOwners() []a.OwnerAddress {
	url := fmt.Sprintf(
		"%v/getOwnersForCollection?contractAddress=%v&withTokenBalances=true",
		baseUrl,
		hustlerContractAddr)

	log.Info().Str("Job", "SyncHustlers").Msg("GETTING OWNERS")

	body := a.MakeGetRequest(url)

	// Decode it
	var responsePage a.OwnerAddressResponsePage
	if err := json.Unmarshal(body, &responsePage); err != nil {
		log.Error().
			Str("Job", "SyncHustlers").
			Str("body", string(body)).
			Msgf("Unmarshaling HustlerOwners: %v", err)
	}

	log.Info().
		Str("Job", "SyncHustlers").
		Msgf("Found %v wallets\n", len(responsePage.Owners))
	return responsePage.Owners
}

func GetHustlerMetaForOwner(owner a.OwnerAddress) []a.Nft {
	var allTokens []a.Nft
	url := fmt.Sprintf("%v/getNFTMetadataBatch", baseUrl)
	// Endpoint only supports 100 tokens per request
	tokenLimit := 100
	tokenBalanceChunks := chunkTokenBalances(owner.TokenBalances, tokenLimit)

	// Need to chunk requests in batches of `tokenLimit`
	// or Alchemy API will reject it
	for _, chunk := range tokenBalanceChunks {
		var tokenPayload a.TokenPayloadRequest
		for j := 0; j < len(chunk); j++ {
			tb := owner.TokenBalances[j]
			p := a.TokenPayload{
				ContractAddress: hustlerContractAddr,
				TokenId:         tb.TokenId,
			}
			tokenPayload.Tokens = append(tokenPayload.Tokens, p)
		}
		jsonPayload, _ := json.Marshal(tokenPayload)

		body := a.MakePostRequest(url, jsonPayload)

		// Decode it
		var tokens []a.Nft
		if err := json.Unmarshal(body, &tokens); err != nil {
			log.Warn().
				Str("Job", "SyncHustlers").
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

	body := a.MakeGetRequest(url)

	return body
}

// Split slices into chunks of predetermined size
func chunkTokenBalances(slice []a.TokenBalance, chunkSize int) [][]a.TokenBalance {
	var chunks [][]a.TokenBalance
	for i := 0; i < len(slice); i += chunkSize {
		end := i + chunkSize
		// avoid slicing beyond capacity
		if end > len(slice) {
			end = len(slice)
		}
		chunks = append(chunks, slice[i:end])
	}
	return chunks
}
