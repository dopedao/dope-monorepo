// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.9;

import {IMaintainer} from "./interfaces/IMaintainer.sol";

import {Components} from "./lib/Components.sol";
import {MerkleClaim} from "./MerkleClaim.sol";
import {MaintainerOwner} from "./MaintainerOwner.sol";

contract Accessories is MerkleClaim, MaintainerOwner {
    constructor(bytes32 root) MerkleClaim(root) {}

    function claim(uint256 hid) public {}
}
