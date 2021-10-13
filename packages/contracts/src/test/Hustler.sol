// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import './utils/HustlerSetup.sol';
import './utils/StockpileSetup.sol';

contract Setters is HustlerTest {
    function testCanSetName() public {
        uint256 id = alice.mint();
        uint8[4] memory body;
        uint256[10] memory slots;

        alice.setMetadata(id, 'hustler name', '', body, 0x0, slots, 0x0);

        assertEq(hustler.getMetadata(id).name, 'hustler name');
    }

    function testCanSetBackground() public {
        uint256 id = alice.mint();
        uint8[4] memory body;
        uint256[10] memory slots;

        alice.setMetadata(id, '', '123456', body, 0x0, slots, 0x0);

        assertEq(hustler.getMetadata(id).background, '123456');
    }

    function testCanSetBodyPartial() public {
        uint256 id = alice.mint();
        uint8[4] memory body = [1, 0, 12, 0];
        uint256[10] memory slots;
        uint8 mask = 0x05; // 0000 0101

        alice.setMetadata(id, '', '', body, mask, slots, 0x0);

        assertEq(hustler.getMetadata(id).body[0], 1);
        assertEq(hustler.getMetadata(id).body[1], 0);
        assertEq(hustler.getMetadata(id).body[2], 12);
        assertEq(hustler.getMetadata(id).body[3], 0);
    }

    function testCanSetBodyFull() public {
        uint256 id = alice.mint();
        uint8[4] memory body = [2, 3, 4, 5];
        uint256[10] memory slots;
        uint8 mask = 0x0f; // 0000 1111

        alice.setMetadata(id, '', '', body, mask, slots, 0x0);

        assertEq(hustler.getMetadata(id).body[0], 2);
        assertEq(hustler.getMetadata(id).body[1], 3);
        assertEq(hustler.getMetadata(id).body[2], 4);
        assertEq(hustler.getMetadata(id).body[3], 5);
    }

    function testCanSetSlotsPartial() public {
        uint256 id = alice.mint();
        ItemIds memory ids = stockpile.ids(BAG);
        uint8[4] memory body;
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
        uint16 mask = 0x0005; // 0000 0000 0000 0101

        alice.setMetadata(id, '', '', body, 0x0, slots, mask);

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
        uint8[4] memory body;
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
        uint16 mask = 0x01ff; // 0000 0001 1111 1111

        alice.setMetadata(id, '', '', body, 0x0, slots, mask);

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
