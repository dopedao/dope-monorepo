package processor

import (
	"context"
	"math/big"
	"testing"

	"github.com/ethereum/go-ethereum/ethclient"
)

func TestEquipmentSlot(t *testing.T) {
	ctx := context.Background()

	eth, err := ethclient.Dial("https://opt-mainnet.g.alchemy.com/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG")
	if err != nil {
		t.Fatalf("Connecting eth rpc: %+v", err)
	}

	item, err := equipmentSlot(ctx, eth, "0", weaponSlot, big.NewInt(1063637))
	if err != nil {
		t.Fatalf("Getting equipment slot: %+v", err)
	}

	if item.String() != "36895177010164334592" {
		t.Fatalf("Wrong weapon")
	}
}
