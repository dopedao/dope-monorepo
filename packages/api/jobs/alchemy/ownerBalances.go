package alchemy

// Structs that represent token balances from Alchemy API endpoint
// https://docs.alchemy.com/reference/getownersforcollection

type OwnerAddressResponsePage struct {
	Owners []OwnerAddress `json:"ownerAddresses"`
}

type OwnerAddress struct {
	Address       string         `json:"ownerAddress"`
	TokenBalances []TokenBalance `json:"tokenBalances"`
}

type TokenBalance struct {
	TokenId string `json:"tokenId"`
	Balance uint8  `json:"balance"`
}
