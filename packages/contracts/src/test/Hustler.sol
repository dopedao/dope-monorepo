// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import './utils/HustlerSetup.sol';
import './utils/SwapMeetSetup.sol';

contract Setters is HustlerTest {
    bytes constant bodyRle =
        hex'000b26361a060003090300050001090313010902000500010904130200050001130114011301090114020005000109021301090113020006000113021501130200060001090213030006000209040006000109011304000400020904130200030001090713010002000109091302000109041301090413010001090113010001090213010902130109011301000113020001090113011601090113011601000113010001130300020901130209010001130100011303000109031302000113010001130300010903130200011301000113030001090113010901130200011301000113030001090313020001130100011302000209041301000113010901130100020907130109011301000209051301000113010902000209021301090313010004000109011302000109011302000400010901130200010901130200040001090113020001090113020004000109011302000109011302000400010901130200010901130200040001090113020001090113020004000109011302000109011302000400021302000213020004000109030001090300040001130300011303000400011303000113030004000113030001130300040001130300011303000400011303000113030004000113030001130300040001130300011303000400011303000113030004000113030001130300040002090200021301090100';
    bytes constant headRle =
        hex'000924111f0100014d010d014d01000117010d0218010d014d010d031801180119011801170119014d021801170118014d011802100118014d011702180100010002170200';
    bytes constant beardRle = hex'000e24102001080109020a0100020a0100';

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
        ItemIds memory ids = swapMeet.ids(BAG);
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
        ItemIds memory ids = swapMeet.ids(BAG);
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

    function testCanAddBody() public {
        owner.addBody(bodyRle);
        assertEq(string(hustler.getBody(0)), string(bodyRle));
    }

    function testCanAddBodies() public {
        bytes[] memory bodies = new bytes[](2);
        bodies[0] = bodyRle;
        bodies[1] = bodyRle;
        owner.addBodies(bodies);
        assertEq(string(hustler.getBody(0)), string(bodyRle));
        assertEq(string(hustler.getBody(1)), string(bodyRle));
    }

    function testCanAddBeard() public {
        owner.addBeard(beardRle);
        assertEq(string(hustler.getBeard(0)), string(beardRle));
    }

    function testCanAddBeards() public {
        bytes[] memory beards = new bytes[](2);
        beards[0] = beardRle;
        beards[1] = beardRle;
        owner.addBeards(beards);
        assertEq(string(hustler.getBeard(0)), string(beardRle));
        assertEq(string(hustler.getBeard(1)), string(beardRle));
    }

    function testCanAddHead() public {
        owner.addHead(headRle);
        assertEq(string(hustler.getHead(0)), string(headRle));
    }

    function testCanAddHeads() public {
        bytes[] memory heads = new bytes[](2);
        heads[0] = headRle;
        heads[1] = headRle;
        owner.addHeads(heads);
        assertEq(string(hustler.getHead(0)), string(headRle));
        assertEq(string(hustler.getHead(1)), string(headRle));
    }
}
