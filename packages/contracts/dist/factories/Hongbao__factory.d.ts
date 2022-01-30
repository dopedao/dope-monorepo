import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Hongbao, HongbaoInterface } from "../Hongbao";
export declare class Hongbao__factory {
    static readonly abi: ({
        type: string;
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name?: undefined;
        outputs?: undefined;
        constant?: undefined;
        stateMutability?: undefined;
        anonymous?: undefined;
    } | {
        type: string;
        name: string;
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        constant: null;
        stateMutability: string;
        anonymous?: undefined;
    } | {
        type: string;
        name: string;
        inputs: {
            name: string;
            type: string;
            indexed: boolean;
        }[];
        anonymous: boolean;
        outputs?: undefined;
        constant?: undefined;
        stateMutability?: undefined;
    } | {
        type: string;
        name: string;
        inputs: never[];
        outputs?: undefined;
        constant?: undefined;
        stateMutability?: undefined;
        anonymous?: undefined;
    })[];
    static createInterface(): HongbaoInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Hongbao;
}
