// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity >=0.8.0;

import {MerkleProof} from "openzeppelin-contracts/utils/cryptography/MerkleProof.sol";

contract MerkleClaim {
    bytes32 public immutable root;
    mapping(bytes32 => bool) public claimed;

    error Claimed();
    error Invalid();

    constructor(bytes32 _root) {
        root = _root;
    }

    function _claim(bytes32 leaf, bytes32[] calldata proof) internal {
        if (claimed[leaf]) revert Claimed();
        bool isValidLeaf = MerkleProof.verify(proof, root, leaf);
        if (!isValidLeaf) revert Invalid();
        claimed[leaf] = true;
    }
}
