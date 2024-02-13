import { type ContractRunner } from "ethers";
import type { MetadataBuilder, MetadataBuilderInterface } from "../MetadataBuilder";
export declare class MetadataBuilder__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes[]";
            readonly name: "traits";
            readonly type: "bytes[]";
        }];
        readonly name: "attributes";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "string";
            readonly name: "name";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "description";
            readonly type: "string";
        }];
        readonly name: "contractURI";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint8";
                readonly name: "resolution";
                readonly type: "uint8";
            }, {
                readonly internalType: "bytes4";
                readonly name: "color";
                readonly type: "bytes4";
            }, {
                readonly internalType: "bytes4";
                readonly name: "background";
                readonly type: "bytes4";
            }, {
                readonly internalType: "uint8[4]";
                readonly name: "viewbox";
                readonly type: "uint8[4]";
            }, {
                readonly internalType: "string";
                readonly name: "text";
                readonly type: "string";
            }, {
                readonly internalType: "string";
                readonly name: "subtext";
                readonly type: "string";
            }, {
                readonly internalType: "string";
                readonly name: "name";
                readonly type: "string";
            }, {
                readonly internalType: "string";
                readonly name: "description";
                readonly type: "string";
            }, {
                readonly internalType: "string";
                readonly name: "attributes";
                readonly type: "string";
            }, {
                readonly internalType: "bytes[]";
                readonly name: "parts";
                readonly type: "bytes[]";
            }];
            readonly internalType: "struct MetadataBuilder.Params";
            readonly name: "params";
            readonly type: "tuple";
        }, {
            readonly internalType: "contract IPaletteProvider";
            readonly name: "paletteProvider";
            readonly type: "IPaletteProvider";
        }];
        readonly name: "generateSVG";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "svg";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint8";
                readonly name: "resolution";
                readonly type: "uint8";
            }, {
                readonly internalType: "bytes4";
                readonly name: "color";
                readonly type: "bytes4";
            }, {
                readonly internalType: "bytes4";
                readonly name: "background";
                readonly type: "bytes4";
            }, {
                readonly internalType: "uint8[4]";
                readonly name: "viewbox";
                readonly type: "uint8[4]";
            }, {
                readonly internalType: "string";
                readonly name: "text";
                readonly type: "string";
            }, {
                readonly internalType: "string";
                readonly name: "subtext";
                readonly type: "string";
            }, {
                readonly internalType: "string";
                readonly name: "name";
                readonly type: "string";
            }, {
                readonly internalType: "string";
                readonly name: "description";
                readonly type: "string";
            }, {
                readonly internalType: "string";
                readonly name: "attributes";
                readonly type: "string";
            }, {
                readonly internalType: "bytes[]";
                readonly name: "parts";
                readonly type: "bytes[]";
            }];
            readonly internalType: "struct MetadataBuilder.Params";
            readonly name: "params";
            readonly type: "tuple";
        }, {
            readonly internalType: "contract IPaletteProvider";
            readonly name: "paletteProvider";
            readonly type: "IPaletteProvider";
        }];
        readonly name: "tokenURI";
        readonly outputs: readonly [{
            readonly internalType: "string";
            readonly name: "";
            readonly type: "string";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): MetadataBuilderInterface;
    static connect(address: string, runner?: ContractRunner | null): MetadataBuilder;
}
