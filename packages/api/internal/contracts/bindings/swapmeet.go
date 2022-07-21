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

// SwapMeetMetaData contains all meta data concerning the SwapMeet contract.
var SwapMeetMetaData = &bind.MetaData{
	ABI: "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_components\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"ApprovalForAll\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"SetRle\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256[]\",\"name\":\"ids\",\"type\":\"uint256[]\"},{\"indexed\":false,\"internalType\":\"uint256[]\",\"name\":\"values\",\"type\":\"uint256[]\"}],\"name\":\"TransferBatch\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"TransferSingle\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"string\",\"name\":\"value\",\"type\":\"string\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"URI\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address[]\",\"name\":\"accounts\",\"type\":\"address[]\"},{\"internalType\":\"uint256[]\",\"name\":\"ids\",\"type\":\"uint256[]\"}],\"name\":\"balanceOfBatch\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256[]\",\"name\":\"ids\",\"type\":\"uint256[]\"},{\"internalType\":\"bytes[]\",\"name\":\"rles\",\"type\":\"bytes[]\"}],\"name\":\"batchSetRle\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"contractURI\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"fullname\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"n\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"}],\"name\":\"isApprovedForAll\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"itemIds\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint8[5]\",\"name\":\"components\",\"type\":\"uint8[5]\"},{\"internalType\":\"uint8\",\"name\":\"componentType\",\"type\":\"uint8\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"mint\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint8[]\",\"name\":\"components\",\"type\":\"uint8[]\"},{\"internalType\":\"uint8[]\",\"name\":\"componentTypes\",\"type\":\"uint8[]\"},{\"internalType\":\"uint256[]\",\"name\":\"amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"mintBatch\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"open\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint8\",\"name\":\"id\",\"type\":\"uint8\"}],\"name\":\"palette\",\"outputs\":[{\"internalType\":\"bytes4[]\",\"name\":\"\",\"type\":\"bytes4[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"params\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"},{\"internalType\":\"bytes4\",\"name\":\"\",\"type\":\"bytes4\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256[]\",\"name\":\"ids\",\"type\":\"uint256[]\"},{\"internalType\":\"uint256[]\",\"name\":\"amounts\",\"type\":\"uint256[]\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"safeBatchTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"setApprovalForAll\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint8\",\"name\":\"id\",\"type\":\"uint8\"},{\"internalType\":\"bytes4[]\",\"name\":\"palette\",\"type\":\"bytes4[]\"}],\"name\":\"setPalette\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"male\",\"type\":\"bytes\"},{\"internalType\":\"bytes\",\"name\":\"female\",\"type\":\"bytes\"}],\"name\":\"setRle\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"}],\"name\":\"toBaseId\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint8[5]\",\"name\":\"components\",\"type\":\"uint8[5]\"},{\"internalType\":\"uint8\",\"name\":\"componentType\",\"type\":\"uint8\"}],\"name\":\"toId\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"pure\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"internalType\":\"uint8\",\"name\":\"gender\",\"type\":\"uint8\"}],\"name\":\"tokenRle\",\"outputs\":[{\"internalType\":\"bytes\",\"name\":\"\",\"type\":\"bytes\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"tokenURI\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"uri\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]",
}

// SwapMeetABI is the input ABI used to generate the binding from.
// Deprecated: Use SwapMeetMetaData.ABI instead.
var SwapMeetABI = SwapMeetMetaData.ABI

// SwapMeet is an auto generated Go binding around an Ethereum contract.
type SwapMeet struct {
	SwapMeetCaller     // Read-only binding to the contract
	SwapMeetTransactor // Write-only binding to the contract
	SwapMeetFilterer   // Log filterer for contract events
}

// SwapMeetCaller is an auto generated read-only Go binding around an Ethereum contract.
type SwapMeetCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SwapMeetTransactor is an auto generated write-only Go binding around an Ethereum contract.
type SwapMeetTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SwapMeetFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type SwapMeetFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// SwapMeetSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type SwapMeetSession struct {
	Contract     *SwapMeet         // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// SwapMeetCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type SwapMeetCallerSession struct {
	Contract *SwapMeetCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts   // Call options to use throughout this session
}

// SwapMeetTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type SwapMeetTransactorSession struct {
	Contract     *SwapMeetTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts   // Transaction auth options to use throughout this session
}

// SwapMeetRaw is an auto generated low-level Go binding around an Ethereum contract.
type SwapMeetRaw struct {
	Contract *SwapMeet // Generic contract binding to access the raw methods on
}

// SwapMeetCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type SwapMeetCallerRaw struct {
	Contract *SwapMeetCaller // Generic read-only contract binding to access the raw methods on
}

// SwapMeetTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type SwapMeetTransactorRaw struct {
	Contract *SwapMeetTransactor // Generic write-only contract binding to access the raw methods on
}

