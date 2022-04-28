//go:build tools
// +build tools

// THIS FILE specifies tools that are not included
// in the final Go binary build.
//
// These are supporting tools we need to build or make this
// code during development.
//
// Install them by running `go install`
//
// More on using the tools.go file here
//
// https://play-with-go.dev/tools-as-dependencies_go115_en/
// https://marcofranssen.nl/manage-go-tools-via-go-modules
package tools

import (
	_ "github.com/99designs/gqlgen"
	_ "github.com/withtally/synceth/codegen"
)
