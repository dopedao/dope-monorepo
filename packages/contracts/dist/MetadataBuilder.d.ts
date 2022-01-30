import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare type ParamsStruct = {
    resolution: BigNumberish;
    color: BytesLike;
    background: BytesLike;
    viewbox: [BigNumberish, BigNumberish, BigNumberish, BigNumberish];
    text: string;
    subtext: string;
    name: string;
    description: string;
    attributes: string;
    parts: BytesLike[];
};
export declare type ParamsStructOutput = [
    number,
    string,
    string,
    [
        number,
        number,
        number,
        number
    ],
    string,
    string,
    string,
    string,
    string,
    string[]
] & {
    resolution: number;
    color: string;
    background: string;
    viewbox: [number, number, number, number];
    text: string;
    subtext: string;
    name: string;
    description: string;
    attributes: string;
    parts: string[];
};
export interface MetadataBuilderInterface extends utils.Interface {
    functions: {
        "attributes(bytes[])": FunctionFragment;
        "contractURI(string,string)": FunctionFragment;
        "generateSVG((uint8,bytes4,bytes4,uint8[4],string,string,string,string,string,bytes[]),IPaletteProvider)": FunctionFragment;
        "tokenURI((uint8,bytes4,bytes4,uint8[4],string,string,string,string,string,bytes[]),IPaletteProvider)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "attributes", values: [BytesLike[]]): string;
    encodeFunctionData(functionFragment: "contractURI", values: [string, string]): string;
    encodeFunctionData(functionFragment: "generateSVG", values: [ParamsStruct, string]): string;
    encodeFunctionData(functionFragment: "tokenURI", values: [ParamsStruct, string]): string;
    decodeFunctionResult(functionFragment: "attributes", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "generateSVG", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
    events: {};
}
export interface MetadataBuilder extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: MetadataBuilderInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        attributes(traits: BytesLike[], overrides?: CallOverrides): Promise<[string]>;
        contractURI(name: string, description: string, overrides?: CallOverrides): Promise<[string]>;
        generateSVG(params: ParamsStruct, paletteProvider: string, overrides?: CallOverrides): Promise<[string] & {
            svg: string;
        }>;
        tokenURI(params: ParamsStruct, paletteProvider: string, overrides?: CallOverrides): Promise<[string]>;
    };
    attributes(traits: BytesLike[], overrides?: CallOverrides): Promise<string>;
    contractURI(name: string, description: string, overrides?: CallOverrides): Promise<string>;
    generateSVG(params: ParamsStruct, paletteProvider: string, overrides?: CallOverrides): Promise<string>;
    tokenURI(params: ParamsStruct, paletteProvider: string, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        attributes(traits: BytesLike[], overrides?: CallOverrides): Promise<string>;
        contractURI(name: string, description: string, overrides?: CallOverrides): Promise<string>;
        generateSVG(params: ParamsStruct, paletteProvider: string, overrides?: CallOverrides): Promise<string>;
        tokenURI(params: ParamsStruct, paletteProvider: string, overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        attributes(traits: BytesLike[], overrides?: CallOverrides): Promise<BigNumber>;
        contractURI(name: string, description: string, overrides?: CallOverrides): Promise<BigNumber>;
        generateSVG(params: ParamsStruct, paletteProvider: string, overrides?: CallOverrides): Promise<BigNumber>;
        tokenURI(params: ParamsStruct, paletteProvider: string, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        attributes(traits: BytesLike[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        contractURI(name: string, description: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        generateSVG(params: ParamsStruct, paletteProvider: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenURI(params: ParamsStruct, paletteProvider: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
