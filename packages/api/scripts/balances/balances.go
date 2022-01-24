package main

import (
	"context"
	"log"
	"math/rand"
	"sync"
	"time"

	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql"
	"github.com/dopedao/dope-monorepo/packages/api/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
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

	wallets, err := client.Wallet.Query().All(ctx)
	if err != nil {
		log.Fatal("Getting ethereum wallets.") //nolint:gocritic
	}

	var wg sync.WaitGroup
	wg.Add(len(wallets))

	for _, wallet := range wallets {
		go func(wallet *ent.Wallet) {
			r := rand.Intn(180)
			time.Sleep(time.Duration(r) * time.Second)

			bal, err := paper.BalanceOf(nil, common.HexToAddress(wallet.ID))
			if err != nil {
				log.Fatalf("Getting paper balance: %+v.", err)
			}

			client.Wallet.UpdateOneID(wallet.ID).SetPaper(schema.BigInt{Int: bal}).ExecX(ctx)

			wg.Done()
		}(wallet)
	}

	wg.Wait()
}
