// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.0;

import {Ownable} from "openzeppelin-contracts/access/Ownable.sol";

import {IMaintainer} from "./interfaces/IMaintainer.sol";

contract MaintainerOwner is Ownable {
    IMaintainer internal maintainer =
        IMaintainer(0xb949A2648cf9209AAa1EeA5DBc65B7AAAEdC78dc);

    function transferMaintainerOwner(address newOwner) external onlyOwner {
        maintainer.transferOwnership(newOwner);
    }
}
