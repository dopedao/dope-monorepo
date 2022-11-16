package main

import (
	"github.com/dopedao/dope-monorepo/packages/api/indexer"
)

// Go Ethereum indexer for running from command line
// without the HTTP server wrapping necessary for deploying to GCP.
//
// At some point if we make a Cloud Run Docker container it should call
// this instead of the cmd/indexServer program
func main() {
	indexer.Run()
}
