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

// ComponentsMetaData contains all meta data concerning the Components contract.
var ComponentsMetaData = &bind.MetaData{
	ABI: "[{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"id\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"componentType\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"component\",\"type\":\"string\"}],\"name\":\"AddComponent\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"accessories\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint8\",\"name\":\"componentType\",\"type\":\"uint8\"},{\"internalType\":\"string\",\"name\":\"component\",\"type\":\"string\"}],\"name\":\"addComponent\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint8[5]\",\"name\":\"components\",\"type\":\"uint8[5]\"},{\"internalType\":\"uint8\",\"name\":\"componentType\",\"type\":\"uint8\"}],\"name\":\"attributes\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"clothes\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"drugs\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"footArmor\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"handArmor\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"items\",\"outputs\":[{\"internalType\":\"uint8[5][9]\",\"name\":\"items_\",\"type\":\"uint8[5][9]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint8\",\"name\":\"componentType\",\"type\":\"uint8\"},{\"internalType\":\"uint256\",\"name\":\"idx\",\"type\":\"uint256\"}],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"namePrefixes\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"nameSuffixes\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"necklaces\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint8\",\"name\":\"prefixComponent\",\"type\":\"uint8\"},{\"internalType\":\"uint8\",\"name\":\"suffixComponent\",\"type\":\"uint8\"}],\"name\":\"prefix\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"rings\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"uint8\",\"name\":\"componentType\",\"type\":\"uint8\"}],\"name\":\"seed\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint8\",\"name\":\"suffixComponent\",\"type\":\"uint8\"}],\"name\":\"suffix\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"suffixes\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"hustlerId\",\"type\":\"uint256\"}],\"name\":\"title\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"vehicle\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"waistArmor\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"weapons\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]",
}

// ComponentsABI is the input ABI used to generate the binding from.
// Deprecated: Use ComponentsMetaData.ABI instead.
var ComponentsABI = ComponentsMetaData.ABI

// Components is an auto generated Go binding around an Ethereum contract.
type Components struct {
	ComponentsCaller     // Read-only binding to the contract
	ComponentsTransactor // Write-only binding to the contract
	ComponentsFilterer   // Log filterer for contract events
}

// ComponentsCaller is an auto generated read-only Go binding around an Ethereum contract.
type ComponentsCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ComponentsTransactor is an auto generated write-only Go binding around an Ethereum contract.
type ComponentsTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ComponentsFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type ComponentsFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ComponentsSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type ComponentsSession struct {
	Contract     *Components       // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// ComponentsCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type ComponentsCallerSession struct {
	Contract *ComponentsCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts     // Call options to use throughout this session
}

// ComponentsTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type ComponentsTransactorSession struct {
	Contract     *ComponentsTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts     // Transaction auth options to use throughout this session
}

// ComponentsRaw is an auto generated low-level Go binding around an Ethereum contract.
type ComponentsRaw struct {
	Contract *Components // Generic contract binding to access the raw methods on
}

// ComponentsCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type ComponentsCallerRaw struct {
	Contract *ComponentsCaller // Generic read-only contract binding to access the raw methods on
}

// ComponentsTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type ComponentsTransactorRaw struct {
	Contract *ComponentsTransactor // Generic write-only contract binding to access the raw methods on
}

