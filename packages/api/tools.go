//go:build tools
// +build tools

package api

import (
	_ "github.com/99designs/gqlgen/cmd"
	_ "github.com/withtally/ethgen/codegen"
)
