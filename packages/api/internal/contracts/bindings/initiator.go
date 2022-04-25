// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package bindings

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
)

// IHustlerActionsSetMetadata is an auto generated low-level Go binding around an user-defined struct.
type IHustlerActionsSetMetadata struct {
	Color      [4]byte
	Background [4]byte
	Options    [2]byte
	Viewbox    [4]uint8
	Body       [4]uint8
	Order      [10]uint8
	Mask       [2]byte
	Name       string
}

// InitiatorMetaData contains all meta data concerning the Initiator contract.
var InitiatorMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"internalType\":\"contractIERC721\",\"name\":\"dope_\",\"type\":\"address\"},{\"internalType\":\"contractIERC20\",\"name\":\"paper_\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"controller_\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"Opened\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"cost\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"isOpened\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"components\":[{\"internalType\":\"bytes4\",\"name\":\"color\",\"type\":\"bytes4\"},{\"internalType\":\"bytes4\",\"name\":\"background\",\"type\":\"bytes4\"},{\"internalType\":\"bytes2\",\"name\":\"options\",\"type\":\"bytes2\"},{\"internalType\":\"uint8[4]\",\"name\":\"viewbox\",\"type\":\"uint8[4]\"},{\"internalType\":\"uint8[4]\",\"name\":\"body\",\"type\":\"uint8[4]\"},{\"internalType\":\"uint8[10]\",\"name\":\"order\",\"type\":\"uint8[10]\"},{\"internalType\":\"bytes2\",\"name\":\"mask\",\"type\":\"bytes2\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"}],\"internalType\":\"structIHustlerActions.SetMetadata\",\"name\":\"meta\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint32\",\"name\":\"gasLimit\",\"type\":\"uint32\"}],\"name\":\"mintFromDopeTo\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"components\":[{\"internalType\":\"bytes4\",\"name\":\"color\",\"type\":\"bytes4\"},{\"internalType\":\"bytes4\",\"name\":\"background\",\"type\":\"bytes4\"},{\"internalType\":\"bytes2\",\"name\":\"options\",\"type\":\"bytes2\"},{\"internalType\":\"uint8[4]\",\"name\":\"viewbox\",\"type\":\"uint8[4]\"},{\"internalType\":\"uint8[4]\",\"name\":\"body\",\"type\":\"uint8[4]\"},{\"internalType\":\"uint8[10]\",\"name\":\"order\",\"type\":\"uint8[10]\"},{\"internalType\":\"bytes2\",\"name\":\"mask\",\"type\":\"bytes2\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"}],\"internalType\":\"structIHustlerActions.SetMetadata\",\"name\":\"meta\",\"type\":\"tuple\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"},{\"internalType\":\"uint32\",\"name\":\"gasLimit\",\"type\":\"uint32\"}],\"name\":\"mintOGFromDopeTo\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint32\",\"name\":\"gasLimit\",\"type\":\"uint32\"}],\"name\":\"open\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"release\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_release\",\"type\":\"uint256\"}],\"name\":\"setRelease\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"withdraw\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
}

// InitiatorABI is the input ABI used to generate the binding from.
// Deprecated: Use InitiatorMetaData.ABI instead.
var InitiatorABI = InitiatorMetaData.ABI

// Initiator is an auto generated Go binding around an Ethereum contract.
type Initiator struct {
	InitiatorCaller     // Read-only binding to the contract
	InitiatorTransactor // Write-only binding to the contract
	InitiatorFilterer   // Log filterer for contract events
}

// InitiatorCaller is an auto generated read-only Go binding around an Ethereum contract.
type InitiatorCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// InitiatorTransactor is an auto generated write-only Go binding around an Ethereum contract.
type InitiatorTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// InitiatorFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type InitiatorFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// InitiatorSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type InitiatorSession struct {
	Contract     *Initiator        // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// InitiatorCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type InitiatorCallerSession struct {
	Contract *InitiatorCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts    // Call options to use throughout this session
}

// InitiatorTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type InitiatorTransactorSession struct {
	Contract     *InitiatorTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts    // Transaction auth options to use throughout this session
}

// InitiatorRaw is an auto generated low-level Go binding around an Ethereum contract.
type InitiatorRaw struct {
	Contract *Initiator // Generic contract binding to access the raw methods on
}

// InitiatorCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type InitiatorCallerRaw struct {
	Contract *InitiatorCaller // Generic read-only contract binding to access the raw methods on
}

// InitiatorTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type InitiatorTransactorRaw struct {
	Contract *InitiatorTransactor // Generic write-only contract binding to access the raw methods on
}

// NewInitiator creates a new instance of Initiator, bound to a specific deployed contract.
func NewInitiator(address common.Address, backend bind.ContractBackend) (*Initiator, error) {
	contract, err := bindInitiator(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Initiator{InitiatorCaller: InitiatorCaller{contract: contract}, InitiatorTransactor: InitiatorTransactor{contract: contract}, InitiatorFilterer: InitiatorFilterer{contract: contract}}, nil
}

// NewInitiatorCaller creates a new read-only instance of Initiator, bound to a specific deployed contract.
func NewInitiatorCaller(address common.Address, caller bind.ContractCaller) (*InitiatorCaller, error) {
	contract, err := bindInitiator(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &InitiatorCaller{contract: contract}, nil
}

// NewInitiatorTransactor creates a new write-only instance of Initiator, bound to a specific deployed contract.
func NewInitiatorTransactor(address common.Address, transactor bind.ContractTransactor) (*InitiatorTransactor, error) {
	contract, err := bindInitiator(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &InitiatorTransactor{contract: contract}, nil
}

// NewInitiatorFilterer creates a new log filterer instance of Initiator, bound to a specific deployed contract.
func NewInitiatorFilterer(address common.Address, filterer bind.ContractFilterer) (*InitiatorFilterer, error) {
	contract, err := bindInitiator(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &InitiatorFilterer{contract: contract}, nil
}

// bindInitiator binds a generic wrapper to an already deployed contract.
func bindInitiator(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(InitiatorABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Initiator *InitiatorRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Initiator.Contract.InitiatorCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Initiator *InitiatorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Initiator.Contract.InitiatorTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Initiator *InitiatorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Initiator.Contract.InitiatorTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Initiator *InitiatorCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Initiator.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Initiator *InitiatorTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Initiator.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Initiator *InitiatorTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Initiator.Contract.contract.Transact(opts, method, params...)
}

// Cost is a free data retrieval call binding the contract method 0x13faede6.
//
// Solidity: function cost() view returns(uint256)
func (_Initiator *InitiatorCaller) Cost(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Initiator.contract.Call(opts, &out, "cost")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// Cost is a free data retrieval call binding the contract method 0x13faede6.
//
// Solidity: function cost() view returns(uint256)
func (_Initiator *InitiatorSession) Cost() (*big.Int, error) {
	return _Initiator.Contract.Cost(&_Initiator.CallOpts)
}

// Cost is a free data retrieval call binding the contract method 0x13faede6.
//
// Solidity: function cost() view returns(uint256)
func (_Initiator *InitiatorCallerSession) Cost() (*big.Int, error) {
	return _Initiator.Contract.Cost(&_Initiator.CallOpts)
}

// IsOpened is a free data retrieval call binding the contract method 0x5faf46bb.
//
// Solidity: function isOpened(uint256 id) view returns(bool)
func (_Initiator *InitiatorCaller) IsOpened(opts *bind.CallOpts, id *big.Int) (bool, error) {
	var out []interface{}
	err := _Initiator.contract.Call(opts, &out, "isOpened", id)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// IsOpened is a free data retrieval call binding the contract method 0x5faf46bb.
//
// Solidity: function isOpened(uint256 id) view returns(bool)
func (_Initiator *InitiatorSession) IsOpened(id *big.Int) (bool, error) {
	return _Initiator.Contract.IsOpened(&_Initiator.CallOpts, id)
}

// IsOpened is a free data retrieval call binding the contract method 0x5faf46bb.
//
// Solidity: function isOpened(uint256 id) view returns(bool)
func (_Initiator *InitiatorCallerSession) IsOpened(id *big.Int) (bool, error) {
	return _Initiator.Contract.IsOpened(&_Initiator.CallOpts, id)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Initiator *InitiatorCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Initiator.contract.Call(opts, &out, "owner")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Initiator *InitiatorSession) Owner() (common.Address, error) {
	return _Initiator.Contract.Owner(&_Initiator.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Initiator *InitiatorCallerSession) Owner() (common.Address, error) {
	return _Initiator.Contract.Owner(&_Initiator.CallOpts)
}

// Release is a free data retrieval call binding the contract method 0x86d1a69f.
//
// Solidity: function release() view returns(uint256)
func (_Initiator *InitiatorCaller) Release(opts *bind.CallOpts) (*big.Int, error) {
	var out []interface{}
	err := _Initiator.contract.Call(opts, &out, "release")

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// Release is a free data retrieval call binding the contract method 0x86d1a69f.
//
// Solidity: function release() view returns(uint256)
func (_Initiator *InitiatorSession) Release() (*big.Int, error) {
	return _Initiator.Contract.Release(&_Initiator.CallOpts)
}

// Release is a free data retrieval call binding the contract method 0x86d1a69f.
//
// Solidity: function release() view returns(uint256)
func (_Initiator *InitiatorCallerSession) Release() (*big.Int, error) {
	return _Initiator.Contract.Release(&_Initiator.CallOpts)
}

// MintFromDopeTo is a paid mutator transaction binding the contract method 0x436046de.
//
// Solidity: function mintFromDopeTo(uint256 id, address to, (bytes4,bytes4,bytes2,uint8[4],uint8[4],uint8[10],bytes2,string) meta, bytes data, uint32 gasLimit) returns()
func (_Initiator *InitiatorTransactor) MintFromDopeTo(opts *bind.TransactOpts, id *big.Int, to common.Address, meta IHustlerActionsSetMetadata, data []byte, gasLimit uint32) (*types.Transaction, error) {
	return _Initiator.contract.Transact(opts, "mintFromDopeTo", id, to, meta, data, gasLimit)
}

// MintFromDopeTo is a paid mutator transaction binding the contract method 0x436046de.
//
// Solidity: function mintFromDopeTo(uint256 id, address to, (bytes4,bytes4,bytes2,uint8[4],uint8[4],uint8[10],bytes2,string) meta, bytes data, uint32 gasLimit) returns()
func (_Initiator *InitiatorSession) MintFromDopeTo(id *big.Int, to common.Address, meta IHustlerActionsSetMetadata, data []byte, gasLimit uint32) (*types.Transaction, error) {
	return _Initiator.Contract.MintFromDopeTo(&_Initiator.TransactOpts, id, to, meta, data, gasLimit)
}

// MintFromDopeTo is a paid mutator transaction binding the contract method 0x436046de.
//
// Solidity: function mintFromDopeTo(uint256 id, address to, (bytes4,bytes4,bytes2,uint8[4],uint8[4],uint8[10],bytes2,string) meta, bytes data, uint32 gasLimit) returns()
func (_Initiator *InitiatorTransactorSession) MintFromDopeTo(id *big.Int, to common.Address, meta IHustlerActionsSetMetadata, data []byte, gasLimit uint32) (*types.Transaction, error) {
	return _Initiator.Contract.MintFromDopeTo(&_Initiator.TransactOpts, id, to, meta, data, gasLimit)
}

// MintOGFromDopeTo is a paid mutator transaction binding the contract method 0xe63dda3f.
//
// Solidity: function mintOGFromDopeTo(uint256 id, address to, (bytes4,bytes4,bytes2,uint8[4],uint8[4],uint8[10],bytes2,string) meta, bytes data, uint32 gasLimit) payable returns()
func (_Initiator *InitiatorTransactor) MintOGFromDopeTo(opts *bind.TransactOpts, id *big.Int, to common.Address, meta IHustlerActionsSetMetadata, data []byte, gasLimit uint32) (*types.Transaction, error) {
	return _Initiator.contract.Transact(opts, "mintOGFromDopeTo", id, to, meta, data, gasLimit)
}

// MintOGFromDopeTo is a paid mutator transaction binding the contract method 0xe63dda3f.
//
// Solidity: function mintOGFromDopeTo(uint256 id, address to, (bytes4,bytes4,bytes2,uint8[4],uint8[4],uint8[10],bytes2,string) meta, bytes data, uint32 gasLimit) payable returns()
func (_Initiator *InitiatorSession) MintOGFromDopeTo(id *big.Int, to common.Address, meta IHustlerActionsSetMetadata, data []byte, gasLimit uint32) (*types.Transaction, error) {
	return _Initiator.Contract.MintOGFromDopeTo(&_Initiator.TransactOpts, id, to, meta, data, gasLimit)
}

// MintOGFromDopeTo is a paid mutator transaction binding the contract method 0xe63dda3f.
//
// Solidity: function mintOGFromDopeTo(uint256 id, address to, (bytes4,bytes4,bytes2,uint8[4],uint8[4],uint8[10],bytes2,string) meta, bytes data, uint32 gasLimit) payable returns()
func (_Initiator *InitiatorTransactorSession) MintOGFromDopeTo(id *big.Int, to common.Address, meta IHustlerActionsSetMetadata, data []byte, gasLimit uint32) (*types.Transaction, error) {
	return _Initiator.Contract.MintOGFromDopeTo(&_Initiator.TransactOpts, id, to, meta, data, gasLimit)
}

// Open is a paid mutator transaction binding the contract method 0x9ea9c0ce.
//
// Solidity: function open(uint256 id, address to, uint32 gasLimit) returns()
func (_Initiator *InitiatorTransactor) Open(opts *bind.TransactOpts, id *big.Int, to common.Address, gasLimit uint32) (*types.Transaction, error) {
	return _Initiator.contract.Transact(opts, "open", id, to, gasLimit)
}

// Open is a paid mutator transaction binding the contract method 0x9ea9c0ce.
//
// Solidity: function open(uint256 id, address to, uint32 gasLimit) returns()
func (_Initiator *InitiatorSession) Open(id *big.Int, to common.Address, gasLimit uint32) (*types.Transaction, error) {
	return _Initiator.Contract.Open(&_Initiator.TransactOpts, id, to, gasLimit)
}

// Open is a paid mutator transaction binding the contract method 0x9ea9c0ce.
//
// Solidity: function open(uint256 id, address to, uint32 gasLimit) returns()
func (_Initiator *InitiatorTransactorSession) Open(id *big.Int, to common.Address, gasLimit uint32) (*types.Transaction, error) {
	return _Initiator.Contract.Open(&_Initiator.TransactOpts, id, to, gasLimit)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_Initiator *InitiatorTransactor) RenounceOwnership(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Initiator.contract.Transact(opts, "renounceOwnership")
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_Initiator *InitiatorSession) RenounceOwnership() (*types.Transaction, error) {
	return _Initiator.Contract.RenounceOwnership(&_Initiator.TransactOpts)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_Initiator *InitiatorTransactorSession) RenounceOwnership() (*types.Transaction, error) {
	return _Initiator.Contract.RenounceOwnership(&_Initiator.TransactOpts)
}

// SetRelease is a paid mutator transaction binding the contract method 0xcfa4f3e8.
//
// Solidity: function setRelease(uint256 _release) returns()
func (_Initiator *InitiatorTransactor) SetRelease(opts *bind.TransactOpts, _release *big.Int) (*types.Transaction, error) {
	return _Initiator.contract.Transact(opts, "setRelease", _release)
}

// SetRelease is a paid mutator transaction binding the contract method 0xcfa4f3e8.
//
// Solidity: function setRelease(uint256 _release) returns()
func (_Initiator *InitiatorSession) SetRelease(_release *big.Int) (*types.Transaction, error) {
	return _Initiator.Contract.SetRelease(&_Initiator.TransactOpts, _release)
}

// SetRelease is a paid mutator transaction binding the contract method 0xcfa4f3e8.
//
// Solidity: function setRelease(uint256 _release) returns()
func (_Initiator *InitiatorTransactorSession) SetRelease(_release *big.Int) (*types.Transaction, error) {
	return _Initiator.Contract.SetRelease(&_Initiator.TransactOpts, _release)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_Initiator *InitiatorTransactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _Initiator.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_Initiator *InitiatorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Initiator.Contract.TransferOwnership(&_Initiator.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_Initiator *InitiatorTransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Initiator.Contract.TransferOwnership(&_Initiator.TransactOpts, newOwner)
}

// Withdraw is a paid mutator transaction binding the contract method 0x3ccfd60b.
//
// Solidity: function withdraw() returns()
func (_Initiator *InitiatorTransactor) Withdraw(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Initiator.contract.Transact(opts, "withdraw")
}

// Withdraw is a paid mutator transaction binding the contract method 0x3ccfd60b.
//
// Solidity: function withdraw() returns()
func (_Initiator *InitiatorSession) Withdraw() (*types.Transaction, error) {
	return _Initiator.Contract.Withdraw(&_Initiator.TransactOpts)
}

// Withdraw is a paid mutator transaction binding the contract method 0x3ccfd60b.
//
// Solidity: function withdraw() returns()
func (_Initiator *InitiatorTransactorSession) Withdraw() (*types.Transaction, error) {
	return _Initiator.Contract.Withdraw(&_Initiator.TransactOpts)
}

// InitiatorOpenedIterator is returned from FilterOpened and is used to iterate over the raw logs and unpacked data for Opened events raised by the Initiator contract.
type InitiatorOpenedIterator struct {
	Event *InitiatorOpened // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *InitiatorOpenedIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(InitiatorOpened)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(InitiatorOpened)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *InitiatorOpenedIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *InitiatorOpenedIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// InitiatorOpened represents a Opened event raised by the Initiator contract.
type InitiatorOpened struct {
	Id  *big.Int
	Raw types.Log // Blockchain specific contextual infos
}

// FilterOpened is a free log retrieval operation binding the contract event 0x076ee234681125279e2cfc540cc3442961385c988bd343b4081105999f39f5ea.
//
// Solidity: event Opened(uint256 id)
func (_Initiator *InitiatorFilterer) FilterOpened(opts *bind.FilterOpts) (*InitiatorOpenedIterator, error) {

	logs, sub, err := _Initiator.contract.FilterLogs(opts, "Opened")
	if err != nil {
		return nil, err
	}
	return &InitiatorOpenedIterator{contract: _Initiator.contract, event: "Opened", logs: logs, sub: sub}, nil
}

// WatchOpened is a free log subscription operation binding the contract event 0x076ee234681125279e2cfc540cc3442961385c988bd343b4081105999f39f5ea.
//
// Solidity: event Opened(uint256 id)
func (_Initiator *InitiatorFilterer) WatchOpened(opts *bind.WatchOpts, sink chan<- *InitiatorOpened) (event.Subscription, error) {

	logs, sub, err := _Initiator.contract.WatchLogs(opts, "Opened")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(InitiatorOpened)
				if err := _Initiator.contract.UnpackLog(event, "Opened", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseOpened is a log parse operation binding the contract event 0x076ee234681125279e2cfc540cc3442961385c988bd343b4081105999f39f5ea.
//
// Solidity: event Opened(uint256 id)
func (_Initiator *InitiatorFilterer) ParseOpened(log types.Log) (*InitiatorOpened, error) {
	event := new(InitiatorOpened)
	if err := _Initiator.contract.UnpackLog(event, "Opened", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// InitiatorOwnershipTransferredIterator is returned from FilterOwnershipTransferred and is used to iterate over the raw logs and unpacked data for OwnershipTransferred events raised by the Initiator contract.
type InitiatorOwnershipTransferredIterator struct {
	Event *InitiatorOwnershipTransferred // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *InitiatorOwnershipTransferredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(InitiatorOwnershipTransferred)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(InitiatorOwnershipTransferred)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *InitiatorOwnershipTransferredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *InitiatorOwnershipTransferredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// InitiatorOwnershipTransferred represents a OwnershipTransferred event raised by the Initiator contract.
type InitiatorOwnershipTransferred struct {
	PreviousOwner common.Address
	NewOwner      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterOwnershipTransferred is a free log retrieval operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_Initiator *InitiatorFilterer) FilterOwnershipTransferred(opts *bind.FilterOpts, previousOwner []common.Address, newOwner []common.Address) (*InitiatorOwnershipTransferredIterator, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Initiator.contract.FilterLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return &InitiatorOwnershipTransferredIterator{contract: _Initiator.contract, event: "OwnershipTransferred", logs: logs, sub: sub}, nil
}

// WatchOwnershipTransferred is a free log subscription operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_Initiator *InitiatorFilterer) WatchOwnershipTransferred(opts *bind.WatchOpts, sink chan<- *InitiatorOwnershipTransferred, previousOwner []common.Address, newOwner []common.Address) (event.Subscription, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Initiator.contract.WatchLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(InitiatorOwnershipTransferred)
				if err := _Initiator.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseOwnershipTransferred is a log parse operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_Initiator *InitiatorFilterer) ParseOwnershipTransferred(log types.Log) (*InitiatorOwnershipTransferred, error) {
	event := new(InitiatorOwnershipTransferred)
	if err := _Initiator.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
