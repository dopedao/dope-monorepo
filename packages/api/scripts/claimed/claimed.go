// Updates DOPE NFT items in our database after checking
// their PAPER CLAIM status on the PAPER contract.
package main

import (
	"context"
	"fmt"
	"log"
	"math/big"
	"sync"

	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql"
	"github.com/dopedao/dope-monorepo/packages/api/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/util"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/hashicorp/go-retryablehttp"

	_ "github.com/lib/pq"
)

const MAX_DB_CONN = 77

var host = util.GetEnvOrFallback("PG_HOST", "localhost:5433")
var pass = util.GetEnvOrFallback("PG_PASS", "postgres")

func main() {
	ctx := context.Background()

	db, err := sql.Open(
		dialect.Postgres,
		fmt.Sprintf("postgres://postgres:%s@%s?sslmode=disable", pass, host),
	)
	if err != nil {
		log.Fatalf("Connecting to db: %+v", err) //nolint:gocritic
	}

	client := ent.NewClient(ent.Driver(db))

	retryableHTTPClient := retryablehttp.NewClient()
	c, err := rpc.DialHTTPWithClient("https://eth-mainnet.g.alchemy.com/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG", retryableHTTPClient.StandardClient())
	if err != nil {
		log.Fatal("Dialing ethereum rpc.") //nolint:gocritic
	}

	eth := ethclient.NewClient(c)
	paper, err := bindings.NewPaper(common.HexToAddress("0x7ae1d57b58fa6411f32948314badd83583ee0e8c"), eth)
	if err != nil {
		log.Fatalf("Creating Components bindings: %+v", err)
	}

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
			claimed, err := paper.ClaimedByTokenId(nil, b)
			if err != nil {
				log.Fatalf("Getting paper balance: %+v.", err)
			}
			client.Dope.UpdateOneID(dope.ID).SetClaimed(claimed).ExecX(ctx)

			<-sem
			wg.Done()
		}(dope)
	}

	wg.Wait()
}
