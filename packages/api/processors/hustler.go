package processors

import (
	"context"
	"encoding/hex"
	"fmt"
	"math/big"
	"strconv"

	"github.com/dopedao/dope-monorepo/packages/api/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/bodypart"
	"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
	"github.com/dopedao/dope-monorepo/packages/api/ent/wallet"
	"github.com/ethereum/go-ethereum/common"
)

const (
	MaleBody   uint8 = 0
	FemaleBody       = 1
	MaleHair         = 2
	FemaleHair       = 3
	Beard            = 4
)

type HustlerProcessor struct {
	bindings.UnimplementedHustlerProcessor
	ent *ent.Client
}

func (p *HustlerProcessor) SetEnt(client *ent.Client) {
	p.ent = client
}

func (p *HustlerProcessor) ProcessAddRles(ctx context.Context, e *bindings.HustlerAddRles, emit func(string, []interface{})) error {
	var builders []*ent.BodyPartCreate

	var part bodypart.Type
	var sex bodypart.Sex

	switch e.Part {
	case MaleBody:
		part = bodypart.TypeBody
		sex = bodypart.SexMale
	case FemaleBody:
		part = bodypart.TypeBody
		sex = bodypart.SexFemale
	case MaleHair:
		part = bodypart.TypeHair
		sex = bodypart.SexMale
	case FemaleHair:
		part = bodypart.TypeHair
		sex = bodypart.SexFemale
	case Beard:
		part = bodypart.TypeBeard
		sex = bodypart.SexMale
	}

	n, err := p.ent.BodyPart.Query().Where(bodypart.And(bodypart.TypeEQ(part), bodypart.SexEQ(sex))).Count(ctx)
	if err != nil {
		return fmt.Errorf("hustler: getting body count: %w", err)
	}

	for i := 0; i < int(e.Len.Int64()); i++ {
		id := int64(n + i)
		rle, err := p.Contract.BodyRle(nil, e.Part, big.NewInt(id))
		if err != nil {
			return fmt.Errorf("hustler: getting body rle: %w", err)
		}
		builders = append(builders, p.ent.BodyPart.Create().
			SetID(strconv.Itoa(int(id))).
			SetRle(hex.EncodeToString(rle)).
			SetType(part).
			SetSex(sex),
		)
	}

	if err := p.ent.BodyPart.CreateBulk(builders...).Exec(ctx); err != nil {
		return fmt.Errorf("hustler: creating bodyparts: %w", err)
	}

	return nil
}

func (p *HustlerProcessor) ProcessMetadataUpdate(ctx context.Context, e *bindings.HustlerMetadataUpdate, emit func(string, []interface{})) error {
	meta, err := p.Contract.Metadata(nil, e.Id)
	if err != nil {
		return fmt.Errorf("hustler: getting metadata: %w", err)
	}

	p.ent.Hustler.UpdateOneID(e.Id.String()).
		SetName(meta.Name).
		SetBackground(hex.EncodeToString(meta.Background[:])).
		SetColor(hex.EncodeToString(meta.Color[:])).
		SetAge(schema.BigInt{Int: meta.Age})

	return nil
}

func (p *HustlerProcessor) ProcessTransferBatch(ctx context.Context, e *bindings.HustlerTransferBatch, emit func(string, []interface{})) error {
	var ids []string
	for _, id := range e.Ids {
		ids = append(ids, id.String())
	}

	if e.From != (common.Address{}) {
		if err := p.ent.Wallet.UpdateOneID(e.From.String()).RemoveHustlerIDs(ids...).Exec(ctx); err != nil {
			return fmt.Errorf("hustler: update from wallet: %w", err)
		}
	} else {
		var builders []*ent.HustlerCreate
		for _, id := range ids {
			builders = append(builders, p.ent.Hustler.Create().SetID(id))
		}

		if err := p.ent.Hustler.CreateBulk(builders...).Exec(ctx); err != nil {
			return fmt.Errorf("hustler: create bulk hustlers: %w", err)
		}
	}

	if e.To != (common.Address{}) {
		if err := p.ent.Wallet.Create().
			SetID(e.To.String()).
			AddHustlerIDs(ids...).
			OnConflictColumns(wallet.FieldID).
			UpdateNewValues().
			Exec(ctx); err != nil {
			return fmt.Errorf("hustler: upsert to wallet: %w", err)
		}
	}

	return nil
}

func (p *HustlerProcessor) ProcessTransferSingle(ctx context.Context, e *bindings.HustlerTransferSingle, emit func(string, []interface{})) error {
	if e.From != (common.Address{}) {
		if err := p.ent.Wallet.UpdateOneID(e.From.String()).RemoveHustlerIDs(e.Id.String()).Exec(ctx); err != nil {
			return fmt.Errorf("hustler: update from wallet: %w", err)
		}
	} else {
		if err := p.ent.Hustler.Create().SetID(e.Id.String()).Exec(ctx); err != nil {
			return fmt.Errorf("hustler: create hustler: %w", err)
		}
	}

	if e.To != (common.Address{}) {
		if err := p.ent.Wallet.Create().
			SetID(e.To.String()).
			AddHustlerIDs(e.Id.String()).
			OnConflictColumns(wallet.FieldID).
			UpdateNewValues().
			Exec(ctx); err != nil {
			return fmt.Errorf("hustler: upsert to wallet: %w", err)
		}
	}

	return nil
}
