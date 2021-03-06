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

	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
)

type DopeProcessor interface {
	Setup(address common.Address, eth interface {
		ethereum.ChainReader
		ethereum.ChainStateReader
		ethereum.TransactionReader
		bind.ContractBackend
	}) error
	Initialize(ctx context.Context, start uint64, tx *ent.Tx) error

	ProcessApproval(ctx context.Context, e DopeApproval) (func(tx *ent.Tx) error, error)

	ProcessApprovalForAll(ctx context.Context, e DopeApprovalForAll) (func(tx *ent.Tx) error, error)

	ProcessDelegateChanged(ctx context.Context, e DopeDelegateChanged) (func(tx *ent.Tx) error, error)

	ProcessDelegateVotesChanged(ctx context.Context, e DopeDelegateVotesChanged) (func(tx *ent.Tx) error, error)

	ProcessOwnershipTransferred(ctx context.Context, e DopeOwnershipTransferred) (func(tx *ent.Tx) error, error)

	ProcessTransfer(ctx context.Context, e DopeTransfer) (func(tx *ent.Tx) error, error)

	mustEmbedBaseDopeProcessor()
}

type BaseDopeProcessor struct {
	Address  common.Address
	ABI      abi.ABI
	Contract *Dope
	Eth      interface {
		ethereum.ChainReader
		ethereum.ChainStateReader
		ethereum.TransactionReader
		bind.ContractBackend
	}
}

func (h *BaseDopeProcessor) Setup(address common.Address, eth interface {
	ethereum.ChainReader
	ethereum.ChainStateReader
	ethereum.TransactionReader
	bind.ContractBackend
}) error {
	contract, err := NewDope(address, eth)
	if err != nil {
		return fmt.Errorf("new Dope: %w", err)
	}

	abi, err := abi.JSON(strings.NewReader(string(DopeABI)))
	if err != nil {
		return fmt.Errorf("parsing Dope abi: %w", err)
	}

	h.Address = address
	h.ABI = abi
	h.Contract = contract
	h.Eth = eth
	return nil
}

func (h *BaseDopeProcessor) ProcessElement(p interface{}) func(context.Context, types.Log) (func(*ent.Tx) error, error) {
	return func(ctx context.Context, vLog types.Log) (func(*ent.Tx) error, error) {
		switch vLog.Topics[0].Hex() {

		case h.ABI.Events["Approval"].ID.Hex():
			e := DopeApproval{}
			if err := h.UnpackLog(&e, "Approval", vLog); err != nil {
				return nil, fmt.Errorf("unpacking Approval: %w", err)
			}

			e.Raw = vLog
			cb, err := p.(DopeProcessor).ProcessApproval(ctx, e)
			if err != nil {
				return nil, fmt.Errorf("processing Approval: %w", err)
			}

			return cb, nil

		case h.ABI.Events["ApprovalForAll"].ID.Hex():
			e := DopeApprovalForAll{}
			if err := h.UnpackLog(&e, "ApprovalForAll", vLog); err != nil {
				return nil, fmt.Errorf("unpacking ApprovalForAll: %w", err)
			}

			e.Raw = vLog
			cb, err := p.(DopeProcessor).ProcessApprovalForAll(ctx, e)
			if err != nil {
				return nil, fmt.Errorf("processing ApprovalForAll: %w", err)
			}

			return cb, nil

		case h.ABI.Events["DelegateChanged"].ID.Hex():
			e := DopeDelegateChanged{}
			if err := h.UnpackLog(&e, "DelegateChanged", vLog); err != nil {
				return nil, fmt.Errorf("unpacking DelegateChanged: %w", err)
			}

			e.Raw = vLog
			cb, err := p.(DopeProcessor).ProcessDelegateChanged(ctx, e)
			if err != nil {
				return nil, fmt.Errorf("processing DelegateChanged: %w", err)
			}

			return cb, nil

		case h.ABI.Events["DelegateVotesChanged"].ID.Hex():
			e := DopeDelegateVotesChanged{}
			if err := h.UnpackLog(&e, "DelegateVotesChanged", vLog); err != nil {
				return nil, fmt.Errorf("unpacking DelegateVotesChanged: %w", err)
			}

			e.Raw = vLog
			cb, err := p.(DopeProcessor).ProcessDelegateVotesChanged(ctx, e)
			if err != nil {
				return nil, fmt.Errorf("processing DelegateVotesChanged: %w", err)
			}

			return cb, nil

		case h.ABI.Events["OwnershipTransferred"].ID.Hex():
			e := DopeOwnershipTransferred{}
			if err := h.UnpackLog(&e, "OwnershipTransferred", vLog); err != nil {
				return nil, fmt.Errorf("unpacking OwnershipTransferred: %w", err)
			}

			e.Raw = vLog
			cb, err := p.(DopeProcessor).ProcessOwnershipTransferred(ctx, e)
			if err != nil {
				return nil, fmt.Errorf("processing OwnershipTransferred: %w", err)
			}

			return cb, nil

		case h.ABI.Events["Transfer"].ID.Hex():
			e := DopeTransfer{}
			if err := h.UnpackLog(&e, "Transfer", vLog); err != nil {
				return nil, fmt.Errorf("unpacking Transfer: %w", err)
			}

			e.Raw = vLog
			cb, err := p.(DopeProcessor).ProcessTransfer(ctx, e)
			if err != nil {
				return nil, fmt.Errorf("processing Transfer: %w", err)
			}

			return cb, nil

		}
		return func(*ent.Tx) error { return nil }, nil
	}
}

func (h *BaseDopeProcessor) UnpackLog(out interface{}, event string, log types.Log) error {
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

func (h *BaseDopeProcessor) Initialize(ctx context.Context, start uint64, tx *ent.Tx) error {
	return nil
}

func (h *BaseDopeProcessor) ProcessApproval(ctx context.Context, e DopeApproval) (func(tx *ent.Tx) error, error) {
	return func(tx *ent.Tx) error { return nil }, nil
}

func (h *BaseDopeProcessor) ProcessApprovalForAll(ctx context.Context, e DopeApprovalForAll) (func(tx *ent.Tx) error, error) {
	return func(tx *ent.Tx) error { return nil }, nil
}

func (h *BaseDopeProcessor) ProcessDelegateChanged(ctx context.Context, e DopeDelegateChanged) (func(tx *ent.Tx) error, error) {
	return func(tx *ent.Tx) error { return nil }, nil
}

func (h *BaseDopeProcessor) ProcessDelegateVotesChanged(ctx context.Context, e DopeDelegateVotesChanged) (func(tx *ent.Tx) error, error) {
	return func(tx *ent.Tx) error { return nil }, nil
}

func (h *BaseDopeProcessor) ProcessOwnershipTransferred(ctx context.Context, e DopeOwnershipTransferred) (func(tx *ent.Tx) error, error) {
	return func(tx *ent.Tx) error { return nil }, nil
}

func (h *BaseDopeProcessor) ProcessTransfer(ctx context.Context, e DopeTransfer) (func(tx *ent.Tx) error, error) {
	return func(tx *ent.Tx) error { return nil }, nil
}

func (h *BaseDopeProcessor) mustEmbedBaseDopeProcessor() {}
