import { type ContractRunner } from "ethers";
import type { Hongbao, HongbaoInterface } from "../Hongbao";
export declare class Hongbao__factory {
    static readonly abi: readonly [{
        readonly type: "constructor";
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "root";
            readonly type: "bytes32";
        }];
    }, {
        readonly type: "function";
        readonly name: "claim";
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32[]";
            readonly name: "proof";
            readonly type: "bytes32[]";
        }];
        readonly outputs: readonly [];
        readonly constant: null;
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "claimed";
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly constant: null;
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "mint";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
        readonly constant: null;
        readonly stateMutability: "payable";
    }, {
        readonly type: "function";
        readonly name: "owner";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly constant: null;
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "renounceOwnership";
        readonly inputs: readonly [];
        readonly outputs: readonly [];
        readonly constant: null;
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "root";
        readonly inputs: readonly [];
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly constant: null;
        readonly stateMutability: "view";
    }, {
        readonly type: "function";
        readonly name: "transferMaintainerOwner";
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly outputs: readonly [];
        readonly constant: null;
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "function";
        readonly name: "transferOwnership";
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly outputs: readonly [];
        readonly constant: null;
        readonly stateMutability: "nonpayable";
    }, {
        readonly type: "event";
        readonly name: "Opened";
        readonly inputs: readonly [{
            readonly name: "typ";
            readonly type: "uint8";
            readonly indexed: false;
        }, {
            readonly name: "id";
            readonly type: "uint256";
            readonly indexed: false;
        }];
        readonly anonymous: false;
    }, {
        readonly type: "event";
        readonly name: "OwnershipTransferred";
        readonly inputs: readonly [{
            readonly name: "previousOwner";
            readonly type: "address";
            readonly indexed: true;
        }, {
            readonly name: "newOwner";
            readonly type: "address";
            readonly indexed: true;
        }];
        readonly anonymous: false;
    }, {
        readonly type: "error";
        readonly name: "Claimed";
        readonly inputs: readonly [];
    }, {
        readonly type: "error";
        readonly name: "Invalid";
        readonly inputs: readonly [];
    }];
    static createInterface(): HongbaoInterface;
    static connect(address: string, runner?: ContractRunner | null): Hongbao;
}
