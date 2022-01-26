package main

import (
	"context"
	"log"
	"math/big"
	"math/rand"
	"sync"
	"time"

	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql"
	"github.com/dopedao/dope-monorepo/packages/api/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/hashicorp/go-retryablehttp"

	_ "github.com/lib/pq"
)

func main() {
	ctx := context.Background()

	db, err := sql.Open(dialect.Postgres, "postgres://postgres:postgres@localhost:5433?sslmode=disable")
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

	for _, dope := range dopes {
		go func(dope *ent.Dope) {
			r := rand.Intn(180)
			time.Sleep(time.Duration(r) * time.Second)

			b, ok := new(big.Int).SetString(dope.ID, 10)
			if !ok {
				log.Fatal("Making big int")
			}
			claimed, err := paper.ClaimedByTokenId(nil, b)
			if err != nil {
				log.Fatalf("Getting paper balance: %+v.", err)
			}

			client.Dope.UpdateOneID(dope.ID).SetClaimed(claimed).ExecX(ctx)

			wg.Done()
		}(dope)
	}

	wg.Wait()
}
