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
        uint256[10] memory slots = [uint256(1), 0, 12, 0, 0, 0, 0, 0, 0, 0];
        alice.setSlots(id, slots, 0x05); // 0000 0101

        assertEq(hustler.getMetadata(id).slots[0], 2);
        assertEq(hustler.getMetadata(id).slots[1], 3);
        assertEq(hustler.getMetadata(id).slots[2], 4);
        assertEq(hustler.getMetadata(id).slots[3], 5);
        assertEq(hustler.getMetadata(id).slots[4], 2);
        assertEq(hustler.getMetadata(id).slots[5], 3);
        assertEq(hustler.getMetadata(id).slots[6], 4);
        assertEq(hustler.getMetadata(id).slots[7], 5);
    }

    function testCanSetSlotsFull() public {
        uint256 id = alice.mint();
        uint256[10] memory slots = [uint256(1), 0, 12, 0, 0, 0, 0, 0, 0, 0];
        alice.setSlots(id, slots, 0x7f); // 1111 1111

        assertEq(hustler.getMetadata(id).slots[0], 2);
        assertEq(hustler.getMetadata(id).slots[1], 3);
        assertEq(hustler.getMetadata(id).slots[2], 4);
        assertEq(hustler.getMetadata(id).slots[3], 5);
        assertEq(hustler.getMetadata(id).slots[4], 2);
        assertEq(hustler.getMetadata(id).slots[5], 3);
        assertEq(hustler.getMetadata(id).slots[6], 4);
        assertEq(hustler.getMetadata(id).slots[7], 5);
    }
}
