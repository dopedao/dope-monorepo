package opensea

import (
	"encoding/json"
	"math/big"
	"strconv"
	"strings"
	"time"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
)

// Assets is a list of assets
type Assets struct {
	Assets []Asset `json:"assets"`
}

// Asset is an asset
type Asset struct {
	ID                      int64                `json:"id"`
	TokenID                 string               `json:"token_id"`
	NumSales                int64                `json:"num_sales"`
	BackgroundColor         string               `json:"background_color"`
	ImageURL                string               `json:"image_url"`
	ImagePreviewURL         string               `json:"image_preview_url"`
	ImageThumbnailURL       string               `json:"image_thumbnail_url"`
	ImageOriginalURL        string               `json:"image_original_url"`
	AnimationURL            string               `json:"animation_url"`
	AnimationOriginalURL    string               `json:"animation_original_url"`
	Name                    string               `json:"name"`
	Description             string               `json:"description"`
	ExternalLink            string               `json:"external_link"`
	AssetContract           *AssetContract       `json:"asset_contract"`
	Owner                   *AccountWithUsername `json:"owner"`
	Permalink               string               `json:"permalink"`
	Collection              *Collection          `json:"collection"`
	Decimals                int64                `json:"decimals"`
	TokenMetadata           string               `json:"token_metadata"`
	SellOrders              []WyvernOrder        `json:"sell_orders"`
	SeaportOrders           []SeaportOrder       `json:"seaport_sell_orders"`
	Creator                 *AccountWithUsername `json:"creator"`
	Traits                  []Trait              `json:"traits"`
	LastSale                *Event               `json:"last_sale"`
	TopBid                  string               `json:"top_bid"`
	ListingDate             string               `json:"listing_date"`
	IsPresale               bool                 `json:"is_presale"`
	TransferFeePaymentToken *PaymentToken        `json:"transfer_fee_payment_token"`
	TransferFee             interface{}          `json:"transfer_fee"`
}

// AssetContract is the contract of an asset
type AssetContract struct {
	Address                     common.Address  `json:"address"`
	AssetContractType           string          `json:"asset_contract_type"`
	CreatedDate                 string          `json:"created_date"`
	Name                        string          `json:"name"`
	NftVersion                  string          `json:"nft_version"`
	OpenseaVersion              interface{}     `json:"opensea_version"`
	Owner                       int64           `json:"owner"`
	SchemaName                  string          `json:"schema_name"`
	Symbol                      string          `json:"symbol"`
	TotalSupply                 interface{}     `json:"total_supply"`
	Description                 string          `json:"description"`
	ExternalLink                string          `json:"external_link"`
	ImageURL                    string          `json:"image_url"`
	DefaultToFiat               bool            `json:"default_to_fiat"`
	DevBuyerFeeBasisPoints      StringInt       `json:"dev_buyer_fee_basis_points"`
	DevSellerFeeBasisPoints     StringInt       `json:"dev_seller_fee_basis_points"`
	OnlyProxiedTransfers        bool            `json:"only_proxied_transfers"`
	OpenseaBuyerFeeBasisPoints  StringInt       `json:"opensea_buyer_fee_basis_points"`
	OpenseaSellerFeeBasisPoints StringInt       `json:"opensea_seller_fee_basis_points"`
	BuyerFeeBasisPoints         StringInt       `json:"buyer_fee_basis_points"`
	SellerFeeBasisPoints        StringInt       `json:"seller_fee_basis_points"`
	PayoutAddress               *common.Address `json:"payout_address"`
}

// DisplayData is the style displaying a collection
type DisplayData struct {
	CardDisplayStyle string `json:"contain"`
}

