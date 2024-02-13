package indexer

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/gin-gonic/gin"
	"github.com/rs/cors"
)

func NewServer(ctx context.Context, network string) (http.Handler, error) {
	log := logger.Log.With().Str("method", "NewServer").Logger()
	log.Debug().Msg("Starting Indexer")

	ctx, cancel := context.WithCancel(ctx)
	started := true
	startIndexer(ctx)

	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		if started {
			c.JSON(200, gin.H{"indexer_running": true})
			return
		} else {
			c.JSON(503, gin.H{"indexer_running": false})
			return
		}
	})

	r.GET("/_ah/start", func(c *gin.Context) {
		if started {
			c.JSON(200, gin.H{"success": true})
			return
		}
		started = true
		startIndexer(ctx)
		c.JSON(200, gin.H{"success": true})
	})

	r.GET("/_ah/stop", func(c *gin.Context) {
		cancel()
		c.JSON(200, gin.H{"success": true})
	})

	r.GET("/_ah/restart", func(c *gin.Context) {
		cancel()
		startIndexer(ctx)
		c.JSON(200, gin.H{"success": true})
	})

	r.GET("/stats", func(c *gin.Context) {
		syncStates := dbprovider.Ent().SyncState.Query().AllX(ctx)
		jsonData, err := json.Marshal(syncStates)
		if err != nil {
			c.JSON(500, gin.H{"success": false})
			return
		}
		c.Data(200, "application/json", jsonData)
	})

	return cors.AllowAll().Handler(r), nil
}

func startIndexer(ctx context.Context) {
	log := logger.Log
	for _, c := range Config[envcfg.Network] {
		switch c := c.(type) {
		case EthConfig:
			log.Debug().Msgf("Starting %v", c)
			eth := NewEthereumIndexer(ctx, dbprovider.Ent(), c)
			go eth.Sync(ctx)
		}
	}
}
