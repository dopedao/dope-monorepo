// Updates DOPE NFT items in our database if they
// have been "Opened" or had their "Gear Claimed"
// by checking the Ethereum blockchain.
package jobs

import (
	"context"
	"fmt"
	"log"
	"math/big"
	"sync"
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/internal/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/hashicorp/go-retryablehttp"
)

type GearClaims struct{}

func (gc GearClaims) Run() {
	ctx := context.Background()
	client := dbprovider.Ent()

	log.Default().Println("Establishing RPC client")
	retryableHTTPClient := retryablehttp.NewClient()
	httpClient, err := rpc.DialHTTPWithClient("https://eth-mainnet.g.alchemy.com/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG", retryableHTTPClient.StandardClient())
	if err != nil {
		log.Fatal("Dialing ethereum rpc.") //nolint:gocritic
	}

	eth := ethclient.NewClient(httpClient)
	initiator, err := bindings.NewInitiator(common.HexToAddress("0x7aa8e897d712cfb9c7cb6b37634a1c4d21181c8b"), eth)
	if err != nil {
		log.Fatalf("Creating Components bindings: %+v", err)
	}

	log.Default().Println("Getting all DOPE NFTs from database")
	dopes, dopeFindErr := client.Dope.Query().All(ctx)
	if dopeFindErr != nil {
		log.Fatal("Getting ethereum dopes.") //nolint:gocritic
	}

	var wg sync.WaitGroup
	wg.Add(len(dopes))
	sem := make(chan int, MAX_DB_CONN)
	for _, dope := range dopes {
		sem <- 1
		go func(dope *ent.Dope) {
			b, ok := new(big.Int).SetString(dope.ID, 10)
			if !ok {
				log.Fatal("Making big int")
			}
			opened, err := initiator.IsOpened(nil, b)
			if err != nil {
				log.Fatalf("Getting initiator balance: %+v.", err)
			}
			fmt.Printf("Dope %s is opened: %t", dope.ID, opened)
			client.Dope.
				UpdateOneID(dope.ID).
				SetOpened(opened).
				SetLastCheckedGearClaim(time.Now()).
				ExecX(ctx)

			<-sem

			wg.Done()
		}(dope)
	}

	wg.Wait()
	log.Default().Println("DONE: GearClaims")
}
