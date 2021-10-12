// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import './utils/HustlerSetup.sol';
import './utils/StockpileSetup.sol';

contract Setters is HustlerTest {
    function testCanSetBodyPartial() public {
        uint256 id = alice.mint();
        uint8[4] memory body = [1, 0, 12, 0];
        alice.setBody(id, body, 0x05); // 0000 0101

        assertEq(hustler.getMetadata(id).body[0], 1);
        assertEq(hustler.getMetadata(id).body[1], 0);
        assertEq(hustler.getMetadata(id).body[2], 12);
        assertEq(hustler.getMetadata(id).body[3], 0);
    }

    function testCanSetBodyFull() public {
        uint256 id = alice.mint();
        uint8[4] memory body = [2, 3, 4, 5];
        alice.setBody(id, body, 0x0f); // 0000 1111

        assertEq(hustler.getMetadata(id).body[0], 2);
        assertEq(hustler.getMetadata(id).body[1], 3);
        assertEq(hustler.getMetadata(id).body[2], 4);
        assertEq(hustler.getMetadata(id).body[3], 5);
    }

    function testCanSetSlotsPartial() public {
        uint256 id = alice.mint();
        ItemIds memory ids = stockpile.ids(BAG);

        uint256[10] memory slots = [
            ids.weapon,
            ids.clothes,
            ids.vehicle,
            ids.waist,
            ids.foot,
            ids.hand,
            ids.drugs,
            ids.neck,
            ids.ring,
            0
        ];
        alice.setApprovalForAll(address(hustler), true);
        alice.setSlots(id, slots, 0x0005); // 0000 0000 0000 0101

        assertEq(hustler.getMetadata(id).slots[0], ids.weapon);
        assertEq(hustler.getMetadata(id).slots[1], 0);
        assertEq(hustler.getMetadata(id).slots[2], ids.vehicle);
        assertEq(hustler.getMetadata(id).slots[3], 0);
        assertEq(hustler.getMetadata(id).slots[4], 0);
        assertEq(hustler.getMetadata(id).slots[5], 0);
        assertEq(hustler.getMetadata(id).slots[6], 0);
        assertEq(hustler.getMetadata(id).slots[7], 0);
        assertEq(hustler.getMetadata(id).slots[8], 0);
        assertEq(hustler.getMetadata(id).slots[9], 0);
    }

    function testCanSetSlotsFull() public {
        uint256 id = alice.mint();
        ItemIds memory ids = stockpile.ids(BAG);

        uint256[10] memory slots = [
            ids.weapon,
            ids.clothes,
            ids.vehicle,
            ids.waist,
            ids.foot,
            ids.hand,
            ids.drugs,
            ids.neck,
            ids.ring,
            0
        ];
        alice.setApprovalForAll(address(hustler), true);
        alice.setSlots(id, slots, 0x01ff); // 0000 0001 1111 1111

        assertEq(hustler.getMetadata(id).slots[0], ids.weapon);
        assertEq(hustler.getMetadata(id).slots[1], ids.clothes);
        assertEq(hustler.getMetadata(id).slots[2], ids.vehicle);
        assertEq(hustler.getMetadata(id).slots[3], ids.waist);
        assertEq(hustler.getMetadata(id).slots[4], ids.foot);
        assertEq(hustler.getMetadata(id).slots[5], ids.hand);
        assertEq(hustler.getMetadata(id).slots[6], ids.drugs);
        assertEq(hustler.getMetadata(id).slots[7], ids.neck);
        assertEq(hustler.getMetadata(id).slots[8], ids.ring);
        assertEq(hustler.getMetadata(id).slots[9], 0);
    }
}
