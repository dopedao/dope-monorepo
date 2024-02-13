// Updates DOPE NFT items in our database after checking
// their CLAIM status on the PAPER contract.
package jobs

import (
	"context"
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

type PaperClaims struct{}

func (pc PaperClaims) Run() {
	ctx := context.Background()

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

	dopes, err := dbprovider.Ent().
		Dope.
		Query().
		All(ctx)
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
				log.Fatalf("Getting paper claim: %+v.", err)
			}

			dope, err = dope.Update().
				SetClaimed(claimed).
				SetLastCheckedPaperClaim(time.Now()).
				Save(ctx)

			if err != nil {
				log.Fatalf("Updating dope: %+v.", err)
			}

			<-sem
			wg.Done()
		}(dope)
	}

	wg.Wait()
	log.Default().Println("DONE: PaperClaims")
}
