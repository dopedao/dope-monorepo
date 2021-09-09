// SPDX-License-Identifier: GPL-3.0
// Taken from https://raw.githubusercontent.com/nounsDAO/nouns-monorepo/master/packages/nouns-contracts/contracts/NounsDescriptor.sol

/// @title The Dope Character NFT descriptor

pragma solidity ^0.8.6;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ICharacterDescriptor} from "./interfaces/ICharacterDescriptor.sol";
import {ICharacterSeeder} from "./interfaces/ICharacterSeeder.sol";
import {NFTDescriptor} from "./libraries/NFTDescriptor.sol";
import {MultiPartRLEToSVG} from "./libraries/MultiPartRLEToSVG.sol";

contract CharacterDescriptor is ICharacterDescriptor, Ownable {
    using Strings for uint256;

    // prettier-ignore
    // https://creativecommons.org/publicdomain/zero/1.0/legalcode.txt
    bytes32 constant COPYRIGHT_CC0_1_0_UNIVERSAL_LICENSE = 0xa2010f343487d3f7618affe54f789f5487602331c0a8d03f49e9a7c547cf0499;

    // Whether or not new parts can be added
    bool public override arePartsLocked;

    // Base URI
    string public override baseURI;

    // Color Palettes (Index => Hex Colors)
    mapping(uint8 => string[]) public override palettes;

    // Backgrounds (Hex Colors)
    string[] public override backgrounds;

    // Bodies (Custom RLE)
    bytes[] public override bodies;

    // Clothes (Custom RLE)
    bytes[] public override clothes;

    // Feet (Custom RLE)
    bytes[] public override feet;

    // Hands (Custom RLE)
    bytes[] public override hands;

    // Necks (Custom RLE)
    bytes[] public override necks;

    // Rings (Custom RLE)
    bytes[] public override rings;

    // Waists (Custom RLE)
    bytes[] public override waists;

    // Weapons (Custom RLE)
    bytes[] public override weapons;

    // Drugs (Custom RLE)
    bytes[] public override drugs;

    // Vehicles (Custom RLE)
    bytes[] public override vehicles;

    /**
     * @notice Require that the parts have not been locked.
     */
    modifier whenPartsNotLocked() {
        require(!arePartsLocked, "Parts are locked");
        _;
    }

    /**
     * @notice Get the number of available `backgrounds`.
     */
    function backgroundCount() external view override returns (uint256) {
        return backgrounds.length;
    }

    /**
     * @notice Get the number of available `bodies`.
     */
    function bodyCount() external view override returns (uint256) {
        return bodies.length;
    }

    /**
     * @notice Get the number of available `clothes`.
     */
    function clothesCount() external view override returns (uint256) {
        return clothes.length;
    }

    /**
     * @notice Get the number of available `feet`.
     */
    function feetCount() external view override returns (uint256) {
        return feet.length;
    }

    /**
     * @notice Get the number of available `necks`.
     */
    function necksCount() external view override returns (uint256) {
        return necks.length;
    }

    /**
     * @notice Get the number of available `rings`.
     */
    function ringsCount() external view override returns (uint256) {
        return rings.length;
    }

    /**
     * @notice Get the number of available `waists`.
     */
    function waistsCount() external view override returns (uint256) {
        return waists.length;
    }

    /**
     * @notice Get the number of available `weapons`.
     */
    function weaponsCount() external view override returns (uint256) {
        return weapons.length;
    }

    /**
     * @notice Get the number of available `drugs`.
     */
    function drugsCount() external view override returns (uint256) {
        return drugs.length;
    }

    /**
     * @notice Get the number of available `vehicle`.
     */
    function vehiclesCount() external view override returns (uint256) {
        return vehicles.length;
    }

    /**
     * @notice Add colors to a color palette.
     * @dev This function can only be called by the owner.
     */
    function addManyColorsToPalette(
        uint8 paletteIndex,
        string[] calldata newColors
    ) external override onlyOwner {
        require(
            palettes[paletteIndex].length + newColors.length <= 256,
            "Palettes can only hold 256 colors"
        );
        for (uint256 i = 0; i < newColors.length; i++) {
            _addColorToPalette(paletteIndex, newColors[i]);
        }
    }

    /**
     * @notice Batch add backgrounds.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyBackgrounds(string[] calldata _backgrounds)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        for (uint256 i = 0; i < _backgrounds.length; i++) {
            _addBackground(_backgrounds[i]);
        }
    }

    /**
     * @notice Batch add bodies.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyBodies(bytes[] calldata _bodies)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        for (uint256 i = 0; i < _bodies.length; i++) {
            _addBody(_bodies[i]);
        }
    }

    /**
     * @notice Batch add clothes.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyClothes(bytes[] calldata _clothes)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        for (uint256 i = 0; i < _clothes.length; i++) {
            _addClothes(_clothes[i]);
        }
    }

    /**
     * @notice Batch add feet.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyFeet(bytes[] calldata _feet)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        for (uint256 i = 0; i < _feet.length; i++) {
            _addFeet(_feet[i]);
        }
    }

    /**
     * @notice Batch add hands.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyHands(bytes[] calldata _hands)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        for (uint256 i = 0; i < _hands.length; i++) {
            _addHands(_hands[i]);
        }
    }

    /**
     * @notice Batch add necks.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyNecks(bytes[] calldata _necks)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        for (uint256 i = 0; i < _necks.length; i++) {
            _addNecks(_necks[i]);
        }
    }

    /**
     * @notice Batch add rings.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyRings(bytes[] calldata _rings)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        for (uint256 i = 0; i < _rings.length; i++) {
            _addRings(_rings[i]);
        }
    }

    /**
     * @notice Batch add waists.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyWaists(bytes[] calldata _waists)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        for (uint256 i = 0; i < _waists.length; i++) {
            _addWaists(_waists[i]);
        }
    }

    /**
     * @notice Batch add weapons.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyWeapons(bytes[] calldata _weapons)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        for (uint256 i = 0; i < _weapons.length; i++) {
            _addWeapons(_weapons[i]);
        }
    }

    /**
     * @notice Batch add drugs.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyDrugs(bytes[] calldata _drugs)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        for (uint256 i = 0; i < _drugs.length; i++) {
            _addDrugs(_drugs[i]);
        }
    }

    /**
     * @notice Batch add vehicles.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyVehicles(bytes[] calldata _vehicles)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        for (uint256 i = 0; i < _vehicles.length; i++) {
            _addVehicles(_vehicles[i]);
        }
    }

    /**
     * @notice Add a single color to a color palette.
     * @dev This function can only be called by the owner.
     */
    function addColorToPalette(uint8 _paletteIndex, string calldata _color)
        external
        override
        onlyOwner
    {
        require(
            palettes[_paletteIndex].length <= 255,
            "Palettes can only hold 256 colors"
        );
        _addColorToPalette(_paletteIndex, _color);
    }

    /**
     * @notice Add a background.
     * @dev This function can only be called by the owner when not locked.
     */
    function addBackground(string calldata _background)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        _addBackground(_background);
    }

    /**
     * @notice Add a body.
     * @dev This function can only be called by the owner when not locked.
     */
    function addBody(bytes calldata _body)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        _addBody(_body);
    }

    /**
     * @notice Add a clothes.
     * @dev This function can only be called by the owner when not locked.
     */
    function addClothes(bytes calldata _clothes)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        _addClothes(_clothes);
    }

    /**
     * @notice Add a feet.
     * @dev This function can only be called by the owner when not locked.
     */
    function addFeet(bytes calldata _feet)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        _addFeet(_feet);
    }

    /**
     * @notice Add hands.
     * @dev This function can only be called by the owner when not locked.
     */
    function addHands(bytes calldata _hands)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        _addHands(_hands);
    }

    /**
     * @notice Add necks.
     * @dev This function can only be called by the owner when not locked.
     */
    function addNecks(bytes calldata _necks)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        _addNecks(_necks);
    }

    /**
     * @notice Add rings.
     * @dev This function can only be called by the owner when not locked.
     */
    function addRings(bytes calldata _rings)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        _addRings(_rings);
    }

    /**
     * @notice Add waists.
     * @dev This function can only be called by the owner when not locked.
     */
    function addWaists(bytes calldata _waists)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        _addWaists(_waists);
    }

    /**
     * @notice Add weapons.
     * @dev This function can only be called by the owner when not locked.
     */
    function addWeapons(bytes calldata _weapons)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        _addWeapons(_weapons);
    }

    /**
     * @notice Add drugs.
     * @dev This function can only be called by the owner when not locked.
     */
    function addDrugs(bytes calldata _drugs)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        _addDrugs(_drugs);
    }

    /**
     * @notice Add vehicles.
     * @dev This function can only be called by the owner when not locked.
     */
    function addVehicles(bytes calldata _vehicles)
        external
        override
        onlyOwner
        whenPartsNotLocked
    {
        _addVehicles(_vehicles);
    }

    /**
     * @notice Lock all parts.
     * @dev This cannot be reversed and can only be called by the owner when not locked.
     */
    function lockParts() external override onlyOwner whenPartsNotLocked {
        arePartsLocked = true;

        emit PartsLocked();
    }

    /**
     * @notice Given a token ID and seed, construct a token URI for an official DopeDAO character.
     * @dev The returned value may be a base64 encoded data URI or an API URL.
     */
    function tokenURI(uint256 tokenId, ICharacterSeeder.Seed memory seed)
        external
        view
        override
        returns (string memory)
    {
        string memory characterId = tokenId.toString();
        string memory name = string(abi.encodePacked("Recruit ", characterId));
        string memory description = string(
            abi.encodePacked(
                "Recruit ",
                characterId,
                " is a member of the Dope DAO"
            )
        );

        return genericDataURI(name, description, seed);
    }

    /**
     * @notice Given a name, description, and seed, construct a base64 encoded data URI.
     */
    function genericDataURI(
        string memory name,
        string memory description,
        ICharacterSeeder.Seed memory seed
    ) public view override returns (string memory) {
        NFTDescriptor.TokenURIParams memory params = NFTDescriptor
            .TokenURIParams({
                name: name,
                description: description,
                parts: _getPartsForGear(seed),
                background: backgrounds[seed.background]
            });
        return NFTDescriptor.constructTokenURI(params, palettes);
    }

    /**
     * @notice Given a seed, construct a base64 encoded SVG image.
     */
    function generateSVGImage(ICharacterSeeder.Seed memory seed)
        external
        view
        override
        returns (string memory)
    {
        MultiPartRLEToSVG.SVGParams memory params = MultiPartRLEToSVG
            .SVGParams({
                parts: _getPartsForGear(seed),
                background: backgrounds[seed.background]
            });
        return NFTDescriptor.generateSVGImage(params, palettes);
    }

    /**
     * @notice Add a single color to a color palette.
     */
    function _addColorToPalette(uint8 _paletteIndex, string calldata _color)
        internal
    {
        palettes[_paletteIndex].push(_color);
    }

    /**
     * @notice Add a background.
     */
    function _addBackground(string calldata _background) internal {
        backgrounds.push(_background);
    }

    /**
     * @notice Add a body.
     */
    function _addBody(bytes calldata _body) internal {
        bodies.push(_body);
    }

    /**
     * @notice Add a clothes.
     */
    function _addClothes(bytes calldata _clothes) internal {
        clothes.push(_clothes);
    }

    /**
     * @notice Add a feet.
     */
    function _addFeet(bytes calldata _feet) internal {
        feet.push(_feet);
    }

    /**
     * @notice Add hands.
     */
    function _addHands(bytes calldata _hands) internal {
        hands.push(_hands);
    }

    /**
     * @notice Add necks.
     */
    function _addNecks(bytes calldata _necks) internal {
        necks.push(_necks);
    }

    /**
     * @notice Add rings.
     */
    function _addRings(bytes calldata _rings) internal {
        rings.push(_rings);
    }

    /**
     * @notice Add waists.
     */
    function _addWaists(bytes calldata _waists) internal {
        waists.push(_waists);
    }

    /**
     * @notice Add weapons.
     */
    function _addWeapons(bytes calldata _weapons) internal {
        weapons.push(_weapons);
    }

    /**
     * @notice Add drugs.
     */
    function _addDrugs(bytes calldata _drugs) internal {
        drugs.push(_drugs);
    }

    /**
     * @notice Add vehicles.
     */
    function _addVehicles(bytes calldata _vehicles) internal {
        vehicles.push(_vehicles);
    }

    /**
     * @notice Get all parts for the passed `seed`.
     */
    function _getPartsForGear(ICharacterSeeder.Seed memory seed)
        internal
        view
        returns (bytes[] memory)
    {
        bytes[] memory _parts = new bytes[](10);
        _parts[0] = bodies[seed.body];
        _parts[1] = clothes[seed.clothes];
        _parts[2] = feet[seed.feet];
        _parts[3] = hands[seed.hands];
        _parts[4] = necks[seed.necks];
        _parts[5] = rings[seed.rings];
        _parts[6] = waists[seed.waists];
        _parts[7] = weapons[seed.weapons];
        _parts[8] = drugs[seed.drugs];
        _parts[9] = vehicles[seed.vehicles];
        return _parts;
    }
}
