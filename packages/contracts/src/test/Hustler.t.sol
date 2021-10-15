// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import './utils/HustlerSetup.sol';
import './utils/SwapMeetSetup.sol';

contract Setters is HustlerTest {
    bytes4 constant equip = bytes4(keccak256('swapmeetequip'));
    bytes constant bodyRle =
        hex'000b26361a060003090300050001090313010902000500010904130200050001130114011301090114020005000109021301090113020006000113021501130200060001090213030006000209040006000109011304000400020904130200030001090713010002000109091302000109041301090413010001090113010001090213010902130109011301000113020001090113011601090113011601000113010001130300020901130209010001130100011303000109031302000113010001130300010903130200011301000113030001090113010901130200011301000113030001090313020001130100011302000209041301000113010901130100020907130109011301000209051301000113010902000209021301090313010004000109011302000109011302000400010901130200010901130200040001090113020001090113020004000109011302000109011302000400010901130200010901130200040001090113020001090113020004000109011302000109011302000400021302000213020004000109030001090300040001130300011303000400011303000113030004000113030001130300040001130300011303000400011303000113030004000113030001130300040001130300011303000400011303000113030004000113030001130300040002090200021301090100';
    bytes constant headRle =
        hex'000924111f0100014d010d014d01000117010d0218010d014d010d031801180119011801170119014d021801170118014d011802100118014d011702180100010002170200';
    bytes constant beardRle = hex'000e24102001080109020a0100020a0100';

    function testCanMintFromDope() public {
        alice.setDopeApprovalForAll(address(hustler), true);

        string memory name = 'gangsta';
        string memory background = '000000';
        string memory color = 'fafafa';

        uint256 hustlerId = alice.mintFromDope(OTHER_BAG, name, background, color);
        ItemIds memory ids = swapmeet.ids(OTHER_BAG);
        checkOwns1155s(ids, address(hustler));
        checkIsEquipped(ids, hustlerId);

        assertEq(hustler.getMetadata(hustlerId).background, background);
        assertEq(hustler.getMetadata(hustlerId).color, color);
        assertEq(hustler.getMetadata(hustlerId).name, name);
    }

    function testFailMintFromDopeWithoutApproval() public {
        alice.mintFromDope(OTHER_BAG, '', '', '');
    }

    function testCanSetName() public {
        uint256 id = alice.mint();
        uint8[4] memory body;
        Hustler.Attributes memory attributes = Hustler.Attributes({ name: 'hustler name', background: '', color: '' });

        alice.setMetadata(id, attributes, body, 0x0);

        assertEq(hustler.getMetadata(id).name, 'hustler name');
    }

    function testCanSetBackground() public {
        uint256 id = alice.mint();
        uint8[4] memory body;
        Hustler.Attributes memory attributes = Hustler.Attributes({ name: '', background: '123456', color: '' });

        alice.setMetadata(id, attributes, body, 0x0);

        assertEq(hustler.getMetadata(id).background, '123456');
    }

    function testCanSetColor() public {
        uint256 id = alice.mint();
        uint8[4] memory body;
        Hustler.Attributes memory attributes = Hustler.Attributes({ name: '', background: '', color: '123456' });

        alice.setMetadata(id, attributes, body, 0x0);

        assertEq(hustler.getMetadata(id).color, '123456');
    }

    function testCanSetBodyPartial() public {
        uint256 id = alice.mint();
        uint8[4] memory body = [1, 0, 12, 0];
        uint8 mask = 0x05; // 0000 0101
        Hustler.Attributes memory attributes = Hustler.Attributes({ name: '', background: '', color: '' });

        alice.setMetadata(id, attributes, body, mask);

        assertEq(hustler.getMetadata(id).body[0], 1);
        assertEq(hustler.getMetadata(id).body[1], 0);
        assertEq(hustler.getMetadata(id).body[2], 12);
        assertEq(hustler.getMetadata(id).body[3], 0);
    }

    function testCanSetBodyFull() public {
        uint256 id = alice.mint();
        uint8[4] memory body = [2, 3, 4, 5];
        uint8 mask = 0x0f; // 0000 1111
        Hustler.Attributes memory attributes = Hustler.Attributes({ name: '', background: '', color: '' });

        alice.setMetadata(id, attributes, body, mask);

        assertEq(hustler.getMetadata(id).body[0], 2);
        assertEq(hustler.getMetadata(id).body[1], 3);
        assertEq(hustler.getMetadata(id).body[2], 4);
        assertEq(hustler.getMetadata(id).body[3], 5);
    }

    function testCanSetSlotsPartial() public {
        uint256 id = alice.mint();
        ItemIds memory ids = swapmeet.ids(BAG);
        uint8[4] memory body;
        uint256[] memory items = new uint256[](2);
        items[0] = ids.weapon;
        items[1] = ids.vehicle;
        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 1;
        amounts[1] = 1;

        Hustler.Attributes memory attributes = Hustler.Attributes({ name: '', background: '', color: '' });

        alice.setMetadata(id, attributes, body, 0x0);
        alice.safeBatchTransferFrom(address(alice), address(hustler), items, amounts, abi.encode(equip, id));

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
        ItemIds memory ids = swapmeet.ids(BAG);
        uint8[4] memory body;
        Hustler.Attributes memory attributes = Hustler.Attributes({ name: '', background: '', color: '' });

        uint256[] memory items = new uint256[](9);
        items[0] = ids.weapon;
        items[1] = ids.clothes;
        items[2] = ids.vehicle;
        items[3] = ids.waist;
        items[4] = ids.foot;
        items[5] = ids.hand;
        items[6] = ids.drugs;
        items[7] = ids.neck;
        items[8] = ids.ring;

        uint256[] memory amounts = new uint256[](9);
        amounts[0] = 1;
        amounts[1] = 1;
        amounts[2] = 1;
        amounts[3] = 1;
        amounts[4] = 1;
        amounts[5] = 1;
        amounts[6] = 1;
        amounts[7] = 1;
        amounts[8] = 1;

        alice.setApprovalForAll(address(hustler), true);
        alice.setMetadata(id, attributes, body, 0x0);
        alice.safeBatchTransferFrom(address(alice), address(hustler), items, amounts, abi.encode(equip, id));

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

    function testCanAddBodies() public {
        bytes[] memory bodies = new bytes[](2);
        bodies[0] = bodyRle;
        bodies[1] = bodyRle;
        owner.addBodies(bodies);
        assertEq(string(hustler.getBody(0)), string(bodyRle));
        assertEq(string(hustler.getBody(1)), string(bodyRle));
    }

    function testCanAddBeards() public {
        bytes[] memory beards = new bytes[](2);
        beards[0] = beardRle;
        beards[1] = beardRle;
        owner.addBeards(beards);
        assertEq(string(hustler.getBeard(0)), string(beardRle));
        assertEq(string(hustler.getBeard(1)), string(beardRle));
    }

    function testCanAddHeads() public {
        bytes[] memory heads = new bytes[](2);
        heads[0] = headRle;
        heads[1] = headRle;
        owner.addHeads(heads);
        assertEq(string(hustler.getHead(0)), string(headRle));
        assertEq(string(hustler.getHead(1)), string(headRle));
    }

    function testCanBuildTokenURIWithNoRLEs() public {
        bytes[] memory bodies = new bytes[](1);
        bodies[0] = bodyRle;
        bytes[] memory heads = new bytes[](1);
        heads[0] = headRle;
        bytes[] memory beards = new bytes[](1);
        beards[0] = beardRle;

        owner.addBodies(bodies);
        owner.addHeads(heads);
        owner.addBeards(beards);

        uint256 id = alice.mint();
        ItemIds memory ids = swapmeet.ids(BAG);
        uint8[4] memory body = [0, 0, 0, 0];
        Hustler.Attributes memory attributes = Hustler.Attributes({ name: '', background: '', color: '' });

        uint256[] memory items = new uint256[](9);
        items[0] = ids.weapon;
        items[1] = ids.clothes;
        items[2] = ids.vehicle;
        items[3] = ids.waist;
        items[4] = ids.foot;
        items[5] = ids.hand;
        items[6] = ids.drugs;
        items[7] = ids.neck;
        items[8] = ids.ring;

        alice.setApprovalForAll(address(hustler), true);
        uint8 bmask = 0x0f; // 0000 1111

        alice.setMetadata(id, attributes, body, bmask);

        hustler.tokenURI(id);
    }

    // Test manual transfer then equip
    // Send multiple of same slot

    function checkOwns1155s(ItemIds memory ids, address who) private {
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

    function checkIsEquipped(ItemIds memory ids, uint256 hustlerId) private {
        assertEq(hustler.getMetadata(hustlerId).slots[0], ids.weapon);
        assertEq(hustler.getMetadata(hustlerId).slots[1], ids.clothes);
        assertEq(hustler.getMetadata(hustlerId).slots[2], ids.vehicle);
        assertEq(hustler.getMetadata(hustlerId).slots[3], ids.waist);
        assertEq(hustler.getMetadata(hustlerId).slots[4], ids.foot);
        assertEq(hustler.getMetadata(hustlerId).slots[5], ids.hand);
        assertEq(hustler.getMetadata(hustlerId).slots[6], ids.drugs);
        assertEq(hustler.getMetadata(hustlerId).slots[7], ids.neck);
        assertEq(hustler.getMetadata(hustlerId).slots[8], ids.ring);
        assertEq(hustler.getMetadata(hustlerId).slots[9], 0);
    }
}
