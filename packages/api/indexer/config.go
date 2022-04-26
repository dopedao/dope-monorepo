package indexer

import (
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/indexer/processor"
	"github.com/ethereum/go-ethereum/common"
)

type ConfigCollection []interface{}

var Config = map[string]ConfigCollection{
	"mainnet": {
		EthConfig{
			RPC:      "https://eth-mainnet.alchemyapi.io/v2/Mq8Cx8urUvW9FNzv6NW87MYJQ9CnExlj",
			Interval: time.Second * 5,
			Contracts: []Contract{
				// DOPE
				{
					Address:    common.HexToAddress("0x8707276df042e89669d69a177d3da7dc78bd8723"),
					StartBlock: 13136082,
					Processor:  new(processor.DopeProcessor),
				},
				// PAPER
				{
					Address:    common.HexToAddress("0x7ae1d57b58fa6411f32948314badd83583ee0e8c"),
					StartBlock: 13162150,
					Processor:  new(processor.PaperProcessor),
				},
				// Initiator
				{
					Address:    common.HexToAddress("0x7aa8e897d712CFB9C7cb6B37634A1C4d21181c8B"),
					StartBlock: 13650250,
					Processor:  new(processor.InitiatorProcessor),
				},
			},
		}, EthConfig{
			RPC:      "https://opt-mainnet.g.alchemy.com/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG",
			Interval: time.Second * 5,
			Contracts: []Contract{
				// SwapMeet
				{
					Address:    common.HexToAddress("0x0E55e1913C50e015e0F60386ff56A4Bfb00D7110"),
					StartBlock: 278375,
					Processor:  new(processor.SwapMeetProcessor),
				},
				// Hustlers
				{
					Address:    common.HexToAddress("0xDbfEaAe58B6dA8901a8a40ba0712bEB2EE18368E"),
					StartBlock: 278746,
					Processor:  new(processor.HustlerProcessor),
				},
			},
		}, OpenseaConfig{
			URL:      "https://api.opensea.io",
			Contract: "0x8707276df042e89669d69a177d3da7dc78bd8723",
			Interval: time.Minute * 20,
		},
	},
	"testnet": {
		EthConfig{
			RPC:      "https://eth-kovan.alchemyapi.io/v2/imTJSp6gKyrAIFPFrQRXy1lD087y3FN-",
			Interval: time.Second * 5,
			Contracts: []Contract{
				// DOPE
				{
					Address:    common.HexToAddress("0xd2761Ee62d8772343070A5dE02C436F788EdF60a"),
					StartBlock: 28278714,
					Processor:  new(processor.DopeProcessor),
				},
				// PAPER
				{
					Address:    common.HexToAddress("0x781B575CA559263eb232B854195D6dC0AB720105"),
					StartBlock: 28278725,
					Processor:  new(processor.PaperProcessor),
				},
				// Initiator
				{
					Address:    common.HexToAddress("0x812D76C65bc80599cb778Ba3AecEf1a4AC197ae3"),
					StartBlock: 28457043,
					Processor:  new(processor.InitiatorProcessor),
				},
			},
		}, EthConfig{
			RPC:      "https://opt-kovan.g.alchemy.com/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG",
			Interval: time.Second * 5,
			Contracts: []Contract{
				// SwapMeet
				{
					Address:    common.HexToAddress("0x7144893df7456fB9678875aa09800d514685850F"),
					StartBlock: 108841,
					Processor:  new(processor.SwapMeetProcessor),
				},
				// Hustlers
				{
					Address:    common.HexToAddress("0x5701ff301d67174d63B271cf321e3886d518370d"),
					StartBlock: 108850,
					Processor:  new(processor.HustlerProcessor),
				},
			},
		}, OpenseaConfig{
			URL:      "https://api.opensea.io",
			Contract: "0x8707276df042e89669d69a177d3da7dc78bd8723",
			Interval: time.Minute * 600,
		},
	},
}
