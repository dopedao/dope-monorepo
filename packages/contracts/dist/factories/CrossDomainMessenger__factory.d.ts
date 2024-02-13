import { type ContractRunner } from "ethers";
import type { CrossDomainMessenger, CrossDomainMessengerInterface } from "../CrossDomainMessenger";
export declare class CrossDomainMessenger__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_target";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "_sender";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "_message";
            readonly type: "bytes";
        }, {
            readonly internalType: "uint256";
            readonly name: "_messageNonce";
            readonly type: "uint256";
        }];
        readonly name: "relayMessage";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): CrossDomainMessengerInterface;
    static connect(address: string, runner?: ContractRunner | null): CrossDomainMessenger;
}
