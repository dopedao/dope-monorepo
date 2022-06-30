// Updates DOPE NFT items in our database if they
// have been "Opened" or had their "Gear Claimed"
// by checking the Ethereum blockchain.
package jobs

import (
	"context"
	"log"
	"math/big"
	"sync"

	"github.com/dopedao/dope-monorepo/packages/api/internal/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/hashicorp/go-retryablehttp"
)

func GearClaims(queue chan int) {
	ctx := context.Background()
	client := dbprovider.Ent()

	log.Default().Println("Establishing RPC client")
	retryableHTTPClient := retryablehttp.NewClient()
	c, err := rpc.DialHTTPWithClient("https://eth-mainnet.g.alchemy.com/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG", retryableHTTPClient.StandardClient())
	if err != nil {
		log.Fatal("Dialing ethereum rpc.") //nolint:gocritic
	}

	eth := ethclient.NewClient(c)
	initiator, err := bindings.NewInitiator(common.HexToAddress("0x7aa8e897d712cfb9c7cb6b37634a1c4d21181c8b"), eth)
	if err != nil {
		log.Fatalf("Creating Components bindings: %+v", err)
	}

	log.Default().Println("Getting all DOPE NFTs from database")
	dopes, err := client.Dope.Query().All(ctx)
	if err != nil {
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
			client.Dope.UpdateOneID(dope.ID).SetOpened(opened).ExecX(ctx)

			<-sem
			wg.Done()
		}(dope)
	}

	wg.Wait()
	// Pop this job off the queue
	<-queue
}
