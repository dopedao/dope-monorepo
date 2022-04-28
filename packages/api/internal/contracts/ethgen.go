//go:build ignore
// +build ignore

package main

import (
	"log"

	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/withtally/synceth/codegen"
)

func main() {
	if err := codegen.GenerateBindings("./abis", "./bindings", &codegen.BindingsConfig{
		Fakes: false,
		Handlers: codegen.HandlersConfig{
			Generate:   true,
			InputTypes: []codegen.InputType{{Name: "tx", Type: &ent.Tx{}}},
		},
	}); err != nil {
		log.Fatalf("running ethgen codegen: %v", err)
	}
}