// Collection is a collection
type Collection struct {
	BannerImageURL              string          `json:"banner_image_url"`
	ChatURL                     string          `json:"chat_url"`
	CreatedDate                 string          `json:"created_date"`
	DefaultToFiat               bool            `json:"default_to_fiat"`
	Description                 string          `json:"description"`
	DevBuyerFeeBasisPoints      StringInt       `json:"dev_buyer_fee_basis_points"`
	DevSellerFeeBasisPoints     StringInt       `json:"dev_seller_fee_basis_points"`
	DiscordURL                  string          `json:"discord_url"`
	DisplayData                 *DisplayData    `json:"display_data"`
	ExternalURL                 string          `json:"external_url"`
	Featured                    bool            `json:"featured"`
	FeaturedImageURL            string          `json:"featured_image_url"`
	Hidden                      bool            `json:"hidden"`
	SafelistRequestStatus       string          `json:"safelist_request_status"`
	ImageURL                    string          `json:"image_url"`
	IsSubjectToWhitelist        bool            `json:"is_subject_to_whitelist"`
	LargeImageURL               string          `json:"large_image_url"`
	MediumUsername              interface{}     `json:"medium_username"`
	Name                        string          `json:"name"`
	OnlyProxiedTransfers        bool            `json:"only_proxied_transfers"`
	OpenseaBuyerFeeBasisPoints  StringInt       `json:"opensea_buyer_fee_basis_points"`
	OpenseaSellerFeeBasisPoints StringInt       `json:"opensea_seller_fee_basis_points"`
	PayoutAddress               *common.Address `json:"payout_address"`
	RequireEmail                bool            `json:"require_email"`
	ShortDescription            string          `json:"short_description"`
	Slug                        string          `json:"slug"`
	TelegramURL                 string          `json:"telegram_url"`
	TwitterUsername             string          `json:"twitter_username"`
	InstagramUsername           string          `json:"instagram_username"`
	WikiURL                     string          `json:"wiki_url"`
}

// Event is an event
type Event struct {
	ID                  int64                `json:"id"`
	Transaction         *Transaction         `json:"transaction"`
	PaymentToken        *PaymentToken        `json:"payment_token"`
	Asset               *Asset               `json:"asset"`
	AssetBundle         *AssetBundle         `json:"asset_bundle"`
	WinnerAccount       *Account             `json:"winner_account"`
	FromAccount         *AccountWithUsername `json:"from_account"`
	ToAccount           *AccountWithUsername `json:"to_account"`
	OwnerAccount        *Account             `json:"owner_account"`
	ApprovedAccount     *Account             `json:"approved_account"`
	Seller              *Account             `json:"seller"`
	DevFeePaymentEvent  *DevFeePaymentEvent  `json:"dev_fee_payment_event"`
	CollectionSlug      string               `json:"collection_slug"`
	CreatedDate         TimeNano             `json:"created_date"`
	ModifiedDate        TimeNano             `json:"modified_date"`
	ContractAddress     common.Address       `json:"contract_address"`
	LogIndex            interface{}          `json:"log_index"`
	EventType           EventType            `json:"event_type"`
	AuctionType         string               `json:"auction_type"`
	StartingPrice       string               `json:"starting_price"`
	EndingPrice         string               `json:"ending_price"`
	Duration            interface{}          `json:"duration"`
	MinPrice            Number               `json:"min_price"`
	OfferedTo           Number               `json:"offered_to"`
	BidAmount           Number               `json:"bid_amount"`
	TotalPrice          Number               `json:"total_price"`
	CustomEventName     interface{}          `json:"custom_event_name"`
	Quantity            string               `json:"quantity"`
	PayoutAmount        interface{}          `json:"payout_amount"`
	EventTimestamp      TimeNano             `json:"event_timestamp"`
	Relayer             string               `json:"relayer"`
	Collection          int64                `json:"collection"`
	PayoutAccount       interface{}          `json:"payout_account"`
	PayoutAssetContract interface{}          `json:"payout_asset_contract"`
	PayoutCollection    interface{}          `json:"payout_collection"`
	BuyOrder            uint64               `json:"buy_order"`
	SellOrder           uint64               `json:"sell_order"`
}

// IsBundle retuns true if the asset is a bundle
func (e Event) IsBundle() bool {
	return e.AssetBundle != nil
}

// PaymentToken is the token used for a payment
type PaymentToken struct {
	Symbol   string         `json:"symbol"`
	Address  common.Address `json:"address"`
	ImageURL string         `json:"image_url"`
	Name     string         `json:"name"`
	Decimals int64          `json:"decimals"`
	EthPrice string         `json:"eth_price"`
	UsdPrice string         `json:"usd_price"`
}

// Transaction is a transaction
type Transaction struct {
	ID               int64               `json:"id"`
	FromAccount      AccountWithUsername `json:"from_account"`
	ToAccount        AccountWithUsername `json:"to_account"`
	CreatedDate      TimeNano            `json:"created_date"`
	ModifiedDate     TimeNano            `json:"modified_date"`
	TransactionHash  string              `json:"transaction_hash"`
	TransactionIndex string              `json:"transaction_index"`
	BlockNumber      string              `json:"block_number"`
	BlockHash        string              `json:"block_hash"`
	Timestamp        string              `json:"timestamp"`
}

