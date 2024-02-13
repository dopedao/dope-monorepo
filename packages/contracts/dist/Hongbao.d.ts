import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "./common";
export interface HongbaoInterface extends Interface {
    getFunction(nameOrSignature: "claim" | "claimed" | "mint" | "owner" | "renounceOwnership" | "root" | "transferMaintainerOwner" | "transferOwnership"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Opened" | "OwnershipTransferred"): EventFragment;
    encodeFunctionData(functionFragment: "claim", values: [BigNumberish, BytesLike[]]): string;
    encodeFunctionData(functionFragment: "claimed", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "mint", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "root", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferMaintainerOwner", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimed", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "root", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferMaintainerOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
}
export declare namespace OpenedEvent {
    type InputTuple = [typ: BigNumberish, id: BigNumberish];
    type OutputTuple = [typ: bigint, id: bigint];
    interface OutputObject {
        typ: bigint;
        id: bigint;
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
export interface Hongbao extends BaseContract {
    connect(runner?: ContractRunner | null): Hongbao;
    waitForDeployment(): Promise<this>;
    interface: HongbaoInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    claim: TypedContractMethod<[
        amount: BigNumberish,
        proof: BytesLike[]
    ], [
        void
    ], "nonpayable">;
    claimed: TypedContractMethod<[arg0: BytesLike], [boolean], "view">;
    mint: TypedContractMethod<[], [void], "payable">;
    owner: TypedContractMethod<[], [string], "view">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    root: TypedContractMethod<[], [string], "view">;
    transferMaintainerOwner: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "claim"): TypedContractMethod<[
        amount: BigNumberish,
        proof: BytesLike[]
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "claimed"): TypedContractMethod<[arg0: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "mint"): TypedContractMethod<[], [void], "payable">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "root"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "transferMaintainerOwner"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getEvent(key: "Opened"): TypedContractEvent<OpenedEvent.InputTuple, OpenedEvent.OutputTuple, OpenedEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    filters: {
        "Opened(uint8,uint256)": TypedContractEvent<OpenedEvent.InputTuple, OpenedEvent.OutputTuple, OpenedEvent.OutputObject>;
        Opened: TypedContractEvent<OpenedEvent.InputTuple, OpenedEvent.OutputTuple, OpenedEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    };
}
