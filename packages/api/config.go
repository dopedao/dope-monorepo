package api

import (
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/processors"
	"github.com/ethereum/go-ethereum/common"
)

type Configs []Config

var configs = Configs{{
	RPC:      "https://eth-kovan.alchemyapi.io/v2/imTJSp6gKyrAIFPFrQRXy1lD087y3FN-",
	Interval: time.Second * 5,
	Contracts: []Contract{
		// DOPE
		{
			Address:    common.HexToAddress("0xd2761Ee62d8772343070A5dE02C436F788EdF60a"),
			StartBlock: 28278714,
			Processor:  new(processors.DopeProcessor),
		},
		// PAPER
		{
			Address:    common.HexToAddress("0x7ae1d57b58fa6411f32948314badd83583ee0e8c"),
			StartBlock: 13162150,
			Processor:  new(processors.PaperProcessor),
		},
	},
}}
