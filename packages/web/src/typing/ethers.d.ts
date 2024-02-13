// ethers.d.ts

// https://github.com/ethers-io/ethers.js/issues/4029#issuecomment-1798995683
import type { LogDescription } from 'ethers';

declare module 'ethers' {
  interface Interface {
    parseLog(log: { topics: ReadonlyArray<string>; data: string }): null | LogDescription;
  }
}
