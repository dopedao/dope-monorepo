import { ethers, Signer, BigNumber, BigNumberish, PopulatedTransaction, BaseContract, ContractTransaction, Overrides, PayableOverrides, CallOverrides } from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface InitiatorInterface extends ethers.utils.Interface {
    functions: {
        "cost()": FunctionFragment;
        "isOpened(uint256)": FunctionFragment;
        "mintFromDopeTo(uint256,address,string,bytes4,bytes4,bytes2,uint8[4],uint8[4],bytes2,bytes,uint32)": FunctionFragment;
        "mintOGFromDopeTo(uint256,address,string,bytes4,bytes4,bytes2,uint8[4],uint8[4],bytes2,bytes,uint32)": FunctionFragment;
        "open(uint256,address,bytes,uint32)": FunctionFragment;
        "owner()": FunctionFragment;
        "release()": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "setRelease(uint256)": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
        "withdraw()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "cost", values?: undefined): string;
    encodeFunctionData(functionFragment: "isOpened", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "mintFromDopeTo", values: [
        BigNumberish,
        string,
        string,
        BytesLike,
        BytesLike,
        BytesLike,
        [
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish
        ],
        [
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish
        ],
        BytesLike,
        BytesLike,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "mintOGFromDopeTo", values: [
        BigNumberish,
        string,
        string,
        BytesLike,
        BytesLike,
        BytesLike,
        [
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish
        ],
        [
            BigNumberish,
            BigNumberish,
            BigNumberish,
            BigNumberish
        ],
        BytesLike,
        BytesLike,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "open", values: [BigNumberish, string, BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "release", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "setRelease", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [string]): string;
    encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;
    decodeFunctionResult(functionFragment: "cost", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isOpened", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintFromDopeTo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintOGFromDopeTo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "open", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "release", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setRelease", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
    events: {
        "Opened(uint256)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Opened"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}
export declare type OpenedEvent = TypedEvent<[BigNumber], {
    id: BigNumber;
}>;
export declare type OpenedEventFilter = TypedEventFilter<OpenedEvent>;
export declare type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], {
    previousOwner: string;
    newOwner: string;
}>;
export declare type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
export interface Initiator extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: InitiatorInterface;
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
        cost(overrides?: CallOverrides): Promise<[BigNumber]>;
        isOpened(id: BigNumberish, overrides?: CallOverrides): Promise<[boolean]>;
        mintFromDopeTo(id: BigNumberish, to: string, name: string, color: BytesLike, background: BytesLike, options: BytesLike, viewbox: [BigNumberish, BigNumberish, BigNumberish, BigNumberish], body: [BigNumberish, BigNumberish, BigNumberish, BigNumberish], mask: BytesLike, data: BytesLike, gasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        mintOGFromDopeTo(id: BigNumberish, to: string, name: string, color: BytesLike, background: BytesLike, options: BytesLike, viewbox: [BigNumberish, BigNumberish, BigNumberish, BigNumberish], body: [BigNumberish, BigNumberish, BigNumberish, BigNumberish], mask: BytesLike, data: BytesLike, gasLimit: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        open(id: BigNumberish, to: string, data: BytesLike, gasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        release(overrides?: CallOverrides): Promise<[BigNumber]>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        setRelease(_release: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        withdraw(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    cost(overrides?: CallOverrides): Promise<BigNumber>;
    isOpened(id: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
    mintFromDopeTo(id: BigNumberish, to: string, name: string, color: BytesLike, background: BytesLike, options: BytesLike, viewbox: [BigNumberish, BigNumberish, BigNumberish, BigNumberish], body: [BigNumberish, BigNumberish, BigNumberish, BigNumberish], mask: BytesLike, data: BytesLike, gasLimit: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    mintOGFromDopeTo(id: BigNumberish, to: string, name: string, color: BytesLike, background: BytesLike, options: BytesLike, viewbox: [BigNumberish, BigNumberish, BigNumberish, BigNumberish], body: [BigNumberish, BigNumberish, BigNumberish, BigNumberish], mask: BytesLike, data: BytesLike, gasLimit: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    open(id: BigNumberish, to: string, data: BytesLike, gasLimit: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    owner(overrides?: CallOverrides): Promise<string>;
    release(overrides?: CallOverrides): Promise<BigNumber>;
    renounceOwnership(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    setRelease(_release: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    transferOwnership(newOwner: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    withdraw(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        cost(overrides?: CallOverrides): Promise<BigNumber>;
        isOpened(id: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
        mintFromDopeTo(id: BigNumberish, to: string, name: string, color: BytesLike, background: BytesLike, options: BytesLike, viewbox: [BigNumberish, BigNumberish, BigNumberish, BigNumberish], body: [BigNumberish, BigNumberish, BigNumberish, BigNumberish], mask: BytesLike, data: BytesLike, gasLimit: BigNumberish, overrides?: CallOverrides): Promise<void>;
        mintOGFromDopeTo(id: BigNumberish, to: string, name: string, color: BytesLike, background: BytesLike, options: BytesLike, viewbox: [BigNumberish, BigNumberish, BigNumberish, BigNumberish], body: [BigNumberish, BigNumberish, BigNumberish, BigNumberish], mask: BytesLike, data: BytesLike, gasLimit: BigNumberish, overrides?: CallOverrides): Promise<void>;
        open(id: BigNumberish, to: string, data: BytesLike, gasLimit: BigNumberish, overrides?: CallOverrides): Promise<void>;
        owner(overrides?: CallOverrides): Promise<string>;
        release(overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        setRelease(_release: BigNumberish, overrides?: CallOverrides): Promise<void>;
        transferOwnership(newOwner: string, overrides?: CallOverrides): Promise<void>;
        withdraw(overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "Opened(uint256)"(id?: null): OpenedEventFilter;
        Opened(id?: null): OpenedEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;
    };
    estimateGas: {
        cost(overrides?: CallOverrides): Promise<BigNumber>;
        isOpened(id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        mintFromDopeTo(id: BigNumberish, to: string, name: string, color: BytesLike, background: BytesLike, options: BytesLike, viewbox: [BigNumberish, BigNumberish, BigNumberish, BigNumberish], body: [BigNumberish, BigNumberish, BigNumberish, BigNumberish], mask: BytesLike, data: BytesLike, gasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        mintOGFromDopeTo(id: BigNumberish, to: string, name: string, color: BytesLike, background: BytesLike, options: BytesLike, viewbox: [BigNumberish, BigNumberish, BigNumberish, BigNumberish], body: [BigNumberish, BigNumberish, BigNumberish, BigNumberish], mask: BytesLike, data: BytesLike, gasLimit: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        open(id: BigNumberish, to: string, data: BytesLike, gasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        release(overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        setRelease(_release: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        withdraw(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        cost(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isOpened(id: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        mintFromDopeTo(id: BigNumberish, to: string, name: string, color: BytesLike, background: BytesLike, options: BytesLike, viewbox: [BigNumberish, BigNumberish, BigNumberish, BigNumberish], body: [BigNumberish, BigNumberish, BigNumberish, BigNumberish], mask: BytesLike, data: BytesLike, gasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        mintOGFromDopeTo(id: BigNumberish, to: string, name: string, color: BytesLike, background: BytesLike, options: BytesLike, viewbox: [BigNumberish, BigNumberish, BigNumberish, BigNumberish], body: [BigNumberish, BigNumberish, BigNumberish, BigNumberish], mask: BytesLike, data: BytesLike, gasLimit: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        open(id: BigNumberish, to: string, data: BytesLike, gasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        release(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        setRelease(_release: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        withdraw(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