// NewSwapMeet creates a new instance of SwapMeet, bound to a specific deployed contract.
func NewSwapMeet(address common.Address, backend bind.ContractBackend) (*SwapMeet, error) {
	contract, err := bindSwapMeet(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &SwapMeet{SwapMeetCaller: SwapMeetCaller{contract: contract}, SwapMeetTransactor: SwapMeetTransactor{contract: contract}, SwapMeetFilterer: SwapMeetFilterer{contract: contract}}, nil
}

// NewSwapMeetCaller creates a new read-only instance of SwapMeet, bound to a specific deployed contract.
func NewSwapMeetCaller(address common.Address, caller bind.ContractCaller) (*SwapMeetCaller, error) {
	contract, err := bindSwapMeet(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &SwapMeetCaller{contract: contract}, nil
}

// NewSwapMeetTransactor creates a new write-only instance of SwapMeet, bound to a specific deployed contract.
func NewSwapMeetTransactor(address common.Address, transactor bind.ContractTransactor) (*SwapMeetTransactor, error) {
	contract, err := bindSwapMeet(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &SwapMeetTransactor{contract: contract}, nil
}

// NewSwapMeetFilterer creates a new log filterer instance of SwapMeet, bound to a specific deployed contract.
func NewSwapMeetFilterer(address common.Address, filterer bind.ContractFilterer) (*SwapMeetFilterer, error) {
	contract, err := bindSwapMeet(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &SwapMeetFilterer{contract: contract}, nil
}

// bindSwapMeet binds a generic wrapper to an already deployed contract.
func bindSwapMeet(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(SwapMeetABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_SwapMeet *SwapMeetRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _SwapMeet.Contract.SwapMeetCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_SwapMeet *SwapMeetRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SwapMeet.Contract.SwapMeetTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_SwapMeet *SwapMeetRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _SwapMeet.Contract.SwapMeetTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_SwapMeet *SwapMeetCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _SwapMeet.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_SwapMeet *SwapMeetTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SwapMeet.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_SwapMeet *SwapMeetTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _SwapMeet.Contract.contract.Transact(opts, method, params...)
}

// BalanceOf is a free data retrieval call binding the contract method 0x00fdd58e.
//
// Solidity: function balanceOf(address account, uint256 id) view returns(uint256)
func (_SwapMeet *SwapMeetCaller) BalanceOf(opts *bind.CallOpts, account common.Address, id *big.Int) (*big.Int, error) {
	var out []interface{}
	err := _SwapMeet.contract.Call(opts, &out, "balanceOf", account, id)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// BalanceOf is a free data retrieval call binding the contract method 0x00fdd58e.
//
// Solidity: function balanceOf(address account, uint256 id) view returns(uint256)
func (_SwapMeet *SwapMeetSession) BalanceOf(account common.Address, id *big.Int) (*big.Int, error) {
	return _SwapMeet.Contract.BalanceOf(&_SwapMeet.CallOpts, account, id)
}

// BalanceOf is a free data retrieval call binding the contract method 0x00fdd58e.
//
// Solidity: function balanceOf(address account, uint256 id) view returns(uint256)
func (_SwapMeet *SwapMeetCallerSession) BalanceOf(account common.Address, id *big.Int) (*big.Int, error) {
	return _SwapMeet.Contract.BalanceOf(&_SwapMeet.CallOpts, account, id)
}

// BalanceOfBatch is a free data retrieval call binding the contract method 0x4e1273f4.
//
// Solidity: function balanceOfBatch(address[] accounts, uint256[] ids) view returns(uint256[])
func (_SwapMeet *SwapMeetCaller) BalanceOfBatch(opts *bind.CallOpts, accounts []common.Address, ids []*big.Int) ([]*big.Int, error) {
	var out []interface{}
	err := _SwapMeet.contract.Call(opts, &out, "balanceOfBatch", accounts, ids)

	if err != nil {
		return *new([]*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new([]*big.Int)).(*[]*big.Int)

	return out0, err

}

// BalanceOfBatch is a free data retrieval call binding the contract method 0x4e1273f4.
//
// Solidity: function balanceOfBatch(address[] accounts, uint256[] ids) view returns(uint256[])
func (_SwapMeet *SwapMeetSession) BalanceOfBatch(accounts []common.Address, ids []*big.Int) ([]*big.Int, error) {
	return _SwapMeet.Contract.BalanceOfBatch(&_SwapMeet.CallOpts, accounts, ids)
}

// BalanceOfBatch is a free data retrieval call binding the contract method 0x4e1273f4.
//
// Solidity: function balanceOfBatch(address[] accounts, uint256[] ids) view returns(uint256[])
func (_SwapMeet *SwapMeetCallerSession) BalanceOfBatch(accounts []common.Address, ids []*big.Int) ([]*big.Int, error) {
	return _SwapMeet.Contract.BalanceOfBatch(&_SwapMeet.CallOpts, accounts, ids)
}

// ContractURI is a free data retrieval call binding the contract method 0xe8a3d485.
//
// Solidity: function contractURI() pure returns(string)
func (_SwapMeet *SwapMeetCaller) ContractURI(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _SwapMeet.contract.Call(opts, &out, "contractURI")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// ContractURI is a free data retrieval call binding the contract method 0xe8a3d485.
//
// Solidity: function contractURI() pure returns(string)
func (_SwapMeet *SwapMeetSession) ContractURI() (string, error) {
	return _SwapMeet.Contract.ContractURI(&_SwapMeet.CallOpts)
}

// ContractURI is a free data retrieval call binding the contract method 0xe8a3d485.
//
// Solidity: function contractURI() pure returns(string)
func (_SwapMeet *SwapMeetCallerSession) ContractURI() (string, error) {
	return _SwapMeet.Contract.ContractURI(&_SwapMeet.CallOpts)
}

// Fullname is a free data retrieval call binding the contract method 0x727b0e2b.
//
// Solidity: function fullname(uint256 id) view returns(string n)
func (_SwapMeet *SwapMeetCaller) Fullname(opts *bind.CallOpts, id *big.Int) (string, error) {
	var out []interface{}
	err := _SwapMeet.contract.Call(opts, &out, "fullname", id)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Fullname is a free data retrieval call binding the contract method 0x727b0e2b.
//
// Solidity: function fullname(uint256 id) view returns(string n)
func (_SwapMeet *SwapMeetSession) Fullname(id *big.Int) (string, error) {
	return _SwapMeet.Contract.Fullname(&_SwapMeet.CallOpts, id)
}

// Fullname is a free data retrieval call binding the contract method 0x727b0e2b.
//
// Solidity: function fullname(uint256 id) view returns(string n)
func (_SwapMeet *SwapMeetCallerSession) Fullname(id *big.Int) (string, error) {
	return _SwapMeet.Contract.Fullname(&_SwapMeet.CallOpts, id)
}

// IsApprovedForAll is a free data retrieval call binding the contract method 0xe985e9c5.
//
// Solidity: function isApprovedForAll(address account, address operator) view returns(bool)
func (_SwapMeet *SwapMeetCaller) IsApprovedForAll(opts *bind.CallOpts, account common.Address, operator common.Address) (bool, error) {
	var out []interface{}
	err := _SwapMeet.contract.Call(opts, &out, "isApprovedForAll", account, operator)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// IsApprovedForAll is a free data retrieval call binding the contract method 0xe985e9c5.
//
// Solidity: function isApprovedForAll(address account, address operator) view returns(bool)
func (_SwapMeet *SwapMeetSession) IsApprovedForAll(account common.Address, operator common.Address) (bool, error) {
	return _SwapMeet.Contract.IsApprovedForAll(&_SwapMeet.CallOpts, account, operator)
}

// IsApprovedForAll is a free data retrieval call binding the contract method 0xe985e9c5.
//
// Solidity: function isApprovedForAll(address account, address operator) view returns(bool)
func (_SwapMeet *SwapMeetCallerSession) IsApprovedForAll(account common.Address, operator common.Address) (bool, error) {
	return _SwapMeet.Contract.IsApprovedForAll(&_SwapMeet.CallOpts, account, operator)
}

// ItemIds is a free data retrieval call binding the contract method 0xb3dc00fe.
//
// Solidity: function itemIds(uint256 tokenId) view returns(uint256[])
func (_SwapMeet *SwapMeetCaller) ItemIds(opts *bind.CallOpts, tokenId *big.Int) ([]*big.Int, error) {
	var out []interface{}
	err := _SwapMeet.contract.Call(opts, &out, "itemIds", tokenId)

	if err != nil {
		return *new([]*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new([]*big.Int)).(*[]*big.Int)

	return out0, err

}

// ItemIds is a free data retrieval call binding the contract method 0xb3dc00fe.
//
// Solidity: function itemIds(uint256 tokenId) view returns(uint256[])
func (_SwapMeet *SwapMeetSession) ItemIds(tokenId *big.Int) ([]*big.Int, error) {
	return _SwapMeet.Contract.ItemIds(&_SwapMeet.CallOpts, tokenId)
}

// ItemIds is a free data retrieval call binding the contract method 0xb3dc00fe.
//
// Solidity: function itemIds(uint256 tokenId) view returns(uint256[])
func (_SwapMeet *SwapMeetCallerSession) ItemIds(tokenId *big.Int) ([]*big.Int, error) {
	return _SwapMeet.Contract.ItemIds(&_SwapMeet.CallOpts, tokenId)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() pure returns(string)
func (_SwapMeet *SwapMeetCaller) Name(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _SwapMeet.contract.Call(opts, &out, "name")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() pure returns(string)
func (_SwapMeet *SwapMeetSession) Name() (string, error) {
	return _SwapMeet.Contract.Name(&_SwapMeet.CallOpts)
}

// Name is a free data retrieval call binding the contract method 0x06fdde03.
//
// Solidity: function name() pure returns(string)
func (_SwapMeet *SwapMeetCallerSession) Name() (string, error) {
	return _SwapMeet.Contract.Name(&_SwapMeet.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_SwapMeet *SwapMeetCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _SwapMeet.contract.Call(opts, &out, "owner")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_SwapMeet *SwapMeetSession) Owner() (common.Address, error) {
	return _SwapMeet.Contract.Owner(&_SwapMeet.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_SwapMeet *SwapMeetCallerSession) Owner() (common.Address, error) {
	return _SwapMeet.Contract.Owner(&_SwapMeet.CallOpts)
}

// Palette is a free data retrieval call binding the contract method 0x09102203.
//
// Solidity: function palette(uint8 id) view returns(bytes4[])
func (_SwapMeet *SwapMeetCaller) Palette(opts *bind.CallOpts, id uint8) ([][4]byte, error) {
	var out []interface{}
	err := _SwapMeet.contract.Call(opts, &out, "palette", id)

	if err != nil {
		return *new([][4]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([][4]byte)).(*[][4]byte)

	return out0, err

}

// Palette is a free data retrieval call binding the contract method 0x09102203.
//
// Solidity: function palette(uint8 id) view returns(bytes4[])
func (_SwapMeet *SwapMeetSession) Palette(id uint8) ([][4]byte, error) {
	return _SwapMeet.Contract.Palette(&_SwapMeet.CallOpts, id)
}

// Palette is a free data retrieval call binding the contract method 0x09102203.
//
// Solidity: function palette(uint8 id) view returns(bytes4[])
func (_SwapMeet *SwapMeetCallerSession) Palette(id uint8) ([][4]byte, error) {
	return _SwapMeet.Contract.Palette(&_SwapMeet.CallOpts, id)
}

// Params is a free data retrieval call binding the contract method 0x9d2f053c.
//
// Solidity: function params(uint256 id) view returns(string, string, string, string, string, bytes4)
func (_SwapMeet *SwapMeetCaller) Params(opts *bind.CallOpts, id *big.Int) (string, string, string, string, string, [4]byte, error) {
	var out []interface{}
	err := _SwapMeet.contract.Call(opts, &out, "params", id)

	if err != nil {
		return *new(string), *new(string), *new(string), *new(string), *new(string), *new([4]byte), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)
	out1 := *abi.ConvertType(out[1], new(string)).(*string)
	out2 := *abi.ConvertType(out[2], new(string)).(*string)
	out3 := *abi.ConvertType(out[3], new(string)).(*string)
	out4 := *abi.ConvertType(out[4], new(string)).(*string)
	out5 := *abi.ConvertType(out[5], new([4]byte)).(*[4]byte)

	return out0, out1, out2, out3, out4, out5, err

}

// Params is a free data retrieval call binding the contract method 0x9d2f053c.
//
// Solidity: function params(uint256 id) view returns(string, string, string, string, string, bytes4)
func (_SwapMeet *SwapMeetSession) Params(id *big.Int) (string, string, string, string, string, [4]byte, error) {
	return _SwapMeet.Contract.Params(&_SwapMeet.CallOpts, id)
}

// Params is a free data retrieval call binding the contract method 0x9d2f053c.
//
// Solidity: function params(uint256 id) view returns(string, string, string, string, string, bytes4)
func (_SwapMeet *SwapMeetCallerSession) Params(id *big.Int) (string, string, string, string, string, [4]byte, error) {
	return _SwapMeet.Contract.Params(&_SwapMeet.CallOpts, id)
}

// SupportsInterface is a free data retrieval call binding the contract method 0x01ffc9a7.
//
// Solidity: function supportsInterface(bytes4 interfaceId) view returns(bool)
func (_SwapMeet *SwapMeetCaller) SupportsInterface(opts *bind.CallOpts, interfaceId [4]byte) (bool, error) {
	var out []interface{}
	err := _SwapMeet.contract.Call(opts, &out, "supportsInterface", interfaceId)

	if err != nil {
		return *new(bool), err
	}

	out0 := *abi.ConvertType(out[0], new(bool)).(*bool)

	return out0, err

}

// SupportsInterface is a free data retrieval call binding the contract method 0x01ffc9a7.
//
// Solidity: function supportsInterface(bytes4 interfaceId) view returns(bool)
func (_SwapMeet *SwapMeetSession) SupportsInterface(interfaceId [4]byte) (bool, error) {
	return _SwapMeet.Contract.SupportsInterface(&_SwapMeet.CallOpts, interfaceId)
}

// SupportsInterface is a free data retrieval call binding the contract method 0x01ffc9a7.
//
// Solidity: function supportsInterface(bytes4 interfaceId) view returns(bool)
func (_SwapMeet *SwapMeetCallerSession) SupportsInterface(interfaceId [4]byte) (bool, error) {
	return _SwapMeet.Contract.SupportsInterface(&_SwapMeet.CallOpts, interfaceId)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() pure returns(string)
func (_SwapMeet *SwapMeetCaller) Symbol(opts *bind.CallOpts) (string, error) {
	var out []interface{}
	err := _SwapMeet.contract.Call(opts, &out, "symbol")

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() pure returns(string)
func (_SwapMeet *SwapMeetSession) Symbol() (string, error) {
	return _SwapMeet.Contract.Symbol(&_SwapMeet.CallOpts)
}

// Symbol is a free data retrieval call binding the contract method 0x95d89b41.
//
// Solidity: function symbol() pure returns(string)
func (_SwapMeet *SwapMeetCallerSession) Symbol() (string, error) {
	return _SwapMeet.Contract.Symbol(&_SwapMeet.CallOpts)
}

// ToBaseId is a free data retrieval call binding the contract method 0xfbbe3f94.
//
// Solidity: function toBaseId(uint256 id) pure returns(uint256)
func (_SwapMeet *SwapMeetCaller) ToBaseId(opts *bind.CallOpts, id *big.Int) (*big.Int, error) {
	var out []interface{}
	err := _SwapMeet.contract.Call(opts, &out, "toBaseId", id)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// ToBaseId is a free data retrieval call binding the contract method 0xfbbe3f94.
//
// Solidity: function toBaseId(uint256 id) pure returns(uint256)
func (_SwapMeet *SwapMeetSession) ToBaseId(id *big.Int) (*big.Int, error) {
	return _SwapMeet.Contract.ToBaseId(&_SwapMeet.CallOpts, id)
}

// ToBaseId is a free data retrieval call binding the contract method 0xfbbe3f94.
//
// Solidity: function toBaseId(uint256 id) pure returns(uint256)
func (_SwapMeet *SwapMeetCallerSession) ToBaseId(id *big.Int) (*big.Int, error) {
	return _SwapMeet.Contract.ToBaseId(&_SwapMeet.CallOpts, id)
}

// ToId is a free data retrieval call binding the contract method 0x5337b14d.
//
// Solidity: function toId(uint8[5] components, uint8 componentType) pure returns(uint256)
func (_SwapMeet *SwapMeetCaller) ToId(opts *bind.CallOpts, components [5]uint8, componentType uint8) (*big.Int, error) {
	var out []interface{}
	err := _SwapMeet.contract.Call(opts, &out, "toId", components, componentType)

	if err != nil {
		return *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)

	return out0, err

}

// ToId is a free data retrieval call binding the contract method 0x5337b14d.
//
// Solidity: function toId(uint8[5] components, uint8 componentType) pure returns(uint256)
func (_SwapMeet *SwapMeetSession) ToId(components [5]uint8, componentType uint8) (*big.Int, error) {
	return _SwapMeet.Contract.ToId(&_SwapMeet.CallOpts, components, componentType)
}

// ToId is a free data retrieval call binding the contract method 0x5337b14d.
//
// Solidity: function toId(uint8[5] components, uint8 componentType) pure returns(uint256)
func (_SwapMeet *SwapMeetCallerSession) ToId(components [5]uint8, componentType uint8) (*big.Int, error) {
	return _SwapMeet.Contract.ToId(&_SwapMeet.CallOpts, components, componentType)
}

// TokenRle is a free data retrieval call binding the contract method 0x91f1fa43.
//
// Solidity: function tokenRle(uint256 id, uint8 gender) view returns(bytes)
func (_SwapMeet *SwapMeetCaller) TokenRle(opts *bind.CallOpts, id *big.Int, gender uint8) ([]byte, error) {
	var out []interface{}
	err := _SwapMeet.contract.Call(opts, &out, "tokenRle", id, gender)

	if err != nil {
		return *new([]byte), err
	}

	out0 := *abi.ConvertType(out[0], new([]byte)).(*[]byte)

	return out0, err

}

// TokenRle is a free data retrieval call binding the contract method 0x91f1fa43.
//
// Solidity: function tokenRle(uint256 id, uint8 gender) view returns(bytes)
func (_SwapMeet *SwapMeetSession) TokenRle(id *big.Int, gender uint8) ([]byte, error) {
	return _SwapMeet.Contract.TokenRle(&_SwapMeet.CallOpts, id, gender)
}

// TokenRle is a free data retrieval call binding the contract method 0x91f1fa43.
//
// Solidity: function tokenRle(uint256 id, uint8 gender) view returns(bytes)
func (_SwapMeet *SwapMeetCallerSession) TokenRle(id *big.Int, gender uint8) ([]byte, error) {
	return _SwapMeet.Contract.TokenRle(&_SwapMeet.CallOpts, id, gender)
}

// TokenURI is a free data retrieval call binding the contract method 0xc87b56dd.
//
// Solidity: function tokenURI(uint256 tokenId) view returns(string)
func (_SwapMeet *SwapMeetCaller) TokenURI(opts *bind.CallOpts, tokenId *big.Int) (string, error) {
	var out []interface{}
	err := _SwapMeet.contract.Call(opts, &out, "tokenURI", tokenId)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// TokenURI is a free data retrieval call binding the contract method 0xc87b56dd.
//
// Solidity: function tokenURI(uint256 tokenId) view returns(string)
func (_SwapMeet *SwapMeetSession) TokenURI(tokenId *big.Int) (string, error) {
	return _SwapMeet.Contract.TokenURI(&_SwapMeet.CallOpts, tokenId)
}

// TokenURI is a free data retrieval call binding the contract method 0xc87b56dd.
//
// Solidity: function tokenURI(uint256 tokenId) view returns(string)
func (_SwapMeet *SwapMeetCallerSession) TokenURI(tokenId *big.Int) (string, error) {
	return _SwapMeet.Contract.TokenURI(&_SwapMeet.CallOpts, tokenId)
}

// Uri is a free data retrieval call binding the contract method 0x0e89341c.
//
// Solidity: function uri(uint256 tokenId) view returns(string)
func (_SwapMeet *SwapMeetCaller) Uri(opts *bind.CallOpts, tokenId *big.Int) (string, error) {
	var out []interface{}
	err := _SwapMeet.contract.Call(opts, &out, "uri", tokenId)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Uri is a free data retrieval call binding the contract method 0x0e89341c.
//
// Solidity: function uri(uint256 tokenId) view returns(string)
func (_SwapMeet *SwapMeetSession) Uri(tokenId *big.Int) (string, error) {
	return _SwapMeet.Contract.Uri(&_SwapMeet.CallOpts, tokenId)
}

// Uri is a free data retrieval call binding the contract method 0x0e89341c.
//
// Solidity: function uri(uint256 tokenId) view returns(string)
func (_SwapMeet *SwapMeetCallerSession) Uri(tokenId *big.Int) (string, error) {
	return _SwapMeet.Contract.Uri(&_SwapMeet.CallOpts, tokenId)
}

// BatchSetRle is a paid mutator transaction binding the contract method 0xa32b3cb8.
//
// Solidity: function batchSetRle(uint256[] ids, bytes[] rles) returns()
func (_SwapMeet *SwapMeetTransactor) BatchSetRle(opts *bind.TransactOpts, ids []*big.Int, rles [][]byte) (*types.Transaction, error) {
	return _SwapMeet.contract.Transact(opts, "batchSetRle", ids, rles)
}

// BatchSetRle is a paid mutator transaction binding the contract method 0xa32b3cb8.
//
// Solidity: function batchSetRle(uint256[] ids, bytes[] rles) returns()
func (_SwapMeet *SwapMeetSession) BatchSetRle(ids []*big.Int, rles [][]byte) (*types.Transaction, error) {
	return _SwapMeet.Contract.BatchSetRle(&_SwapMeet.TransactOpts, ids, rles)
}

// BatchSetRle is a paid mutator transaction binding the contract method 0xa32b3cb8.
//
// Solidity: function batchSetRle(uint256[] ids, bytes[] rles) returns()
func (_SwapMeet *SwapMeetTransactorSession) BatchSetRle(ids []*big.Int, rles [][]byte) (*types.Transaction, error) {
	return _SwapMeet.Contract.BatchSetRle(&_SwapMeet.TransactOpts, ids, rles)
}

// Mint is a paid mutator transaction binding the contract method 0x81d390fc.
//
// Solidity: function mint(address to, uint8[5] components, uint8 componentType, uint256 amount, bytes data) returns(uint256)
func (_SwapMeet *SwapMeetTransactor) Mint(opts *bind.TransactOpts, to common.Address, components [5]uint8, componentType uint8, amount *big.Int, data []byte) (*types.Transaction, error) {
	return _SwapMeet.contract.Transact(opts, "mint", to, components, componentType, amount, data)
}

// Mint is a paid mutator transaction binding the contract method 0x81d390fc.
//
// Solidity: function mint(address to, uint8[5] components, uint8 componentType, uint256 amount, bytes data) returns(uint256)
func (_SwapMeet *SwapMeetSession) Mint(to common.Address, components [5]uint8, componentType uint8, amount *big.Int, data []byte) (*types.Transaction, error) {
	return _SwapMeet.Contract.Mint(&_SwapMeet.TransactOpts, to, components, componentType, amount, data)
}

// Mint is a paid mutator transaction binding the contract method 0x81d390fc.
//
// Solidity: function mint(address to, uint8[5] components, uint8 componentType, uint256 amount, bytes data) returns(uint256)
func (_SwapMeet *SwapMeetTransactorSession) Mint(to common.Address, components [5]uint8, componentType uint8, amount *big.Int, data []byte) (*types.Transaction, error) {
	return _SwapMeet.Contract.Mint(&_SwapMeet.TransactOpts, to, components, componentType, amount, data)
}

// MintBatch is a paid mutator transaction binding the contract method 0xada38f78.
//
// Solidity: function mintBatch(address to, uint8[] components, uint8[] componentTypes, uint256[] amounts, bytes data) returns(uint256[])
func (_SwapMeet *SwapMeetTransactor) MintBatch(opts *bind.TransactOpts, to common.Address, components []uint8, componentTypes []uint8, amounts []*big.Int, data []byte) (*types.Transaction, error) {
	return _SwapMeet.contract.Transact(opts, "mintBatch", to, components, componentTypes, amounts, data)
}

// MintBatch is a paid mutator transaction binding the contract method 0xada38f78.
//
// Solidity: function mintBatch(address to, uint8[] components, uint8[] componentTypes, uint256[] amounts, bytes data) returns(uint256[])
func (_SwapMeet *SwapMeetSession) MintBatch(to common.Address, components []uint8, componentTypes []uint8, amounts []*big.Int, data []byte) (*types.Transaction, error) {
	return _SwapMeet.Contract.MintBatch(&_SwapMeet.TransactOpts, to, components, componentTypes, amounts, data)
}

// MintBatch is a paid mutator transaction binding the contract method 0xada38f78.
//
// Solidity: function mintBatch(address to, uint8[] components, uint8[] componentTypes, uint256[] amounts, bytes data) returns(uint256[])
func (_SwapMeet *SwapMeetTransactorSession) MintBatch(to common.Address, components []uint8, componentTypes []uint8, amounts []*big.Int, data []byte) (*types.Transaction, error) {
	return _SwapMeet.Contract.MintBatch(&_SwapMeet.TransactOpts, to, components, componentTypes, amounts, data)
}

// Open is a paid mutator transaction binding the contract method 0x2623e350.
//
// Solidity: function open(uint256 id, address to, bytes data) returns()
func (_SwapMeet *SwapMeetTransactor) Open(opts *bind.TransactOpts, id *big.Int, to common.Address, data []byte) (*types.Transaction, error) {
	return _SwapMeet.contract.Transact(opts, "open", id, to, data)
}

// Open is a paid mutator transaction binding the contract method 0x2623e350.
//
// Solidity: function open(uint256 id, address to, bytes data) returns()
func (_SwapMeet *SwapMeetSession) Open(id *big.Int, to common.Address, data []byte) (*types.Transaction, error) {
	return _SwapMeet.Contract.Open(&_SwapMeet.TransactOpts, id, to, data)
}

// Open is a paid mutator transaction binding the contract method 0x2623e350.
//
// Solidity: function open(uint256 id, address to, bytes data) returns()
func (_SwapMeet *SwapMeetTransactorSession) Open(id *big.Int, to common.Address, data []byte) (*types.Transaction, error) {
	return _SwapMeet.Contract.Open(&_SwapMeet.TransactOpts, id, to, data)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_SwapMeet *SwapMeetTransactor) RenounceOwnership(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _SwapMeet.contract.Transact(opts, "renounceOwnership")
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_SwapMeet *SwapMeetSession) RenounceOwnership() (*types.Transaction, error) {
	return _SwapMeet.Contract.RenounceOwnership(&_SwapMeet.TransactOpts)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_SwapMeet *SwapMeetTransactorSession) RenounceOwnership() (*types.Transaction, error) {
	return _SwapMeet.Contract.RenounceOwnership(&_SwapMeet.TransactOpts)
}

// SafeBatchTransferFrom is a paid mutator transaction binding the contract method 0x2eb2c2d6.
//
// Solidity: function safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data) returns()
func (_SwapMeet *SwapMeetTransactor) SafeBatchTransferFrom(opts *bind.TransactOpts, from common.Address, to common.Address, ids []*big.Int, amounts []*big.Int, data []byte) (*types.Transaction, error) {
	return _SwapMeet.contract.Transact(opts, "safeBatchTransferFrom", from, to, ids, amounts, data)
}

// SafeBatchTransferFrom is a paid mutator transaction binding the contract method 0x2eb2c2d6.
//
// Solidity: function safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data) returns()
func (_SwapMeet *SwapMeetSession) SafeBatchTransferFrom(from common.Address, to common.Address, ids []*big.Int, amounts []*big.Int, data []byte) (*types.Transaction, error) {
	return _SwapMeet.Contract.SafeBatchTransferFrom(&_SwapMeet.TransactOpts, from, to, ids, amounts, data)
}

// SafeBatchTransferFrom is a paid mutator transaction binding the contract method 0x2eb2c2d6.
//
// Solidity: function safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data) returns()
func (_SwapMeet *SwapMeetTransactorSession) SafeBatchTransferFrom(from common.Address, to common.Address, ids []*big.Int, amounts []*big.Int, data []byte) (*types.Transaction, error) {
	return _SwapMeet.Contract.SafeBatchTransferFrom(&_SwapMeet.TransactOpts, from, to, ids, amounts, data)
}

// SafeTransferFrom is a paid mutator transaction binding the contract method 0xf242432a.
//
// Solidity: function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data) returns()
func (_SwapMeet *SwapMeetTransactor) SafeTransferFrom(opts *bind.TransactOpts, from common.Address, to common.Address, id *big.Int, amount *big.Int, data []byte) (*types.Transaction, error) {
	return _SwapMeet.contract.Transact(opts, "safeTransferFrom", from, to, id, amount, data)
}

// SafeTransferFrom is a paid mutator transaction binding the contract method 0xf242432a.
//
// Solidity: function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data) returns()
func (_SwapMeet *SwapMeetSession) SafeTransferFrom(from common.Address, to common.Address, id *big.Int, amount *big.Int, data []byte) (*types.Transaction, error) {
	return _SwapMeet.Contract.SafeTransferFrom(&_SwapMeet.TransactOpts, from, to, id, amount, data)
}

// SafeTransferFrom is a paid mutator transaction binding the contract method 0xf242432a.
//
// Solidity: function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data) returns()
func (_SwapMeet *SwapMeetTransactorSession) SafeTransferFrom(from common.Address, to common.Address, id *big.Int, amount *big.Int, data []byte) (*types.Transaction, error) {
	return _SwapMeet.Contract.SafeTransferFrom(&_SwapMeet.TransactOpts, from, to, id, amount, data)
}

// SetApprovalForAll is a paid mutator transaction binding the contract method 0xa22cb465.
//
// Solidity: function setApprovalForAll(address operator, bool approved) returns()
func (_SwapMeet *SwapMeetTransactor) SetApprovalForAll(opts *bind.TransactOpts, operator common.Address, approved bool) (*types.Transaction, error) {
	return _SwapMeet.contract.Transact(opts, "setApprovalForAll", operator, approved)
}

// SetApprovalForAll is a paid mutator transaction binding the contract method 0xa22cb465.
//
// Solidity: function setApprovalForAll(address operator, bool approved) returns()
func (_SwapMeet *SwapMeetSession) SetApprovalForAll(operator common.Address, approved bool) (*types.Transaction, error) {
	return _SwapMeet.Contract.SetApprovalForAll(&_SwapMeet.TransactOpts, operator, approved)
}

// SetApprovalForAll is a paid mutator transaction binding the contract method 0xa22cb465.
//
// Solidity: function setApprovalForAll(address operator, bool approved) returns()
func (_SwapMeet *SwapMeetTransactorSession) SetApprovalForAll(operator common.Address, approved bool) (*types.Transaction, error) {
	return _SwapMeet.Contract.SetApprovalForAll(&_SwapMeet.TransactOpts, operator, approved)
}

// SetPalette is a paid mutator transaction binding the contract method 0xdeeb2696.
//
// Solidity: function setPalette(uint8 id, bytes4[] palette) returns()
func (_SwapMeet *SwapMeetTransactor) SetPalette(opts *bind.TransactOpts, id uint8, palette [][4]byte) (*types.Transaction, error) {
	return _SwapMeet.contract.Transact(opts, "setPalette", id, palette)
}

// SetPalette is a paid mutator transaction binding the contract method 0xdeeb2696.
//
// Solidity: function setPalette(uint8 id, bytes4[] palette) returns()
func (_SwapMeet *SwapMeetSession) SetPalette(id uint8, palette [][4]byte) (*types.Transaction, error) {
	return _SwapMeet.Contract.SetPalette(&_SwapMeet.TransactOpts, id, palette)
}

// SetPalette is a paid mutator transaction binding the contract method 0xdeeb2696.
//
// Solidity: function setPalette(uint8 id, bytes4[] palette) returns()
func (_SwapMeet *SwapMeetTransactorSession) SetPalette(id uint8, palette [][4]byte) (*types.Transaction, error) {
	return _SwapMeet.Contract.SetPalette(&_SwapMeet.TransactOpts, id, palette)
}

// SetRle is a paid mutator transaction binding the contract method 0x76f44143.
//
// Solidity: function setRle(uint256 id, bytes male, bytes female) returns()
func (_SwapMeet *SwapMeetTransactor) SetRle(opts *bind.TransactOpts, id *big.Int, male []byte, female []byte) (*types.Transaction, error) {
	return _SwapMeet.contract.Transact(opts, "setRle", id, male, female)
}

// SetRle is a paid mutator transaction binding the contract method 0x76f44143.
//
// Solidity: function setRle(uint256 id, bytes male, bytes female) returns()
func (_SwapMeet *SwapMeetSession) SetRle(id *big.Int, male []byte, female []byte) (*types.Transaction, error) {
	return _SwapMeet.Contract.SetRle(&_SwapMeet.TransactOpts, id, male, female)
}

// SetRle is a paid mutator transaction binding the contract method 0x76f44143.
//
// Solidity: function setRle(uint256 id, bytes male, bytes female) returns()
func (_SwapMeet *SwapMeetTransactorSession) SetRle(id *big.Int, male []byte, female []byte) (*types.Transaction, error) {
	return _SwapMeet.Contract.SetRle(&_SwapMeet.TransactOpts, id, male, female)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_SwapMeet *SwapMeetTransactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _SwapMeet.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_SwapMeet *SwapMeetSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _SwapMeet.Contract.TransferOwnership(&_SwapMeet.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_SwapMeet *SwapMeetTransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _SwapMeet.Contract.TransferOwnership(&_SwapMeet.TransactOpts, newOwner)
}

// SwapMeetApprovalForAllIterator is returned from FilterApprovalForAll and is used to iterate over the raw logs and unpacked data for ApprovalForAll events raised by the SwapMeet contract.
type SwapMeetApprovalForAllIterator struct {
	Event *SwapMeetApprovalForAll // Event containing the contract specifics and raw log

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
func (it *SwapMeetApprovalForAllIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SwapMeetApprovalForAll)
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
		it.Event = new(SwapMeetApprovalForAll)
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
func (it *SwapMeetApprovalForAllIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SwapMeetApprovalForAllIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SwapMeetApprovalForAll represents a ApprovalForAll event raised by the SwapMeet contract.
type SwapMeetApprovalForAll struct {
	Account  common.Address
	Operator common.Address
	Approved bool
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterApprovalForAll is a free log retrieval operation binding the contract event 0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31.
//
// Solidity: event ApprovalForAll(address indexed account, address indexed operator, bool approved)
func (_SwapMeet *SwapMeetFilterer) FilterApprovalForAll(opts *bind.FilterOpts, account []common.Address, operator []common.Address) (*SwapMeetApprovalForAllIterator, error) {

	var accountRule []interface{}
	for _, accountItem := range account {
		accountRule = append(accountRule, accountItem)
	}
	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}

	logs, sub, err := _SwapMeet.contract.FilterLogs(opts, "ApprovalForAll", accountRule, operatorRule)
	if err != nil {
		return nil, err
	}
	return &SwapMeetApprovalForAllIterator{contract: _SwapMeet.contract, event: "ApprovalForAll", logs: logs, sub: sub}, nil
}

// WatchApprovalForAll is a free log subscription operation binding the contract event 0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31.
//
// Solidity: event ApprovalForAll(address indexed account, address indexed operator, bool approved)
func (_SwapMeet *SwapMeetFilterer) WatchApprovalForAll(opts *bind.WatchOpts, sink chan<- *SwapMeetApprovalForAll, account []common.Address, operator []common.Address) (event.Subscription, error) {

	var accountRule []interface{}
	for _, accountItem := range account {
		accountRule = append(accountRule, accountItem)
	}
	var operatorRule []interface{}
	for _, operatorItem := range operator {
		operatorRule = append(operatorRule, operatorItem)
	}

	logs, sub, err := _SwapMeet.contract.WatchLogs(opts, "ApprovalForAll", accountRule, operatorRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SwapMeetApprovalForAll)
				if err := _SwapMeet.contract.UnpackLog(event, "ApprovalForAll", log); err != nil {
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
func (_SwapMeet *SwapMeetFilterer) ParseApprovalForAll(log types.Log) (*SwapMeetApprovalForAll, error) {
	event := new(SwapMeetApprovalForAll)
	if err := _SwapMeet.contract.UnpackLog(event, "ApprovalForAll", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SwapMeetOwnershipTransferredIterator is returned from FilterOwnershipTransferred and is used to iterate over the raw logs and unpacked data for OwnershipTransferred events raised by the SwapMeet contract.
type SwapMeetOwnershipTransferredIterator struct {
	Event *SwapMeetOwnershipTransferred // Event containing the contract specifics and raw log

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
func (it *SwapMeetOwnershipTransferredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SwapMeetOwnershipTransferred)
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
		it.Event = new(SwapMeetOwnershipTransferred)
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
func (it *SwapMeetOwnershipTransferredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SwapMeetOwnershipTransferredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SwapMeetOwnershipTransferred represents a OwnershipTransferred event raised by the SwapMeet contract.
type SwapMeetOwnershipTransferred struct {
	PreviousOwner common.Address
	NewOwner      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterOwnershipTransferred is a free log retrieval operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_SwapMeet *SwapMeetFilterer) FilterOwnershipTransferred(opts *bind.FilterOpts, previousOwner []common.Address, newOwner []common.Address) (*SwapMeetOwnershipTransferredIterator, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _SwapMeet.contract.FilterLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return &SwapMeetOwnershipTransferredIterator{contract: _SwapMeet.contract, event: "OwnershipTransferred", logs: logs, sub: sub}, nil
}

// WatchOwnershipTransferred is a free log subscription operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_SwapMeet *SwapMeetFilterer) WatchOwnershipTransferred(opts *bind.WatchOpts, sink chan<- *SwapMeetOwnershipTransferred, previousOwner []common.Address, newOwner []common.Address) (event.Subscription, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _SwapMeet.contract.WatchLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SwapMeetOwnershipTransferred)
				if err := _SwapMeet.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
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
func (_SwapMeet *SwapMeetFilterer) ParseOwnershipTransferred(log types.Log) (*SwapMeetOwnershipTransferred, error) {
	event := new(SwapMeetOwnershipTransferred)
	if err := _SwapMeet.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SwapMeetSetRleIterator is returned from FilterSetRle and is used to iterate over the raw logs and unpacked data for SetRle events raised by the SwapMeet contract.
type SwapMeetSetRleIterator struct {
	Event *SwapMeetSetRle // Event containing the contract specifics and raw log

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
func (it *SwapMeetSetRleIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SwapMeetSetRle)
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
		it.Event = new(SwapMeetSetRle)
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
func (it *SwapMeetSetRleIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SwapMeetSetRleIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SwapMeetSetRle represents a SetRle event raised by the SwapMeet contract.
type SwapMeetSetRle struct {
	Id  *big.Int
	Raw types.Log // Blockchain specific contextual infos
}

// FilterSetRle is a free log retrieval operation binding the contract event 0x945558bcba07fa0f70f986544b6da6f780ddb36e537da2e92fcf2a9c0dd04ab6.
//
// Solidity: event SetRle(uint256 id)
func (_SwapMeet *SwapMeetFilterer) FilterSetRle(opts *bind.FilterOpts) (*SwapMeetSetRleIterator, error) {

	logs, sub, err := _SwapMeet.contract.FilterLogs(opts, "SetRle")
	if err != nil {
		return nil, err
	}
	return &SwapMeetSetRleIterator{contract: _SwapMeet.contract, event: "SetRle", logs: logs, sub: sub}, nil
}

// WatchSetRle is a free log subscription operation binding the contract event 0x945558bcba07fa0f70f986544b6da6f780ddb36e537da2e92fcf2a9c0dd04ab6.
//
// Solidity: event SetRle(uint256 id)
func (_SwapMeet *SwapMeetFilterer) WatchSetRle(opts *bind.WatchOpts, sink chan<- *SwapMeetSetRle) (event.Subscription, error) {

	logs, sub, err := _SwapMeet.contract.WatchLogs(opts, "SetRle")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SwapMeetSetRle)
				if err := _SwapMeet.contract.UnpackLog(event, "SetRle", log); err != nil {
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

// ParseSetRle is a log parse operation binding the contract event 0x945558bcba07fa0f70f986544b6da6f780ddb36e537da2e92fcf2a9c0dd04ab6.
//
// Solidity: event SetRle(uint256 id)
func (_SwapMeet *SwapMeetFilterer) ParseSetRle(log types.Log) (*SwapMeetSetRle, error) {
	event := new(SwapMeetSetRle)
	if err := _SwapMeet.contract.UnpackLog(event, "SetRle", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SwapMeetTransferBatchIterator is returned from FilterTransferBatch and is used to iterate over the raw logs and unpacked data for TransferBatch events raised by the SwapMeet contract.
type SwapMeetTransferBatchIterator struct {
	Event *SwapMeetTransferBatch // Event containing the contract specifics and raw log

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
func (it *SwapMeetTransferBatchIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SwapMeetTransferBatch)
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
		it.Event = new(SwapMeetTransferBatch)
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
func (it *SwapMeetTransferBatchIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SwapMeetTransferBatchIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SwapMeetTransferBatch represents a TransferBatch event raised by the SwapMeet contract.
type SwapMeetTransferBatch struct {
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
func (_SwapMeet *SwapMeetFilterer) FilterTransferBatch(opts *bind.FilterOpts, operator []common.Address, from []common.Address, to []common.Address) (*SwapMeetTransferBatchIterator, error) {

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

	logs, sub, err := _SwapMeet.contract.FilterLogs(opts, "TransferBatch", operatorRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &SwapMeetTransferBatchIterator{contract: _SwapMeet.contract, event: "TransferBatch", logs: logs, sub: sub}, nil
}

// WatchTransferBatch is a free log subscription operation binding the contract event 0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb.
//
// Solidity: event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)
func (_SwapMeet *SwapMeetFilterer) WatchTransferBatch(opts *bind.WatchOpts, sink chan<- *SwapMeetTransferBatch, operator []common.Address, from []common.Address, to []common.Address) (event.Subscription, error) {

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

	logs, sub, err := _SwapMeet.contract.WatchLogs(opts, "TransferBatch", operatorRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SwapMeetTransferBatch)
				if err := _SwapMeet.contract.UnpackLog(event, "TransferBatch", log); err != nil {
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
func (_SwapMeet *SwapMeetFilterer) ParseTransferBatch(log types.Log) (*SwapMeetTransferBatch, error) {
	event := new(SwapMeetTransferBatch)
	if err := _SwapMeet.contract.UnpackLog(event, "TransferBatch", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SwapMeetTransferSingleIterator is returned from FilterTransferSingle and is used to iterate over the raw logs and unpacked data for TransferSingle events raised by the SwapMeet contract.
type SwapMeetTransferSingleIterator struct {
	Event *SwapMeetTransferSingle // Event containing the contract specifics and raw log

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
func (it *SwapMeetTransferSingleIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SwapMeetTransferSingle)
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
		it.Event = new(SwapMeetTransferSingle)
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
func (it *SwapMeetTransferSingleIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SwapMeetTransferSingleIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SwapMeetTransferSingle represents a TransferSingle event raised by the SwapMeet contract.
type SwapMeetTransferSingle struct {
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
func (_SwapMeet *SwapMeetFilterer) FilterTransferSingle(opts *bind.FilterOpts, operator []common.Address, from []common.Address, to []common.Address) (*SwapMeetTransferSingleIterator, error) {

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

	logs, sub, err := _SwapMeet.contract.FilterLogs(opts, "TransferSingle", operatorRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return &SwapMeetTransferSingleIterator{contract: _SwapMeet.contract, event: "TransferSingle", logs: logs, sub: sub}, nil
}

// WatchTransferSingle is a free log subscription operation binding the contract event 0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62.
//
// Solidity: event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)
func (_SwapMeet *SwapMeetFilterer) WatchTransferSingle(opts *bind.WatchOpts, sink chan<- *SwapMeetTransferSingle, operator []common.Address, from []common.Address, to []common.Address) (event.Subscription, error) {

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

	logs, sub, err := _SwapMeet.contract.WatchLogs(opts, "TransferSingle", operatorRule, fromRule, toRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SwapMeetTransferSingle)
				if err := _SwapMeet.contract.UnpackLog(event, "TransferSingle", log); err != nil {
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
func (_SwapMeet *SwapMeetFilterer) ParseTransferSingle(log types.Log) (*SwapMeetTransferSingle, error) {
	event := new(SwapMeetTransferSingle)
	if err := _SwapMeet.contract.UnpackLog(event, "TransferSingle", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// SwapMeetURIIterator is returned from FilterURI and is used to iterate over the raw logs and unpacked data for URI events raised by the SwapMeet contract.
type SwapMeetURIIterator struct {
	Event *SwapMeetURI // Event containing the contract specifics and raw log

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
func (it *SwapMeetURIIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(SwapMeetURI)
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
		it.Event = new(SwapMeetURI)
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
func (it *SwapMeetURIIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *SwapMeetURIIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// SwapMeetURI represents a URI event raised by the SwapMeet contract.
type SwapMeetURI struct {
	Value string
	Id    *big.Int
	Raw   types.Log // Blockchain specific contextual infos
}

// FilterURI is a free log retrieval operation binding the contract event 0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b.
//
// Solidity: event URI(string value, uint256 indexed id)
func (_SwapMeet *SwapMeetFilterer) FilterURI(opts *bind.FilterOpts, id []*big.Int) (*SwapMeetURIIterator, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _SwapMeet.contract.FilterLogs(opts, "URI", idRule)
	if err != nil {
		return nil, err
	}
	return &SwapMeetURIIterator{contract: _SwapMeet.contract, event: "URI", logs: logs, sub: sub}, nil
}

// WatchURI is a free log subscription operation binding the contract event 0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b.
//
// Solidity: event URI(string value, uint256 indexed id)
func (_SwapMeet *SwapMeetFilterer) WatchURI(opts *bind.WatchOpts, sink chan<- *SwapMeetURI, id []*big.Int) (event.Subscription, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _SwapMeet.contract.WatchLogs(opts, "URI", idRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(SwapMeetURI)
				if err := _SwapMeet.contract.UnpackLog(event, "URI", log); err != nil {
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
func (_SwapMeet *SwapMeetFilterer) ParseURI(log types.Log) (*SwapMeetURI, error) {
	event := new(SwapMeetURI)
	if err := _SwapMeet.contract.UnpackLog(event, "URI", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
