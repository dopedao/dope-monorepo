import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { Controller, ControllerInterface } from "../Controller";
export declare class Controller__factory {
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        name?: undefined;
        outputs?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): ControllerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Controller;
}
