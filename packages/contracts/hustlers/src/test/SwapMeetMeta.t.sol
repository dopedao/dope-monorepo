// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import './utils/SwapMeetSetup.sol';

struct Attribute {
    string traitType;
    string value;
}

struct Data {
    string name;
    string description;
    string image;
    Attribute[] attributes;
}

contract Metadata is SwapMeetTest {
    bytes internal constant car =
        hex'01447f672613001f6e27000d002d6e1f000b00306e1e000a00326e1d000900346e1c000800366e1b000700386e1a0006003a6e19000500096e3b6f10000400086e0170336f0171096f0f000300096e0170336f0271016f0171016f0171046f0f0002000a6e0170046f0271026f0271026f0171026f0171016f0171016f0171026f0171026f0271046f0271036f0271036f0271026f0171026f0171026f0171026f0271016f0171036f076e080002000a6e0170036f0171036f0171026f0171016f0171016f0271016f0171016f0271016f0171016f0171056f0171046f0171026f0171016f0171026f0171016f0171026f0171026f0171026f0171026f0171036f0c6e030001000b6e0170036f0171036f0171026f0171016f0271016f0171016f0171016f0171016f0271016f0171056f0171046f0171026f0171016f0171026f0171016f0271016f01710c6f0d6e02000c6e0170036f0171036f0171026f0171016f0171026f0171016f0171016f0171026f0171016f0171016f0271036f0271026f0171026f0171016f0171026f0171016f0171016f02710c6f0e6e01000c6e0170036f0171036f0171026f0171016f0171026f0171016f0171016f0171026f0171016f0171026f0171056f0171016f0171026f0171016f0171026f0171016f0171026f01710c6f0e6e01000c6e0170036f0171036f0171026f0171016f0171026f0171016f0171016f0171026f0171016f0171026f0171056f0171016f0171026f0171016f0171026f0171016f0171026f01710c6f0e6e01000c6e0170046f0271026f0271026f0171026f0171016f0171016f0171026f0171026f0271046f0271036f0271036f0271026f0171026f01710c6f0f6e0c6e01703d6f0f6e0d6e01703b6f106e0e6e3b70106e0100586e596e596e586e0100586e01000100576e01000100566e02000100536e05000100516e070002000c6e0d000c6e05000e6e0c000c6e070002000b6e0f000a6e07000c6e0e000a6e080001000272096e1172086e09720b6e0f72086e077202000472076e1372066e0b72096e1172066e09720100020054720300';
    bytes internal constant jordans =
        hex'013226371d0100013104000131020001330131013302000133019b0200012501340125020001310125013201000135023202000225023201360231020001360331';

    function testCreateAndMintFiveBlastersWeapons() public {
        uint8[5] memory components;
        components[0] = owner.addItemComponent(ComponentTypes.WEAPON, 'blaster');
        components[1] = owner.addItemComponent(ComponentTypes.SUFFIX, 'ahh');
        components[2] = owner.addItemComponent(ComponentTypes.NAME_PREFIX, 'a');
        components[3] = owner.addItemComponent(ComponentTypes.NAME_SUFFIX, 'big');
        uint256 id = owner.mint(address(owner), components, ComponentTypes.WEAPON, 5, '');

        Attribute[] memory attributes = new Attribute[](5);
        attributes[0] = Attribute('Slot', 'Weapon');
        attributes[1] = Attribute('Item', 'blaster');
        attributes[2] = Attribute('Suffix', 'ahh');
        attributes[3] = Attribute('Name Prefix', 'a');
        attributes[4] = Attribute('Name Suffix', 'big');
        owner.setRle(id, jordans, jordans);
        assertMetadata(id, attributes, '"a big" blaster ahh');

        assertEq(swapmeet.balanceOf(address(owner), id), 5);
    }

    function testCreateAndMintATicklerNewWeapons() public {
        uint8[5] memory components;
        components[0] = owner.addItemComponent(ComponentTypes.WEAPON, 'tickler');
        uint256 id = owner.mint(address(owner), components, ComponentTypes.WEAPON, 1, '');

        Attribute[] memory attributes = new Attribute[](2);
        attributes[0] = Attribute('Slot', 'Weapon');
        attributes[1] = Attribute('Item', 'tickler');
        owner.setRle(id, jordans, jordans);
        assertMetadata(id, attributes, 'tickler');

        assertEq(swapmeet.balanceOf(address(owner), id), 1);
    }

    function testCreateAndMintARareHatNewAccessory() public {
        uint8[5] memory components;
        components[0] = owner.addItemComponent(ComponentTypes.ACCESSORY, 'hat');
        components[1] = 1;
        components[2] = 1;
        components[3] = 1;
        components[4] = 1;
        uint256 id = owner.mint(address(owner), components, ComponentTypes.ACCESSORY, 1, '');

        Attribute[] memory attributes = new Attribute[](6);
        attributes[0] = Attribute('Slot', 'Accessory');
        attributes[1] = Attribute('Item', 'hat');
        attributes[2] = Attribute('Suffix', 'from the Bayou');
        attributes[3] = Attribute('Name Prefix', 'OG');
        attributes[4] = Attribute('Name Suffix', 'Feared');
        attributes[5] = Attribute('Augmentation', 'Yes');
        owner.setRle(id, jordans, jordans);
        assertMetadata(id, attributes, '"OG Feared" hat from the Bayou +1');

        assertEq(swapmeet.balanceOf(address(owner), id), 1);
    }

    function testCreateAndMintAHatNewAccessory() public {
        uint8[5] memory components;
        components[0] = owner.addItemComponent(ComponentTypes.ACCESSORY, 'hat');
        uint256 id = owner.mint(address(owner), components, ComponentTypes.ACCESSORY, 1, '');

        Attribute[] memory attributes = new Attribute[](2);
        attributes[0] = Attribute('Slot', 'Accessory');
        attributes[1] = Attribute('Item', 'hat');
        owner.setRle(id, jordans, jordans);
        assertMetadata(id, attributes, 'hat');

        assertEq(swapmeet.balanceOf(address(owner), id), 1);
    }

    function testAK47BagNames() public {
        ItemNames memory expected = ItemNames({
            weapon: 'AK47',
            clothes: 'White T Shirt',
            vehicle: 'Tricycle',
            waist: 'Taser Holster',
            foot: 'White Forces',
            hand: 'Fingerless Gloves',
            drugs: 'Adderall',
            neck: 'Silver Chain',
            ring: 'Platinum Ring'
        });

        // https://opensea.io/assets/0x8707276df042e89669d69a177d3da7dc78bd8723/5726
        uint256 id = 5726;
        ItemNames memory names = swapmeet.names(id);
        assertEq(names, expected);
    }

    function testShovelFromSOMABagNames() public {
        ItemNames memory expected = ItemNames({
            weapon: 'Shovel from SOMA',
            clothes: '\\"High on the Supply Contraband\\" Bulletproof Vest from Mob Town',
            vehicle: '\\"The Freelance Pharmacist Triggerman\\" Dodge from Compton +1',
            waist: '\\"Kid of the Game Smuggled\\" D Ring Belt from Queens +1',
            foot: 'Barefoot from Chicago',
            hand: '\\"Street Queen Triggerman\\" Fingerless Gloves from Buffalo +1',
            drugs: 'Shrooms',
            neck: 'Bronze Chain from the Backwoods',
            ring: 'Diamond Ring'
        });

        // https://opensea.io/assets/0x8707276df042e89669d69a177d3da7dc78bd8723/3686
        uint256 id = 3686;
        ItemNames memory names = swapmeet.names(id);
        assertEq(names, expected);
    }

    function testPlatinumRingFromAtlantaMetadata() public {
        uint256 id = swapmeet.ringId(2169);
        Attribute[] memory attributes = new Attribute[](3);
        attributes[0] = Attribute('Slot', 'Ring');
        attributes[1] = Attribute('Item', 'Platinum Ring');
        attributes[2] = Attribute('Suffix', 'from Atlanta');
        owner.setRle(id, jordans, jordans);
        assertMetadata(id, attributes, 'Platinum Ring from Atlanta');
    }

    function testBarefootFromChicago() public {
        uint256 id = 34360786948;
        Attribute[] memory attributes = new Attribute[](3);
        attributes[0] = Attribute('Slot', 'Foot');
        attributes[1] = Attribute('Item', 'Barefoot');
        attributes[2] = Attribute('Suffix', 'from Chicago');
        bytes memory zero = hex'';
        owner.setRle(id, zero, zero);
        assertMetadata(id, attributes, 'Barefoot from Chicago');
    }

    function testHighSupplyBloodStainedShirtFromMobTownMetadata() public {
        uint256 id = swapmeet.clothesId(3686);
        Attribute[] memory attributes = new Attribute[](5);
        attributes[0] = Attribute('Slot', 'Clothes');
        attributes[1] = Attribute('Item', 'Bulletproof Vest');
        attributes[2] = Attribute('Suffix', 'from Mob Town');
        attributes[3] = Attribute('Name Prefix', 'High on the Supply');
        attributes[4] = Attribute('Name Suffix', 'Contraband');
        owner.setRle(id, jordans, jordans);
        assertMetadata(id, attributes, '"High on the Supply Contraband" Bulletproof Vest from Mob Town');
    }

    function testTriggermanFingerlessGlovesFromBuffaloPlusOneMetadata() public {
        uint256 id = swapmeet.handId(3686);
        Attribute[] memory attributes = new Attribute[](6);
        attributes[0] = Attribute('Slot', 'Hand');
        attributes[1] = Attribute('Item', 'Fingerless Gloves');
        attributes[2] = Attribute('Suffix', 'from Buffalo');
        attributes[3] = Attribute('Name Prefix', 'Street Queen');
        attributes[4] = Attribute('Name Suffix', 'Triggerman');
        attributes[5] = Attribute('Augmentation', 'Yes');
        owner.setRle(id, jordans, jordans);
        assertMetadata(id, attributes, '"Street Queen Triggerman" Fingerless Gloves from Buffalo +1');
    }

    function testFreelancePharmacistTriggermanDodgeFromComptonMetadata() public {
        uint256 id = swapmeet.vehicleId(3686);
        Attribute[] memory attributes = new Attribute[](6);
        attributes[0] = Attribute('Slot', 'Vehicle');
        attributes[1] = Attribute('Item', 'Dodge');
        attributes[2] = Attribute('Suffix', 'from Compton');
        attributes[3] = Attribute('Name Prefix', 'The Freelance Pharmacist');
        attributes[4] = Attribute('Name Suffix', 'Triggerman');
        attributes[5] = Attribute('Augmentation', 'Yes');
        owner.setRle(id, car, car);
        assertMetadata(id, attributes, '"The Freelance Pharmacist Triggerman" Dodge from Compton +1');
    }

    function testShouldFallbackToBaseItemRLE() public {
        uint8[5] memory components = components.items(3686)[ComponentTypes.HAND];
        uint256 fullId = TokenId.toId(components, ComponentTypes.HAND);

        components[1] = 0;
        components[2] = 0;
        components[3] = 0;
        components[4] = 0;

        uint256 baseId = TokenId.toId(components, ComponentTypes.HAND);

        owner.setRle(baseId, jordans, jordans);
        assertEq(string(swapmeet.tokenRle(fullId, 0)), string(jordans));
    }

    function assertMetadata(
        uint256 tokenId,
        Attribute[] memory attributes,
        string memory name
    ) private {
        string memory meta = swapmeet.uri(tokenId);
        string[] memory inputs = new string[](3);
        inputs[0] = 'node';
        inputs[1] = 'scripts/metadata.js';
        inputs[2] = meta;
        bytes memory res = hevm.ffi(inputs);
        Data memory data = abi.decode(res, (Data));
        assertEq(data.name, name);
        for (uint256 i = 0; i < attributes.length; i++) {
            assertEq(data.attributes[i], attributes[i]);
        }
    }

    // Would be nice if we had some Rust-like derive macro for this :/ wen Solidity generics
    function assertEq(ItemNames memory got, ItemNames memory expected) private {
        assertEq(got.weapon, expected.weapon);
        assertEq(got.clothes, expected.clothes);
        assertEq(got.vehicle, expected.vehicle);
        assertEq(got.waist, expected.waist);
        assertEq(got.foot, expected.foot);
        assertEq(got.hand, expected.hand);
        assertEq(got.drugs, expected.drugs);
        assertEq(got.neck, expected.neck);
        assertEq(got.ring, expected.ring);
    }

    function assertEq(Attribute memory attribute, Attribute memory expected) private {
        assertEq(attribute.traitType, expected.traitType);
        assertEq(attribute.value, expected.value);
    }
}
