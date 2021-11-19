import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { CrossDomainMessenger, CrossDomainMessengerInterface } from "../CrossDomainMessenger";
export declare class CrossDomainMessenger__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): CrossDomainMessengerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): CrossDomainMessenger;
}
