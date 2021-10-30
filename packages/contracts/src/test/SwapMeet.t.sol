// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import './utils/SwapMeetSetup.sol';
import { Gender } from '../SwapMeet.sol';

contract Open is SwapMeetTest {
    bytes internal constant jordans =
        hex'013226371d0100013104000131020001330131013302000133019b0200012501340125020001310125013201000135023202000225023201360231020001360331';
    bytes internal constant fanny = hex'011f24221c0100013b011f013b031f013b023b011f013b031f013b013b0700';

    function testCanMintBatch() public {
        uint8[] memory _components = new uint8[](15);
        _components[0] = owner.addItemComponent(0x0, 'blaster');
        _components[1] = owner.addItemComponent(0xb, 'ahh');
        _components[5] = owner.addItemComponent(0x3, 'slanger');
        _components[10] = owner.addItemComponent(0x8, 'band');

        uint8[] memory _itemTypes = new uint8[](3);
        _itemTypes[0] = 0x0;
        _itemTypes[1] = 0x3;
        _itemTypes[2] = 0x8;

        uint256[] memory _amounts = new uint256[](3);
        _amounts[0] = 1;
        _amounts[1] = 2;
        _amounts[2] = 3;

        uint256[] memory ids = owner.mintBatch(address(owner), _components, _itemTypes, _amounts, '');
        assertEq(swapmeet.balanceOf(address(owner), ids[0]), 1);
        assertEq(swapmeet.balanceOf(address(owner), ids[1]), 2);
        assertEq(swapmeet.balanceOf(address(owner), ids[2]), 3);
    }

    function testCanOpenBag() public {
        alice.open(BAG);
        checkOwns1155s(BAG, address(alice));
    }

    function testOpenBag() public {
        alice.open(BAG);
    }

    function testCanBatchOpenBags() public {
        uint256[] memory ids = new uint256[](3);
        ids[0] = BAG;
        ids[1] = BULK1_BAG;
        ids[2] = BULK2_BAG;
        alice.batchOpen(ids);
    }

    function testCanSetRle() public {
        owner.setRle(1, jordans, fanny);
        assertEq(string(swapmeet.tokenRle(1, Gender.MALE)), string(jordans));
        assertEq(string(swapmeet.tokenRle(1, Gender.FEMALE)), string(fanny));
    }

    function testFailSetRleNonOwner() public {
        swapmeet.setRle(1, jordans, fanny);
        assertEq(string(swapmeet.tokenRle(1, Gender.MALE)), string(jordans));
        assertEq(string(swapmeet.tokenRle(1, Gender.FEMALE)), string(fanny));
    }

    function testCanBatchSetRle() public {
        uint256[] memory ids = new uint256[](3);
        ids[0] = 1;
        ids[1] = 2;
        ids[2] = 3;

        bytes[] memory rles = new bytes[](6);
        rles[0] = jordans;
        rles[1] = jordans;
        rles[2] = jordans;
        rles[3] = jordans;
        rles[4] = jordans;
        rles[5] = jordans;

        owner.batchSetRle(ids, rles);
    }

    function testFailBatchSetRleWithLengthMismatch() public {
        uint256[] memory ids = new uint256[](3);
        ids[0] = 1;
        ids[1] = 2;
        ids[2] = 3;

        bytes[] memory rles = new bytes[](5);
        rles[0] = jordans;
        rles[1] = jordans;
        rles[2] = jordans;
        rles[3] = jordans;
        rles[4] = jordans;

        owner.batchSetRle(ids, rles);
    }

    function testFailCannotOpenBagTwice() public {
        alice.open(BAG);
        alice.open(BAG);
    }

    function testFailCannotOpenBagYouDoNotOwn() public {
        alice.open(OTHER_BAG);
    }

    function testSameItemsHaveCorrectBalance() public {
        alice.open(FIRST_SILVER_RING_BAG);
        alice.open(SECOND_SILVER_RING_BAG);

        ItemIds memory ids = swapmeet.ids(FIRST_SILVER_RING_BAG);
        assertEq(swapmeet.balanceOf(address(alice), ids.ring), 2);
    }

    // helper for checking ownership of erc1155 tokens after unbundling a bag
    function checkOwns1155s(uint256 tokenId, address who) private {
        ItemIds memory ids = swapmeet.ids(tokenId);
        assertEq(swapmeet.balanceOf(who, ids.weapon), 1);
        assertEq(swapmeet.balanceOf(who, ids.clothes), 1);
        assertEq(swapmeet.balanceOf(who, ids.vehicle), 1);
        assertEq(swapmeet.balanceOf(who, ids.waist), 1);
        assertEq(swapmeet.balanceOf(who, ids.foot), 1);
        assertEq(swapmeet.balanceOf(who, ids.hand), 1);
        assertEq(swapmeet.balanceOf(who, ids.drugs), 1);
        assertEq(swapmeet.balanceOf(who, ids.neck), 1);
        assertEq(swapmeet.balanceOf(who, ids.ring), 1);
    }
}
