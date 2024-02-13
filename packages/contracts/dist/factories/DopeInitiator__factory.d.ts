import { type ContractRunner } from "ethers";
import type { DopeInitiator, DopeInitiatorInterface } from "../DopeInitiator";
export declare class DopeInitiator__factory {
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
                readonly type: "address";
            }, {
                readonly type: "uint8";
            }, {
                readonly type: "bytes32[2]";
            }, {
                readonly type: "uint256";
            }, {
                readonly type: "uint256";
            }, {
                readonly type: "uint256";
            }, {
                readonly type: "uint256";
            }, {
                readonly type: "uint256";
            }, {
                readonly type: "bytes";
            }, {
                readonly type: "bytes";
            }];
        }, {
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }, {
            readonly internalType: "struct IHustlerActions.SetMetadata";
            readonly name: "meta";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly type: "bytes4";
            }, {
                readonly type: "bytes4";
            }, {
                readonly type: "bytes2";
            }, {
                readonly type: "uint8[4]";
            }, {
                readonly type: "uint8[4]";
            }, {
                readonly type: "uint8[10]";
            }, {
                readonly type: "bytes2";
            }, {
                readonly type: "string";
            }];
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
    static createInterface(): DopeInitiatorInterface;
    static connect(address: string, runner?: ContractRunner | null): DopeInitiator;
}
