/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { DopeInitiator, DopeInitiatorInterface } from "../DopeInitiator";

const _abi = [
  {
    type: "constructor",
    inputs: [],
  },
  {
    type: "function",
    name: "estimate",
    inputs: [
      {
        internalType: "uint256",
        name: "paper",
        type: "uint256",
      },
    ],
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "initiate",
    inputs: [
      {
        internalType: "struct Initiator.Order",
        name: "order",
        type: "tuple",
        components: [
          {
            type: "address",
          },
          {
            type: "uint8",
          },
          {
            type: "bytes32[2]",
          },
          {
            type: "uint256",
          },
          {
            type: "uint256",
          },
          {
            type: "uint256",
          },
          {
            type: "uint256",
          },
          {
            type: "uint256",
          },
          {
            type: "bytes",
          },
          {
            type: "bytes",
          },
        ],
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "struct IHustlerActions.SetMetadata",
        name: "meta",
        type: "tuple",
        components: [
          {
            type: "bytes4",
          },
          {
            type: "bytes4",
          },
          {
            type: "bytes2",
          },
          {
            type: "uint8[4]",
          },
          {
            type: "uint8[4]",
          },
          {
            type: "uint8[10]",
          },
          {
            type: "bytes2",
          },
          {
            type: "string",
          },
        ],
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "openseaEth",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "paperEth",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "paperOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "receive",
  },
];

export class DopeInitiator__factory {
  static readonly abi = _abi;
  static createInterface(): DopeInitiatorInterface {
    return new utils.Interface(_abi) as DopeInitiatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DopeInitiator {
    return new Contract(address, _abi, signerOrProvider) as DopeInitiator;
  }
}
