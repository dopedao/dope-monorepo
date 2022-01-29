// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.9;

import {ERC20} from "solmate/tokens/ERC20.sol";

import {IMaintainer} from "./interfaces/IMaintainer.sol";
import {MerkleClaim} from "./MerkleClaim.sol";
import {MaintainerOwner} from "./MaintainerOwner.sol";
import {TokenId} from "./utils/TokenId.sol";

contract Hongbao is MerkleClaim, MaintainerOwner {
    event Opened(uint8 typ, uint256 id);

    ERC20 paper = ERC20(0x00F932F0FE257456b32dedA4758922E56A4F4b42);
    address treasury = 0x90103beDCfbE1eeE44ded89cEd88bA8503580b3D;
    uint256 start = 1643691600;

    uint8 prefix = 65;
    uint8 suffix = 10;
    uint8[10] internal accessories = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    uint8[12] internal zodiacs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    constructor(bytes32 root) MerkleClaim(root) {}

    function draw(uint256 nonce) internal view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.number, nonce)));
    }

    function mint() public payable {
        uint256 rand = draw(0) % 1000;

        // uint8[5] =>
        //     [0] = Item ID
        //     [1] = Suffix ID (0 for none)
        //     [2] = Name Prefix ID (0 for none)
        //     [3] = Name Suffix ID (0 for none)
        //     [4] = Augmentation (0 = false, 1 = true)
        uint8[5] memory components;
        // TODO: Set mask item id
        components[0] = 1;
        components[1] = suffix;
        components[2] = prefix;
        // TODO: Tiger suffix
        components[3] = 5;

        if (msg.value > 0) {
            uint256 boosted = rand + msg.value / 1e16;

            if (boosted >= 995) {
                // Notorius Tiger
                components[2] = 20;
                components[4] = 1;
            } else if (boosted >= 900) {
                // Big Tiger
                components[2] = 6;
            }

            // + zodiac
            uint8[5] memory zodiac;
            // TODO: Set mask item id
            zodiac[0] = 1;
            zodiac[1] = suffix;
            zodiac[2] = prefix;
            zodiac[3] = zodiacs[rand % 12];
            maintainer.mintAccessory(msg.sender, zodiac, 1, "");
        }

        IMaintainer(0xb949A2648cf9209AAa1EeA5DBc65B7AAAEdC78dc).mintAccessory(
            msg.sender,
            components,
            1,
            ""
        );

        paper.transferFrom(msg.sender, address(this), 5000e18);
    }

    function claim(uint256 amount, bytes32[] calldata proof) public {
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender, amount));
        _claim(leaf, proof);

        uint8[5] memory components;
        components[1] = suffix;

        for (uint256 i = 0; i < amount; i++) {
            uint256 rand = draw(i) % 100;

            if (rand < 10 && paper.balanceOf(address(this)) >= 1000e18) {
                paper.transfer(msg.sender, 1000e18);
                emit Opened(0, 0);
            } else {
                // TODO: Set mask item id
                components[0] = accessories[rand % accessories.length];

                emit Opened(1, TokenId.toId(components, 0x9));
            }
        }
    }
}
