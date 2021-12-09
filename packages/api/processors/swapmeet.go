package processors

import (
	"context"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/dopedao/dope-monorepo/packages/api/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
	"github.com/dopedao/dope-monorepo/packages/api/ent/wallet"
	"github.com/dopedao/dope-monorepo/packages/api/ent/walletitems"
	"github.com/ethereum/go-ethereum/common"
)

type SwapMeetProcessor struct {
	bindings.UnimplementedSwapMeetProcessor
	ent *ent.Client
}

func (p *SwapMeetProcessor) SetEnt(client *ent.Client) {
	p.ent = client
}

type Metadata struct {
	Image string `json:"image"`
}

func (p *SwapMeetProcessor) ProcessSetRle(ctx context.Context, e *bindings.SwapMeetSetRle, emit func(string, []interface{})) error {
	male, err := p.Contract.TokenRle(nil, e.Id, 0)
	if err != nil {
		return fmt.Errorf("getting male item rle: %w", err)
	}

	female, err := p.Contract.TokenRle(nil, e.Id, 1)
	if err != nil {
		return fmt.Errorf("getting female item rle: %w", err)
	}

	metadata, err := p.Contract.TokenURI(nil, e.Id)
	if err != nil {
		return fmt.Errorf("getting metadata item rle: %w", err)
	}

	decoded, err := base64.StdEncoding.DecodeString(strings.TrimPrefix(metadata, "data:application/json;base64,"))
	if err != nil {
		return fmt.Errorf("decoding metadata: %w", err)
	}

	var parsed Metadata
	if err := json.Unmarshal(decoded, &parsed); err != nil {
		return fmt.Errorf("unmarshalling metadata: %w", err)
	}

	if err := p.ent.Item.UpdateOneID(e.Id.String()).SetRles(schema.RLEs{
		Male:   hex.EncodeToString(male),
		Female: hex.EncodeToString(female),
	}).SetSvg(parsed.Image).Exec(ctx); err != nil {
		return fmt.Errorf("updating item rles: %w", err)
	}

	return nil
}

func (p *SwapMeetProcessor) ProcessTransferBatch(ctx context.Context, e *bindings.SwapMeetTransferBatch, emit func(string, []interface{})) error {
	if e.From != (common.Address{}) {

		var ids []string
		for _, id := range e.Ids {
			ids = append(ids, fmt.Sprintf("%s-%s", e.From.String(), id.String()))
		}

		p.ent.WalletItems.Update().Where(walletitems.IDIn(ids...).AddBalance())
	}

	if e.To != (common.Address{}) {
		if err := p.ent.Wallet.Create().
			SetID(e.To.String()).
			AddItemIDs(ids...).
			OnConflictColumns(wallet.FieldID).
			UpdateNewValues().
			Exec(ctx); err != nil {
			return fmt.Errorf("swapmeet: upsert to wallet: %w", err)
		}
	}

	return nil
}

func (p *SwapMeetProcessor) ProcessTransferSingle(ctx context.Context, e *bindings.SwapMeetTransferSingle, emit func(string, []interface{})) error {
	if e.From != (common.Address{}) {
		if err := p.ent.Wallet.UpdateOneID(e.From.String()).RemoveItemIDs(e.Id.String()).Exec(ctx); err != nil {
			return fmt.Errorf("update from wallet: %w", err)
		}
	}

	if e.To != (common.Address{}) {
		if err := p.ent.Wallet.Create().
			SetID(e.To.String()).
			AddItemIDs(e.Id.String()).
			OnConflictColumns(wallet.FieldID).
			UpdateNewValues().
			Exec(ctx); err != nil {
			return fmt.Errorf("upsert to wallet: %w", err)
		}
	}

	return nil
}
