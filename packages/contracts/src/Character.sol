// SPDX-License-Identifier: GPL-3.0
// Taken from https://raw.githubusercontent.com/nounsDAO/nouns-monorepo/master/packages/nouns-contracts/contracts/NounsDescriptor.sol

/// @title The Dope Character NFT descriptor

pragma solidity ^0.8.6;

import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';
import { Strings } from '@openzeppelin/contracts/utils/Strings.sol';
import { ERC721, ERC721Enumerable } from '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';

import { ICharacter } from './interfaces/ICharacter.sol';
import { IStockpile } from './interfaces/IStockpile.sol';
import { Base64 } from './MetadataUtils.sol';
import { MetadataBuilder } from './MetadataBuilder.sol';

contract Character is ICharacter, ERC721Enumerable, Ownable {
    using Strings for uint256;

    struct TokenURIParams {
        string name;
        string description;
        bytes[] parts;
        string background;
    }

    // prettier-ignore
    // https://creativecommons.org/publicdomain/zero/1.0/legalcode.txt
    bytes32 constant COPYRIGHT_CC0_1_0_UNIVERSAL_LICENSE = 0xa2010f343487d3f7618affe54f789f5487602331c0a8d03f49e9a7c547cf0499;

    uint48 constant BACKGROUND = 0;
    uint48 constant BODY = 1;
    uint48 constant CLOTHES = 2;
    uint48 constant FEET = 3;
    uint48 constant HAND = 4;
    uint48 constant NECK = 5;
    uint48 constant RING = 6;
    uint48 constant WAIST = 7;
    uint48 constant WEAPON = 8;
    uint48 constant DRUGS = 9;
    uint48 constant VEHICLE = 10;

    // Color Palettes (Index => Hex Colors)
    mapping(uint8 => string[]) public override palettes;

    // Backgrounds (Hex Colors)
    string[] public override backgrounds;

    // Bodies (Custom RLE)
    bytes[] public override bodies;

    // Gear stockpile (Contract address)
    IStockpile public stockpile;

    mapping(address => uint48[]) public equipments;

    constructor(address _stockpile) ERC721('Characters', 'Characters') {
        stockpile = IStockpile(_stockpile);
    }

    /**
     * @notice Set equipment for a character.
     */
    function equip(uint48[] memory tokenIds) public {
        equipments[msg.sender] = tokenIds;
    }

    /**
     * @notice Get the current equipment for a character.
     */
    function equipmentOf(address owner) public view override returns (uint48[] memory) {
        return equipments[owner];
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
     * @notice Add colors to a color palette.
     * @dev This function can only be called by the owner.
     */
    function addManyColorsToPalette(uint8 paletteIndex, string[] calldata newColors) external override onlyOwner {
        require(palettes[paletteIndex].length + newColors.length <= 256, 'Palettes can only hold 256 colors');
        for (uint256 i = 0; i < newColors.length; i++) {
            _addColorToPalette(paletteIndex, newColors[i]);
        }
    }

    /**
     * @notice Batch add backgrounds.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyBackgrounds(string[] calldata _backgrounds) external override onlyOwner {
        for (uint256 i = 0; i < _backgrounds.length; i++) {
            _addBackground(_backgrounds[i]);
        }
    }

    /**
     * @notice Batch add bodies.
     * @dev This function can only be called by the owner when not locked.
     */
    function addManyBodies(bytes[] calldata _bodies) external override onlyOwner {
        for (uint256 i = 0; i < _bodies.length; i++) {
            _addBody(_bodies[i]);
        }
    }

    /**
     * @notice Add a single color to a color palette.
     * @dev This function can only be called by the owner.
     */
    function addColorToPalette(uint8 _paletteIndex, string calldata _color) external override onlyOwner {
        require(palettes[_paletteIndex].length <= 255, 'Palettes can only hold 256 colors');
        _addColorToPalette(_paletteIndex, _color);
    }

    /**
     * @notice Add a background.
     * @dev This function can only be called by the owner when not locked.
     */
    function addBackground(string calldata _background) external override onlyOwner {
        _addBackground(_background);
    }

    /**
     * @notice Add a body.
     * @dev This function can only be called by the owner when not locked.
     */
    function addBody(bytes calldata _body) external override onlyOwner {
        _addBody(_body);
    }

    /**
     * @notice Given a token ID constructs a token URI for the character.
     * @dev The returned value is a base64 encoded data URI.
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        string memory characterId = tokenId.toString();
        string memory name = string(abi.encodePacked('Character ', characterId));
        string memory description = string(
            abi.encodePacked('Character ', characterId, ' on the streets of Dope Wars.')
        );

        return genericDataURI(name, description, equipmentOf(ownerOf(tokenId)));
    }

    /**
     * @notice Given a name, description, and equipment, construct a base64 encoded data URI.
     */
    function genericDataURI(
        string memory name,
        string memory description,
        uint48[] memory equipment
    ) public view override returns (string memory) {
        TokenURIParams memory params = TokenURIParams({
            name: name,
            description: description,
            parts: _getPartsForEquipment(equipment),
            background: backgrounds[equipment[BACKGROUND]]
        });

        string memory image = Base64.encode(
            bytes(
                MetadataBuilder.generateSVG(
                    'title',
                    'name',
                    MetadataBuilder.SVGParams({ parts: params.parts, background: params.background }),
                    palettes
                )
            )
        );

        // prettier-ignore
        return string(
            abi.encodePacked(
                'data:application/json;base64,',
                Base64.encode(
                    bytes(
                        abi.encodePacked('{"name":"', params.name, '", "description":"', params.description, '", "image": "', 'data:image/svg+xml;base64,', image, '"}')
                    )
                )
            )
        );
    }

    /**
     * @notice Given a equipment, construct a base64 encoded SVG image.
     */
    function generateSVGImage(uint48[] memory equipment) external view override returns (string memory) {
        return
            Base64.encode(
                bytes(
                    MetadataBuilder.generateSVG(
                        'title',
                        'name',
                        MetadataBuilder.SVGParams({
                            parts: _getPartsForEquipment(equipment),
                            background: backgrounds[equipment[BACKGROUND]]
                        }),
                        palettes
                    )
                )
            );
    }

    /**
     * @notice Add a single color to a color palette.
     */
    function _addColorToPalette(uint8 _paletteIndex, string calldata _color) internal {
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
     * @notice Get all parts for the passed `equipment`.
     */
    function _getPartsForEquipment(uint48[] memory equipment) internal view returns (bytes[] memory) {
        uint256[] memory _ids = new uint256[](7);
        _ids[0] = uint256(equipment[CLOTHES]);
        _ids[1] = uint256(equipment[FEET]);
        _ids[2] = uint256(equipment[HAND]);
        _ids[3] = uint256(equipment[NECK]);
        _ids[4] = uint256(equipment[RING]);
        _ids[5] = uint256(equipment[WAIST]);
        _ids[6] = uint256(equipment[WEAPON]);

        bytes[] memory _values = stockpile.ownedValueOfBatch(_ids);
        bytes[] memory _parts = new bytes[](8);
        _parts[0] = bodies[equipment[BODY]];
        _parts[1] = _values[0];
        _parts[2] = _values[1];
        _parts[3] = _values[2];
        _parts[4] = _values[3];
        _parts[5] = _values[4];
        _parts[6] = _values[5];
        _parts[7] = _values[6];
        return _parts;
    }
}
