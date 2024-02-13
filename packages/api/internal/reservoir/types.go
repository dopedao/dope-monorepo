package reservoir

import "time"

type ReservoirConfig struct {
	name            string
	baseUrl         string
	contractAddress string
}

type TokenPriceMap map[string]float64

type PriceResponse struct {
	TokenPrices TokenPriceMap `json:"tokens"`
}

type TokenResponse struct {
	Tokens       []Token `json:"tokens"`
	Continuation string  `json:"continuation"`
}

type OrdersResponse struct {
	Orders       []Order `json:"orders"`
	Continuation *string `json:"continuation"`
}

type Token struct {
	Details   TokenDetails `json:"token"`
	Market    Market       `json:"market"`
	UpdatedAt string       `json:"updatedAt"`
}

type TokenDetails struct {
	ChainId          int           `json:"chainId"`
	Contract         string        `json:"contract"`
	TokenId          string        `json:"tokenId"`
	Name             string        `json:"name"`
	Description      string        `json:"description"`
	Image            string        `json:"image"`
	ImageSmall       string        `json:"imageSmall"`
	ImageLarge       string        `json:"imageLarge"`
	Media            interface{}   `json:"media"`
	Kind             string        `json:"kind"`
	IsFlagged        bool          `json:"isFlagged"`
	IsSpam           bool          `json:"isSpam"`
	IsNsfw           bool          `json:"isNsfw"`
	MetadataDisabled bool          `json:"metadataDisabled"`
	LastFlagUpdate   string        `json:"lastFlagUpdate"`
	LastFlagChange   interface{}   `json:"lastFlagChange"`
	Supply           string        `json:"supply"`
	RemainingSupply  string        `json:"remainingSupply"`
	Decimals         interface{}   `json:"decimals"`
	Rarity           interface{}   `json:"rarity"`
	RarityRank       interface{}   `json:"rarityRank"`
	Collection       Collection    `json:"collection"`
	Owner            string        `json:"owner"`
	MintStages       []interface{} `json:"mintStages"`
}

type Order struct {
	ID                 string         `json:"id"`
	Kind               string         `json:"kind"`
	Side               string         `json:"side"`
	Status             string         `json:"status"`
	TokenSetId         string         `json:"tokenSetId"`
	TokenSetSchemaHash string         `json:"tokenSetSchemaHash"`
	Contract           string         `json:"contract"`
	ContractKind       string         `json:"contractKind"`
	Maker              string         `json:"maker"`
	Taker              string         `json:"taker"`
	Price              Price          `json:"price"`
	ValidFrom          int64          `json:"validFrom"`
	ValidUntil         int64          `json:"validUntil"`
	QuantityFilled     int            `json:"quantityFilled"`
	QuantityRemaining  int            `json:"quantityRemaining"`
	DynamicPricing     interface{}    `json:"dynamicPricing"`
	Criteria           Criteria       `json:"criteria"`
	Source             Source         `json:"source"`
	FeeBps             int            `json:"feeBps"`
	FeeBreakdown       []FeeBreakdown `json:"feeBreakdown"`
	Expiration         int64          `json:"expiration"`
	IsReservoir        *bool          `json:"isReservoir"`
	IsDynamic          bool           `json:"isDynamic"`
	CreatedAt          time.Time      `json:"createdAt"`    // Consider changing to time.Time if the format is compatible
	UpdatedAt          time.Time      `json:"updatedAt"`    // Consider changing to time.Time if the format is compatible
	OriginatedAt       time.Time      `json:"originatedAt"` // Consider changing to time.Time if the format is compatible
}

type Criteria struct {
	Kind string `json:"kind"`
	Data struct {
		Token struct {
			TokenId string `json:"tokenId"`
		} `json:"token"`
	} `json:"data"`
}

type FeeBreakdown struct {
	Bps       int    `json:"bps"`
	Kind      string `json:"kind"`
	Recipient string `json:"recipient"`
}

type Collection struct {
	Id               string        `json:"id"`
	Name             string        `json:"name"`
	Image            string        `json:"image"`
	Slug             string        `json:"slug"`
	Symbol           string        `json:"symbol"`
	Creator          string        `json:"creator"`
	TokenCount       int           `json:"tokenCount"`
	MetadataDisabled bool          `json:"metadataDisabled"`
	FloorAskPrice    FloorAskPrice `json:"floorAskPrice"`
}

type FloorAskPrice struct {
	Currency Currency `json:"currency"`
	Amount   Amount   `json:"amount"`
}

type Currency struct {
	Contract string `json:"contract"`
	Name     string `json:"name"`
	Symbol   string `json:"symbol"`
	Decimals int    `json:"decimals"`
}

type Amount struct {
	Raw     string  `json:"raw"`
	Decimal float64 `json:"decimal"`
	Usd     float64 `json:"usd"`
	Native  float64 `json:"native"`
}

type Market struct {
	FloorAsk FloorAsk `json:"floorAsk"`
}

type FloorAsk struct {
	Id         string `json:"id"`
	Price      Price  `json:"price"`
	Maker      string `json:"maker"`
	ValidFrom  int    `json:"validFrom"`
	ValidUntil int    `json:"validUntil"`
	Source     Source `json:"source"`
}

type Price struct {
	Currency Currency `json:"currency"`
	Amount   Amount   `json:"amount"`
}

type Source struct {
	Id     string `json:"id"`
	Domain string `json:"domain"`
	Name   string `json:"name"`
	Icon   string `json:"icon"`
	Url    string `json:"url"`
}
