package jobs

import (
	"context"
	"os"

	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/dopedao/dope-monorepo/packages/api/jobs/opensea"
	"github.com/rs/zerolog"
)

func UpdateOpenSeaListings(queue chan int) {
	log := zerolog.New(os.Stderr)
	ctx := context.Background()
	var oscfg opensea.Config

	for _, c := range opensea.ConfigList[envcfg.Network] {
		switch c := c.(type) {
		case opensea.Config:
			oscfg = c
		}
	}

	log.Info().Msg("updateOpenSeaListings")

	job := opensea.NewJob(dbprovider.Ent(), oscfg)
	job.Run(log.WithContext(ctx))
	// Pop this job off the queue
	<-queue
}
