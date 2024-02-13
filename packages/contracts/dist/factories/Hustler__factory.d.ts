import { type ContractRunner } from "ethers";
import type { Hustler, HustlerInterface } from "../Hustler";
export declare class Hustler__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_components";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "_swapmeet";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint8";
            readonly name: "part";
            readonly type: "uint8";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "len";
            readonly type: "uint256";
        }];
        readonly name: "AddRles";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "operator";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "bool";
            readonly name: "approved";
            readonly type: "bool";
        }];
        readonly name: "ApprovalForAll";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }];
        readonly name: "MetadataUpdate";
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
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "operator";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256[]";
            readonly name: "ids";
            readonly type: "uint256[]";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256[]";
            readonly name: "values";
            readonly type: "uint256[]";
        }];
        readonly name: "TransferBatch";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "operator";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }];
        readonly name: "TransferSingle";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: false;
            readonly internalType: "string";
            readonly name: "value";
            readonly type: "string";
        }, {
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }];
        readonly name: "URI";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "part";
            readonly type: "uint8";
        }, {
            readonly internalType: "bytes[]";
            readonly name: "_rles";
            readonly type: "bytes[]";
        }];
        readonly name: "addRles";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "hustlerId";
            readonly type: "uint256";
        }];
        readonly name: "attributes";
        readonly outputs: readonly [{
            readonly internalType: "bytes[]";
            readonly name: "";
            readonly type: "bytes[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }];
        readonly name: "balanceOf";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address[]";
            readonly name: "accounts";
            readonly type: "address[]";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "ids";
            readonly type: "uint256[]";
        }];
        readonly name: "balanceOfBatch";
        readonly outputs: readonly [{
            readonly internalType: "uint256[]";
            readonly name: "";
            readonly type: "uint256[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "part";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint256";
            readonly name: "idx";
            readonly type: "uint256";
        }];
        readonly name: "bodyRle";
        readonly outputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "hustlerId";
            readonly type: "uint256";
        }];
        readonly name: "carParts";
        readonly outputs: readonly [{
            readonly internalType: "bytes[]";
            readonly name: "";
            readonly type: "bytes[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "contractURI";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "enforcer";
        readonly outputs: readonly [{
            readonly internalType: "contract IEnforcer";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "hustlerId";
            readonly type: "uint256";
        }];
        readonly name: "hustlerParts";
        readonly outputs: readonly [{
            readonly internalType: "bytes[]";
            readonly name: "";
            readonly type: "bytes[]";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "account";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "operator";
            readonly type: "address";
        }];
        readonly name: "isApprovedForAll";
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
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "metadata";
        readonly outputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "color";
            readonly type: "bytes4";
        }, {
            readonly internalType: "bytes4";
            readonly name: "background";
            readonly type: "bytes4";
        }, {
            readonly internalType: "bytes2";
            readonly name: "mask";
            readonly type: "bytes2";
        }, {
            readonly internalType: "bytes2";
            readonly name: "options";
            readonly type: "bytes2";
        }, {
            readonly internalType: "uint256";
            readonly name: "age";
            readonly type: "uint256";
        }, {
            readonly internalType: "string";
            readonly name: "name";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
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
            readonly name: "m";
            readonly type: "tuple";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "mintOGTo";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "mintTo";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
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
            readonly name: "m";
            readonly type: "tuple";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "mintTo";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "name";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "operator";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "ids";
            readonly type: "uint256[]";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "values";
            readonly type: "uint256[]";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "onERC1155BatchReceived";
        readonly outputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "";
            readonly type: "bytes4";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "operator";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "value";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "onERC1155Received";
        readonly outputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "";
            readonly type: "bytes4";
        }];
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
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "title";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "subtitle";
            readonly type: "string";
        }, {
            readonly internalType: "uint8";
            readonly name: "resolution";
            readonly type: "uint8";
        }, {
            readonly internalType: "bytes4";
            readonly name: "background";
            readonly type: "bytes4";
        }, {
            readonly internalType: "bytes4";
            readonly name: "color";
            readonly type: "bytes4";
        }, {
            readonly internalType: "uint8[4]";
            readonly name: "viewbox";
            readonly type: "uint8[4]";
        }, {
            readonly internalType: "bytes[]";
            readonly name: "parts";
            readonly type: "bytes[]";
        }];
        readonly name: "render";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
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
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "ids";
            readonly type: "uint256[]";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "amounts";
            readonly type: "uint256[]";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "safeBatchTransferFrom";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "safeTransferFrom";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "operator";
            readonly type: "address";
        }, {
            readonly internalType: "bool";
            readonly name: "approved";
            readonly type: "bool";
        }];
        readonly name: "setApprovalForAll";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "enforcer_";
            readonly type: "address";
        }];
        readonly name: "setEnforcer";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "hustlerId";
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
            readonly name: "m";
            readonly type: "tuple";
        }];
        readonly name: "setMetadata";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "interfaceId";
            readonly type: "bytes4";
        }];
        readonly name: "supportsInterface";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "symbol";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "hustlerId";
            readonly type: "uint256";
        }];
        readonly name: "tokenURI";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
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
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "hustlerId";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint8[]";
            readonly name: "slots";
            readonly type: "uint8[]";
        }];
        readonly name: "unequip";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "uri";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): HustlerInterface;
    static connect(address: string, runner?: ContractRunner | null): Hustler;
}
