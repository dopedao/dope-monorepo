package alchemy

// Payload structures for API endpoint
// https://docs.alchemy.com/reference/getnftmetadatabatch

type TokenPayloadRequest struct {
	Tokens []TokenPayload `json:"tokens"`
}

type TokenPayload struct {
	ContractAddress string `json:"contractAddress"`
	TokenId         string `json:"tokenId"`
}
