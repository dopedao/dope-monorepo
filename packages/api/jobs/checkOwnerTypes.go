package jobs

type CheckTokenOwners struct{}

type TokenOwnerDiff struct {
	ID            string
	WalletFromDb  string
	WalletFromApi string
}

type TokenOwner interface {
	GetID() string
	GetWallet() string
}

type DopeTokenOwner struct {
	ID     string `json:"id"`
	Wallet string `json:"wallet_dopes"`
}

func (d *DopeTokenOwner) GetWallet() string {
	return d.Wallet
}
func (d *DopeTokenOwner) GetID() string {
	return d.ID
}

type HustlerTokenOwner struct {
	ID     string `json:"id"`
	Wallet string `json:"wallet_hustlers"`
}

func (h *HustlerTokenOwner) GetWallet() string {
	return h.Wallet
}
func (h *HustlerTokenOwner) GetID() string {
	return h.ID
}

// From wallet_items
type GearTokenOwner struct {
	ID     string `json:"item_wallets"`
	Wallet string `json:"wallet_items"`
}

func (g *GearTokenOwner) GetWallet() string {
	return g.Wallet
}
func (g *GearTokenOwner) GetID() string {
	return g.ID
}
