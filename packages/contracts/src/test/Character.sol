// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./utils/CharacterSetup.sol";
import {ItemIds} from "../LootTokensMetadata.sol";

contract Open is CharacterTest {
    function testCanEquip() public {
        alice.open(BAG);
    }

    // helper for checking ownership of erc1155 tokens after unbundling a bag
    function checkOwns1155s(uint256 tokenId, address who) private {
        ItemIds memory ids = inventory.ids(tokenId);
        assertEq(inventory.balanceOf(who, ids.weapon), 1);
        assertEq(inventory.balanceOf(who, ids.clothes), 1);
        assertEq(inventory.balanceOf(who, ids.vehicle), 1);
        assertEq(inventory.balanceOf(who, ids.waist), 1);
        assertEq(inventory.balanceOf(who, ids.foot), 1);
        assertEq(inventory.balanceOf(who, ids.hand), 1);
        assertEq(inventory.balanceOf(who, ids.drugs), 1);
        assertEq(inventory.balanceOf(who, ids.neck), 1);
        assertEq(inventory.balanceOf(who, ids.ring), 1);
    }
}