// AssetBundle is the bundle of an asset
type AssetBundle struct {
	Maker         *Account       `json:"maker"`
	Slug          string         `json:"slug"`
	Assets        []*Asset       `json:"assets"`
	Name          string         `json:"name"`
	Description   string         `json:"description"`
	ExternalLink  string         `json:"external_link"`
	AssetContract *AssetContract `json:"asset_contract"`
	Permalink     string         `json:"permalink"`
	SellOrders    interface{}    `json:"sell_orders"`
}

// DevFeePaymentEvent is fee transfer event from OpenSea to Dev, It appears to be running in bulk on a regular basis.
type DevFeePaymentEvent struct {
	EventType      string       `json:"event_type"`
	EventTimestamp string       `json:"event_timestamp"`
	AuctionType    interface{}  `json:"auction_type"`
	TotalPrice     interface{}  `json:"total_price"`
	Transaction    Transaction  `json:"transaction"`
	PaymentToken   PaymentToken `json:"payment_token"`
}

// EventType is the type of event
type EventType string

const (
	// EventTypeNone is an undefined type of event
	EventTypeNone EventType = ""

	// EventTypeCreated is a creation event
	EventTypeCreated EventType = "created"

	// EventTypeSuccessful is a successful event
	EventTypeSuccessful EventType = "successful"

	// EventTypeCancelled is a canceled event
	EventTypeCancelled EventType = "cancelled"

	// EventTypeBidEntered is a bid event
	EventTypeBidEntered EventType = "bid_entered"

	// EventTypeBidWithdrawn is bid withdrawal event
	EventTypeBidWithdrawn EventType = "bid_withdrawn"

	// EventTypeTransfer is a transfer event
	EventTypeTransfer EventType = "transfer"

	// EventTypeApprove is an approval event
	EventTypeApprove EventType = "approve"

	// EventTypeCompositionCreated is a composition event
	EventTypeCompositionCreated EventType = "composition_created"
)

// AuctionType is the type of an auction
type AuctionType string

const (
	// AuctionTypeNone is an undefined type of auction
	AuctionTypeNone AuctionType = ""

	// AuctionTypeEnglish is an english auction
	AuctionTypeEnglish AuctionType = "english"

	// AuctionTypeDutch is a dutch auction
	AuctionTypeDutch AuctionType = "dutch"

	// AuctionTypeMinPrice is a min price auction
	AuctionTypeMinPrice AuctionType = "min-price"
)

// Number is a big int
type Number string

// Big converts a string number to a big int
func (n Number) Big() *big.Int {
	s := strings.Split(string(n), ".")
	r, _ := new(big.Int).SetString(s[0], 10)
	return r
}

// TimeNano is the time in nanoseconds
type TimeNano time.Time

// Time returns the time
func (t TimeNano) Time() time.Time {
	return time.Time(t)
}

// MarshalJSON marshals the time
func (t TimeNano) MarshalJSON() ([]byte, error) {
	s := t.Time().Format("2006-01-02T15:04:05.999999")
	s = strconv.Quote(s)
	return []byte(s), nil
}

func (t *TimeNano) UnmarshalJSON(b []byte) error {
	s, err := strconv.Unquote(string(b))
	if err != nil {
		return err
	}
	// Dates were returning with additional +00:00
	// Which was blowing up our parsing of them
	withoutIsoPlus := strings.Split(s, "+")
	tt, err := time.Parse("2006-01-02T15:04:05.999999", withoutIsoPlus[0])
	if err != nil {
		return err
	}
	*t = TimeNano(tt)
	return nil
}

// Account is an account
type Account struct {
	User          int64          `json:"user"`
	ProfileImgURL string         `json:"profile_img_url"`
	Address       common.Address `json:"address"`
	Config        string         `json:"config"`
	DiscordID     string         `json:"discord_id"`
}

// AccountWithUsername is an account with a username
type AccountWithUsername struct {
	User          User           `json:"user"`
	ProfileImgURL string         `json:"profile_img_url"`
	Address       common.Address `json:"address"`
	Config        string         `json:"config"`
	DiscordID     string         `json:"discord_id"`
}

// User is a user
type User struct {
	Username string `json:"username"`
}

// Trait is a trait
type Trait struct {
	TraitType   string          `json:"trait_type"`
	Value       json.RawMessage `json:"value"`
	DisplayType interface{}     `json:"display_type"`
	MaxValue    interface{}     `json:"max_value"`
	TraitCount  int64           `json:"trait_count"`
	Order       interface{}     `json:"order"`
}

// Value is the value of a trait
type Value struct {
	Integer *int64
	String  *string
}

