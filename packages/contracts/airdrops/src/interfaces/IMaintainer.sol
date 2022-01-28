// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IMaintainer {
    function setPallete(uint8 idx, address getter) external;

    function setRles(address getter) external;

    function addAccessory(string calldata component) external;

    function mintAccessory(
        address to,
        uint8[5] memory components_,
        uint256 amount,
        bytes memory data
    ) external;

    function addBodyRles(address getter) external;

    function setItemRle(
        uint256 id,
        bytes memory male,
        bytes memory female
    ) external;

    function transferOwnership(address newOwner) external;
}
