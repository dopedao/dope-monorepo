import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "./common";
export declare namespace Initiator {
    type OrderStruct = {
        maker: AddressLike;
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
    type OrderStructOutput = [
        maker: string,
        vs: bigint,
        rss: [string, string],
        fee: bigint,
        price: bigint,
        expiration: bigint,
        listing: bigint,
        salt: bigint,
        calldataSell: string,
        calldataBuy: string
    ] & {
        maker: string;
        vs: bigint;
        rss: [string, string];
        fee: bigint;
        price: bigint;
        expiration: bigint;
        listing: bigint;
        salt: bigint;
        calldataSell: string;
        calldataBuy: string;
    };
}
export declare namespace IHustlerActions {
    type SetMetadataStruct = {
        color: BytesLike;
        background: BytesLike;
        options: BytesLike;
        viewbox: [BigNumberish, BigNumberish, BigNumberish, BigNumberish];
        body: [BigNumberish, BigNumberish, BigNumberish, BigNumberish];
        order: BigNumberish[];
        mask: BytesLike;
        name: string;
    };
    type SetMetadataStructOutput = [
        color: string,
        background: string,
        options: string,
        viewbox: [bigint, bigint, bigint, bigint],
        body: [bigint, bigint, bigint, bigint],
        order: bigint[],
        mask: string,
        name: string
    ] & {
        color: string;
        background: string;
        options: string;
        viewbox: [bigint, bigint, bigint, bigint];
        body: [bigint, bigint, bigint, bigint];
        order: bigint[];
        mask: string;
        name: string;
    };
}
export interface OneClickInitiatorInterface extends Interface {
    getFunction(nameOrSignature: "estimate" | "initiate"): FunctionFragment;
    encodeFunctionData(functionFragment: "estimate", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "initiate", values: [
        Initiator.OrderStruct,
        BigNumberish,
        IHustlerActions.SetMetadataStruct,
        AddressLike,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ]): string;
    decodeFunctionResult(functionFragment: "estimate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "initiate", data: BytesLike): Result;
}
export interface OneClickInitiator extends BaseContract {
    connect(runner?: ContractRunner | null): OneClickInitiator;
    waitForDeployment(): Promise<this>;
    interface: OneClickInitiatorInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    estimate: TypedContractMethod<[paper: BigNumberish], [bigint], "payable">;
    initiate: TypedContractMethod<[
        order: Initiator.OrderStruct,
        id: BigNumberish,
        meta: IHustlerActions.SetMetadataStruct,
        to: AddressLike,
        openseaEth: BigNumberish,
        paperEth: BigNumberish,
        paperOut: BigNumberish,
        deadline: BigNumberish
    ], [
        void
    ], "payable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "estimate"): TypedContractMethod<[paper: BigNumberish], [bigint], "payable">;
    getFunction(nameOrSignature: "initiate"): TypedContractMethod<[
        order: Initiator.OrderStruct,
        id: BigNumberish,
        meta: IHustlerActions.SetMetadataStruct,
        to: AddressLike,
        openseaEth: BigNumberish,
        paperEth: BigNumberish,
        paperOut: BigNumberish,
        deadline: BigNumberish
    ], [
        void
    ], "payable">;
    filters: {};
}
