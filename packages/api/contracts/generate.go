package contracts

import _ "github.com/withtally/ethgen/cmd" // Blank import for ethgen to avoid removal from go.mod

//go:generate go run -mod=mod github.com/withtally/ethgen bind --handlers --outdir ./bindings ./abis