// OpenSea Seaport Order new order model
// https://docs.opensea.io/v2.0/reference/model-reference#order-model
type SeaportOrder struct {
	ID             int64     `json:"id"`
	CreatedDate    *TimeNano `json:"created_date"`
	ClosingDate    *TimeNano `json:"closing_date"`
	CurrentPrice   Number    `json:"current_price"`
	ListingTime    int64     `json:"listing_time"`
	ExpirationTime int64     `json:"expiration_time"`
	OrderHash      string    `json:"order_hash"`
	Maker          Account   `json:"maker"`
	Taker          Account   `json:"taker"`
	Side           string    `json:"side"` // 0 for buy orders and 1 for sell orders.
	OrderType      string    `json:"order_type"`
	Cancelled      bool      `json:"cancelled"`
	Finalized      bool      `json:"finalized"`
	MarkedInvalid  bool      `json:"marked_invalid"`
}

// OpenSea Wyvern Order
type WyvernOrder struct {
	ID    int64 `json:"id"`
	Asset Asset `json:"asset"`
	// AssetBundle          interface{}          `json:"asset_bundle"`
	CreatedDate *TimeNano `json:"created_date"`
	ClosingDate *TimeNano `json:"closing_date"`
	// ClosingExtendable bool      `json:"closing_extendable"`
	ExpirationTime int64  `json:"expiration_time"`
	ListingTime    int64  `json:"listing_time"`
	OrderHash      string `json:"order_hash"`
	// Metadata Metadata `json:"metadata"`
	Exchange     common.Address `json:"exchange"`
	Maker        Account        `json:"maker"`
	Taker        Account        `json:"taker"`
	CurrentPrice Number         `json:"current_price"`
	// CurrentBounty        string               `json:"current_bounty"`
	// BountyMultiple       string               `json:"bounty_multiple"`
	MakerRelayerFee    Number         `json:"maker_relayer_fee"`
	TakerRelayerFee    Number         `json:"taker_relayer_fee"`
	MakerProtocolFee   Number         `json:"maker_protocol_fee"`
	TakerProtocolFee   Number         `json:"taker_protocol_fee"`
	MakerReferrerFee   Number         `json:"maker_referrer_fee"`
	FeeRecipient       Account        `json:"fee_recipient"`
	FeeMethod          FeeMethod      `json:"fee_method"`
	Side               Side           `json:"side"` // 0 for buy orders and 1 for sell orders.
	SaleKind           SaleKind       `json:"sale_kind"`
	Target             common.Address `json:"target"`
	HowToCall          HowToCall      `json:"how_to_call"`
	Calldata           hexutil.Bytes  `json:"calldata"`
	ReplacementPattern hexutil.Bytes  `json:"replacement_pattern"`
	StaticTarget       common.Address `json:"static_target"`
	StaticExtradata    hexutil.Bytes  `json:"static_extradata"`
	PaymentToken       common.Address `json:"payment_token"`
	// PaymentTokenContract PaymentTokenContract `json:"payment_token_contract"`
	BasePrice       Number         `json:"base_price"`
	Extra           Number         `json:"extra"`
	Quantity        string         `json:"quantity"`
	Salt            Number         `json:"salt"`
	V               *uint8         `json:"v"`
	R               *hexutil.Bytes `json:"r"`
	S               *hexutil.Bytes `json:"s"`
	ApprovedOnChain bool           `json:"approved_on_chain"`
	Cancelled       bool           `json:"cancelled"`
	Finalized       bool           `json:"finalized"`
	MarkedInvalid   bool           `json:"marked_invalid"`
	// PrefixedHash         string               `json:"prefixed_hash"`
}

// IsPrivate returns true if the order is private
func (o WyvernOrder) IsPrivate() bool {
	return o.Taker.Address != (common.Address{})
}

// Side is the direction of an order
type Side uint8

const (
	// Buy is a buy order
	Buy Side = iota

	// Sell is a sell order
	Sell
)

// SaleKind is the kind of sale
type SaleKind uint8

const (
	// FixedOrMinBid fixed or min bid sale
	FixedOrMinBid SaleKind = iota // 0 for fixed-price sales or min-bid auctions

	// DutchAuctions is a dutch auction
	DutchAuctions // 1 for declining-price Dutch Auctions
)

// HowToCall is the type of call
type HowToCall uint8

const (
	// Call is a regular call
	Call HowToCall = iota

	// DelegateCall is a delegate call
	DelegateCall
)

// FeeMethod is the fee method
type FeeMethod uint8

const (
	// ProtocolFee is the protocol fee method
	ProtocolFee FeeMethod = iota

	// SplitFee is the split fee method
	SplitFee
)
