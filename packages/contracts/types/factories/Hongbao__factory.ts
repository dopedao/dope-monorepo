/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Hongbao, HongbaoInterface } from "../Hongbao";

const _abi = [
  {
    type: "constructor",
    inputs: [
      {
        internalType: "bytes32",
        name: "root",
        type: "bytes32",
      },
    ],
  },
  {
    type: "function",
    name: "claim",
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]",
      },
    ],
    outputs: [],
    constant: null,
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "claimed",
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    constant: null,
    stateMutability: "view",
  },
  {
    type: "function",
    name: "mint",
    inputs: [],
    outputs: [],
    constant: null,
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    constant: null,
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    constant: null,
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "root",
    inputs: [],
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    constant: null,
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferMaintainerOwner",
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    outputs: [],
    constant: null,
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    outputs: [],
    constant: null,
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Opened",
    inputs: [
      {
        name: "typ",
        type: "uint8",
        indexed: false,
      },
      {
        name: "id",
        type: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "Claimed",
    inputs: [],
  },
  {
    type: "error",
    name: "Invalid",
    inputs: [],
  },
];

export class Hongbao__factory {
  static readonly abi = _abi;
  static createInterface(): HongbaoInterface {
    return new utils.Interface(_abi) as HongbaoInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Hongbao {
    return new Contract(address, _abi, signerOrProvider) as Hongbao;
  }
}
