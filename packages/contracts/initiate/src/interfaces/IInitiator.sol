// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IHustlerActions {
    struct SetMetadata {
        bytes4 color;
        bytes4 background;
        bytes2 options;
        uint8[4] viewbox;
        uint8[4] body;
        uint8[10] order;
        bytes2 mask;
        string name;
    }
}

interface IInitiator {
    function mintFromDopeTo(
        uint256 id,
        address to,
        IHustlerActions.SetMetadata calldata meta,
        bytes memory data,
        uint32 gasLimit
    ) external;

    function cost() external returns (uint256);
}
