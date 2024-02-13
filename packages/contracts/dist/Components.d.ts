import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "./common";
export interface ComponentsInterface extends Interface {
    getFunction(nameOrSignature: "accessories" | "addComponent" | "attributes" | "clothes" | "drugs" | "footArmor" | "handArmor" | "items" | "name" | "namePrefixes" | "nameSuffixes" | "necklaces" | "owner" | "prefix" | "renounceOwnership" | "rings" | "seed" | "suffix" | "suffixes" | "title" | "transferOwnership" | "vehicle" | "waistArmor" | "weapons"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AddComponent" | "OwnershipTransferred"): EventFragment;
    encodeFunctionData(functionFragment: "accessories", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "addComponent", values: [BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "attributes", values: [
        [
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish
        ],
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "clothes", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "drugs", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "footArmor", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "handArmor", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "items", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "name", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "namePrefixes", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "nameSuffixes", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "necklaces", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "prefix", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "rings", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "seed", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "suffix", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "suffixes", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "title", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "vehicle", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "waistArmor", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "weapons", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "accessories", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "addComponent", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "attributes", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "clothes", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "drugs", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "footArmor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "handArmor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "items", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "namePrefixes", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nameSuffixes", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "necklaces", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "prefix", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rings", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "seed", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "suffix", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "suffixes", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "title", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "vehicle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "waistArmor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "weapons", data: BytesLike): Result;
}
export declare namespace AddComponentEvent {
    type InputTuple = [
        id: BigNumberish,
        componentType: BigNumberish,
        component: string
    ];
    type OutputTuple = [
        id: bigint,
        componentType: bigint,
        component: string
    ];
    interface OutputObject {
        id: bigint;
        componentType: bigint;
        component: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace OwnershipTransferredEvent {
    type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
    type OutputTuple = [previousOwner: string, newOwner: string];
    interface OutputObject {
        previousOwner: string;
        newOwner: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface Components extends BaseContract {
    connect(runner?: ContractRunner | null): Components;
    waitForDeployment(): Promise<this>;
    interface: ComponentsInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    accessories: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    addComponent: TypedContractMethod<[
        componentType: BigNumberish,
        component: string
    ], [
        bigint
    ], "nonpayable">;
    attributes: TypedContractMethod<[
        components: [
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish
        ],
        componentType: BigNumberish
    ], [
        string
    ], "view">;
    clothes: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    drugs: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    footArmor: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    handArmor: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    items: TypedContractMethod<[
        tokenId: BigNumberish
    ], [
        [bigint, bigint, bigint, bigint, bigint][]
    ], "view">;
    name: TypedContractMethod<[
        componentType: BigNumberish,
        idx: BigNumberish
    ], [
        string
    ], "view">;
    namePrefixes: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    nameSuffixes: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    necklaces: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    owner: TypedContractMethod<[], [string], "view">;
    prefix: TypedContractMethod<[
        prefixComponent: BigNumberish,
        suffixComponent: BigNumberish
    ], [
        string
    ], "view">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    rings: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    seed: TypedContractMethod<[
        tokenId: BigNumberish,
        componentType: BigNumberish
    ], [
        [bigint, bigint]
    ], "view">;
    suffix: TypedContractMethod<[
        suffixComponent: BigNumberish
    ], [
        string
    ], "view">;
    suffixes: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    title: TypedContractMethod<[hustlerId: BigNumberish], [string], "view">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    vehicle: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    waistArmor: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    weapons: TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "accessories"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "addComponent"): TypedContractMethod<[
        componentType: BigNumberish,
        component: string
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "attributes"): TypedContractMethod<[
        components: [
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish
        ],
        componentType: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "clothes"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "drugs"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "footArmor"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "handArmor"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "items"): TypedContractMethod<[
        tokenId: BigNumberish
    ], [
        [bigint, bigint, bigint, bigint, bigint][]
    ], "view">;
    getFunction(nameOrSignature: "name"): TypedContractMethod<[
        componentType: BigNumberish,
        idx: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "namePrefixes"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "nameSuffixes"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "necklaces"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "prefix"): TypedContractMethod<[
        prefixComponent: BigNumberish,
        suffixComponent: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "rings"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "seed"): TypedContractMethod<[
        tokenId: BigNumberish,
        componentType: BigNumberish
    ], [
        [bigint, bigint]
    ], "view">;
    getFunction(nameOrSignature: "suffix"): TypedContractMethod<[suffixComponent: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "suffixes"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "title"): TypedContractMethod<[hustlerId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "vehicle"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "waistArmor"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "weapons"): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
    getEvent(key: "AddComponent"): TypedContractEvent<AddComponentEvent.InputTuple, AddComponentEvent.OutputTuple, AddComponentEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    filters: {
        "AddComponent(uint256,uint256,string)": TypedContractEvent<AddComponentEvent.InputTuple, AddComponentEvent.OutputTuple, AddComponentEvent.OutputObject>;
        AddComponent: TypedContractEvent<AddComponentEvent.InputTuple, AddComponentEvent.OutputTuple, AddComponentEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    };
}
