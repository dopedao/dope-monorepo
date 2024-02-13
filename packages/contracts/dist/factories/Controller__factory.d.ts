import { type ContractRunner } from "ethers";
import type { Controller, ControllerInterface } from "../Controller";
export declare class Controller__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "contract IComponents";
            readonly name: "components_";
            readonly type: "address";
        }, {
            readonly internalType: "contract ISwapMeet";
            readonly name: "swapmeet_";
            readonly type: "address";
        }, {
            readonly internalType: "contract IHustler";
            readonly name: "hustler_";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "component";
            readonly type: "string";
        }];
        readonly name: "addAccessory";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
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
        readonly name: "addBodyRles";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "componentType";
            readonly type: "uint8";
        }, {
            readonly internalType: "string";
            readonly name: "component";
            readonly type: "string";
        }];
        readonly name: "addItemComponent";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256[]";
            readonly name: "ids";
            readonly type: "uint256[]";
        }, {
            readonly internalType: "bytes[]";
            readonly name: "rles";
            readonly type: "bytes[]";
        }];
        readonly name: "batchSetItemRle";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "dao";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "initiator";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "maintainer";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint8[5]";
            readonly name: "components_";
            readonly type: "uint8[5]";
        }, {
            readonly internalType: "uint8";
            readonly name: "componentType";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "mintItem";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint8[]";
            readonly name: "components_";
            readonly type: "uint8[]";
        }, {
            readonly internalType: "uint8[]";
            readonly name: "componentTypes";
            readonly type: "uint8[]";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "amounts";
            readonly type: "uint256[]";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "mintItemBatch";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "dopeId";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "string";
            readonly name: "name";
            readonly type: "string";
        }, {
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
            readonly internalType: "bytes2";
            readonly name: "mask";
            readonly type: "bytes2";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "mintOGTo";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "dopeId";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "string";
            readonly name: "name";
            readonly type: "string";
        }, {
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
            readonly internalType: "bytes2";
            readonly name: "mask";
            readonly type: "bytes2";
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
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "";
            readonly type: "uint256[]";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "";
            readonly type: "uint256[]";
        }, {
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly name: "onERC1155BatchReceived";
        readonly outputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "";
            readonly type: "bytes4";
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
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly name: "onERC1155Received";
        readonly outputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "";
            readonly type: "bytes4";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "dopeId";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "open";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "dao_";
            readonly type: "address";
        }];
        readonly name: "setDAO";
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
            readonly internalType: "address";
            readonly name: "initiator_";
            readonly type: "address";
        }];
        readonly name: "setInitiator";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "id";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "male";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "female";
            readonly type: "bytes";
        }];
        readonly name: "setItemRle";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "maintainer_";
            readonly type: "address";
        }];
        readonly name: "setMaintainer";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint8";
            readonly name: "id";
            readonly type: "uint8";
        }, {
            readonly internalType: "bytes4[]";
            readonly name: "palette";
            readonly type: "bytes4[]";
        }];
        readonly name: "setPalette";
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
    }];
    static createInterface(): ControllerInterface;
    static connect(address: string, runner?: ContractRunner | null): Controller;
}
