import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "./common";
export interface SwapMeetInterface extends Interface {
    getFunction(nameOrSignature: "balanceOf" | "balanceOfBatch" | "batchSetRle" | "contractURI" | "fullname" | "isApprovedForAll" | "itemIds" | "mint" | "mintBatch" | "name" | "open" | "owner" | "palette" | "params" | "renounceOwnership" | "safeBatchTransferFrom" | "safeTransferFrom" | "setApprovalForAll" | "setPalette" | "setRle" | "supportsInterface" | "symbol" | "toBaseId" | "toId" | "tokenRle" | "tokenURI" | "transferOwnership" | "uri"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalForAll" | "OwnershipTransferred" | "SetRle" | "TransferBatch" | "TransferSingle" | "URI"): EventFragment;
    encodeFunctionData(functionFragment: "balanceOf", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "balanceOfBatch", values: [AddressLike[], BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "batchSetRle", values: [BigNumberish[], BytesLike[]]): string;
    encodeFunctionData(functionFragment: "contractURI", values?: undefined): string;
    encodeFunctionData(functionFragment: "fullname", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "isApprovedForAll", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "itemIds", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "mint", values: [
        AddressLike,
        [
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish
        ],
        BigNumberish,
        BigNumberish,
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "mintBatch", values: [
        AddressLike,
        BigNumberish[],
        BigNumberish[],
        BigNumberish[],
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "open", values: [BigNumberish, AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "palette", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "params", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "safeBatchTransferFrom", values: [
        AddressLike,
        AddressLike,
        BigNumberish[],
        BigNumberish[],
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "safeTransferFrom", values: [AddressLike, AddressLike, BigNumberish, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "setApprovalForAll", values: [AddressLike, boolean]): string;
    encodeFunctionData(functionFragment: "setPalette", values: [BigNumberish, BytesLike[]]): string;
    encodeFunctionData(functionFragment: "setRle", values: [BigNumberish, BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "toBaseId", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "toId", values: [
        [
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish
        ],
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "tokenRle", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "tokenURI", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "uri", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOfBatch", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "batchSetRle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fullname", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "itemIds", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintBatch", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "open", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "palette", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "params", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeBatchTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setPalette", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setRle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "toBaseId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "toId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenRle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "uri", data: BytesLike): Result;
}
export declare namespace ApprovalForAllEvent {
    type InputTuple = [
        account: AddressLike,
        operator: AddressLike,
        approved: boolean
    ];
    type OutputTuple = [
        account: string,
        operator: string,
        approved: boolean
    ];
    interface OutputObject {
        account: string;
        operator: string;
        approved: boolean;
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
export declare namespace SetRleEvent {
    type InputTuple = [id: BigNumberish];
    type OutputTuple = [id: bigint];
    interface OutputObject {
        id: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TransferBatchEvent {
    type InputTuple = [
        operator: AddressLike,
        from: AddressLike,
        to: AddressLike,
        ids: BigNumberish[],
        values: BigNumberish[]
    ];
    type OutputTuple = [
        operator: string,
        from: string,
        to: string,
        ids: bigint[],
        values: bigint[]
    ];
    interface OutputObject {
        operator: string;
        from: string;
        to: string;
        ids: bigint[];
        values: bigint[];
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TransferSingleEvent {
    type InputTuple = [
        operator: AddressLike,
        from: AddressLike,
        to: AddressLike,
        id: BigNumberish,
        value: BigNumberish
    ];
    type OutputTuple = [
        operator: string,
        from: string,
        to: string,
        id: bigint,
        value: bigint
    ];
    interface OutputObject {
        operator: string;
        from: string;
        to: string;
        id: bigint;
        value: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace URIEvent {
    type InputTuple = [value: string, id: BigNumberish];
    type OutputTuple = [value: string, id: bigint];
    interface OutputObject {
        value: string;
        id: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface SwapMeet extends BaseContract {
    connect(runner?: ContractRunner | null): SwapMeet;
    waitForDeployment(): Promise<this>;
    interface: SwapMeetInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    balanceOf: TypedContractMethod<[
        account: AddressLike,
        id: BigNumberish
    ], [
        bigint
    ], "view">;
    balanceOfBatch: TypedContractMethod<[
        accounts: AddressLike[],
        ids: BigNumberish[]
    ], [
        bigint[]
    ], "view">;
    batchSetRle: TypedContractMethod<[
        ids: BigNumberish[],
        rles: BytesLike[]
    ], [
        void
    ], "nonpayable">;
    contractURI: TypedContractMethod<[], [string], "view">;
    fullname: TypedContractMethod<[id: BigNumberish], [string], "view">;
    isApprovedForAll: TypedContractMethod<[
        account: AddressLike,
        operator: AddressLike
    ], [
        boolean
    ], "view">;
    itemIds: TypedContractMethod<[tokenId: BigNumberish], [bigint[]], "view">;
    mint: TypedContractMethod<[
        to: AddressLike,
        components: [
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish
        ],
        componentType: BigNumberish,
        amount: BigNumberish,
        data: BytesLike
    ], [
        bigint
    ], "nonpayable">;
    mintBatch: TypedContractMethod<[
        to: AddressLike,
        components: BigNumberish[],
        componentTypes: BigNumberish[],
        amounts: BigNumberish[],
        data: BytesLike
    ], [
        bigint[]
    ], "nonpayable">;
    name: TypedContractMethod<[], [string], "view">;
    open: TypedContractMethod<[
        id: BigNumberish,
        to: AddressLike,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    owner: TypedContractMethod<[], [string], "view">;
    palette: TypedContractMethod<[id: BigNumberish], [string[]], "view">;
    params: TypedContractMethod<[
        id: BigNumberish
    ], [
        [string, string, string, string, string, string]
    ], "view">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    safeBatchTransferFrom: TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        ids: BigNumberish[],
        amounts: BigNumberish[],
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    safeTransferFrom: TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        id: BigNumberish,
        amount: BigNumberish,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    setApprovalForAll: TypedContractMethod<[
        operator: AddressLike,
        approved: boolean
    ], [
        void
    ], "nonpayable">;
    setPalette: TypedContractMethod<[
        id: BigNumberish,
        palette: BytesLike[]
    ], [
        void
    ], "nonpayable">;
    setRle: TypedContractMethod<[
        id: BigNumberish,
        male: BytesLike,
        female: BytesLike
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
    symbol: TypedContractMethod<[], [string], "view">;
    toBaseId: TypedContractMethod<[id: BigNumberish], [bigint], "view">;
    toId: TypedContractMethod<[
        components: [
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish
        ],
        componentType: BigNumberish
    ], [
        bigint
    ], "view">;
    tokenRle: TypedContractMethod<[
        id: BigNumberish,
        gender: BigNumberish
    ], [
        string
    ], "view">;
    tokenURI: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    uri: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[
        account: AddressLike,
        id: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "balanceOfBatch"): TypedContractMethod<[
        accounts: AddressLike[],
        ids: BigNumberish[]
    ], [
        bigint[]
    ], "view">;
    getFunction(nameOrSignature: "batchSetRle"): TypedContractMethod<[
        ids: BigNumberish[],
        rles: BytesLike[]
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "contractURI"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "fullname"): TypedContractMethod<[id: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "isApprovedForAll"): TypedContractMethod<[
        account: AddressLike,
        operator: AddressLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "itemIds"): TypedContractMethod<[tokenId: BigNumberish], [bigint[]], "view">;
    getFunction(nameOrSignature: "mint"): TypedContractMethod<[
        to: AddressLike,
        components: [
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish
        ],
        componentType: BigNumberish,
        amount: BigNumberish,
        data: BytesLike
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "mintBatch"): TypedContractMethod<[
        to: AddressLike,
        components: BigNumberish[],
        componentTypes: BigNumberish[],
        amounts: BigNumberish[],
        data: BytesLike
    ], [
        bigint[]
    ], "nonpayable">;
    getFunction(nameOrSignature: "name"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "open"): TypedContractMethod<[
        id: BigNumberish,
        to: AddressLike,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "palette"): TypedContractMethod<[id: BigNumberish], [string[]], "view">;
    getFunction(nameOrSignature: "params"): TypedContractMethod<[
        id: BigNumberish
    ], [
        [string, string, string, string, string, string]
    ], "view">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "safeBatchTransferFrom"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        ids: BigNumberish[],
        amounts: BigNumberish[],
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "safeTransferFrom"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        id: BigNumberish,
        amount: BigNumberish,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setApprovalForAll"): TypedContractMethod<[
        operator: AddressLike,
        approved: boolean
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setPalette"): TypedContractMethod<[
        id: BigNumberish,
        palette: BytesLike[]
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "setRle"): TypedContractMethod<[
        id: BigNumberish,
        male: BytesLike,
        female: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "symbol"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "toBaseId"): TypedContractMethod<[id: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "toId"): TypedContractMethod<[
        components: [
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish
        ],
        componentType: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "tokenRle"): TypedContractMethod<[
        id: BigNumberish,
        gender: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "tokenURI"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "uri"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getEvent(key: "ApprovalForAll"): TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "SetRle"): TypedContractEvent<SetRleEvent.InputTuple, SetRleEvent.OutputTuple, SetRleEvent.OutputObject>;
    getEvent(key: "TransferBatch"): TypedContractEvent<TransferBatchEvent.InputTuple, TransferBatchEvent.OutputTuple, TransferBatchEvent.OutputObject>;
    getEvent(key: "TransferSingle"): TypedContractEvent<TransferSingleEvent.InputTuple, TransferSingleEvent.OutputTuple, TransferSingleEvent.OutputObject>;
    getEvent(key: "URI"): TypedContractEvent<URIEvent.InputTuple, URIEvent.OutputTuple, URIEvent.OutputObject>;
    filters: {
        "ApprovalForAll(address,address,bool)": TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
        ApprovalForAll: TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "SetRle(uint256)": TypedContractEvent<SetRleEvent.InputTuple, SetRleEvent.OutputTuple, SetRleEvent.OutputObject>;
        SetRle: TypedContractEvent<SetRleEvent.InputTuple, SetRleEvent.OutputTuple, SetRleEvent.OutputObject>;
        "TransferBatch(address,address,address,uint256[],uint256[])": TypedContractEvent<TransferBatchEvent.InputTuple, TransferBatchEvent.OutputTuple, TransferBatchEvent.OutputObject>;
        TransferBatch: TypedContractEvent<TransferBatchEvent.InputTuple, TransferBatchEvent.OutputTuple, TransferBatchEvent.OutputObject>;
        "TransferSingle(address,address,address,uint256,uint256)": TypedContractEvent<TransferSingleEvent.InputTuple, TransferSingleEvent.OutputTuple, TransferSingleEvent.OutputObject>;
        TransferSingle: TypedContractEvent<TransferSingleEvent.InputTuple, TransferSingleEvent.OutputTuple, TransferSingleEvent.OutputObject>;
        "URI(string,uint256)": TypedContractEvent<URIEvent.InputTuple, URIEvent.OutputTuple, URIEvent.OutputObject>;
        URI: TypedContractEvent<URIEvent.InputTuple, URIEvent.OutputTuple, URIEvent.OutputObject>;
    };
}
