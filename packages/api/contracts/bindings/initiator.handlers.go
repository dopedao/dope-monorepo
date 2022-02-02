// Code generated by github.com/withtally/synceth, DO NOT EDIT.

package bindings

import (
	"context"
	"fmt"
	"strings"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"

	"github.com/dopedao/dope-monorepo/packages/api/ent"
)

type InitiatorProcessor interface {
	Setup(address common.Address, eth interface {
		ethereum.ChainReader
		ethereum.ChainStateReader
		ethereum.TransactionReader
		bind.ContractBackend
	}) error
	Initialize(ctx context.Context, start uint64, tx *ent.Tx) error

	ProcessOpened(ctx context.Context, e InitiatorOpened) (func(tx *ent.Tx) error, error)

	ProcessOwnershipTransferred(ctx context.Context, e InitiatorOwnershipTransferred) (func(tx *ent.Tx) error, error)

	mustEmbedBaseInitiatorProcessor()
}

type BaseInitiatorProcessor struct {
	Address  common.Address
	ABI      abi.ABI
	Contract *Initiator
	Eth      interface {
		ethereum.ChainReader
		ethereum.ChainStateReader
		ethereum.TransactionReader
		bind.ContractBackend
	}
}

func (h *BaseInitiatorProcessor) Setup(address common.Address, eth interface {
	ethereum.ChainReader
	ethereum.ChainStateReader
	ethereum.TransactionReader
	bind.ContractBackend
}) error {
	contract, err := NewInitiator(address, eth)
	if err != nil {
		return fmt.Errorf("new Initiator: %w", err)
	}

	abi, err := abi.JSON(strings.NewReader(string(InitiatorABI)))
	if err != nil {
		return fmt.Errorf("parsing Initiator abi: %w", err)
	}

	h.Address = address
	h.ABI = abi
	h.Contract = contract
	h.Eth = eth
	return nil
}

func (h *BaseInitiatorProcessor) ProcessElement(p interface{}) func(context.Context, types.Log) (func(*ent.Tx) error, error) {
	return func(ctx context.Context, vLog types.Log) (func(*ent.Tx) error, error) {
		switch vLog.Topics[0].Hex() {

		case h.ABI.Events["Opened"].ID.Hex():
			e := InitiatorOpened{}
			if err := h.UnpackLog(&e, "Opened", vLog); err != nil {
				return nil, fmt.Errorf("unpacking Opened: %w", err)
			}

			e.Raw = vLog
			cb, err := p.(InitiatorProcessor).ProcessOpened(ctx, e)
			if err != nil {
				return nil, fmt.Errorf("processing Opened: %w", err)
			}

			return cb, nil

		case h.ABI.Events["OwnershipTransferred"].ID.Hex():
			e := InitiatorOwnershipTransferred{}
			if err := h.UnpackLog(&e, "OwnershipTransferred", vLog); err != nil {
				return nil, fmt.Errorf("unpacking OwnershipTransferred: %w", err)
			}

			e.Raw = vLog
			cb, err := p.(InitiatorProcessor).ProcessOwnershipTransferred(ctx, e)
			if err != nil {
				return nil, fmt.Errorf("processing OwnershipTransferred: %w", err)
			}

			return cb, nil

		}
		return func(*ent.Tx) error { return nil }, nil
	}
}

func (h *BaseInitiatorProcessor) UnpackLog(out interface{}, event string, log types.Log) error {
	if len(log.Data) > 0 {
		if err := h.ABI.UnpackIntoInterface(out, event, log.Data); err != nil {
			return err
		}
	}
	var indexed abi.Arguments
	for _, arg := range h.ABI.Events[event].Inputs {
		if arg.Indexed {
			indexed = append(indexed, arg)
		}
	}
	return abi.ParseTopics(out, indexed, log.Topics[1:])
}

func (h *BaseInitiatorProcessor) Initialize(ctx context.Context, start uint64, tx *ent.Tx) error {
	return nil
}

func (h *BaseInitiatorProcessor) ProcessOpened(ctx context.Context, e InitiatorOpened) (func(tx *ent.Tx) error, error) {
	return func(tx *ent.Tx) error { return nil }, nil
}

func (h *BaseInitiatorProcessor) ProcessOwnershipTransferred(ctx context.Context, e InitiatorOwnershipTransferred) (func(tx *ent.Tx) error, error) {
	return func(tx *ent.Tx) error { return nil }, nil
}

func (h *BaseInitiatorProcessor) mustEmbedBaseInitiatorProcessor() {}
