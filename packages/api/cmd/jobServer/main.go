package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/bamzi/jobrunner"
	"github.com/dopedao/dope-monorepo/packages/api/internal/dbprovider"
	"github.com/dopedao/dope-monorepo/packages/api/internal/envcfg"
	"github.com/dopedao/dope-monorepo/packages/api/internal/logger"
	"github.com/dopedao/dope-monorepo/packages/api/jobs"
	"github.com/gin-gonic/gin"
	"github.com/rs/cors"
	"github.com/yfuruyama/crzerolog"
)

var JOB_LIMIT = 1

func main() {
	logger.Init()

	ctx := context.Background()
	startCronJobs(ctx)
	startHttpServer(ctx)
}

func startCronJobs(ctx context.Context) {
	jobrunner.Start()
	// Data integrity jobs
	jobrunner.Schedule("@every 2m", jobs.SetBestTokenPrices{})
	jobrunner.Schedule("@every 6h", jobs.GearClaims{})
	jobrunner.Schedule("@every 24h", jobs.PaperBalances{})
	jobrunner.Schedule("@every 24h", jobs.CheckTokenOwners{})
	// Database maintenance
	jobrunner.Schedule("@every 12h", dbprovider.VacuumJob{})
	jobrunner.Schedule("@every 24h", dbprovider.RecreateMaterializedViewsJob{})
	jobrunner.Schedule("@every 30m", dbprovider.RefreshSearchIndexJob{})
}

func startHttpServer(ctx context.Context) {
	srv, err := newServer(logger.Log.WithContext(ctx))
	logger.LogFatalOnErr(err, "Creating Job Server")

	logger.Log.Info().Msg("Starting to listen on port: " + *envcfg.Listen)
	middleware := crzerolog.InjectLogger(logger.Log)
	server := &http.Server{Addr: ":" + *envcfg.Listen, Handler: middleware(srv)}

	err = server.ListenAndServe()
	logger.LogFatalOnErr(err, "Server terminated.")
}

func newServer(ctx context.Context) (http.Handler, error) {
	logger.Log.Info().Msg("Starting job server")

	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"success": true})
	})

	r.GET("/stats", func(c *gin.Context) {
		jsonData, err := json.Marshal(jobrunner.StatusJson())
		if err != nil {
			c.JSON(500, gin.H{"success": false})
			return
		}
		c.Data(200, "application/json", jsonData)
	})

	qTokenPrices := make(chan int, JOB_LIMIT)
	sbtp := jobs.SetBestTokenPrices{}
	handleJob(r, "/token-prices", sbtp.Run, qTokenPrices)

	qGearClaims := make(chan int, JOB_LIMIT)
	gc := jobs.GearClaims{}
	handleJob(r, "/gear-claims", gc.Run, qGearClaims)

	qGearMetrics := make(chan int, JOB_LIMIT)
	gm := jobs.GearMetrics{}
	handleJob(r, "/gear-metrics", gm.Run, qGearMetrics)

	qPaperBalance := make(chan int, JOB_LIMIT)
	pb := jobs.PaperBalances{}
	handleJob(r, "/paper-balances", pb.Run, qPaperBalance)

	qSyncHustlers := make(chan int, JOB_LIMIT)
	sh := jobs.SyncHustlers{}
	handleJob(r, "/sync-hustlers", sh.Run, qSyncHustlers)

	qFixHustlerImages := make(chan int, JOB_LIMIT)
	hi := jobs.FixHustlerImages{}
	handleJob(r, "/fix-hustler-images", hi.Run, qFixHustlerImages)

	qViews := make(chan int, JOB_LIMIT)
	rmv := dbprovider.RecreateMaterializedViewsJob{}
	handleJob(r, "/recreate-views", rmv.Run, qViews)

	return cors.AllowAll().Handler(r), nil
}

func handleJob(
	router *gin.Engine,
	url string,
	job func(),
	queue chan int,
) {
	router.GET(url, func(c *gin.Context) {
		fmt.Printf("queue length %v", len(queue))
		if len(queue) >= JOB_LIMIT {
			c.JSON(http.StatusProcessing, gin.H{"success": false, "message": "already running"})
			return
		}
		queue <- 1 // Add job to queue
		go func() {
			defer func() { <-queue }()
			job()
		}()
		c.JSON(http.StatusOK, gin.H{"success": true, "message": "job queued", "queued_at": time.Now()})
	})
}
