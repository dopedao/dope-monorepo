import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface ComponentsInterface extends utils.Interface {
    functions: {
        "accessories(uint256)": FunctionFragment;
        "addComponent(uint8,string)": FunctionFragment;
        "attributes(uint8[5],uint8)": FunctionFragment;
        "clothes(uint256)": FunctionFragment;
        "drugs(uint256)": FunctionFragment;
        "footArmor(uint256)": FunctionFragment;
        "handArmor(uint256)": FunctionFragment;
        "items(uint256)": FunctionFragment;
        "name(uint8,uint256)": FunctionFragment;
        "namePrefixes(uint256)": FunctionFragment;
        "nameSuffixes(uint256)": FunctionFragment;
        "necklaces(uint256)": FunctionFragment;
        "owner()": FunctionFragment;
        "prefix(uint8,uint8)": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "rings(uint256)": FunctionFragment;
        "seed(uint256,uint8)": FunctionFragment;
        "suffix(uint8)": FunctionFragment;
        "suffixes(uint256)": FunctionFragment;
        "title(uint256)": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
        "vehicle(uint256)": FunctionFragment;
        "waistArmor(uint256)": FunctionFragment;
        "weapons(uint256)": FunctionFragment;
    };
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
    encodeFunctionData(functionFragment: "transferOwnership", values: [string]): string;
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
    events: {
        "AddComponent(uint256,uint256,string)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AddComponent"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}
export declare type AddComponentEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    string
], {
    id: BigNumber;
    componentType: BigNumber;
    component: string;
}>;
export declare type AddComponentEventFilter = TypedEventFilter<AddComponentEvent>;
export declare type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], {
    previousOwner: string;
    newOwner: string;
}>;
export declare type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export interface Components extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ComponentsInterface;
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
        accessories(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        addComponent(componentType: BigNumberish, component: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        attributes(components: [
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish
        ], componentType: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        clothes(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        drugs(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        footArmor(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        handArmor(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        items(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[
            [number, number, number, number, number][]
        ] & {
            items_: [number, number, number, number, number][];
        }>;
        name(componentType: BigNumberish, idx: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        namePrefixes(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        nameSuffixes(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        necklaces(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        prefix(prefixComponent: BigNumberish, suffixComponent: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        rings(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        seed(tokenId: BigNumberish, componentType: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;
        suffix(suffixComponent: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        suffixes(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        title(hustlerId: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        vehicle(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        waistArmor(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        weapons(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
    };
    accessories(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
    addComponent(componentType: BigNumberish, component: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    attributes(components: [
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ], componentType: BigNumberish, overrides?: CallOverrides): Promise<string>;
    clothes(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
    drugs(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
    footArmor(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
    handArmor(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
    items(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[number, number, number, number, number][]>;
    name(componentType: BigNumberish, idx: BigNumberish, overrides?: CallOverrides): Promise<string>;
    namePrefixes(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
    nameSuffixes(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
    necklaces(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
    owner(overrides?: CallOverrides): Promise<string>;
    prefix(prefixComponent: BigNumberish, suffixComponent: BigNumberish, overrides?: CallOverrides): Promise<string>;
    renounceOwnership(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    rings(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
    seed(tokenId: BigNumberish, componentType: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;
    suffix(suffixComponent: BigNumberish, overrides?: CallOverrides): Promise<string>;
    suffixes(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
    title(hustlerId: BigNumberish, overrides?: CallOverrides): Promise<string>;
    transferOwnership(newOwner: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    vehicle(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
    waistArmor(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
    weapons(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        accessories(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
        addComponent(componentType: BigNumberish, component: string, overrides?: CallOverrides): Promise<number>;
        attributes(components: [
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish
        ], componentType: BigNumberish, overrides?: CallOverrides): Promise<string>;
        clothes(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
        drugs(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
        footArmor(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
        handArmor(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
        items(tokenId: BigNumberish, overrides?: CallOverrides): Promise<[number, number, number, number, number][]>;
        name(componentType: BigNumberish, idx: BigNumberish, overrides?: CallOverrides): Promise<string>;
        namePrefixes(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
        nameSuffixes(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
        necklaces(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
        owner(overrides?: CallOverrides): Promise<string>;
        prefix(prefixComponent: BigNumberish, suffixComponent: BigNumberish, overrides?: CallOverrides): Promise<string>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        rings(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
        seed(tokenId: BigNumberish, componentType: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;
        suffix(suffixComponent: BigNumberish, overrides?: CallOverrides): Promise<string>;
        suffixes(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
        title(hustlerId: BigNumberish, overrides?: CallOverrides): Promise<string>;
        transferOwnership(newOwner: string, overrides?: CallOverrides): Promise<void>;
        vehicle(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
        waistArmor(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
        weapons(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "AddComponent(uint256,uint256,string)"(id?: null, componentType?: null, component?: null): AddComponentEventFilter;
        AddComponent(id?: null, componentType?: null, component?: null): AddComponentEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
    };
    estimateGas: {
        accessories(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        addComponent(componentType: BigNumberish, component: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        attributes(components: [
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish
        ], componentType: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        clothes(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        drugs(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        footArmor(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        handArmor(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        items(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        name(componentType: BigNumberish, idx: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        namePrefixes(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        nameSuffixes(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        necklaces(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        prefix(prefixComponent: BigNumberish, suffixComponent: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        rings(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        seed(tokenId: BigNumberish, componentType: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        suffix(suffixComponent: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        suffixes(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        title(hustlerId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        vehicle(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        waistArmor(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        weapons(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        accessories(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        addComponent(componentType: BigNumberish, component: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        attributes(components: [
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish
        ], componentType: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        clothes(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        drugs(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        footArmor(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        handArmor(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        items(tokenId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        name(componentType: BigNumberish, idx: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        namePrefixes(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nameSuffixes(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        necklaces(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        prefix(prefixComponent: BigNumberish, suffixComponent: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        rings(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        seed(tokenId: BigNumberish, componentType: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        suffix(suffixComponent: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        suffixes(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        title(hustlerId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        vehicle(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        waistArmor(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        weapons(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
