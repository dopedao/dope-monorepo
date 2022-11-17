// Updates PAPER balance for wallets we have stored
// inside our database.
package jobs

import (
	"context"
	"fmt"
	"log"
	"math/rand"
	"sync"
	"time"

	"cloud.google.com/go/bigquery"
	"google.golang.org/api/iterator"

	"github.com/dopedao/dope-monorepo/packages/api/internal/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent/schema"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/rpc"
	"github.com/hashicorp/go-retryablehttp"
)

var paperAddress = "0x7ae1d57b58fa6411f32948314badd83583ee0e8c"

// Gets all wallet addresses who have ever transferred PAPER
// using the BigQuery Ethereum dataset.
// https://cloud.google.com/blog/products/data-analytics/ethereum-bigquery-public-dataset-smart-contract-analytics
func SeedPaperWallets() error {
	db := dbprovider.Ent()

	qStr := fmt.Sprintf(`
		SELECT DISTINCT(to_address)
		FROM bigquery-public-data.crypto_ethereum.token_transfers
		WHERE token_address = '%s'`, paperAddress)
	ctx := context.Background()
	log.Default().Println("Making new BigQuery Client")
	client, err := bigquery.NewClient(ctx, "dopewars-live")
	if err != nil {
		return fmt.Errorf("bigquery.NewClient: %w", err)
	}
	defer client.Close()

	log.Default().Println("Running query to get all PAPER owners…")
	q := client.Query(qStr)
	it, err := q.Read(ctx)
	if err != nil {
		return fmt.Errorf("query.Read(): %w", err)
	}
	log.Default().Println("Adding wallets")
	for {
		var row []bigquery.Value
		err := it.Next(&row)
		if err == iterator.Done {
			break
		}
		if err != nil {
			return err
		}
		walletAddress := row[0].(string)
		log.Default().Printf("Adding %s", walletAddress)
		err = db.Wallet.Create().
			SetID(walletAddress).
			OnConflict().
			DoNothing().
			Exec(ctx)
		if err != nil {
			return fmt.Errorf("creating wallet: %w", err)
		}
	}

	return nil
}

// Assumes Wallets are already in the database, otherwise it does nothing.
// If no wallets in place, call SeedPaperWallets
func PaperBalances() {
	ctx := context.Background()
	db := dbprovider.Ent()
	retryableHTTPClient := retryablehttp.NewClient()
	c, err := rpc.DialHTTPWithClient("https://eth-mainnet.g.alchemy.com/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG", retryableHTTPClient.StandardClient())
	if err != nil {
		log.Fatal("Dialing ethereum rpc.") //nolint:gocritic
	}

	eth := ethclient.NewClient(c)
	paper, err := bindings.NewPaper(common.HexToAddress(paperAddress), eth)
	if err != nil {
		log.Fatalf("Creating Components bindings: %+v", err)
	}

	// Query existing wallets in system
	wallets, err := db.Wallet.Query().All(ctx)
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

			db.Wallet.UpdateOneID(wallet.ID).SetPaper(schema.BigInt{Int: bal}).ExecX(ctx)

			wg.Done()
		}(wallet)
	}

	wg.Wait()
	log.Default().Println("DONE: PaperBalances")
}
