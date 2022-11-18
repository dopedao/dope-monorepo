package alchemy

// Structs that represent a NFT response from the Alchemy API
// https://docs.alchemy.com/reference/getnftsforcollection
// Enables us to unmarshal the JSON and do things with the data

// What we get back from alchemy API
type NftResponsePage struct {
	Nfts        []Nft  `json:"nfts"`
	NextTokenId string `json:"nextToken"`
}

// Each individual NFT response
type Nft struct {
	OwnerAddress     string          // not included in JSON response
	Contract         NftContract     `json:"contract"`
	Id               NftId           `json:"id"`
	Title            string          `json:"title"`
	Description      string          `json:"description"`
	Metadata         NftMeta         `json:"metadata"`
	TimeLastUpdated  string          `json:"timeLastUpdated"`
	ContractMetaData NftContractMeta `json:"contractMetadata"`
	TokenURI         struct {
		Raw string `json:"raw"`
	} `json:"tokenURI"`
}

type NftContract struct {
	Address string `json:"address"`
}

type NftId struct {
	TokenId       string `json:"tokenId"`
	TokenMetadata struct {
		TokenType string `json:"tokenType"`
	} `json:"tokenMetadata"`
}

type NftMeta struct {
	Name        string         `json:"name"`
	Description string         `json:"description"`
	Image       string         `json:"image"`
	Attributes  []NftAttribute `json:"attributes"`
}

type NftAttribute struct {
	TraitType string      `json:"trait_type"`
	Value     interface{} `json:"value"`
}

type NftContractMeta struct {
	Name                    string `json:"name"`
	Symbol                  string `json:"symbol"`
	TokenType               string `json:"tokenType"`
	ContractDeployerAddress string `json:"contractDeployer"`
	DeployedBlockNumber     int    `json:"deployedBlockNumber"`
}
