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

type PaperProcessor interface {
	Setup(address common.Address, eth interface {
		ethereum.ChainReader
		ethereum.ChainStateReader
		ethereum.TransactionReader
		bind.ContractBackend
	}) error
	Initialize(ctx context.Context, start uint64, tx *ent.Tx) error

	ProcessApproval(ctx context.Context, e PaperApproval) (func(tx *ent.Tx) error, error)

	ProcessDelegateChanged(ctx context.Context, e PaperDelegateChanged) (func(tx *ent.Tx) error, error)

	ProcessDelegateVotesChanged(ctx context.Context, e PaperDelegateVotesChanged) (func(tx *ent.Tx) error, error)

	ProcessOwnershipTransferred(ctx context.Context, e PaperOwnershipTransferred) (func(tx *ent.Tx) error, error)

	ProcessSnapshot(ctx context.Context, e PaperSnapshot) (func(tx *ent.Tx) error, error)

	ProcessTransfer(ctx context.Context, e PaperTransfer) (func(tx *ent.Tx) error, error)

	mustEmbedBasePaperProcessor()
}

type BasePaperProcessor struct {
	Address  common.Address
	ABI      abi.ABI
	Contract *Paper
	Eth      interface {
		ethereum.ChainReader
		ethereum.ChainStateReader
		ethereum.TransactionReader
		bind.ContractBackend
	}
}

func (h *BasePaperProcessor) Setup(address common.Address, eth interface {
	ethereum.ChainReader
	ethereum.ChainStateReader
	ethereum.TransactionReader
	bind.ContractBackend
}) error {
	contract, err := NewPaper(address, eth)
	if err != nil {
		return fmt.Errorf("new Paper: %w", err)
	}

	abi, err := abi.JSON(strings.NewReader(string(PaperABI)))
	if err != nil {
		return fmt.Errorf("parsing Paper abi: %w", err)
	}

	h.Address = address
	h.ABI = abi
	h.Contract = contract
	h.Eth = eth
	return nil
}

func (h *BasePaperProcessor) ProcessElement(p interface{}) func(context.Context, types.Log) (func(*ent.Tx) error, error) {
	return func(ctx context.Context, vLog types.Log) (func(*ent.Tx) error, error) {
		switch vLog.Topics[0].Hex() {

		case h.ABI.Events["Approval"].ID.Hex():
			e := PaperApproval{}
			if err := h.UnpackLog(&e, "Approval", vLog); err != nil {
				return nil, fmt.Errorf("unpacking Approval: %w", err)
			}

			e.Raw = vLog
			cb, err := p.(PaperProcessor).ProcessApproval(ctx, e)
			if err != nil {
				return nil, fmt.Errorf("processing Approval: %w", err)
			}

			return cb, nil

		case h.ABI.Events["DelegateChanged"].ID.Hex():
			e := PaperDelegateChanged{}
			if err := h.UnpackLog(&e, "DelegateChanged", vLog); err != nil {
				return nil, fmt.Errorf("unpacking DelegateChanged: %w", err)
			}

			e.Raw = vLog
			cb, err := p.(PaperProcessor).ProcessDelegateChanged(ctx, e)
			if err != nil {
				return nil, fmt.Errorf("processing DelegateChanged: %w", err)
			}

			return cb, nil

		case h.ABI.Events["DelegateVotesChanged"].ID.Hex():
			e := PaperDelegateVotesChanged{}
			if err := h.UnpackLog(&e, "DelegateVotesChanged", vLog); err != nil {
				return nil, fmt.Errorf("unpacking DelegateVotesChanged: %w", err)
			}

			e.Raw = vLog
			cb, err := p.(PaperProcessor).ProcessDelegateVotesChanged(ctx, e)
			if err != nil {
				return nil, fmt.Errorf("processing DelegateVotesChanged: %w", err)
			}

			return cb, nil

		case h.ABI.Events["OwnershipTransferred"].ID.Hex():
			e := PaperOwnershipTransferred{}
			if err := h.UnpackLog(&e, "OwnershipTransferred", vLog); err != nil {
				return nil, fmt.Errorf("unpacking OwnershipTransferred: %w", err)
			}

			e.Raw = vLog
			cb, err := p.(PaperProcessor).ProcessOwnershipTransferred(ctx, e)
			if err != nil {
				return nil, fmt.Errorf("processing OwnershipTransferred: %w", err)
			}

			return cb, nil

		case h.ABI.Events["Snapshot"].ID.Hex():
			e := PaperSnapshot{}
			if err := h.UnpackLog(&e, "Snapshot", vLog); err != nil {
				return nil, fmt.Errorf("unpacking Snapshot: %w", err)
			}

			e.Raw = vLog
			cb, err := p.(PaperProcessor).ProcessSnapshot(ctx, e)
			if err != nil {
				return nil, fmt.Errorf("processing Snapshot: %w", err)
			}

			return cb, nil

		case h.ABI.Events["Transfer"].ID.Hex():
			e := PaperTransfer{}
			if err := h.UnpackLog(&e, "Transfer", vLog); err != nil {
				return nil, fmt.Errorf("unpacking Transfer: %w", err)
			}

			e.Raw = vLog
			cb, err := p.(PaperProcessor).ProcessTransfer(ctx, e)
			if err != nil {
				return nil, fmt.Errorf("processing Transfer: %w", err)
			}

			return cb, nil

		}
		return func(*ent.Tx) error { return nil }, nil
	}
}

func (h *BasePaperProcessor) UnpackLog(out interface{}, event string, log types.Log) error {
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

func (h *BasePaperProcessor) Initialize(ctx context.Context, start uint64, tx *ent.Tx) error {
	return nil
}

func (h *BasePaperProcessor) ProcessApproval(ctx context.Context, e PaperApproval) (func(tx *ent.Tx) error, error) {
	return func(tx *ent.Tx) error { return nil }, nil
}

func (h *BasePaperProcessor) ProcessDelegateChanged(ctx context.Context, e PaperDelegateChanged) (func(tx *ent.Tx) error, error) {
	return func(tx *ent.Tx) error { return nil }, nil
}

func (h *BasePaperProcessor) ProcessDelegateVotesChanged(ctx context.Context, e PaperDelegateVotesChanged) (func(tx *ent.Tx) error, error) {
	return func(tx *ent.Tx) error { return nil }, nil
}

func (h *BasePaperProcessor) ProcessOwnershipTransferred(ctx context.Context, e PaperOwnershipTransferred) (func(tx *ent.Tx) error, error) {
	return func(tx *ent.Tx) error { return nil }, nil
}

func (h *BasePaperProcessor) ProcessSnapshot(ctx context.Context, e PaperSnapshot) (func(tx *ent.Tx) error, error) {
	return func(tx *ent.Tx) error { return nil }, nil
}

func (h *BasePaperProcessor) ProcessTransfer(ctx context.Context, e PaperTransfer) (func(tx *ent.Tx) error, error) {
	return func(tx *ent.Tx) error { return nil }, nil
}

func (h *BasePaperProcessor) mustEmbedBasePaperProcessor() {}
