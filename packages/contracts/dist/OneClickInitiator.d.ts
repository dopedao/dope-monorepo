import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare type OrderStruct = {
    maker: string;
    vs: BigNumberish;
    rss: [BytesLike, BytesLike];
    fee: BigNumberish;
    price: BigNumberish;
    expiration: BigNumberish;
    listing: BigNumberish;
    salt: BigNumberish;
    calldataSell: BytesLike;
    calldataBuy: BytesLike;
};
export declare type OrderStructOutput = [
    string,
    number,
    [
        string,
        string
    ],
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    string
] & {
    maker: string;
    vs: number;
    rss: [string, string];
    fee: BigNumber;
    price: BigNumber;
    expiration: BigNumber;
    listing: BigNumber;
    salt: BigNumber;
    calldataSell: string;
    calldataBuy: string;
};
export declare type SetMetadataStruct = {
    color: BytesLike;
    background: BytesLike;
    options: BytesLike;
    viewbox: [BigNumberish, BigNumberish, BigNumberish, BigNumberish];
    body: [BigNumberish, BigNumberish, BigNumberish, BigNumberish];
    order: BigNumberish[];
    mask: BytesLike;
    name: string;
};
export declare type SetMetadataStructOutput = [
    string,
    string,
    string,
    [
        number,
        number,
        number,
        number
    ],
    [
        number,
        number,
        number,
        number
    ],
    number[],
    string,
    string
] & {
    color: string;
    background: string;
    options: string;
    viewbox: [number, number, number, number];
    body: [number, number, number, number];
    order: number[];
    mask: string;
    name: string;
};
export interface OneClickInitiatorInterface extends utils.Interface {
    functions: {
        "estimate(uint256)": FunctionFragment;
        "initiate((address,uint8,bytes32[2],uint256,uint256,uint256,uint256,uint256,bytes,bytes),uint256,(bytes4,bytes4,bytes2,uint8[4],uint8[4],uint8[10],bytes2,string),address,uint256,uint256,uint256,uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "estimate", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "initiate", values: [
        OrderStruct,
        BigNumberish,
        SetMetadataStruct,
        string,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ]): string;
    decodeFunctionResult(functionFragment: "estimate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initiate", data: BytesLike): Result;
    events: {};
}
export interface OneClickInitiator extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: OneClickInitiatorInterface;
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
        estimate(paper: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        initiate(order: OrderStruct, id: BigNumberish, meta: SetMetadataStruct, to: string, openseaEth: BigNumberish, paperEth: BigNumberish, paperOut: BigNumberish, deadline: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    estimate(paper: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    initiate(order: OrderStruct, id: BigNumberish, meta: SetMetadataStruct, to: string, openseaEth: BigNumberish, paperEth: BigNumberish, paperOut: BigNumberish, deadline: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        estimate(paper: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        initiate(order: OrderStruct, id: BigNumberish, meta: SetMetadataStruct, to: string, openseaEth: BigNumberish, paperEth: BigNumberish, paperOut: BigNumberish, deadline: BigNumberish, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        estimate(paper: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        initiate(order: OrderStruct, id: BigNumberish, meta: SetMetadataStruct, to: string, openseaEth: BigNumberish, paperEth: BigNumberish, paperOut: BigNumberish, deadline: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        estimate(paper: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        initiate(order: OrderStruct, id: BigNumberish, meta: SetMetadataStruct, to: string, openseaEth: BigNumberish, paperEth: BigNumberish, paperOut: BigNumberish, deadline: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
