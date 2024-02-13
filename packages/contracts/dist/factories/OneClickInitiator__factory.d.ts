import { type ContractRunner } from "ethers";
import type { OneClickInitiator, OneClickInitiatorInterface } from "../OneClickInitiator";
export declare class OneClickInitiator__factory {
    static readonly abi: readonly [{
        readonly type: "constructor";
        readonly inputs: readonly [];
    }, {
        readonly type: "function";
        readonly name: "estimate";
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "paper";
            readonly type: "uint256";
        }];
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "payable";
    }, {
        readonly type: "function";
        readonly name: "initiate";
        readonly inputs: readonly [{
            readonly internalType: "struct Initiator.Order";
            readonly name: "order";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "maker";
                readonly type: "address";
            }, {
                readonly name: "vs";
                readonly type: "uint8";
            }, {
                readonly internalType: "bytes32[2]";
                readonly name: "rss";
                readonly type: "bytes32[2]";
            }, {
                readonly internalType: "uint256";
                readonly name: "fee";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "price";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "expiration";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "listing";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "salt";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "calldataSell";
                readonly type: "bytes";
            }, {
                readonly internalType: "bytes";
                readonly name: "calldataBuy";
                readonly type: "bytes";
            }];
        }, {
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "bytes4";
                readonly name: "color";
                readonly type: "bytes4";
            }, {
                readonly internalType: "bytes4";
                readonly name: "background";
                readonly type: "bytes4";
            }, {
                readonly internalType: "bytes2";
                readonly name: "options";
                readonly type: "bytes2";
            }, {
                readonly internalType: "uint8[4]";
                readonly name: "viewbox";
                readonly type: "uint8[4]";
            }, {
                readonly internalType: "uint8[4]";
                readonly name: "body";
                readonly type: "uint8[4]";
            }, {
                readonly internalType: "uint8[10]";
                readonly name: "order";
                readonly type: "uint8[10]";
            }, {
                readonly internalType: "bytes2";
                readonly name: "mask";
                readonly type: "bytes2";
            }, {
                readonly internalType: "string";
                readonly name: "name";
                readonly type: "string";
            }];
            readonly internalType: "struct IHustlerActions.SetMetadata";
            readonly name: "meta";
            readonly type: "tuple";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "openseaEth";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "paperEth";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "paperOut";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "deadline";
            readonly type: "uint256";
        }];
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
    }, {
        readonly type: "receive";
    }];
    static createInterface(): OneClickInitiatorInterface;
    static connect(address: string, runner?: ContractRunner | null): OneClickInitiator;
}
