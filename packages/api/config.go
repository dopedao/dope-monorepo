package api

import (
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/engine"
	"github.com/dopedao/dope-monorepo/packages/api/processors"
	"github.com/ethereum/go-ethereum/common"
)

type Configs []interface{}

var configs = map[string]Configs{
	"mainnet": {engine.EthConfig{
		RPC:      "https://eth-mainnet.alchemyapi.io/v2/Mq8Cx8urUvW9FNzv6NW87MYJQ9CnExlj",
		Interval: time.Second * 5,
		Contracts: []engine.Contract{
			// DOPE
			{
				Address:    common.HexToAddress("0x8707276df042e89669d69a177d3da7dc78bd8723"),
				StartBlock: 13136082,
				Processor:  new(processors.DopeProcessor),
			},
			// PAPER
			{
				Address:    common.HexToAddress("0x7ae1d57b58fa6411f32948314badd83583ee0e8c"),
				StartBlock: 13162150,
				Processor:  new(processors.PaperProcessor),
			},
			// Initiator
			{
				Address:    common.HexToAddress("0x7aa8e897d712CFB9C7cb6B37634A1C4d21181c8B"),
				StartBlock: 13650250,
				Processor:  new(processors.InitiatorProcessor),
			},
		},
	}, engine.EthConfig{
		RPC:      "https://opt-mainnet.g.alchemy.com/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG",
		Interval: time.Second * 5,
		Contracts: []engine.Contract{
			// SwapMeet
			{
				Address:    common.HexToAddress("0x0E55e1913C50e015e0F60386ff56A4Bfb00D7110"),
				StartBlock: 278375,
				Processor:  new(processors.SwapMeetProcessor),
			},
			// Hustlers
			{
				Address:    common.HexToAddress("0xDbfEaAe58B6dA8901a8a40ba0712bEB2EE18368E"),
				StartBlock: 278746,
				Processor:  new(processors.HustlerProcessor),
			},
		},
	}},
	"testnet": {engine.EthConfig{
		RPC:      "https://eth-kovan.alchemyapi.io/v2/imTJSp6gKyrAIFPFrQRXy1lD087y3FN-",
		Interval: time.Second * 5,
		Contracts: []engine.Contract{
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
			// Initiator
			{
				Address:    common.HexToAddress("0x812D76C65bc80599cb778Ba3AecEf1a4AC197ae3"),
				StartBlock: 28457043,
				Processor:  new(processors.InitiatorProcessor),
			},
		},
	}, engine.EthConfig{
		RPC:      "https://opt-kovan.g.alchemy.com/v2/xk92V0tX0bnpMmUp7e6tetGWYgYxhHE9",
		Interval: time.Second * 5,
		Contracts: []engine.Contract{
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
	}},
}
