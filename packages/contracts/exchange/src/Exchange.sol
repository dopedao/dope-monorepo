//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import {IERC20} from "openzeppelin-contracts/token/ERC20/IERC20.sol";
import {IERC1155} from "openzeppelin-contracts/token/ERC1155/IERC1155.sol";
import {Ownable} from "openzeppelin-contracts/access/Ownable.sol";

library AssetTypes {
    uint8 internal constant ETH = 0x0;
    uint8 internal constant PAPER = 0x1;
    uint8 internal constant EQUIPMENT = 0x2;
}

contract SwapMeetExchange is Ownable {
    struct Offer {
        address maker;
        Asset[] inputs;
        Asset[] outputs;
    }

    struct Asset {
        uint8 assetType;
        uint96 id;
        uint128 amount;
    }

    struct Signature {
        // EC Signature data.
        uint8 v;
        // EC Signature data.
        bytes32 r;
        // EC Signature data.
        bytes32 s;
    }

    IERC20 private paper;
    IERC1155 private swapmeet;
    mapping(bytes32 => Offer) public offers;

    constructor(IERC20 paper_, IERC1155 swapmeet_) {
        paper = paper_;
        swapmeet = swapmeet_;
    }

    // function offer(Asset[] memory inputs, Asset[] memory outputs)
    //     external
    // {
    //     Offer memory offer = Offer({
    //         maker: msg.sender,
    //         inputs: inputs,
    //         outputs: outputs
    //     });

    //     offers[keccak256(offer)] = offer;
    // }

    function cancel(bytes32 h) external {
        require(offers[h].maker == msg.sender, "not yours");
        delete offers[h];
    }

    function redeem(Offer calldata offer, Signature calldata sig)
        external
        payable
    {}
}
