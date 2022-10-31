
package main

import (
	"log"
	"os"

	"github.com/markbates/grift/grift"
	_ "github.com/dopedao/dope-monorepo/packages/api/grifts"
)

func main() {
	grift.CommandName = "grift"
	err := grift.Exec(os.Args[1:], false)
	if err != nil {
		log.Fatal(err)
	}
}