// NewComponents creates a new instance of Components, bound to a specific deployed contract.
func NewComponents(address common.Address, backend bind.ContractBackend) (*Components, error) {
	contract, err := bindComponents(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Components{ComponentsCaller: ComponentsCaller{contract: contract}, ComponentsTransactor: ComponentsTransactor{contract: contract}, ComponentsFilterer: ComponentsFilterer{contract: contract}}, nil
}

// NewComponentsCaller creates a new read-only instance of Components, bound to a specific deployed contract.
func NewComponentsCaller(address common.Address, caller bind.ContractCaller) (*ComponentsCaller, error) {
	contract, err := bindComponents(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &ComponentsCaller{contract: contract}, nil
}

// NewComponentsTransactor creates a new write-only instance of Components, bound to a specific deployed contract.
func NewComponentsTransactor(address common.Address, transactor bind.ContractTransactor) (*ComponentsTransactor, error) {
	contract, err := bindComponents(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &ComponentsTransactor{contract: contract}, nil
}

// NewComponentsFilterer creates a new log filterer instance of Components, bound to a specific deployed contract.
func NewComponentsFilterer(address common.Address, filterer bind.ContractFilterer) (*ComponentsFilterer, error) {
	contract, err := bindComponents(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &ComponentsFilterer{contract: contract}, nil
}

// bindComponents binds a generic wrapper to an already deployed contract.
func bindComponents(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(ComponentsABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Components *ComponentsRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Components.Contract.ComponentsCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Components *ComponentsRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Components.Contract.ComponentsTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Components *ComponentsRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Components.Contract.ComponentsTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Components *ComponentsCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _Components.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Components *ComponentsTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Components.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Components *ComponentsTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Components.Contract.contract.Transact(opts, method, params...)
}

// Accessories is a free data retrieval call binding the contract method 0x7ca94210.
//
// Solidity: function accessories(uint256 ) view returns(string)
func (_Components *ComponentsCaller) Accessories(opts *bind.CallOpts, arg0 *big.Int) (string, error) {
	var out []interface{}
	err := _Components.contract.Call(opts, &out, "accessories", arg0)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Accessories is a free data retrieval call binding the contract method 0x7ca94210.
//
// Solidity: function accessories(uint256 ) view returns(string)
func (_Components *ComponentsSession) Accessories(arg0 *big.Int) (string, error) {
	return _Components.Contract.Accessories(&_Components.CallOpts, arg0)
}

// Accessories is a free data retrieval call binding the contract method 0x7ca94210.
//
// Solidity: function accessories(uint256 ) view returns(string)
func (_Components *ComponentsCallerSession) Accessories(arg0 *big.Int) (string, error) {
	return _Components.Contract.Accessories(&_Components.CallOpts, arg0)
}

// Attributes is a free data retrieval call binding the contract method 0x1618bae9.
//
// Solidity: function attributes(uint8[5] components, uint8 componentType) view returns(string)
func (_Components *ComponentsCaller) Attributes(opts *bind.CallOpts, components [5]uint8, componentType uint8) (string, error) {
	var out []interface{}
	err := _Components.contract.Call(opts, &out, "attributes", components, componentType)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Attributes is a free data retrieval call binding the contract method 0x1618bae9.
//
// Solidity: function attributes(uint8[5] components, uint8 componentType) view returns(string)
func (_Components *ComponentsSession) Attributes(components [5]uint8, componentType uint8) (string, error) {
	return _Components.Contract.Attributes(&_Components.CallOpts, components, componentType)
}

// Attributes is a free data retrieval call binding the contract method 0x1618bae9.
//
// Solidity: function attributes(uint8[5] components, uint8 componentType) view returns(string)
func (_Components *ComponentsCallerSession) Attributes(components [5]uint8, componentType uint8) (string, error) {
	return _Components.Contract.Attributes(&_Components.CallOpts, components, componentType)
}

// Clothes is a free data retrieval call binding the contract method 0xe1bf8c51.
//
// Solidity: function clothes(uint256 ) view returns(string)
func (_Components *ComponentsCaller) Clothes(opts *bind.CallOpts, arg0 *big.Int) (string, error) {
	var out []interface{}
	err := _Components.contract.Call(opts, &out, "clothes", arg0)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Clothes is a free data retrieval call binding the contract method 0xe1bf8c51.
//
// Solidity: function clothes(uint256 ) view returns(string)
func (_Components *ComponentsSession) Clothes(arg0 *big.Int) (string, error) {
	return _Components.Contract.Clothes(&_Components.CallOpts, arg0)
}

// Clothes is a free data retrieval call binding the contract method 0xe1bf8c51.
//
// Solidity: function clothes(uint256 ) view returns(string)
func (_Components *ComponentsCallerSession) Clothes(arg0 *big.Int) (string, error) {
	return _Components.Contract.Clothes(&_Components.CallOpts, arg0)
}

// Drugs is a free data retrieval call binding the contract method 0xfca5e61e.
//
// Solidity: function drugs(uint256 ) view returns(string)
func (_Components *ComponentsCaller) Drugs(opts *bind.CallOpts, arg0 *big.Int) (string, error) {
	var out []interface{}
	err := _Components.contract.Call(opts, &out, "drugs", arg0)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Drugs is a free data retrieval call binding the contract method 0xfca5e61e.
//
// Solidity: function drugs(uint256 ) view returns(string)
func (_Components *ComponentsSession) Drugs(arg0 *big.Int) (string, error) {
	return _Components.Contract.Drugs(&_Components.CallOpts, arg0)
}

// Drugs is a free data retrieval call binding the contract method 0xfca5e61e.
//
// Solidity: function drugs(uint256 ) view returns(string)
func (_Components *ComponentsCallerSession) Drugs(arg0 *big.Int) (string, error) {
	return _Components.Contract.Drugs(&_Components.CallOpts, arg0)
}

// FootArmor is a free data retrieval call binding the contract method 0x6435bece.
//
// Solidity: function footArmor(uint256 ) view returns(string)
func (_Components *ComponentsCaller) FootArmor(opts *bind.CallOpts, arg0 *big.Int) (string, error) {
	var out []interface{}
	err := _Components.contract.Call(opts, &out, "footArmor", arg0)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// FootArmor is a free data retrieval call binding the contract method 0x6435bece.
//
// Solidity: function footArmor(uint256 ) view returns(string)
func (_Components *ComponentsSession) FootArmor(arg0 *big.Int) (string, error) {
	return _Components.Contract.FootArmor(&_Components.CallOpts, arg0)
}

// FootArmor is a free data retrieval call binding the contract method 0x6435bece.
//
// Solidity: function footArmor(uint256 ) view returns(string)
func (_Components *ComponentsCallerSession) FootArmor(arg0 *big.Int) (string, error) {
	return _Components.Contract.FootArmor(&_Components.CallOpts, arg0)
}

// HandArmor is a free data retrieval call binding the contract method 0x4103d17a.
//
// Solidity: function handArmor(uint256 ) view returns(string)
func (_Components *ComponentsCaller) HandArmor(opts *bind.CallOpts, arg0 *big.Int) (string, error) {
	var out []interface{}
	err := _Components.contract.Call(opts, &out, "handArmor", arg0)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// HandArmor is a free data retrieval call binding the contract method 0x4103d17a.
//
// Solidity: function handArmor(uint256 ) view returns(string)
func (_Components *ComponentsSession) HandArmor(arg0 *big.Int) (string, error) {
	return _Components.Contract.HandArmor(&_Components.CallOpts, arg0)
}

// HandArmor is a free data retrieval call binding the contract method 0x4103d17a.
//
// Solidity: function handArmor(uint256 ) view returns(string)
func (_Components *ComponentsCallerSession) HandArmor(arg0 *big.Int) (string, error) {
	return _Components.Contract.HandArmor(&_Components.CallOpts, arg0)
}

// Items is a free data retrieval call binding the contract method 0xbfb231d2.
//
// Solidity: function items(uint256 tokenId) view returns(uint8[5][9] items_)
func (_Components *ComponentsCaller) Items(opts *bind.CallOpts, tokenId *big.Int) ([9][5]uint8, error) {
	var out []interface{}
	err := _Components.contract.Call(opts, &out, "items", tokenId)

	if err != nil {
		return *new([9][5]uint8), err
	}

	out0 := *abi.ConvertType(out[0], new([9][5]uint8)).(*[9][5]uint8)

	return out0, err

}

// Items is a free data retrieval call binding the contract method 0xbfb231d2.
//
// Solidity: function items(uint256 tokenId) view returns(uint8[5][9] items_)
func (_Components *ComponentsSession) Items(tokenId *big.Int) ([9][5]uint8, error) {
	return _Components.Contract.Items(&_Components.CallOpts, tokenId)
}

// Items is a free data retrieval call binding the contract method 0xbfb231d2.
//
// Solidity: function items(uint256 tokenId) view returns(uint8[5][9] items_)
func (_Components *ComponentsCallerSession) Items(tokenId *big.Int) ([9][5]uint8, error) {
	return _Components.Contract.Items(&_Components.CallOpts, tokenId)
}

// Name is a free data retrieval call binding the contract method 0x30cd35ef.
//
// Solidity: function name(uint8 componentType, uint256 idx) view returns(string)
func (_Components *ComponentsCaller) Name(opts *bind.CallOpts, componentType uint8, idx *big.Int) (string, error) {
	var out []interface{}
	err := _Components.contract.Call(opts, &out, "name", componentType, idx)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Name is a free data retrieval call binding the contract method 0x30cd35ef.
//
// Solidity: function name(uint8 componentType, uint256 idx) view returns(string)
func (_Components *ComponentsSession) Name(componentType uint8, idx *big.Int) (string, error) {
	return _Components.Contract.Name(&_Components.CallOpts, componentType, idx)
}

// Name is a free data retrieval call binding the contract method 0x30cd35ef.
//
// Solidity: function name(uint8 componentType, uint256 idx) view returns(string)
func (_Components *ComponentsCallerSession) Name(componentType uint8, idx *big.Int) (string, error) {
	return _Components.Contract.Name(&_Components.CallOpts, componentType, idx)
}

// NamePrefixes is a free data retrieval call binding the contract method 0xe7933eef.
//
// Solidity: function namePrefixes(uint256 ) view returns(string)
func (_Components *ComponentsCaller) NamePrefixes(opts *bind.CallOpts, arg0 *big.Int) (string, error) {
	var out []interface{}
	err := _Components.contract.Call(opts, &out, "namePrefixes", arg0)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// NamePrefixes is a free data retrieval call binding the contract method 0xe7933eef.
//
// Solidity: function namePrefixes(uint256 ) view returns(string)
func (_Components *ComponentsSession) NamePrefixes(arg0 *big.Int) (string, error) {
	return _Components.Contract.NamePrefixes(&_Components.CallOpts, arg0)
}

// NamePrefixes is a free data retrieval call binding the contract method 0xe7933eef.
//
// Solidity: function namePrefixes(uint256 ) view returns(string)
func (_Components *ComponentsCallerSession) NamePrefixes(arg0 *big.Int) (string, error) {
	return _Components.Contract.NamePrefixes(&_Components.CallOpts, arg0)
}

// NameSuffixes is a free data retrieval call binding the contract method 0xf946e3bc.
//
// Solidity: function nameSuffixes(uint256 ) view returns(string)
func (_Components *ComponentsCaller) NameSuffixes(opts *bind.CallOpts, arg0 *big.Int) (string, error) {
	var out []interface{}
	err := _Components.contract.Call(opts, &out, "nameSuffixes", arg0)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// NameSuffixes is a free data retrieval call binding the contract method 0xf946e3bc.
//
// Solidity: function nameSuffixes(uint256 ) view returns(string)
func (_Components *ComponentsSession) NameSuffixes(arg0 *big.Int) (string, error) {
	return _Components.Contract.NameSuffixes(&_Components.CallOpts, arg0)
}

// NameSuffixes is a free data retrieval call binding the contract method 0xf946e3bc.
//
// Solidity: function nameSuffixes(uint256 ) view returns(string)
func (_Components *ComponentsCallerSession) NameSuffixes(arg0 *big.Int) (string, error) {
	return _Components.Contract.NameSuffixes(&_Components.CallOpts, arg0)
}

// Necklaces is a free data retrieval call binding the contract method 0x08008f35.
//
// Solidity: function necklaces(uint256 ) view returns(string)
func (_Components *ComponentsCaller) Necklaces(opts *bind.CallOpts, arg0 *big.Int) (string, error) {
	var out []interface{}
	err := _Components.contract.Call(opts, &out, "necklaces", arg0)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Necklaces is a free data retrieval call binding the contract method 0x08008f35.
//
// Solidity: function necklaces(uint256 ) view returns(string)
func (_Components *ComponentsSession) Necklaces(arg0 *big.Int) (string, error) {
	return _Components.Contract.Necklaces(&_Components.CallOpts, arg0)
}

// Necklaces is a free data retrieval call binding the contract method 0x08008f35.
//
// Solidity: function necklaces(uint256 ) view returns(string)
func (_Components *ComponentsCallerSession) Necklaces(arg0 *big.Int) (string, error) {
	return _Components.Contract.Necklaces(&_Components.CallOpts, arg0)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Components *ComponentsCaller) Owner(opts *bind.CallOpts) (common.Address, error) {
	var out []interface{}
	err := _Components.contract.Call(opts, &out, "owner")

	if err != nil {
		return *new(common.Address), err
	}

	out0 := *abi.ConvertType(out[0], new(common.Address)).(*common.Address)

	return out0, err

}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Components *ComponentsSession) Owner() (common.Address, error) {
	return _Components.Contract.Owner(&_Components.CallOpts)
}

// Owner is a free data retrieval call binding the contract method 0x8da5cb5b.
//
// Solidity: function owner() view returns(address)
func (_Components *ComponentsCallerSession) Owner() (common.Address, error) {
	return _Components.Contract.Owner(&_Components.CallOpts)
}

// Prefix is a free data retrieval call binding the contract method 0xb12fa6a4.
//
// Solidity: function prefix(uint8 prefixComponent, uint8 suffixComponent) view returns(string)
func (_Components *ComponentsCaller) Prefix(opts *bind.CallOpts, prefixComponent uint8, suffixComponent uint8) (string, error) {
	var out []interface{}
	err := _Components.contract.Call(opts, &out, "prefix", prefixComponent, suffixComponent)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Prefix is a free data retrieval call binding the contract method 0xb12fa6a4.
//
// Solidity: function prefix(uint8 prefixComponent, uint8 suffixComponent) view returns(string)
func (_Components *ComponentsSession) Prefix(prefixComponent uint8, suffixComponent uint8) (string, error) {
	return _Components.Contract.Prefix(&_Components.CallOpts, prefixComponent, suffixComponent)
}

// Prefix is a free data retrieval call binding the contract method 0xb12fa6a4.
//
// Solidity: function prefix(uint8 prefixComponent, uint8 suffixComponent) view returns(string)
func (_Components *ComponentsCallerSession) Prefix(prefixComponent uint8, suffixComponent uint8) (string, error) {
	return _Components.Contract.Prefix(&_Components.CallOpts, prefixComponent, suffixComponent)
}

// Rings is a free data retrieval call binding the contract method 0xfb29885d.
//
// Solidity: function rings(uint256 ) view returns(string)
func (_Components *ComponentsCaller) Rings(opts *bind.CallOpts, arg0 *big.Int) (string, error) {
	var out []interface{}
	err := _Components.contract.Call(opts, &out, "rings", arg0)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Rings is a free data retrieval call binding the contract method 0xfb29885d.
//
// Solidity: function rings(uint256 ) view returns(string)
func (_Components *ComponentsSession) Rings(arg0 *big.Int) (string, error) {
	return _Components.Contract.Rings(&_Components.CallOpts, arg0)
}

// Rings is a free data retrieval call binding the contract method 0xfb29885d.
//
// Solidity: function rings(uint256 ) view returns(string)
func (_Components *ComponentsCallerSession) Rings(arg0 *big.Int) (string, error) {
	return _Components.Contract.Rings(&_Components.CallOpts, arg0)
}

// Seed is a free data retrieval call binding the contract method 0x69a59674.
//
// Solidity: function seed(uint256 tokenId, uint8 componentType) view returns(uint256, uint256)
func (_Components *ComponentsCaller) Seed(opts *bind.CallOpts, tokenId *big.Int, componentType uint8) (*big.Int, *big.Int, error) {
	var out []interface{}
	err := _Components.contract.Call(opts, &out, "seed", tokenId, componentType)

	if err != nil {
		return *new(*big.Int), *new(*big.Int), err
	}

	out0 := *abi.ConvertType(out[0], new(*big.Int)).(**big.Int)
	out1 := *abi.ConvertType(out[1], new(*big.Int)).(**big.Int)

	return out0, out1, err

}

// Seed is a free data retrieval call binding the contract method 0x69a59674.
//
// Solidity: function seed(uint256 tokenId, uint8 componentType) view returns(uint256, uint256)
func (_Components *ComponentsSession) Seed(tokenId *big.Int, componentType uint8) (*big.Int, *big.Int, error) {
	return _Components.Contract.Seed(&_Components.CallOpts, tokenId, componentType)
}

// Seed is a free data retrieval call binding the contract method 0x69a59674.
//
// Solidity: function seed(uint256 tokenId, uint8 componentType) view returns(uint256, uint256)
func (_Components *ComponentsCallerSession) Seed(tokenId *big.Int, componentType uint8) (*big.Int, *big.Int, error) {
	return _Components.Contract.Seed(&_Components.CallOpts, tokenId, componentType)
}

// Suffix is a free data retrieval call binding the contract method 0x21eee8f4.
//
// Solidity: function suffix(uint8 suffixComponent) view returns(string)
func (_Components *ComponentsCaller) Suffix(opts *bind.CallOpts, suffixComponent uint8) (string, error) {
	var out []interface{}
	err := _Components.contract.Call(opts, &out, "suffix", suffixComponent)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Suffix is a free data retrieval call binding the contract method 0x21eee8f4.
//
// Solidity: function suffix(uint8 suffixComponent) view returns(string)
func (_Components *ComponentsSession) Suffix(suffixComponent uint8) (string, error) {
	return _Components.Contract.Suffix(&_Components.CallOpts, suffixComponent)
}

// Suffix is a free data retrieval call binding the contract method 0x21eee8f4.
//
// Solidity: function suffix(uint8 suffixComponent) view returns(string)
func (_Components *ComponentsCallerSession) Suffix(suffixComponent uint8) (string, error) {
	return _Components.Contract.Suffix(&_Components.CallOpts, suffixComponent)
}

// Suffixes is a free data retrieval call binding the contract method 0xb6c75784.
//
// Solidity: function suffixes(uint256 ) view returns(string)
func (_Components *ComponentsCaller) Suffixes(opts *bind.CallOpts, arg0 *big.Int) (string, error) {
	var out []interface{}
	err := _Components.contract.Call(opts, &out, "suffixes", arg0)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Suffixes is a free data retrieval call binding the contract method 0xb6c75784.
//
// Solidity: function suffixes(uint256 ) view returns(string)
func (_Components *ComponentsSession) Suffixes(arg0 *big.Int) (string, error) {
	return _Components.Contract.Suffixes(&_Components.CallOpts, arg0)
}

// Suffixes is a free data retrieval call binding the contract method 0xb6c75784.
//
// Solidity: function suffixes(uint256 ) view returns(string)
func (_Components *ComponentsCallerSession) Suffixes(arg0 *big.Int) (string, error) {
	return _Components.Contract.Suffixes(&_Components.CallOpts, arg0)
}

// Title is a free data retrieval call binding the contract method 0x35a1223a.
//
// Solidity: function title(uint256 hustlerId) view returns(string)
func (_Components *ComponentsCaller) Title(opts *bind.CallOpts, hustlerId *big.Int) (string, error) {
	var out []interface{}
	err := _Components.contract.Call(opts, &out, "title", hustlerId)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Title is a free data retrieval call binding the contract method 0x35a1223a.
//
// Solidity: function title(uint256 hustlerId) view returns(string)
func (_Components *ComponentsSession) Title(hustlerId *big.Int) (string, error) {
	return _Components.Contract.Title(&_Components.CallOpts, hustlerId)
}

// Title is a free data retrieval call binding the contract method 0x35a1223a.
//
// Solidity: function title(uint256 hustlerId) view returns(string)
func (_Components *ComponentsCallerSession) Title(hustlerId *big.Int) (string, error) {
	return _Components.Contract.Title(&_Components.CallOpts, hustlerId)
}

// Vehicle is a free data retrieval call binding the contract method 0xa39ab40e.
//
// Solidity: function vehicle(uint256 ) view returns(string)
func (_Components *ComponentsCaller) Vehicle(opts *bind.CallOpts, arg0 *big.Int) (string, error) {
	var out []interface{}
	err := _Components.contract.Call(opts, &out, "vehicle", arg0)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Vehicle is a free data retrieval call binding the contract method 0xa39ab40e.
//
// Solidity: function vehicle(uint256 ) view returns(string)
func (_Components *ComponentsSession) Vehicle(arg0 *big.Int) (string, error) {
	return _Components.Contract.Vehicle(&_Components.CallOpts, arg0)
}

// Vehicle is a free data retrieval call binding the contract method 0xa39ab40e.
//
// Solidity: function vehicle(uint256 ) view returns(string)
func (_Components *ComponentsCallerSession) Vehicle(arg0 *big.Int) (string, error) {
	return _Components.Contract.Vehicle(&_Components.CallOpts, arg0)
}

// WaistArmor is a free data retrieval call binding the contract method 0xec974202.
//
// Solidity: function waistArmor(uint256 ) view returns(string)
func (_Components *ComponentsCaller) WaistArmor(opts *bind.CallOpts, arg0 *big.Int) (string, error) {
	var out []interface{}
	err := _Components.contract.Call(opts, &out, "waistArmor", arg0)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// WaistArmor is a free data retrieval call binding the contract method 0xec974202.
//
// Solidity: function waistArmor(uint256 ) view returns(string)
func (_Components *ComponentsSession) WaistArmor(arg0 *big.Int) (string, error) {
	return _Components.Contract.WaistArmor(&_Components.CallOpts, arg0)
}

// WaistArmor is a free data retrieval call binding the contract method 0xec974202.
//
// Solidity: function waistArmor(uint256 ) view returns(string)
func (_Components *ComponentsCallerSession) WaistArmor(arg0 *big.Int) (string, error) {
	return _Components.Contract.WaistArmor(&_Components.CallOpts, arg0)
}

// Weapons is a free data retrieval call binding the contract method 0x555e73c8.
//
// Solidity: function weapons(uint256 ) view returns(string)
func (_Components *ComponentsCaller) Weapons(opts *bind.CallOpts, arg0 *big.Int) (string, error) {
	var out []interface{}
	err := _Components.contract.Call(opts, &out, "weapons", arg0)

	if err != nil {
		return *new(string), err
	}

	out0 := *abi.ConvertType(out[0], new(string)).(*string)

	return out0, err

}

// Weapons is a free data retrieval call binding the contract method 0x555e73c8.
//
// Solidity: function weapons(uint256 ) view returns(string)
func (_Components *ComponentsSession) Weapons(arg0 *big.Int) (string, error) {
	return _Components.Contract.Weapons(&_Components.CallOpts, arg0)
}

// Weapons is a free data retrieval call binding the contract method 0x555e73c8.
//
// Solidity: function weapons(uint256 ) view returns(string)
func (_Components *ComponentsCallerSession) Weapons(arg0 *big.Int) (string, error) {
	return _Components.Contract.Weapons(&_Components.CallOpts, arg0)
}

// AddComponent is a paid mutator transaction binding the contract method 0x1af82eea.
//
// Solidity: function addComponent(uint8 componentType, string component) returns(uint8)
func (_Components *ComponentsTransactor) AddComponent(opts *bind.TransactOpts, componentType uint8, component string) (*types.Transaction, error) {
	return _Components.contract.Transact(opts, "addComponent", componentType, component)
}

// AddComponent is a paid mutator transaction binding the contract method 0x1af82eea.
//
// Solidity: function addComponent(uint8 componentType, string component) returns(uint8)
func (_Components *ComponentsSession) AddComponent(componentType uint8, component string) (*types.Transaction, error) {
	return _Components.Contract.AddComponent(&_Components.TransactOpts, componentType, component)
}

// AddComponent is a paid mutator transaction binding the contract method 0x1af82eea.
//
// Solidity: function addComponent(uint8 componentType, string component) returns(uint8)
func (_Components *ComponentsTransactorSession) AddComponent(componentType uint8, component string) (*types.Transaction, error) {
	return _Components.Contract.AddComponent(&_Components.TransactOpts, componentType, component)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_Components *ComponentsTransactor) RenounceOwnership(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Components.contract.Transact(opts, "renounceOwnership")
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_Components *ComponentsSession) RenounceOwnership() (*types.Transaction, error) {
	return _Components.Contract.RenounceOwnership(&_Components.TransactOpts)
}

// RenounceOwnership is a paid mutator transaction binding the contract method 0x715018a6.
//
// Solidity: function renounceOwnership() returns()
func (_Components *ComponentsTransactorSession) RenounceOwnership() (*types.Transaction, error) {
	return _Components.Contract.RenounceOwnership(&_Components.TransactOpts)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_Components *ComponentsTransactor) TransferOwnership(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _Components.contract.Transact(opts, "transferOwnership", newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_Components *ComponentsSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Components.Contract.TransferOwnership(&_Components.TransactOpts, newOwner)
}

// TransferOwnership is a paid mutator transaction binding the contract method 0xf2fde38b.
//
// Solidity: function transferOwnership(address newOwner) returns()
func (_Components *ComponentsTransactorSession) TransferOwnership(newOwner common.Address) (*types.Transaction, error) {
	return _Components.Contract.TransferOwnership(&_Components.TransactOpts, newOwner)
}

// ComponentsAddComponentIterator is returned from FilterAddComponent and is used to iterate over the raw logs and unpacked data for AddComponent events raised by the Components contract.
type ComponentsAddComponentIterator struct {
	Event *ComponentsAddComponent // Event containing the contract specifics and raw log

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
func (it *ComponentsAddComponentIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ComponentsAddComponent)
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
		it.Event = new(ComponentsAddComponent)
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
func (it *ComponentsAddComponentIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ComponentsAddComponentIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ComponentsAddComponent represents a AddComponent event raised by the Components contract.
type ComponentsAddComponent struct {
	Id            *big.Int
	ComponentType *big.Int
	Component     string
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterAddComponent is a free log retrieval operation binding the contract event 0x2e217f1a97d5142937e18c125ce27e116d99307d0459daf9adcb8dfb896147de.
//
// Solidity: event AddComponent(uint256 id, uint256 componentType, string component)
func (_Components *ComponentsFilterer) FilterAddComponent(opts *bind.FilterOpts) (*ComponentsAddComponentIterator, error) {

	logs, sub, err := _Components.contract.FilterLogs(opts, "AddComponent")
	if err != nil {
		return nil, err
	}
	return &ComponentsAddComponentIterator{contract: _Components.contract, event: "AddComponent", logs: logs, sub: sub}, nil
}

// WatchAddComponent is a free log subscription operation binding the contract event 0x2e217f1a97d5142937e18c125ce27e116d99307d0459daf9adcb8dfb896147de.
//
// Solidity: event AddComponent(uint256 id, uint256 componentType, string component)
func (_Components *ComponentsFilterer) WatchAddComponent(opts *bind.WatchOpts, sink chan<- *ComponentsAddComponent) (event.Subscription, error) {

	logs, sub, err := _Components.contract.WatchLogs(opts, "AddComponent")
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ComponentsAddComponent)
				if err := _Components.contract.UnpackLog(event, "AddComponent", log); err != nil {
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

// ParseAddComponent is a log parse operation binding the contract event 0x2e217f1a97d5142937e18c125ce27e116d99307d0459daf9adcb8dfb896147de.
//
// Solidity: event AddComponent(uint256 id, uint256 componentType, string component)
func (_Components *ComponentsFilterer) ParseAddComponent(log types.Log) (*ComponentsAddComponent, error) {
	event := new(ComponentsAddComponent)
	if err := _Components.contract.UnpackLog(event, "AddComponent", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// ComponentsOwnershipTransferredIterator is returned from FilterOwnershipTransferred and is used to iterate over the raw logs and unpacked data for OwnershipTransferred events raised by the Components contract.
type ComponentsOwnershipTransferredIterator struct {
	Event *ComponentsOwnershipTransferred // Event containing the contract specifics and raw log

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
func (it *ComponentsOwnershipTransferredIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(ComponentsOwnershipTransferred)
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
		it.Event = new(ComponentsOwnershipTransferred)
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
func (it *ComponentsOwnershipTransferredIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *ComponentsOwnershipTransferredIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// ComponentsOwnershipTransferred represents a OwnershipTransferred event raised by the Components contract.
type ComponentsOwnershipTransferred struct {
	PreviousOwner common.Address
	NewOwner      common.Address
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterOwnershipTransferred is a free log retrieval operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_Components *ComponentsFilterer) FilterOwnershipTransferred(opts *bind.FilterOpts, previousOwner []common.Address, newOwner []common.Address) (*ComponentsOwnershipTransferredIterator, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Components.contract.FilterLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return &ComponentsOwnershipTransferredIterator{contract: _Components.contract, event: "OwnershipTransferred", logs: logs, sub: sub}, nil
}

// WatchOwnershipTransferred is a free log subscription operation binding the contract event 0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0.
//
// Solidity: event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
func (_Components *ComponentsFilterer) WatchOwnershipTransferred(opts *bind.WatchOpts, sink chan<- *ComponentsOwnershipTransferred, previousOwner []common.Address, newOwner []common.Address) (event.Subscription, error) {

	var previousOwnerRule []interface{}
	for _, previousOwnerItem := range previousOwner {
		previousOwnerRule = append(previousOwnerRule, previousOwnerItem)
	}
	var newOwnerRule []interface{}
	for _, newOwnerItem := range newOwner {
		newOwnerRule = append(newOwnerRule, newOwnerItem)
	}

	logs, sub, err := _Components.contract.WatchLogs(opts, "OwnershipTransferred", previousOwnerRule, newOwnerRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(ComponentsOwnershipTransferred)
				if err := _Components.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
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
func (_Components *ComponentsFilterer) ParseOwnershipTransferred(log types.Log) (*ComponentsOwnershipTransferred, error) {
	event := new(ComponentsOwnershipTransferred)
	if err := _Components.contract.UnpackLog(event, "OwnershipTransferred", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
