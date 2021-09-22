// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import './utils/CharacterSetup.sol';
import './utils/StockpileSetup.sol';

contract Open is CharacterTest {
    function testCanEquip() public {
        ItemIds memory ids = stockpile.ids(BAG);

        uint48[] memory _ids = new uint48[](8);
        _ids[0] = 1;
        _ids[1] = uint48(ids.clothes);
        _ids[2] = uint48(ids.foot);
        _ids[3] = uint48(ids.hand);
        _ids[4] = uint48(ids.neck);
        _ids[5] = uint48(ids.ring);
        _ids[6] = uint48(ids.waist);
        _ids[7] = uint48(ids.weapon);

        alice.equip(_ids);

        uint48[] memory equipped = character.equipmentOf(address(alice));
        assertEq(equipped[0], 1);
        assertEq(equipped[1], uint48(ids.clothes));
        assertEq(equipped[2], uint48(ids.foot));
        assertEq(equipped[3], uint48(ids.hand));
        assertEq(equipped[4], uint48(ids.neck));
        assertEq(equipped[5], uint48(ids.ring));
        assertEq(equipped[6], uint48(ids.waist));
        assertEq(equipped[7], uint48(ids.weapon));
    }

    // helper for checking ownership of erc1155 tokens after unbundling a bag
    function checkOwns1155s(uint256 tokenId, address who) private {
        ItemIds memory ids = stockpile.ids(tokenId);
        assertEq(stockpile.balanceOf(who, ids.weapon), 1);
        assertEq(stockpile.balanceOf(who, ids.clothes), 1);
        assertEq(stockpile.balanceOf(who, ids.vehicle), 1);
        assertEq(stockpile.balanceOf(who, ids.waist), 1);
        assertEq(stockpile.balanceOf(who, ids.foot), 1);
        assertEq(stockpile.balanceOf(who, ids.hand), 1);
        assertEq(stockpile.balanceOf(who, ids.drugs), 1);
        assertEq(stockpile.balanceOf(who, ids.neck), 1);
        assertEq(stockpile.balanceOf(who, ids.ring), 1);
    }
}
