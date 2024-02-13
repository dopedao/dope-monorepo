import { type ContractRunner } from "ethers";
import type { Initiator, InitiatorInterface } from "../Initiator";
export declare class Initiator__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "contract IERC721";
            readonly name: "dope_";
            readonly type: "address";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "paper_";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "controller_";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }];
        readonly name: "Opened";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "previousOwner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "OwnershipTransferred";
        readonly type: "event";
    }, {
        readonly inputs: readonly [];
        readonly name: "cost";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }];
        readonly name: "isOpened";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
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
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }, {
            readonly internalType: "uint32";
            readonly name: "gasLimit";
            readonly type: "uint32";
        }];
        readonly name: "mintFromDopeTo";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
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
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }, {
            readonly internalType: "uint32";
            readonly name: "gasLimit";
            readonly type: "uint32";
        }];
        readonly name: "mintOGFromDopeTo";
        readonly outputs: readonly [];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint32";
            readonly name: "gasLimit";
            readonly type: "uint32";
        }];
        readonly name: "open";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "owner";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "release";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "renounceOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "_release";
            readonly type: "uint256";
        }];
        readonly name: "setRelease";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }];
        readonly name: "transferOwnership";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "withdraw";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): InitiatorInterface;
    static connect(address: string, runner?: ContractRunner | null): Initiator;
}
