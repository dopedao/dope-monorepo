package processors

import (
	"context"
	"encoding/hex"
	"fmt"
	"math/big"

	"github.com/dopedao/dope-monorepo/packages/api/contracts/bindings"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/bodypart"
	"github.com/dopedao/dope-monorepo/packages/api/ent/hustler"
	"github.com/dopedao/dope-monorepo/packages/api/ent/wallet"
	"github.com/ethereum/go-ethereum/common"
)

const (
	MaleBody   uint8 = 0
	FemaleBody uint8 = 1
	MaleHair   uint8 = 2
	FemaleHair uint8 = 3
	Beard      uint8 = 4
)

type HustlerProcessor struct {
	bindings.UnimplementedHustlerProcessor
}

func (p *HustlerProcessor) ProcessAddRles(ctx context.Context, e *bindings.HustlerAddRles, tx *ent.Tx) error {
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

	n, err := tx.BodyPart.Query().Where(bodypart.And(bodypart.TypeEQ(part), bodypart.SexEQ(sex))).Count(ctx)
	if err != nil {
		return fmt.Errorf("hustler: getting body count: %w", err)
	}

	for i := 0; i < int(e.Len.Int64()); i++ {
		id := int64(n + i - 1)
		rle, err := p.Contract.BodyRle(nil, e.Part, big.NewInt(id))
		if err != nil {
			return fmt.Errorf("hustler: getting body rle part %d, id: %d: %w", e.Part, id, err)
		}
		builders = append(builders, tx.BodyPart.Create().
			SetID(fmt.Sprintf("%s-%s-%d", sex, part, id)).
			SetRle(hex.EncodeToString(rle)).
			SetType(part).
			SetSex(sex),
		)
	}

	if err := tx.BodyPart.CreateBulk(builders...).Exec(ctx); err != nil {
		return fmt.Errorf("hustler: creating bodyparts: %w", err)
	}

	return nil
}

func (p *HustlerProcessor) ProcessMetadataUpdate(ctx context.Context, e *bindings.HustlerMetadataUpdate, tx *ent.Tx) error {
	meta, err := p.Contract.Metadata(nil, e.Id)
	if err != nil {
		return fmt.Errorf("hustler: getting metadata: %w", err)
	}

	tx.Hustler.UpdateOneID(e.Id.String()).
		SetName(meta.Name).
		SetBackground(hex.EncodeToString(meta.Background[:])).
		SetColor(hex.EncodeToString(meta.Color[:]))

	return nil
}

func (p *HustlerProcessor) ProcessTransferBatch(ctx context.Context, e *bindings.HustlerTransferBatch, tx *ent.Tx) error {
	var ids []string
	for _, id := range e.Ids {
		ids = append(ids, id.String())
	}

	if e.From != (common.Address{}) {
		if err := tx.Wallet.UpdateOneID(e.From.String()).RemoveHustlerIDs(ids...).Exec(ctx); err != nil {
			return fmt.Errorf("hustler: update from wallet: %w", err)
		}

		// TODO: reset age for non-og
	} else {
		var builders []*ent.HustlerCreate
		for i, id := range ids {
			typ := hustler.TypeRegular
			if e.Ids[i].Cmp(big.NewInt(500)) == -1 {
				typ = hustler.TypeOriginalGangsta
			}

			builders = append(builders, tx.Hustler.Create().SetID(id).SetType(typ).SetAge(e.Raw.BlockNumber))
		}

		if err := tx.Hustler.CreateBulk(builders...).Exec(ctx); err != nil {
			return fmt.Errorf("hustler: create bulk hustlers: %w", err)
		}
	}

	if e.To != (common.Address{}) {
		if err := tx.Wallet.Create().
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

func (p *HustlerProcessor) ProcessTransferSingle(ctx context.Context, e *bindings.HustlerTransferSingle, tx *ent.Tx) error {
	if e.From != (common.Address{}) {
		if err := tx.Wallet.UpdateOneID(e.From.String()).RemoveHustlerIDs(e.Id.String()).Exec(ctx); err != nil {
			return fmt.Errorf("hustler: update from wallet: %w", err)
		}
	} else {
		typ := hustler.TypeRegular
		if e.Id.Cmp(big.NewInt(500)) == -1 {
			typ = hustler.TypeOriginalGangsta
		}

		if err := tx.Hustler.Create().SetID(e.Id.String()).SetType(typ).SetAge(e.Raw.BlockNumber).Exec(ctx); err != nil {
			return fmt.Errorf("hustler: create hustler: %w", err)
		}
	}

	if e.To != (common.Address{}) {
		if err := tx.Wallet.Create().
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
