"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataBuilder__factory = void 0;
var ethers_1 = require("ethers");
var _abi = [
    {
        inputs: [
            {
                internalType: "bytes[]",
                name: "traits",
                type: "bytes[]",
            },
        ],
        name: "attributes",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "string",
                name: "description",
                type: "string",
            },
        ],
        name: "contractURI",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "uint8",
                        name: "resolution",
                        type: "uint8",
                    },
                    {
                        internalType: "bytes4",
                        name: "color",
                        type: "bytes4",
                    },
                    {
                        internalType: "bytes4",
                        name: "background",
                        type: "bytes4",
                    },
                    {
                        internalType: "uint8[4]",
                        name: "viewbox",
                        type: "uint8[4]",
                    },
                    {
                        internalType: "string",
                        name: "text",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "subtext",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "description",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "attributes",
                        type: "string",
                    },
                    {
                        internalType: "bytes[]",
                        name: "parts",
                        type: "bytes[]",
                    },
                ],
                internalType: "struct MetadataBuilder.Params",
                name: "params",
                type: "tuple",
            },
            {
                internalType: "contract IPaletteProvider",
                name: "paletteProvider",
                type: "IPaletteProvider",
            },
        ],
        name: "generateSVG",
        outputs: [
            {
                internalType: "string",
                name: "svg",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "uint8",
                        name: "resolution",
                        type: "uint8",
                    },
                    {
                        internalType: "bytes4",
                        name: "color",
                        type: "bytes4",
                    },
                    {
                        internalType: "bytes4",
                        name: "background",
                        type: "bytes4",
                    },
                    {
                        internalType: "uint8[4]",
                        name: "viewbox",
                        type: "uint8[4]",
                    },
                    {
                        internalType: "string",
                        name: "text",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "subtext",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "description",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "attributes",
                        type: "string",
                    },
                    {
                        internalType: "bytes[]",
                        name: "parts",
                        type: "bytes[]",
                    },
                ],
                internalType: "struct MetadataBuilder.Params",
                name: "params",
                type: "tuple",
            },
            {
                internalType: "contract IPaletteProvider",
                name: "paletteProvider",
                type: "IPaletteProvider",
            },
        ],
        name: "tokenURI",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
var MetadataBuilder__factory = /** @class */ (function () {
    function MetadataBuilder__factory() {
    }
    MetadataBuilder__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    MetadataBuilder__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    MetadataBuilder__factory.abi = _abi;
    return MetadataBuilder__factory;
}());
exports.MetadataBuilder__factory = MetadataBuilder__factory;
//# sourceMappingURL=MetadataBuilder__factory.js.map