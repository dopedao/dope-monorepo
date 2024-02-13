import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "./common";
export declare namespace Initiator {
    type OrderStruct = {
        undefined: AddressLike;
        undefined: BigNumberish;
        undefined: [BytesLike, BytesLike];
        undefined: BigNumberish;
        undefined: BigNumberish;
        undefined: BigNumberish;
        undefined: BigNumberish;
        undefined: BigNumberish;
        undefined: BytesLike;
        undefined: BytesLike;
    };
    type OrderStructOutput = [
        string,
        bigint,
        [
            string,
            string
        ],
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        string,
        string
    ];
}
export declare namespace IHustlerActions {
    type SetMetadataStruct = {
        undefined: BytesLike;
        undefined: BytesLike;
        undefined: BytesLike;
        undefined: [BigNumberish, BigNumberish, BigNumberish, BigNumberish];
        undefined: [BigNumberish, BigNumberish, BigNumberish, BigNumberish];
        undefined: BigNumberish[];
        undefined: BytesLike;
        undefined: string;
    };
    type SetMetadataStructOutput = [
        string,
        string,
        string,
        [
            bigint,
            bigint,
            bigint,
            bigint
        ],
        [
            bigint,
            bigint,
            bigint,
            bigint
        ],
        bigint[],
        string,
        string
    ];
}
export interface DopeInitiatorInterface extends Interface {
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
export interface DopeInitiator extends BaseContract {
    connect(runner?: ContractRunner | null): DopeInitiator;
    waitForDeployment(): Promise<this>;
    interface: DopeInitiatorInterface;
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
