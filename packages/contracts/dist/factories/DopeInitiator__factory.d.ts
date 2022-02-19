import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { DopeInitiator, DopeInitiatorInterface } from "../DopeInitiator";
export declare class DopeInitiator__factory {
    static readonly abi: ({
        type: string;
        inputs: never[];
        name?: undefined;
        outputs?: undefined;
        stateMutability?: undefined;
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
        stateMutability: string;
    } | {
        type: string;
        name: string;
        inputs: ({
            internalType: string;
            name: string;
            type: string;
            components: {
                type: string;
            }[];
        } | {
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        })[];
        outputs: never[];
        stateMutability: string;
    } | {
        type: string;
        inputs?: undefined;
        name?: undefined;
        outputs?: undefined;
        stateMutability?: undefined;
    })[];
    static createInterface(): DopeInitiatorInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): DopeInitiator;
}
