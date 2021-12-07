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
			Address:    common.HexToAddress("0x781B575CA559263eb232B854195D6dC0AB720105"),
			StartBlock: 28278725,
			Processor:  new(processors.PaperProcessor),
		},
	},
}, {
	RPC:      "https://opt-kovan.g.alchemy.com/v2/xk92V0tX0bnpMmUp7e6tetGWYgYxhHE9",
	Interval: time.Second * 5,
	Contracts: []Contract{
		// SwapMeet
		{
			Address:    common.HexToAddress("0x7144893df7456fB9678875aa09800d514685850F"),
			StartBlock: 108841,
			Processor:  new(processors.SwapMeetProcessor),
		},
		// Hustlers
		{
			Address:    common.HexToAddress("0x5701ff301d67174d63B271cf321e3886d518370d"),
			StartBlock: 108850,
			Processor:  new(processors.HustlerProcessor),
		},
	},
}}
