import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { MetadataBuilder, MetadataBuilderInterface } from "../MetadataBuilder";
export declare class MetadataBuilder__factory {
    static readonly abi: {
        inputs: ({
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        } | {
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        })[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): MetadataBuilderInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): MetadataBuilder;
}
