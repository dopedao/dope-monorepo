// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import './utils/StockpileSetup.sol';

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

contract Metadata is StockpileTest {
    bytes internal constant car =
        hex'00346d561413001fd327000d002dd31f000b0030d31e000a0032d31d00090034d31c00080036d31b00070038d31a0006003ad3190005003cd3180004003ed31700030040d3160002004fd30800020054d30300010056d3020058d3010058d3010058d3010059d359d359d359d3010058d359d359d358d3010058d30100010057d30100010056d30200010053d30500010051d3070002000cd30d000cd305000ed30c000cd3070002000bd30f000ad307000cd30e000ad30800030009d3110008d309000bd30f0008d30900040007d3130006d30b0009d3110006d30a00';
    bytes internal constant jordans =
        hex'00322737190200012a012b0600012b012a02000200032b0400032b02000100012b0119012a012b0400012b012a0119012b0100022b031904000319022b052a0400052a';

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

        assertEq(stockpile.balanceOf(address(owner), id), 5);
    }

    function testCreateAndMintATicklerNewWeapons() public {
        uint8[5] memory components;
        components[0] = owner.addItemComponent(0x0, 'tickler');
        uint256 id = owner.mint(address(owner), components, 0x0, 1, '');

        Attribute[] memory attributes = new Attribute[](2);
        attributes[0] = Attribute('Slot', 'Weapon');
        attributes[1] = Attribute('Item', 'tickler');
        owner.setRle(id, jordans, jordans);
        assertMetadata(id, attributes, 'tickler');

        assertEq(stockpile.balanceOf(address(owner), id), 1);
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
        ItemNames memory names = stockpile.names(id);
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
        ItemNames memory names = stockpile.names(id);
        assertEq(names, expected);
    }

    function testPlatinumRingFromAtlantaMetadata() public {
        uint256 id = stockpile.ringId(2169);
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
        uint256 id = stockpile.clothesId(3686);
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
        uint256 id = stockpile.handId(3686);
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
        uint256 id = stockpile.vehicleId(3686);
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
        uint8[5] memory components = components.getComponent(3686, ComponentTypes.HAND);
        uint256 fullId = TokenId.toId(components, ComponentTypes.HAND);

        components[1] = 0;
        components[2] = 0;
        components[3] = 0;
        components[4] = 0;

        uint256 baseId = TokenId.toId(components, ComponentTypes.HAND);

        owner.setRle(baseId, jordans, jordans);
        assertEq(string(stockpile.tokenRle(fullId, 0)), string(jordans));
    }

    function assertMetadata(
        uint256 tokenId,
        Attribute[] memory attributes,
        string memory name
    ) private {
        string memory meta = stockpile.uri(tokenId);
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
