import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "./common";
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
export interface HustlerInterface extends Interface {
    getFunction(nameOrSignature: "addRles" | "attributes" | "balanceOf" | "balanceOfBatch" | "bodyRle" | "carParts" | "contractURI" | "enforcer" | "hustlerParts" | "isApprovedForAll" | "metadata" | "mintOGTo" | "mintTo(address,bytes)" | "mintTo(address,(bytes4,bytes4,bytes2,uint8[4],uint8[4],uint8[10],bytes2,string),bytes)" | "name" | "onERC1155BatchReceived" | "onERC1155Received" | "owner" | "render" | "renounceOwnership" | "safeBatchTransferFrom" | "safeTransferFrom" | "setApprovalForAll" | "setEnforcer" | "setMetadata" | "supportsInterface" | "symbol" | "tokenURI" | "transferOwnership" | "unequip" | "uri"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "AddRles" | "ApprovalForAll" | "MetadataUpdate" | "OwnershipTransferred" | "TransferBatch" | "TransferSingle" | "URI"): EventFragment;
    encodeFunctionData(functionFragment: "addRles", values: [BigNumberish, BytesLike[]]): string;
    encodeFunctionData(functionFragment: "attributes", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "balanceOfBatch", values: [AddressLike[], BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "bodyRle", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "carParts", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "contractURI", values?: undefined): string;
    encodeFunctionData(functionFragment: "enforcer", values?: undefined): string;
    encodeFunctionData(functionFragment: "hustlerParts", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "isApprovedForAll", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "metadata", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "mintOGTo", values: [AddressLike, IHustlerActions.SetMetadataStruct, BytesLike]): string;
    encodeFunctionData(functionFragment: "mintTo(address,bytes)", values: [AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "mintTo(address,(bytes4,bytes4,bytes2,uint8[4],uint8[4],uint8[10],bytes2,string),bytes)", values: [AddressLike, IHustlerActions.SetMetadataStruct, BytesLike]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "onERC1155BatchReceived", values: [
        AddressLike,
        AddressLike,
        BigNumberish[],
        BigNumberish[],
        BytesLike
    ]): string;
    encodeFunctionData(functionFragment: "onERC1155Received", values: [AddressLike, AddressLike, BigNumberish, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "render", values: [
        string,
        string,
        BigNumberish,
        BytesLike,
        BytesLike,
        [
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish
        ],
        BytesLike[]
    ]): string;
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
    encodeFunctionData(functionFragment: "setEnforcer", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "setMetadata", values: [BigNumberish, IHustlerActions.SetMetadataStruct]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "tokenURI", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "unequip", values: [BigNumberish, BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "uri", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "addRles", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "attributes", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOfBatch", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "bodyRle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "carParts", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contractURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "enforcer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hustlerParts", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "metadata", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintOGTo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintTo(address,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintTo(address,(bytes4,bytes4,bytes2,uint8[4],uint8[4],uint8[10],bytes2,string),bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onERC1155BatchReceived", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onERC1155Received", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "render", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeBatchTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setEnforcer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setMetadata", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unequip", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "uri", data: BytesLike): Result;
}
export declare namespace AddRlesEvent {
    type InputTuple = [part: BigNumberish, len: BigNumberish];
    type OutputTuple = [part: bigint, len: bigint];
    interface OutputObject {
        part: bigint;
        len: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
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
export declare namespace MetadataUpdateEvent {
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
export interface Hustler extends BaseContract {
    connect(runner?: ContractRunner | null): Hustler;
    waitForDeployment(): Promise<this>;
    interface: HustlerInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    addRles: TypedContractMethod<[
        part: BigNumberish,
        _rles: BytesLike[]
    ], [
        void
    ], "nonpayable">;
    attributes: TypedContractMethod<[
        hustlerId: BigNumberish
    ], [
        string[]
    ], "view">;
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
    bodyRle: TypedContractMethod<[
        part: BigNumberish,
        idx: BigNumberish
    ], [
        string
    ], "view">;
    carParts: TypedContractMethod<[hustlerId: BigNumberish], [string[]], "view">;
    contractURI: TypedContractMethod<[], [string], "view">;
    enforcer: TypedContractMethod<[], [string], "view">;
    hustlerParts: TypedContractMethod<[
        hustlerId: BigNumberish
    ], [
        string[]
    ], "view">;
    isApprovedForAll: TypedContractMethod<[
        account: AddressLike,
        operator: AddressLike
    ], [
        boolean
    ], "view">;
    metadata: TypedContractMethod<[
        arg0: BigNumberish
    ], [
        [
            string,
            string,
            string,
            string,
            bigint,
            string
        ] & {
            color: string;
            background: string;
            mask: string;
            options: string;
            age: bigint;
            name: string;
        }
    ], "view">;
    mintOGTo: TypedContractMethod<[
        to: AddressLike,
        m: IHustlerActions.SetMetadataStruct,
        data: BytesLike
    ], [
        bigint
    ], "nonpayable">;
    "mintTo(address,bytes)": TypedContractMethod<[
        to: AddressLike,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    "mintTo(address,(bytes4,bytes4,bytes2,uint8[4],uint8[4],uint8[10],bytes2,string),bytes)": TypedContractMethod<[
        to: AddressLike,
        m: IHustlerActions.SetMetadataStruct,
        data: BytesLike
    ], [
        bigint
    ], "nonpayable">;
    name: TypedContractMethod<[], [string], "view">;
    onERC1155BatchReceived: TypedContractMethod<[
        operator: AddressLike,
        from: AddressLike,
        ids: BigNumberish[],
        values: BigNumberish[],
        data: BytesLike
    ], [
        string
    ], "nonpayable">;
    onERC1155Received: TypedContractMethod<[
        operator: AddressLike,
        from: AddressLike,
        id: BigNumberish,
        value: BigNumberish,
        data: BytesLike
    ], [
        string
    ], "nonpayable">;
    owner: TypedContractMethod<[], [string], "view">;
    render: TypedContractMethod<[
        title: string,
        subtitle: string,
        resolution: BigNumberish,
        background: BytesLike,
        color: BytesLike,
        viewbox: [BigNumberish, BigNumberish, BigNumberish, BigNumberish],
        parts: BytesLike[]
    ], [
        string
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
    setEnforcer: TypedContractMethod<[
        enforcer_: AddressLike
    ], [
        void
    ], "nonpayable">;
    setMetadata: TypedContractMethod<[
        hustlerId: BigNumberish,
        m: IHustlerActions.SetMetadataStruct
    ], [
        void
    ], "nonpayable">;
    supportsInterface: TypedContractMethod<[
        interfaceId: BytesLike
    ], [
        boolean
    ], "view">;
    symbol: TypedContractMethod<[], [string], "view">;
    tokenURI: TypedContractMethod<[hustlerId: BigNumberish], [string], "view">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
    unequip: TypedContractMethod<[
        hustlerId: BigNumberish,
        slots: BigNumberish[]
    ], [
        void
    ], "nonpayable">;
    uri: TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "addRles"): TypedContractMethod<[
        part: BigNumberish,
        _rles: BytesLike[]
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "attributes"): TypedContractMethod<[hustlerId: BigNumberish], [string[]], "view">;
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
    getFunction(nameOrSignature: "bodyRle"): TypedContractMethod<[
        part: BigNumberish,
        idx: BigNumberish
    ], [
        string
    ], "view">;
    getFunction(nameOrSignature: "carParts"): TypedContractMethod<[hustlerId: BigNumberish], [string[]], "view">;
    getFunction(nameOrSignature: "contractURI"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "enforcer"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "hustlerParts"): TypedContractMethod<[hustlerId: BigNumberish], [string[]], "view">;
    getFunction(nameOrSignature: "isApprovedForAll"): TypedContractMethod<[
        account: AddressLike,
        operator: AddressLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "metadata"): TypedContractMethod<[
        arg0: BigNumberish
    ], [
        [
            string,
            string,
            string,
            string,
            bigint,
            string
        ] & {
            color: string;
            background: string;
            mask: string;
            options: string;
            age: bigint;
            name: string;
        }
    ], "view">;
    getFunction(nameOrSignature: "mintOGTo"): TypedContractMethod<[
        to: AddressLike,
        m: IHustlerActions.SetMetadataStruct,
        data: BytesLike
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "mintTo(address,bytes)"): TypedContractMethod<[
        to: AddressLike,
        data: BytesLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "mintTo(address,(bytes4,bytes4,bytes2,uint8[4],uint8[4],uint8[10],bytes2,string),bytes)"): TypedContractMethod<[
        to: AddressLike,
        m: IHustlerActions.SetMetadataStruct,
        data: BytesLike
    ], [
        bigint
    ], "nonpayable">;
    getFunction(nameOrSignature: "name"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "onERC1155BatchReceived"): TypedContractMethod<[
        operator: AddressLike,
        from: AddressLike,
        ids: BigNumberish[],
        values: BigNumberish[],
        data: BytesLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "onERC1155Received"): TypedContractMethod<[
        operator: AddressLike,
        from: AddressLike,
        id: BigNumberish,
        value: BigNumberish,
        data: BytesLike
    ], [
        string
    ], "nonpayable">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "render"): TypedContractMethod<[
        title: string,
        subtitle: string,
        resolution: BigNumberish,
        background: BytesLike,
        color: BytesLike,
        viewbox: [BigNumberish, BigNumberish, BigNumberish, BigNumberish],
        parts: BytesLike[]
    ], [
        string
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
    getFunction(nameOrSignature: "setEnforcer"): TypedContractMethod<[enforcer_: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "setMetadata"): TypedContractMethod<[
        hustlerId: BigNumberish,
        m: IHustlerActions.SetMetadataStruct
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "supportsInterface"): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
    getFunction(nameOrSignature: "symbol"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "tokenURI"): TypedContractMethod<[hustlerId: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "unequip"): TypedContractMethod<[
        hustlerId: BigNumberish,
        slots: BigNumberish[]
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "uri"): TypedContractMethod<[tokenId: BigNumberish], [string], "view">;
    getEvent(key: "AddRles"): TypedContractEvent<AddRlesEvent.InputTuple, AddRlesEvent.OutputTuple, AddRlesEvent.OutputObject>;
    getEvent(key: "ApprovalForAll"): TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
    getEvent(key: "MetadataUpdate"): TypedContractEvent<MetadataUpdateEvent.InputTuple, MetadataUpdateEvent.OutputTuple, MetadataUpdateEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "TransferBatch"): TypedContractEvent<TransferBatchEvent.InputTuple, TransferBatchEvent.OutputTuple, TransferBatchEvent.OutputObject>;
    getEvent(key: "TransferSingle"): TypedContractEvent<TransferSingleEvent.InputTuple, TransferSingleEvent.OutputTuple, TransferSingleEvent.OutputObject>;
    getEvent(key: "URI"): TypedContractEvent<URIEvent.InputTuple, URIEvent.OutputTuple, URIEvent.OutputObject>;
    filters: {
        "AddRles(uint8,uint256)": TypedContractEvent<AddRlesEvent.InputTuple, AddRlesEvent.OutputTuple, AddRlesEvent.OutputObject>;
        AddRles: TypedContractEvent<AddRlesEvent.InputTuple, AddRlesEvent.OutputTuple, AddRlesEvent.OutputObject>;
        "ApprovalForAll(address,address,bool)": TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
        ApprovalForAll: TypedContractEvent<ApprovalForAllEvent.InputTuple, ApprovalForAllEvent.OutputTuple, ApprovalForAllEvent.OutputObject>;
        "MetadataUpdate(uint256)": TypedContractEvent<MetadataUpdateEvent.InputTuple, MetadataUpdateEvent.OutputTuple, MetadataUpdateEvent.OutputObject>;
        MetadataUpdate: TypedContractEvent<MetadataUpdateEvent.InputTuple, MetadataUpdateEvent.OutputTuple, MetadataUpdateEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "TransferBatch(address,address,address,uint256[],uint256[])": TypedContractEvent<TransferBatchEvent.InputTuple, TransferBatchEvent.OutputTuple, TransferBatchEvent.OutputObject>;
        TransferBatch: TypedContractEvent<TransferBatchEvent.InputTuple, TransferBatchEvent.OutputTuple, TransferBatchEvent.OutputObject>;
        "TransferSingle(address,address,address,uint256,uint256)": TypedContractEvent<TransferSingleEvent.InputTuple, TransferSingleEvent.OutputTuple, TransferSingleEvent.OutputObject>;
        TransferSingle: TypedContractEvent<TransferSingleEvent.InputTuple, TransferSingleEvent.OutputTuple, TransferSingleEvent.OutputObject>;
        "URI(string,uint256)": TypedContractEvent<URIEvent.InputTuple, URIEvent.OutputTuple, URIEvent.OutputObject>;
        URI: TypedContractEvent<URIEvent.InputTuple, URIEvent.OutputTuple, URIEvent.OutputObject>;
    };
}
