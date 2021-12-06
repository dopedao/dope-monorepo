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

// HustlerMetaData contains all meta data concerning the Hustler contract.
var HustlerMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_components\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_swapmeet\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint8\",\"name\":\"part\",\"type\":\"uint8\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"len\",\"type\":\"uint256\"}],\"name\":\"AddRles\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"ApprovalForAll\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"MetadataUpdate\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256[]\",\"name\":\"ids\",\"type\":\"uint256[]\"},{\"indexed\":false,\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"TransferBatch\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"TransferSingle\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"string\",\"name\":\"value\",\"type\":\"string\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"URI\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"uint8\",\"name\":\"part\",\"type\":\"uint8\"},{\"internalType\":\"bytes[]\",\"name\":\"_rles\",\"type\":\"bytes[]\"}],\"name\":\"addRles\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"hustlerId\",\"type\":\"uint256\"}],\"name\":\"attributes\",\"outputs\":[{\"internalType\":\"bytes[]\",\"name\":\"\",\"type\":\"bytes[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address[]\",\"name\":\"accounts\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"ids\",\"type\":\"uint256[]\"}],\"name\":\"balanceOfBatch\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint8\",\"name\":\"part\",\"type\":\"uint8\"},{\"internalType\":\"uint256\",\"name\":\"idx\",\"type\":\"uint256\"}],\"name\":\"bodyRle\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"hustlerId\",\"type\":\"uint256\"}],\"name\":\"carParts\",\"outputs\":[{\"internalType\":\"bytes[]\",\"name\":\"\",\"type\":\"bytes[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"contractURI\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"enforcer\",\"outputs\":[{\"internalType\":\"contractIEnforcer\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"hustlerId\",\"type\":\"uint256\"}],\"name\":\"hustlerParts\",\"outputs\":[{\"internalType\":\"bytes[]\",\"name\":\"\",\"type\":\"bytes[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"}],\"name\":\"isApprovedForAll\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"metadata\",\"outputs\":[{\"internalType\":\"bytes4\",\"name\":\"color\",\"type\":\"bytes4\"},{\"internalType\":\"bytes4\",\"name\":\"background\",\"type\":\"bytes4\"},{\"internalType\":\"bytes2\",\"name\":\"mask\",\"type\":\"bytes2\"},{\"internalType\":\"bytes2\",\"name\":\"options\",\"type\":\"bytes2\"},{\"internalType\":\"uint256\",\"name\":\"age\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"bytes4\",\"name\":\"color\",\"type\":\"bytes4\"},{\"internalType\":\"bytes4\",\"name\":\"background\",\"type\":\"bytes4\"},{\"internalType\":\"bytes2\",\"name\":\"options\",\"type\":\"bytes2\"},{\"internalType\":\"uint8[4]\",\"name\":\"viewbox\",\"type\":\"uint8[4]\"},{\"internalType\":\"uint8[4]\",\"name\":\"body\",\"type\":\"uint8[4]\"},{\"internalType\":\"bytes2\",\"name\":\"mask\",\"type\":\"bytes2\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"mintOGTo\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"mintTo\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"bytes4\",\"name\":\"color\",\"type\":\"bytes4\"},{\"internalType\":\"bytes4\",\"name\":\"background\",\"type\":\"bytes4\"},{\"internalType\":\"bytes2\",\"name\":\"options\",\"type\":\"bytes2\"},{\"internalType\":\"uint8[4]\",\"name\":\"viewbox\",\"type\":\"uint8[4]\"},{\"internalType\":\"uint8[4]\",\"name\":\"body\",\"type\":\"uint8[4]\"},{\"internalType\":\"bytes2\",\"name\":\"mask\",\"type\":\"bytes2\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"mintTo\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"uint256[]\",\"name\":\"ids\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"onERC1155BatchReceived\",\"outputs\":[{\"internalType\":\"bytes4\",\"name\":\"\",\"type\":\"bytes4\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"onERC1155Received\",\"outputs\":[{\"internalType\":\"bytes4\",\"name\":\"\",\"type\":\"bytes4\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"title\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"subtitle\",\"type\":\"string\"},{\"internalType\":\"uint8\",\"name\":\"resolution\",\"type\":\"uint8\"},{\"internalType\":\"bytes4\",\"name\":\"background\",\"type\":\"bytes4\"},{\"internalType\":\"bytes4\",\"name\":\"color\",\"type\":\"bytes4\"},{\"internalType\":\"uint8[4]\",\"name\":\"viewbox\",\"type\":\"uint8[4]\"},{\"internalType\":\"bytes[]\",\"name\":\"parts\",\"type\":\"bytes[]\"}],\"name\":\"render\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256[]\",\"name\":\"ids\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"safeBatchTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"setApprovalForAll\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"enforcer_\",\"type\":\"address\"}],\"name\":\"setEnforcer\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"hustlerId\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"bytes4\",\"name\":\"color\",\"type\":\"bytes4\"},{\"internalType\":\"bytes4\",\"name\":\"background\",\"type\":\"bytes4\"},{\"internalType\":\"bytes2\",\"name\":\"options\",\"type\":\"bytes2\"},{\"internalType\":\"uint8[4]\",\"name\":\"viewbox\",\"type\":\"uint8[4]\"},{\"internalType\":\"uint8[4]\",\"name\":\"body\",\"type\":\"uint8[4]\"},{\"internalType\":\"bytes2\",\"name\":\"mask\",\"type\":\"bytes2\"}],\"name\":\"setMetadata\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"hustlerId\",\"type\":\"uint256\"}],\"name\":\"tokenURI\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"hustlerId\",\"type\":\"uint256\"},{\"internalType\":\"uint8[]\",\"name\":\"slots\",\"type\":\"uint8[]\"}],\"name\":\"unequip\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"uri\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]",
}

// HustlerABI is the input ABI used to generate the binding from.
// Deprecated: Use HustlerMetaData.ABI instead.
var HustlerABI = HustlerMetaData.ABI

// Hustler is an auto generated Go binding around an Ethereum contract.
type Hustler struct {
	HustlerCaller     // Read-only binding to the contract
	HustlerTransactor // Write-only binding to the contract
	HustlerFilterer   // Log filterer for contract events
}

// HustlerCaller is an auto generated read-only Go binding around an Ethereum contract.
type HustlerCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// HustlerTransactor is an auto generated write-only Go binding around an Ethereum contract.
type HustlerTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// HustlerFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type HustlerFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// HustlerSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type HustlerSession struct {
	Contract     *Hustler          // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// HustlerCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type HustlerCallerSession struct {
	Contract *HustlerCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts  // Call options to use throughout this session
}

// HustlerTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type HustlerTransactorSession struct {
	Contract     *HustlerTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts  // Transaction auth options to use throughout this session
}

// HustlerRaw is an auto generated low-level Go binding around an Ethereum contract.
type HustlerRaw struct {
	Contract *Hustler // Generic contract binding to access the raw methods on
}

// HustlerCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type HustlerCallerRaw struct {
	Contract *HustlerCaller // Generic read-only contract binding to access the raw methods on
}

// HustlerTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type HustlerTransactorRaw struct {
	Contract *HustlerTransactor // Generic write-only contract binding to access the raw methods on
}

