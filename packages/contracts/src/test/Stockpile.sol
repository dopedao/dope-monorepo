// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import './utils/StockpileSetup.sol';
import { Gender } from '../Stockpile.sol';

contract Open is StockpileTest {
    bytes internal constant jordans =
        hex'00322737190200012a012b0600012b012a02000200032b0400032b02000100012b0119012a012b0400012b012a0119012b0100022b031904000319022b052a0400052a';
    bytes internal constant fanny = hex'002024231d020601070112031303000112031303000412';

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
        assertEq(stockpile.balanceOf(address(owner), ids[0]), 1);
        assertEq(stockpile.balanceOf(address(owner), ids[1]), 2);
        assertEq(stockpile.balanceOf(address(owner), ids[2]), 3);
    }

    function testCanOpenBag() public {
        alice.open(BAG);
        checkOwns1155s(BAG, address(alice));
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
        assertEq(string(stockpile.tokenRle(1, Gender.MALE)), string(jordans));
        assertEq(string(stockpile.tokenRle(1, Gender.FEMALE)), string(fanny));
    }

    function testFailSetRleNonOwner() public {
        stockpile.setRle(1, jordans, fanny);
        assertEq(string(stockpile.tokenRle(1, Gender.MALE)), string(jordans));
        assertEq(string(stockpile.tokenRle(1, Gender.FEMALE)), string(fanny));
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

        ItemIds memory ids = stockpile.ids(FIRST_SILVER_RING_BAG);
        assertEq(stockpile.balanceOf(address(alice), ids.ring), 2);
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