// NewHustler creates a new instance of Hustler, bound to a specific deployed contract.
func NewHustler(address common.Address, backend bind.ContractBackend) (*Hustler, error) {
	contract, err := bindHustler(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Hustler{HustlerCaller: HustlerCaller{contract: contract}, HustlerTransactor: HustlerTransactor{contract: contract}, HustlerFilterer: HustlerFilterer{contract: contract}}, nil
}

// NewHustlerCaller creates a new read-only instance of Hustler, bound to a specific deployed contract.
func NewHustlerCaller(address common.Address, caller bind.ContractCaller) (*HustlerCaller, error) {
	contract, err := bindHustler(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &HustlerCaller{contract: contract}, nil
}

// NewHustlerTransactor creates a new write-only instance of Hustler, bound to a specific deployed contract.
func NewHustlerTransactor(address common.Address, transactor bind.ContractTransactor) (*HustlerTransactor, error) {
	contract, err := bindHustler(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &HustlerTransactor{contract: contract}, nil
}

// NewHustlerFilterer creates a new log filterer instance of Hustler, bound to a specific deployed contract.
func NewHustlerFilterer(address common.Address, filterer bind.ContractFilterer) (*HustlerFilterer, error) {
	contract, err := bindHustler(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &HustlerFilterer{contract: contract}, nil
}

// bindHustler binds a generic wrapper to an already deployed contract.
func bindHustler(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(HustlerABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Hustler *HustlerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Hustler.Contract.HustlerCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Hustler *HustlerRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Hustler.Contract.HustlerTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Hustler *HustlerRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Hustler.Contract.HustlerTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Hustler *HustlerCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Hustler.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Hustler *HustlerTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Hustler.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Hustler *HustlerTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Hustler.Contract.contract.Transact(opts, method, params...)
}

// Attributes is a free data retrieval call binding the contract method 0xd05dcc6a.
//
// Solidity: function attributes(uint256 hustlerId) view returns(bytes[])
func (_Hustler *HustlerCaller) Attributes(opts *bind.CallOpts, hustlerId *big.Int) ([][]byte, error) {
	var out []interface{}
	err := _Hustler.contract.Call(opts, &out, "attributes", hustlerId)

	if err != nil {
		return *new([][]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([][]byte)).(*[][]byte)

	return out0, err

}

// Attributes is a free data retrieval call binding the contract method 0xd05dcc6a.
//
// Solidity: function attributes(uint256 hustlerId) view returns(bytes[])
func (_Hustler *HustlerSession) Attributes(hustlerId *big.Int) ([][]byte, error) {
	return _Hustler.Contract.Attributes(&_Hustler.CallOpts, hustlerId)
}

// Attributes is a free data retrieval call binding the contract method 0xd05dcc6a.
//
// Solidity: function attributes(uint256 hustlerId) view returns(bytes[])
func (_Hustler *HustlerCallerSession) Attributes(hustlerId *big.Int) ([][]byte, error) {
	return _Hustler.Contract.Attributes(&_Hustler.CallOpts, hustlerId)
}

// BalanceOf is a free data retrieval call binding the contract method 0x00fdd58e.
//
// Solidity: function balanceOf(address account, uint256 id) view returns(uint256)
func (_Hustler *HustlerCaller) BalanceOf(opts *bind.CallOpts, account common.Address, id *big.Int) (*big.Int, error) {
	var out []interface{}
	err := _Hustler.contract.Call(opts, &out, "balanceOf", account, id)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// BalanceOf is a free data retrieval call binding the contract method 0x00fdd58e.
//
// Solidity: function balanceOf(address account, uint256 id) view returns(uint256)
func (_Hustler *HustlerSession) BalanceOf(account common.Address, id *big.Int) (*big.Int, error) {
	return _Hustler.Contract.BalanceOf(&_Hustler.CallOpts, account, id)
}

// BalanceOf is a free data retrieval call binding the contract method 0x00fdd58e.
//
// Solidity: function balanceOf(address account, uint256 id) view returns(uint256)
func (_Hustler *HustlerCallerSession) BalanceOf(account common.Address, id *big.Int) (*big.Int, error) {
	return _Hustler.Contract.BalanceOf(&_Hustler.CallOpts, account, id)
}

// BalanceOfBatch is a free data retrieval call binding the contract method 0x4e1273f4.
//
// Solidity: function balanceOfBatch(address[] accounts, uint256[] ids) view returns(uint256[])
func (_Hustler *HustlerCaller) BalanceOfBatch(opts *bind.CallOpts, accounts []common.Address, ids []*big.Int) ([]*big.Int, error) {
	var out []interface{}
	err := _Hustler.contract.Call(opts, &out, "balanceOfBatch", accounts, ids)

	if err != nil {
		return *new([]*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new([]*big.Int)).(*[]*big.Int)

	return out0, err

}

// BalanceOfBatch is a free data retrieval call binding the contract method 0x4e1273f4.
//
// Solidity: function balanceOfBatch(address[] accounts, uint256[] ids) view returns(uint256[])
func (_Hustler *HustlerSession) BalanceOfBatch(accounts []common.Address, ids []*big.Int) ([]*big.Int, error) {
	return _Hustler.Contract.BalanceOfBatch(&_Hustler.CallOpts, accounts, ids)
}

// BalanceOfBatch is a free data retrieval call binding the contract method 0x4e1273f4.
//
// Solidity: function balanceOfBatch(address[] accounts, uint256[] ids) view returns(uint256[])
func (_Hustler *HustlerCallerSession) BalanceOfBatch(accounts []common.Address, ids []*big.Int) ([]*big.Int, error) {
	return _Hustler.Contract.BalanceOfBatch(&_Hustler.CallOpts, accounts, ids)
}

// BodyRle is a free data retrieval call binding the contract method 0x5e89dcf9.
//
// Solidity: function bodyRle(uint8 part, uint256 idx) view returns(bytes)
func (_Hustler *HustlerCaller) BodyRle(opts *bind.CallOpts, part uint8, idx *big.Int) ([]byte, error) {
	var out []interface{}
	err := _Hustler.contract.Call(opts, &out, "bodyRle", part, idx)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// BodyRle is a free data retrieval call binding the contract method 0x5e89dcf9.
//
// Solidity: function bodyRle(uint8 part, uint256 idx) view returns(bytes)
func (_Hustler *HustlerSession) BodyRle(part uint8, idx *big.Int) ([]byte, error) {
	return _Hustler.Contract.BodyRle(&_Hustler.CallOpts, part, idx)
}

// BodyRle is a free data retrieval call binding the contract method 0x5e89dcf9.
//
// Solidity: function bodyRle(uint8 part, uint256 idx) view returns(bytes)
func (_Hustler *HustlerCallerSession) BodyRle(part uint8, idx *big.Int) ([]byte, error) {
	return _Hustler.Contract.BodyRle(&_Hustler.CallOpts, part, idx)
}

// CarParts is a free data retrieval call binding the contract method 0x9eabf8c9.
//
// Solidity: function carParts(uint256 hustlerId) view returns(bytes[])
func (_Hustler *HustlerCaller) CarParts(opts *bind.CallOpts, hustlerId *big.Int) ([][]byte, error) {
	var out []interface{}
	err := _Hustler.contract.Call(opts, &out, "carParts", hustlerId)

	if err != nil {
		return *new([][]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([][]byte)).(*[][]byte)

	return out0, err

}

// CarParts is a free data retrieval call binding the contract method 0x9eabf8c9.
//
// Solidity: function carParts(uint256 hustlerId) view returns(bytes[])
func (_Hustler *HustlerSession) CarParts(hustlerId *big.Int) ([][]byte, error) {
	return _Hustler.Contract.CarParts(&_Hustler.CallOpts, hustlerId)
}

// CarParts is a free data retrieval call binding the contract method 0x9eabf8c9.
//
// Solidity: function carParts(uint256 hustlerId) view returns(bytes[])
func (_Hustler *HustlerCallerSession) CarParts(hustlerId *big.Int) ([][]byte, error) {
	return _Hustler.Contract.CarParts(&_Hustler.CallOpts, hustlerId)
}

// ContractURI is a free data retrieval call binding the contract method 0xe8a3d485.
//
// Solidity: function contractURI() pure returns(string)
func (_Hustler *HustlerCaller) ContractURI(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _Hustler.contract.Call(opts, &out, "contractURI")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// ContractURI is a free data retrieval call binding the contract method 0xe8a3d485.
//
// Solidity: function contractURI() pure returns(string)
func (_Hustler *HustlerSession) ContractURI() (string, error) {
	return _Hustler.Contract.ContractURI(&_Hustler.CallOpts)
}

// ContractURI is a free data retrieval call binding the contract method 0xe8a3d485.
//
// Solidity: function contractURI() pure returns(string)
func (_Hustler *HustlerCallerSession) ContractURI() (string, error) {
	return _Hustler.Contract.ContractURI(&_Hustler.CallOpts)
}

// Enforcer is a free data retrieval call binding the contract method 0x0d14a0e2.
//
// Solidity: function enforcer() view returns(address)
func (_Hustler *HustlerCaller) Enforcer(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Hustler.contract.Call(opts, &out, "enforcer")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Enforcer is a free data retrieval call binding the contract method 0x0d14a0e2.
//
// Solidity: function enforcer() view returns(address)
func (_Hustler *HustlerSession) Enforcer() (common.Address, error) {
	return _Hustler.Contract.Enforcer(&_Hustler.CallOpts)
}

// Enforcer is a free data retrieval call binding the contract method 0x0d14a0e2.
//
// Solidity: function enforcer() view returns(address)
func (_Hustler *HustlerCallerSession) Enforcer() (common.Address, error) {
	return _Hustler.Contract.Enforcer(&_Hustler.CallOpts)
}

// HustlerParts is a free data retrieval call binding the contract method 0xde0b4e51.
//
// Solidity: function hustlerParts(uint256 hustlerId) view returns(bytes[])
func (_Hustler *HustlerCaller) HustlerParts(opts *bind.CallOpts, hustlerId *big.Int) ([][]byte, error) {
	var out []interface{}
	err := _Hustler.contract.Call(opts, &out, "hustlerParts", hustlerId)

	if err != nil {
		return *new([][]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([][]byte)).(*[][]byte)

	return out0, err

}

// HustlerParts is a free data retrieval call binding the contract method 0xde0b4e51.
//
// Solidity: function hustlerParts(uint256 hustlerId) view returns(bytes[])
func (_Hustler *HustlerSession) HustlerParts(hustlerId *big.Int) ([][]byte, error) {
	return _Hustler.Contract.HustlerParts(&_Hustler.CallOpts, hustlerId)
}

// HustlerParts is a free data retrieval call binding the contract method 0xde0b4e51.
//
// Solidity: function hustlerParts(uint256 hustlerId) view returns(bytes[])
func (_Hustler *HustlerCallerSession) HustlerParts(hustlerId *big.Int) ([][]byte, error) {
	return _Hustler.Contract.HustlerParts(&_Hustler.CallOpts, hustlerId)
}

// IsApprovedForAll is a free data retrieval call binding the contract method 0xe985e9c5.
//
// Solidity: function isApprovedForAll(address account, address operator) view returns(bool)
func (_Hustler *HustlerCaller) IsApprovedForAll(opts *bind.CallOpts, account common.Address, operator common.Address) (bool, error) {
	var out []interface{}
	err := _Hustler.contract.Call(opts, &out, "isApprovedForAll", account, operator)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// IsApprovedForAll is a free data retrieval call binding the contract method 0xe985e9c5.
//
// Solidity: function isApprovedForAll(address account, address operator) view returns(bool)
func (_Hustler *HustlerSession) IsApprovedForAll(account common.Address, operator common.Address) (bool, error) {
	return _Hustler.Contract.IsApprovedForAll(&_Hustler.CallOpts, account, operator)
}

// IsApprovedForAll is a free data retrieval call binding the contract method 0xe985e9c5.
//
// Solidity: function isApprovedForAll(address account, address operator) view returns(bool)
func (_Hustler *HustlerCallerSession) IsApprovedForAll(account common.Address, operator common.Address) (bool, error) {
	return _Hustler.Contract.IsApprovedForAll(&_Hustler.CallOpts, account, operator)
}

// Metadata is a free data retrieval call binding the contract method 0xe3684e39.
//
// Solidity: function metadata(uint256 ) view returns(bytes4 color, bytes4 background, bytes2 mask, bytes2 options, uint256 age, string name)
func (_Hustler *HustlerCaller) Metadata(opts *bind.CallOpts, arg0 *big.Int) (struct {
	Color      [4]byte
	Background [4]byte
	Mask       [2]byte
	Options    [2]byte
	Age        *big.Int
	Name       string
}, error) {
	var out []interface{}
	err := _Hustler.contract.Call(opts, &out, "metadata", arg0)

	outstruct := new(struct {
		Color      [4]byte
		Background [4]byte
		Mask       [2]byte
		Options    [2]byte
		Age        *big.Int
		Name       string
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.Color = *abi.ConvertType(out[0], new([4]byte)).(*[4]byte)
	outstruct.Background = *abi.ConvertType(out[1], new([4]byte)).(*[4]byte)
	outstruct.Mask = *abi.ConvertType(out[2], new([2]byte)).(*[2]byte)
	outstruct.Options = *abi.ConvertType(out[3], new([2]byte)).(*[2]byte)
	outstruct.Age = *abi.ConvertType(out[4], new(*big.Int)).(**big.Int)
	outstruct.Name = *abi.ConvertType(out[5], new(string)).(*string)

	return *outstruct, err

}

// Metadata is a free data retrieval call binding the contract method 0xe3684e39.
//
// Solidity: function metadata(uint256 ) view returns(bytes4 color, bytes4 background, bytes2 mask, bytes2 options, uint256 age, string name)
func (_Hustler *HustlerSession) Metadata(arg0 *big.Int) (struct {
	Color      [4]byte
	Background [4]byte
	Mask       [2]byte
	Options    [2]byte
	Age        *big.Int
	Name       string
}, error) {
	return _Hustler.Contract.Metadata(&_Hustler.CallOpts, arg0)
}

// Metadata is a free data retrieval call binding the contract method 0xe3684e39.
//
// Solidity: function metadata(uint256 ) view returns(bytes4 color, bytes4 background, bytes2 mask, bytes2 options, uint256 age, string name)
func (_Hustler *HustlerCallerSession) Metadata(arg0 *big.Int) (struct {
	Color      [4]byte
	Background [4]byte
	Mask       [2]byte
	Options    [2]byte
	Age        *big.Int
	Name       string
}, error) {
	return _Hustler.Contract.Metadata(&_Hustler.CallOpts, arg0)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() pure returns(string)
func (_Hustler *HustlerCaller) Name(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _Hustler.contract.Call(opts, &out, "name")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() pure returns(string)
func (_Hustler *HustlerSession) Name() (string, error) {
	return _Hustler.Contract.Name(&_Hustler.CallOpts)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() pure returns(string)
func (_Hustler *HustlerCallerSession) Name() (string, error) {
	return _Hustler.Contract.Name(&_Hustler.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Hustler *HustlerCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Hustler.contract.Call(opts, &out, "owner")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Hustler *HustlerSession) Owner() (common.Address, error) {
	return _Hustler.Contract.Owner(&_Hustler.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Hustler *HustlerCallerSession) Owner() (common.Address, error) {
	return _Hustler.Contract.Owner(&_Hustler.CallOpts)
}

// Render is a free data retrieval call binding the contract method 0xfadc2ef4.
//
// Solidity: function render(string title, string subtitle, uint8 resolution, bytes4 background, bytes4 color, uint8[4] viewbox, bytes[] parts) view returns(string)
func (_Hustler *HustlerCaller) Render(opts *bind.CallOpts, title string, subtitle string, resolution uint8, background [4]byte, color [4]byte, viewbox [4]uint8, parts [][]byte) (string, error) {
	var out []interface{}
	err := _Hustler.contract.Call(opts, &out, "render", title, subtitle, resolution, background, color, viewbox, parts)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Render is a free data retrieval call binding the contract method 0xfadc2ef4.
//
// Solidity: function render(string title, string subtitle, uint8 resolution, bytes4 background, bytes4 color, uint8[4] viewbox, bytes[] parts) view returns(string)
func (_Hustler *HustlerSession) Render(title string, subtitle string, resolution uint8, background [4]byte, color [4]byte, viewbox [4]uint8, parts [][]byte) (string, error) {
	return _Hustler.Contract.Render(&_Hustler.CallOpts, title, subtitle, resolution, background, color, viewbox, parts)
}

// Render is a free data retrieval call binding the contract method 0xfadc2ef4.
//
// Solidity: function render(string title, string subtitle, uint8 resolution, bytes4 background, bytes4 color, uint8[4] viewbox, bytes[] parts) view returns(string)
func (_Hustler *HustlerCallerSession) Render(title string, subtitle string, resolution uint8, background [4]byte, color [4]byte, viewbox [4]uint8, parts [][]byte) (string, error) {
	return _Hustler.Contract.Render(&_Hustler.CallOpts, title, subtitle, resolution, background, color, viewbox, parts)
}

// SupportsInterface is a free data retrieval call binding the contract method 0x01ffc9a7.
//
// Solidity: function supportsInterface(bytes4 interfaceId) view returns(bool)
func (_Hustler *HustlerCaller) SupportsInterface(opts *bind.CallOpts, interfaceId [4]byte) (bool, error) {
	var out []interface{}
	err := _Hustler.contract.Call(opts, &out, "supportsInterface", interfaceId)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// SupportsInterface is a free data retrieval call binding the contract method 0x01ffc9a7.
//
// Solidity: function supportsInterface(bytes4 interfaceId) view returns(bool)
func (_Hustler *HustlerSession) SupportsInterface(interfaceId [4]byte) (bool, error) {
	return _Hustler.Contract.SupportsInterface(&_Hustler.CallOpts, interfaceId)
}

// SupportsInterface is a free data retrieval call binding the contract method 0x01ffc9a7.
//
// Solidity: function supportsInterface(bytes4 interfaceId) view returns(bool)
func (_Hustler *HustlerCallerSession) SupportsInterface(interfaceId [4]byte) (bool, error) {
	return _Hustler.Contract.SupportsInterface(&_Hustler.CallOpts, interfaceId)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() pure returns(string)
func (_Hustler *HustlerCaller) Symbol(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _Hustler.contract.Call(opts, &out, "symbol")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() pure returns(string)
func (_Hustler *HustlerSession) Symbol() (string, error) {
	return _Hustler.Contract.Symbol(&_Hustler.CallOpts)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() pure returns(string)
func (_Hustler *HustlerCallerSession) Symbol() (string, error) {
	return _Hustler.Contract.Symbol(&_Hustler.CallOpts)
}

// TokenURI is a free data retrieval call binding the contract method 0xc87b56dd.
//
// Solidity: function tokenURI(uint256 hustlerId) view returns(string)
func (_Hustler *HustlerCaller) TokenURI(opts *bind.CallOpts, hustlerId *big.Int) (string, error) {
	var out []interface{}
	err := _Hustler.contract.Call(opts, &out, "tokenURI", hustlerId)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// TokenURI is a free data retrieval call binding the contract method 0xc87b56dd.
//
// Solidity: function tokenURI(uint256 hustlerId) view returns(string)
func (_Hustler *HustlerSession) TokenURI(hustlerId *big.Int) (string, error) {
	return _Hustler.Contract.TokenURI(&_Hustler.CallOpts, hustlerId)
}

// TokenURI is a free data retrieval call binding the contract method 0xc87b56dd.
//
// Solidity: function tokenURI(uint256 hustlerId) view returns(string)
func (_Hustler *HustlerCallerSession) TokenURI(hustlerId *big.Int) (string, error) {
	return _Hustler.Contract.TokenURI(&_Hustler.CallOpts, hustlerId)
}

// Uri is a free data retrieval call binding the contract method 0x0e89341c.
//
// Solidity: function uri(uint256 tokenId) view returns(string)
func (_Hustler *HustlerCaller) Uri(opts *bind.CallOpts, tokenId *big.Int) (string, error) {
	var out []interface{}
	err := _Hustler.contract.Call(opts, &out, "uri", tokenId)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Uri is a free data retrieval call binding the contract method 0x0e89341c.
//
// Solidity: function uri(uint256 tokenId) view returns(string)
func (_Hustler *HustlerSession) Uri(tokenId *big.Int) (string, error) {
	return _Hustler.Contract.Uri(&_Hustler.CallOpts, tokenId)
}

// Uri is a free data retrieval call binding the contract method 0x0e89341c.
//
// Solidity: function uri(uint256 tokenId) view returns(string)
func (_Hustler *HustlerCallerSession) Uri(tokenId *big.Int) (string, error) {
	return _Hustler.Contract.Uri(&_Hustler.CallOpts, tokenId)
}

// AddRles is a paid mutator transaction binding the contract method 0xceed851f.
//
// Solidity: function addRles(uint8 part, bytes[] _rles) returns()
func (_Hustler *HustlerTransactor) AddRles(opts *bind.TransactOpts, part uint8, _rles [][]byte) (*types.Transaction, error) {
	return _Hustler.contract.Transact(opts, "addRles", part, _rles)
}

// AddRles is a paid mutator transaction binding the contract method 0xceed851f.
//
// Solidity: function addRles(uint8 part, bytes[] _rles) returns()
func (_Hustler *HustlerSession) AddRles(part uint8, _rles [][]byte) (*types.Transaction, error) {
	return _Hustler.Contract.AddRles(&_Hustler.TransactOpts, part, _rles)
}

// AddRles is a paid mutator transaction binding the contract method 0xceed851f.
//
// Solidity: function addRles(uint8 part, bytes[] _rles) returns()
func (_Hustler *HustlerTransactorSession) AddRles(part uint8, _rles [][]byte) (*types.Transaction, error) {
	return _Hustler.Contract.AddRles(&_Hustler.TransactOpts, part, _rles)
}

// MintOGTo is a paid mutator transaction binding the contract method 0x4ddc4edc.
//
// Solidity: function mintOGTo(address to, string name, bytes4 color, bytes4 background, bytes2 options, uint8[4] viewbox, uint8[4] body, bytes2 mask, bytes data) returns(uint256)
func (_Hustler *HustlerTransactor) MintOGTo(opts *bind.TransactOpts, to common.Address, name string, color [4]byte, background [4]byte, options [2]byte, viewbox [4]uint8, body [4]uint8, mask [2]byte, data []byte) (*types.Transaction, error) {
	return _Hustler.contract.Transact(opts, "mintOGTo", to, name, color, background, options, viewbox, body, mask, data)
}

// MintOGTo is a paid mutator transaction binding the contract method 0x4ddc4edc.
//
// Solidity: function mintOGTo(address to, string name, bytes4 color, bytes4 background, bytes2 options, uint8[4] viewbox, uint8[4] body, bytes2 mask, bytes data) returns(uint256)
func (_Hustler *HustlerSession) MintOGTo(to common.Address, name string, color [4]byte, background [4]byte, options [2]byte, viewbox [4]uint8, body [4]uint8, mask [2]byte, data []byte) (*types.Transaction, error) {
	return _Hustler.Contract.MintOGTo(&_Hustler.TransactOpts, to, name, color, background, options, viewbox, body, mask, data)
}

// MintOGTo is a paid mutator transaction binding the contract method 0x4ddc4edc.
//
// Solidity: function mintOGTo(address to, string name, bytes4 color, bytes4 background, bytes2 options, uint8[4] viewbox, uint8[4] body, bytes2 mask, bytes data) returns(uint256)
func (_Hustler *HustlerTransactorSession) MintOGTo(to common.Address, name string, color [4]byte, background [4]byte, options [2]byte, viewbox [4]uint8, body [4]uint8, mask [2]byte, data []byte) (*types.Transaction, error) {
	return _Hustler.Contract.MintOGTo(&_Hustler.TransactOpts, to, name, color, background, options, viewbox, body, mask, data)
}

// MintTo is a paid mutator transaction binding the contract method 0x3d3503d9.
//
// Solidity: function mintTo(address to, bytes data) returns()
func (_Hustler *HustlerTransactor) MintTo(opts *bind.TransactOpts, to common.Address, data []byte) (*types.Transaction, error) {
	return _Hustler.contract.Transact(opts, "mintTo", to, data)
}

// MintTo is a paid mutator transaction binding the contract method 0x3d3503d9.
//
// Solidity: function mintTo(address to, bytes data) returns()
func (_Hustler *HustlerSession) MintTo(to common.Address, data []byte) (*types.Transaction, error) {
	return _Hustler.Contract.MintTo(&_Hustler.TransactOpts, to, data)
}

// MintTo is a paid mutator transaction binding the contract method 0x3d3503d9.
//
// Solidity: function mintTo(address to, bytes data) returns()
func (_Hustler *HustlerTransactorSession) MintTo(to common.Address, data []byte) (*types.Transaction, error) {
	return _Hustler.Contract.MintTo(&_Hustler.TransactOpts, to, data)
}

// MintTo0 is a paid mutator transaction binding the contract method 0xd670630b.
//
// Solidity: function mintTo(address to, string name, bytes4 color, bytes4 background, bytes2 options, uint8[4] viewbox, uint8[4] body, bytes2 mask, bytes data) returns(uint256)
func (_Hustler *HustlerTransactor) MintTo0(opts *bind.TransactOpts, to common.Address, name string, color [4]byte, background [4]byte, options [2]byte, viewbox [4]uint8, body [4]uint8, mask [2]byte, data []byte) (*types.Transaction, error) {
	return _Hustler.contract.Transact(opts, "mintTo0", to, name, color, background, options, viewbox, body, mask, data)
}

// MintTo0 is a paid mutator transaction binding the contract method 0xd670630b.
//
// Solidity: function mintTo(address to, string name, bytes4 color, bytes4 background, bytes2 options, uint8[4] viewbox, uint8[4] body, bytes2 mask, bytes data) returns(uint256)
func (_Hustler *HustlerSession) MintTo0(to common.Address, name string, color [4]byte, background [4]byte, options [2]byte, viewbox [4]uint8, body [4]uint8, mask [2]byte, data []byte) (*types.Transaction, error) {
	return _Hustler.Contract.MintTo0(&_Hustler.TransactOpts, to, name, color, background, options, viewbox, body, mask, data)
}

// MintTo0 is a paid mutator transaction binding the contract method 0xd670630b.
//
// Solidity: function mintTo(address to, string name, bytes4 color, bytes4 background, bytes2 options, uint8[4] viewbox, uint8[4] body, bytes2 mask, bytes data) returns(uint256)
func (_Hustler *HustlerTransactorSession) MintTo0(to common.Address, name string, color [4]byte, background [4]byte, options [2]byte, viewbox [4]uint8, body [4]uint8, mask [2]byte, data []byte) (*types.Transaction, error) {
	return _Hustler.Contract.MintTo0(&_Hustler.TransactOpts, to, name, color, background, options, viewbox, body, mask, data)
}

// OnERC1155BatchReceived is a paid mutator transaction binding the contract method 0xbc197c81.
//
// Solidity: function onERC1155BatchReceived(address operator, address from, uint256[] ids, uint256[] values, bytes data) returns(bytes4)
func (_Hustler *HustlerTransactor) OnERC1155BatchReceived(opts *bind.TransactOpts, operator common.Address, from common.Address, ids []*big.Int, values []*big.Int, data []byte) (*types.Transaction, error) {
	return _Hustler.contract.Transact(opts, "onERC1155BatchReceived", operator, from, ids, values, data)
}

// OnERC1155BatchReceived is a paid mutator transaction binding the contract method 0xbc197c81.
//
// Solidity: function onERC1155BatchReceived(address operator, address from, uint256[] ids, uint256[] values, bytes data) returns(bytes4)
func (_Hustler *HustlerSession) OnERC1155BatchReceived(operator common.Address, from common.Address, ids []*big.Int, values []*big.Int, data []byte) (*types.Transaction, error) {
	return _Hustler.Contract.OnERC1155BatchReceived(&_Hustler.TransactOpts, operator, from, ids, values, data)
}

// OnERC1155BatchReceived is a paid mutator transaction binding the contract method 0xbc197c81.
//
// Solidity: function onERC1155BatchReceived(address operator, address from, uint256[] ids, uint256[] values, bytes data) returns(bytes4)
func (_Hustler *HustlerTransactorSession) OnERC1155BatchReceived(operator common.Address, from common.Address, ids []*big.Int, values []*big.Int, data []byte) (*types.Transaction, error) {
	return _Hustler.Contract.OnERC1155BatchReceived(&_Hustler.TransactOpts, operator, from, ids, values, data)
}

// OnERC1155Received is a paid mutator transaction binding the contract method 0xf23a6e61.
//
// Solidity: function onERC1155Received(address operator, address from, uint256 id, uint256 value, bytes data) returns(bytes4)
func (_Hustler *HustlerTransactor) OnERC1155Received(opts *bind.TransactOpts, operator common.Address, from common.Address, id *big.Int, value *big.Int, data []byte) (*types.Transaction, error) {
	return _Hustler.contract.Transact(opts, "onERC1155Received", operator, from, id, value, data)
}

// OnERC1155Received is a paid mutator transaction binding the contract method 0xf23a6e61.
//
// Solidity: function onERC1155Received(address operator, address from, uint256 id, uint256 value, bytes data) returns(bytes4)
func (_Hustler *HustlerSession) OnERC1155Received(operator common.Address, from common.Address, id *big.Int, value *big.Int, data []byte) (*types.Transaction, error) {
	return _Hustler.Contract.OnERC1155Received(&_Hustler.TransactOpts, operator, from, id, value, data)
}

// OnERC1155Received is a paid mutator transaction binding the contract method 0xf23a6e61.
//
// Solidity: function onERC1155Received(address operator, address from, uint256 id, uint256 value, bytes data) returns(bytes4)
func (_Hustler *HustlerTransactorSession) OnERC1155Received(operator common.Address, from common.Address, id *big.Int, value *big.Int, data []byte) (*types.Transaction, error) {
	return _Hustler.Contract.OnERC1155Received(&_Hustler.TransactOpts, operator, from, id, value, data)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_Hustler *HustlerTransactor) RenounceOwnership(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Hustler.contract.Transact(opts, "renounceOwnership")
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_Hustler *HustlerSession) RenounceOwnership() (*types.Transaction, error) {
	return _Hustler.Contract.RenounceOwnership(&_Hustler.TransactOpts)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_Hustler *HustlerTransactorSession) RenounceOwnership() (*types.Transaction, error) {
	return _Hustler.Contract.RenounceOwnership(&_Hustler.TransactOpts)
}

// SafeBatchTransferFrom is a paid mutator transaction binding the contract method 0x2eb2c2d6.
//
// Solidity: function safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data) returns()
func (_Hustler *HustlerTransactor) SafeBatchTransferFrom(opts *bind.TransactOpts, from common.Address, to common.Address, ids []*big.Int, amounts []*big.Int, data []byte) (*types.Transaction, error) {
	return _Hustler.contract.Transact(opts, "safeBatchTransferFrom", from, to, ids, amounts, data)
}

// SafeBatchTransferFrom is a paid mutator transaction binding the contract method 0x2eb2c2d6.
//
// Solidity: function safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data) returns()
func (_Hustler *HustlerSession) SafeBatchTransferFrom(from common.Address, to common.Address, ids []*big.Int, amounts []*big.Int, data []byte) (*types.Transaction, error) {
	return _Hustler.Contract.SafeBatchTransferFrom(&_Hustler.TransactOpts, from, to, ids, amounts, data)
}

// SafeBatchTransferFrom is a paid mutator transaction binding the contract method 0x2eb2c2d6.
//
// Solidity: function safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data) returns()
func (_Hustler *HustlerTransactorSession) SafeBatchTransferFrom(from common.Address, to common.Address, ids []*big.Int, amounts []*big.Int, data []byte) (*types.Transaction, error) {
	return _Hustler.Contract.SafeBatchTransferFrom(&_Hustler.TransactOpts, from, to, ids, amounts, data)
}

// SafeTransferFrom is a paid mutator transaction binding the contract method 0xf242432a.
//
// Solidity: function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data) returns()
func (_Hustler *HustlerTransactor) SafeTransferFrom(opts *bind.TransactOpts, from common.Address, to common.Address, id *big.Int, amount *big.Int, data []byte) (*types.Transaction, error) {
	return _Hustler.contract.Transact(opts, "safeTransferFrom", from, to, id, amount, data)
}

// SafeTransferFrom is a paid mutator transaction binding the contract method 0xf242432a.
//
// Solidity: function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data) returns()
func (_Hustler *HustlerSession) SafeTransferFrom(from common.Address, to common.Address, id *big.Int, amount *big.Int, data []byte) (*types.Transaction, error) {
	return _Hustler.Contract.SafeTransferFrom(&_Hustler.TransactOpts, from, to, id, amount, data)
}

// SafeTransferFrom is a paid mutator transaction binding the contract method 0xf242432a.
//
// Solidity: function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data) returns()
func (_Hustler *HustlerTransactorSession) SafeTransferFrom(from common.Address, to common.Address, id *big.Int, amount *big.Int, data []byte) (*types.Transaction, error) {
	return _Hustler.Contract.SafeTransferFrom(&_Hustler.TransactOpts, from, to, id, amount, data)
}

// SetApprovalForAll is a paid mutator transaction binding the contract method 0xa22cb465.
//
// Solidity: function setApprovalForAll(address operator, bool approved) returns()
func (_Hustler *HustlerTransactor) SetApprovalForAll(opts *bind.TransactOpts, operator common.Address, approved bool) (*types.Transaction, error) {
	return _Hustler.contract.Transact(opts, "setApprovalForAll", operator, approved)
}

// SetApprovalForAll is a paid mutator transaction binding the contract method 0xa22cb465.
//
// Solidity: function setApprovalForAll(address operator, bool approved) returns()
func (_Hustler *HustlerSession) SetApprovalForAll(operator common.Address, approved bool) (*types.Transaction, error) {
	return _Hustler.Contract.SetApprovalForAll(&_Hustler.TransactOpts, operator, approved)
}

// SetApprovalForAll is a paid mutator transaction binding the contract method 0xa22cb465.
//
// Solidity: function setApprovalForAll(address operator, bool approved) returns()
func (_Hustler *HustlerTransactorSession) SetApprovalForAll(operator common.Address, approved bool) (*types.Transaction, error) {
	return _Hustler.Contract.SetApprovalForAll(&_Hustler.TransactOpts, operator, approved)
}

// SetEnforcer is a paid mutator transaction binding the contract method 0xcb6e3ef7.
//
// Solidity: function setEnforcer(address enforcer_) returns()
func (_Hustler *HustlerTransactor) SetEnforcer(opts *bind.TransactOpts, enforcer_ common.Address) (*types.Transaction, error) {
	return _Hustler.contract.Transact(opts, "setEnforcer", enforcer_)
}

// SetEnforcer is a paid mutator transaction binding the contract method 0xcb6e3ef7.
//
// Solidity: function setEnforcer(address enforcer_) returns()
func (_Hustler *HustlerSession) SetEnforcer(enforcer_ common.Address) (*types.Transaction, error) {
	return _Hustler.Contract.SetEnforcer(&_Hustler.TransactOpts, enforcer_)
}

// SetEnforcer is a paid mutator transaction binding the contract method 0xcb6e3ef7.
//
// Solidity: function setEnforcer(address enforcer_) returns()
func (_Hustler *HustlerTransactorSession) SetEnforcer(enforcer_ common.Address) (*types.Transaction, error) {
	return _Hustler.Contract.SetEnforcer(&_Hustler.TransactOpts, enforcer_)
}

// SetMetadata is a paid mutator transaction binding the contract method 0x2df9f194.
//
// Solidity: function setMetadata(uint256 hustlerId, string name, bytes4 color, bytes4 background, bytes2 options, uint8[4] viewbox, uint8[4] body, bytes2 mask) returns()
func (_Hustler *HustlerTransactor) SetMetadata(opts *bind.TransactOpts, hustlerId *big.Int, name string, color [4]byte, background [4]byte, options [2]byte, viewbox [4]uint8, body [4]uint8, mask [2]byte) (*types.Transaction, error) {
	return _Hustler.contract.Transact(opts, "setMetadata", hustlerId, name, color, background, options, viewbox, body, mask)
}

// SetMetadata is a paid mutator transaction binding the contract method 0x2df9f194.
//
// Solidity: function setMetadata(uint256 hustlerId, string name, bytes4 color, bytes4 background, bytes2 options, uint8[4] viewbox, uint8[4] body, bytes2 mask) returns()
func (_Hustler *HustlerSession) SetMetadata(hustlerId *big.Int, name string, color [4]byte, background [4]byte, options [2]byte, viewbox [4]uint8, body [4]uint8, mask [2]byte) (*types.Transaction, error) {
	return _Hustler.Contract.SetMetadata(&_Hustler.TransactOpts, hustlerId, name, color, background, options, viewbox, body, mask)
}

// SetMetadata is a paid mutator transaction binding the contract method 0x2df9f194.
//
// Solidity: function setMetadata(uint256 hustlerId, string name, bytes4 color, bytes4 background, bytes2 options, uint8[4] viewbox, uint8[4] body, bytes2 mask) returns()
func (_Hustler *HustlerTransactorSession) SetMetadata(hustlerId *big.Int, name string, color [4]byte, background [4]byte, options [2]byte, viewbox [4]uint8, body [4]uint8, mask [2]byte) (*types.Transaction, error) {
	return _Hustler.Contract.SetMetadata(&_Hustler.TransactOpts, hustlerId, name, color, background, options, viewbox, body, mask)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_Hustler *HustlerTransactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _Hustler.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_Hustler *HustlerSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Hustler.Contract.TransferOwnership(&_Hustler.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_Hustler *HustlerTransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Hustler.Contract.TransferOwnership(&_Hustler.TransactOpts, newOwner)
}

// Unequip is a paid mutator transaction binding the contract method 0x7b2ddc1d.
//
// Solidity: function unequip(uint256 hustlerId, uint8[] slots) returns()
func (_Hustler *HustlerTransactor) Unequip(opts *bind.TransactOpts, hustlerId *big.Int, slots []uint8) (*types.Transaction, error) {
	return _Hustler.contract.Transact(opts, "unequip", hustlerId, slots)
}

// Unequip is a paid mutator transaction binding the contract method 0x7b2ddc1d.
//
// Solidity: function unequip(uint256 hustlerId, uint8[] slots) returns()
func (_Hustler *HustlerSession) Unequip(hustlerId *big.Int, slots []uint8) (*types.Transaction, error) {
	return _Hustler.Contract.Unequip(&_Hustler.TransactOpts, hustlerId, slots)
}

// Unequip is a paid mutator transaction binding the contract method 0x7b2ddc1d.
//
// Solidity: function unequip(uint256 hustlerId, uint8[] slots) returns()
func (_Hustler *HustlerTransactorSession) Unequip(hustlerId *big.Int, slots []uint8) (*types.Transaction, error) {
	return _Hustler.Contract.Unequip(&_Hustler.TransactOpts, hustlerId, slots)
}

// HustlerAddRlesIterator is returned from FilterAddRles and is used to iterate over the raw logs and unpacked data for AddRles events raised by the Hustler contract.
type HustlerAddRlesIterator struct {
	Event *HustlerAddRles // Event containing the contract specifics and raw log

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
func (it *HustlerAddRlesIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(HustlerAddRles)
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
		it.Event = new(HustlerAddRles)
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
func (it *HustlerAddRlesIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *HustlerAddRlesIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// HustlerAddRles represents a AddRles event raised by the Hustler contract.
type HustlerAddRles struct {
	Part uint8
	Len  *big.Int
	Raw  types.Log // Blockchain specific contextual infos
}

// FilterAddRles is a free log retrieval operation binding the contract event 0x36b6cf36b8f012da85e0d54e17366baa232a918dd834ffae68371cbec4faf45c.
//
// Solidity: event AddRles(uint8 part, uint256 len)
func (_Hustler *HustlerFilterer) FilterAddRles(opts *bind.FilterOpts) (*HustlerAddRlesIterator, error) {

	logs, sub, err := _Hustler.contract.FilterLogs(opts, "AddRles")
	if err != nil {
		return nil, err
	}
	return &HustlerAddRlesIterator{contract: _Hustler.contract, event: "AddRles", logs: logs, sub: sub}, nil
}

// WatchAddRles is a free log subscription operation binding the contract event 0x36b6cf36b8f012da85e0d54e17366baa232a918dd834ffae68371cbec4faf45c.
//
// Solidity: event AddRles(uint8 part, uint256 len)
func (_Hustler *HustlerFilterer) WatchAddRles(opts *bind.WatchOpts, sink chan<- *HustlerAddRles) (event.Subscription, error) {

	logs, sub, err := _Hustler.contract.WatchLogs(opts, "AddRles")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(HustlerAddRles)
				if err := _Hustler.contract.UnpackLog(event, "AddRles", log); err != nil {
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

// ParseAddRles is a log parse operation binding the contract event 0x36b6cf36b8f012da85e0d54e17366baa232a918dd834ffae68371cbec4faf45c.
//
// Solidity: event AddRles(uint8 part, uint256 len)
func (_Hustler *HustlerFilterer) ParseAddRles(log types.Log) (*HustlerAddRles, error) {
	event := new(HustlerAddRles)
	if err := _Hustler.contract.UnpackLog(event, "AddRles", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// HustlerApprovalForAllIterator is returned from FilterApprovalForAll and is used to iterate over the raw logs and unpacked data for ApprovalForAll events raised by the Hustler contract.
type HustlerApprovalForAllIterator struct {
	Event *HustlerApprovalForAll // Event containing the contract specifics and raw log

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
func (it *HustlerApprovalForAllIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(HustlerApprovalForAll)
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
		it.Event = new(HustlerApprovalForAll)
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
func (it *HustlerApprovalForAllIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *HustlerApprovalForAllIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// HustlerApprovalForAll represents a ApprovalForAll event raised by the Hustler contract.
type HustlerApprovalForAll struct {
	Account  common.Address
	Operator common.Address
	Approved bool
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterApprovalForAll is a free log retrieval operation binding the contract event 0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31.
//
// Solidity: event ApprovalForAll(address indexed account, address indexed operator, bool approved)
func (_Hustler *HustlerFilterer) FilterApprovalForAll(opts *bind.FilterOpts, account []common.Address, operator []common.Address) (*HustlerApprovalForAllIterator, error) {

	var accountRule []interface{}
	for _, accountItem := range account {
		accountRule = append(accountRule, accountItem)
	}
	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}

	logs, sub, err := _Hustler.contract.FilterLogs(opts, "ApprovalForAll", accountRule, operatorRule)
	if err != nil {
		return nil, err
	}
	return &HustlerApprovalForAllIterator{contract: _Hustler.contract, event: "ApprovalForAll", logs: logs, sub: sub}, nil
}

// WatchApprovalForAll is a free log subscription operation binding the contract event 0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31.
//
// Solidity: event ApprovalForAll(address indexed account, address indexed operator, bool approved)
func (_Hustler *HustlerFilterer) WatchApprovalForAll(opts *bind.WatchOpts, sink chan<- *HustlerApprovalForAll, account []common.Address, operator []common.Address) (event.Subscription, error) {

	var accountRule []interface{}
	for _, accountItem := range account {
		accountRule = append(accountRule, accountItem)
	}
	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}

	logs, sub, err := _Hustler.contract.WatchLogs(opts, "ApprovalForAll", accountRule, operatorRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(HustlerApprovalForAll)
				if err := _Hustler.contract.UnpackLog(event, "ApprovalForAll", log); err != nil {
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

// ParseApprovalForAll is a log parse operation binding the contract event 0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31.
//
// Solidity: event ApprovalForAll(address indexed account, address indexed operator, bool approved)
func (_Hustler *HustlerFilterer) ParseApprovalForAll(log types.Log) (*HustlerApprovalForAll, error) {
	event := new(HustlerApprovalForAll)
	if err := _Hustler.contract.UnpackLog(event, "ApprovalForAll", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// HustlerMetadataUpdateIterator is returned from FilterMetadataUpdate and is used to iterate over the raw logs and unpacked data for MetadataUpdate events raised by the Hustler contract.
type HustlerMetadataUpdateIterator struct {
	Event *HustlerMetadataUpdate // Event containing the contract specifics and raw log

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
func (it *HustlerMetadataUpdateIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(HustlerMetadataUpdate)
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
		it.Event = new(HustlerMetadataUpdate)
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
func (it *HustlerMetadataUpdateIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *HustlerMetadataUpdateIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// HustlerMetadataUpdate represents a MetadataUpdate event raised by the Hustler contract.
type HustlerMetadataUpdate struct {
	Id  *big.Int
	Raw types.Log // Blockchain specific contextual infos
}

// FilterMetadataUpdate is a free log retrieval operation binding the contract event 0xf8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce7.
//
// Solidity: event MetadataUpdate(uint256 id)
func (_Hustler *HustlerFilterer) FilterMetadataUpdate(opts *bind.FilterOpts) (*HustlerMetadataUpdateIterator, error) {

	logs, sub, err := _Hustler.contract.FilterLogs(opts, "MetadataUpdate")
	if err != nil {
		return nil, err
	}
	return &HustlerMetadataUpdateIterator{contract: _Hustler.contract, event: "MetadataUpdate", logs: logs, sub: sub}, nil
}

// WatchMetadataUpdate is a free log subscription operation binding the contract event 0xf8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce7.
//
// Solidity: event MetadataUpdate(uint256 id)
func (_Hustler *HustlerFilterer) WatchMetadataUpdate(opts *bind.WatchOpts, sink chan<- *HustlerMetadataUpdate) (event.Subscription, error) {

	logs, sub, err := _Hustler.contract.WatchLogs(opts, "MetadataUpdate")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(HustlerMetadataUpdate)
				if err := _Hustler.contract.UnpackLog(event, "MetadataUpdate", log); err != nil {
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

// ParseMetadataUpdate is a log parse operation binding the contract event 0xf8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce7.
//
// Solidity: event MetadataUpdate(uint256 id)
func (_Hustler *HustlerFilterer) ParseMetadataUpdate(log types.Log) (*HustlerMetadataUpdate, error) {
	event := new(HustlerMetadataUpdate)
	if err := _Hustler.contract.UnpackLog(event, "MetadataUpdate", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// HustlerOwnershipTransferredIterator is returned from FilterOwnershipTransferred and is used to iterate over the raw logs and unpacked data for OwnershipTransferred events raised by the Hustler contract.
type HustlerOwnershipTransferredIterator struct {
	Event *HustlerOwnershipTransferred // Event containing the contract specifics and raw log

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
func (it *HustlerOwnershipTransferredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(HustlerOwnershipTransferred)
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
		it.Event = new(HustlerOwnershipTransferred)
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
func (it *HustlerOwnershipTransferredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *HustlerOwnershipTransferredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// HustlerOwnershipTransferred represents a OwnershipTransferred event raised by the Hustler contract.
type HustlerOwnershipTransferred struct {
	PreviousOwner common.Address
	NewOwner      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterOwnershipTransferred is a free log retrieval operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_Hustler *HustlerFilterer) FilterOwnershipTransferred(opts *bind.FilterOpts, previousOwner []common.Address, newOwner []common.Address) (*HustlerOwnershipTransferredIterator, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Hustler.contract.FilterLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return &HustlerOwnershipTransferredIterator{contract: _Hustler.contract, event: "OwnershipTransferred", logs: logs, sub: sub}, nil
}

// WatchOwnershipTransferred is a free log subscription operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_Hustler *HustlerFilterer) WatchOwnershipTransferred(opts *bind.WatchOpts, sink chan<- *HustlerOwnershipTransferred, previousOwner []common.Address, newOwner []common.Address) (event.Subscription, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Hustler.contract.WatchLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(HustlerOwnershipTransferred)
				if err := _Hustler.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
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
func (_Hustler *HustlerFilterer) ParseOwnershipTransferred(log types.Log) (*HustlerOwnershipTransferred, error) {
	event := new(HustlerOwnershipTransferred)
	if err := _Hustler.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// HustlerTransferBatchIterator is returned from FilterTransferBatch and is used to iterate over the raw logs and unpacked data for TransferBatch events raised by the Hustler contract.
type HustlerTransferBatchIterator struct {
	Event *HustlerTransferBatch // Event containing the contract specifics and raw log

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
func (it *HustlerTransferBatchIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(HustlerTransferBatch)
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
		it.Event = new(HustlerTransferBatch)
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
func (it *HustlerTransferBatchIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *HustlerTransferBatchIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// HustlerTransferBatch represents a TransferBatch event raised by the Hustler contract.
type HustlerTransferBatch struct {
	Operator common.Address
	From     common.Address
	To       common.Address
	Ids      []*big.Int
	Values   []*big.Int
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterTransferBatch is a free log retrieval operation binding the contract event 0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb.
//
// Solidity: event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)
func (_Hustler *HustlerFilterer) FilterTransferBatch(opts *bind.FilterOpts, operator []common.Address, from []common.Address, to []common.Address) (*HustlerTransferBatchIterator, error) {

	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}
	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _Hustler.contract.FilterLogs(opts, "TransferBatch", operatorRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &HustlerTransferBatchIterator{contract: _Hustler.contract, event: "TransferBatch", logs: logs, sub: sub}, nil
}

// WatchTransferBatch is a free log subscription operation binding the contract event 0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb.
//
// Solidity: event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)
func (_Hustler *HustlerFilterer) WatchTransferBatch(opts *bind.WatchOpts, sink chan<- *HustlerTransferBatch, operator []common.Address, from []common.Address, to []common.Address) (event.Subscription, error) {

	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}
	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _Hustler.contract.WatchLogs(opts, "TransferBatch", operatorRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(HustlerTransferBatch)
				if err := _Hustler.contract.UnpackLog(event, "TransferBatch", log); err != nil {
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

// ParseTransferBatch is a log parse operation binding the contract event 0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb.
//
// Solidity: event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)
func (_Hustler *HustlerFilterer) ParseTransferBatch(log types.Log) (*HustlerTransferBatch, error) {
	event := new(HustlerTransferBatch)
	if err := _Hustler.contract.UnpackLog(event, "TransferBatch", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// HustlerTransferSingleIterator is returned from FilterTransferSingle and is used to iterate over the raw logs and unpacked data for TransferSingle events raised by the Hustler contract.
type HustlerTransferSingleIterator struct {
	Event *HustlerTransferSingle // Event containing the contract specifics and raw log

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
func (it *HustlerTransferSingleIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(HustlerTransferSingle)
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
		it.Event = new(HustlerTransferSingle)
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
func (it *HustlerTransferSingleIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *HustlerTransferSingleIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// HustlerTransferSingle represents a TransferSingle event raised by the Hustler contract.
type HustlerTransferSingle struct {
	Operator common.Address
	From     common.Address
	To       common.Address
	Id       *big.Int
	Value    *big.Int
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterTransferSingle is a free log retrieval operation binding the contract event 0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62.
//
// Solidity: event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)
func (_Hustler *HustlerFilterer) FilterTransferSingle(opts *bind.FilterOpts, operator []common.Address, from []common.Address, to []common.Address) (*HustlerTransferSingleIterator, error) {

	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}
	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _Hustler.contract.FilterLogs(opts, "TransferSingle", operatorRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &HustlerTransferSingleIterator{contract: _Hustler.contract, event: "TransferSingle", logs: logs, sub: sub}, nil
}

// WatchTransferSingle is a free log subscription operation binding the contract event 0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62.
//
// Solidity: event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)
func (_Hustler *HustlerFilterer) WatchTransferSingle(opts *bind.WatchOpts, sink chan<- *HustlerTransferSingle, operator []common.Address, from []common.Address, to []common.Address) (event.Subscription, error) {

	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}
	var fromRule []interface{}
	for _, fromItem := range from {
		fromRule = append(fromRule, fromItem)
	}
	var toRule []interface{}
	for _, toItem := range to {
		toRule = append(toRule, toItem)
	}

	logs, sub, err := _Hustler.contract.WatchLogs(opts, "TransferSingle", operatorRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(HustlerTransferSingle)
				if err := _Hustler.contract.UnpackLog(event, "TransferSingle", log); err != nil {
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

// ParseTransferSingle is a log parse operation binding the contract event 0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62.
//
// Solidity: event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)
func (_Hustler *HustlerFilterer) ParseTransferSingle(log types.Log) (*HustlerTransferSingle, error) {
	event := new(HustlerTransferSingle)
	if err := _Hustler.contract.UnpackLog(event, "TransferSingle", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// HustlerURIIterator is returned from FilterURI and is used to iterate over the raw logs and unpacked data for URI events raised by the Hustler contract.
type HustlerURIIterator struct {
	Event *HustlerURI // Event containing the contract specifics and raw log

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
func (it *HustlerURIIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(HustlerURI)
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
		it.Event = new(HustlerURI)
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
func (it *HustlerURIIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *HustlerURIIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// HustlerURI represents a URI event raised by the Hustler contract.
type HustlerURI struct {
	Value string
	Id    *big.Int
	Raw   types.Log // Blockchain specific contextual infos
}

// FilterURI is a free log retrieval operation binding the contract event 0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b.
//
// Solidity: event URI(string value, uint256 indexed id)
func (_Hustler *HustlerFilterer) FilterURI(opts *bind.FilterOpts, id []*big.Int) (*HustlerURIIterator, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _Hustler.contract.FilterLogs(opts, "URI", idRule)
	if err != nil {
		return nil, err
	}
	return &HustlerURIIterator{contract: _Hustler.contract, event: "URI", logs: logs, sub: sub}, nil
}

// WatchURI is a free log subscription operation binding the contract event 0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b.
//
// Solidity: event URI(string value, uint256 indexed id)
func (_Hustler *HustlerFilterer) WatchURI(opts *bind.WatchOpts, sink chan<- *HustlerURI, id []*big.Int) (event.Subscription, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _Hustler.contract.WatchLogs(opts, "URI", idRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(HustlerURI)
				if err := _Hustler.contract.UnpackLog(event, "URI", log); err != nil {
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

// ParseURI is a log parse operation binding the contract event 0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b.
//
// Solidity: event URI(string value, uint256 indexed id)
func (_Hustler *HustlerFilterer) ParseURI(log types.Log) (*HustlerURI, error) {
	event := new(HustlerURI)
	if err := _Hustler.contract.UnpackLog(event, "URI", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
