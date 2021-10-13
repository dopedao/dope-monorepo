//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import { IERC1155 } from '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';

import { Gender } from './SwapMeetMetadata.sol';
import { MetadataBuilder } from './MetadataBuilder.sol';

library BodyParts {
    uint8 internal constant GENDER = 0x0;
    uint8 internal constant BODY = 0x1;
    uint8 internal constant HEAD = 0x2;
    uint8 internal constant BEARD = 0x3;
}

library Slots {
    uint8 internal constant WEAPON = 0x0;
    uint8 internal constant CLOTHES = 0x1;
    uint8 internal constant VEHICLE = 0x2;
    uint8 internal constant WAIST = 0x3;
    uint8 internal constant FOOT = 0x4;
    uint8 internal constant HAND = 0x5;
    uint8 internal constant DRUGS = 0x6;
    uint8 internal constant NECK = 0x7;
    uint8 internal constant RING = 0x8;
    uint8 internal constant ACCESSORY1 = 0x9;
    uint8 internal constant ACCESSORY2 = 0xa;
}

/// @title Helper contract for generating ERC-1155 token ids and descriptions for
/// the individual items inside a Loot bag.
/// @author Tarrence van As, forked from Georgios Konstantopoulos
/// @dev Inherit from this contract and use it to generate metadata for your tokens
contract HustlerMetadata {
    struct Metadata {
        string name;
        string background;
        uint8[4] body;
        uint256[10] slots;
    }

    string private constant _name = 'Hustlers';
    string private constant description = 'Hustle Hard';

    IERC1155 immutable swapmeet;

    string[2] genders = ['Male', 'Female'];

    mapping(uint256 => mapping(uint256 => uint256)) internal inventories;

    // Color Palettes (Index => Hex Colors)
    mapping(uint8 => string[]) internal palettes;

    // Bodies (Body number => RLE)
    bytes[] internal bodies;

    // Heads (Head number => RLE)
    bytes[] internal heads;

    // Beards (Beard number => RLE)
    bytes[] internal beards;

    // Hustler metadata
    mapping(uint256 => Metadata) internal metadata;

    constructor(address _swapmeet) {
        swapmeet = IERC1155(_swapmeet);
    }

    function name() external pure returns (string memory) {
        return _name;
    }

    function symbol() external pure returns (string memory) {
        return 'HUSTLERS';
    }

    /// @dev Opensea contract metadata: https://docs.opensea.io/docs/contract-level-metadata
    function contractURI() external pure returns (string memory) {
        return MetadataBuilder.contractURI(_name, description);
    }

    /// @notice Returns an SVG for the provided token id
    function tokenURI(uint256 tokenId) public view returns (string memory) {
        Metadata memory meta = metadata[tokenId];
        bytes[] memory parts = new bytes[](14);

        parts[0] = bodies[meta.body[BodyParts.BODY]];
        parts[1] = heads[meta.body[BodyParts.HEAD]];
        parts[2] = beards[meta.body[BodyParts.BEARD]];
        // parts[3] = heads[meta.body[BodyParts.BEARD]];
        // parts[4] = heads[meta.body[BodyParts.BEARD]];
        // parts[5] = heads[meta.body[BodyParts.BEARD]];

        MetadataBuilder.SVGParams memory p;
        p.name = meta.name;
        p.resolution = 64;
        p.color = '202221';
        p.parts = parts;
        return MetadataBuilder.tokenURI(p, palettes);
    }

    function params(uint256 id) internal view returns (MetadataBuilder.SVGParams memory) {
        Metadata memory meta = metadata[id];

        MetadataBuilder.SVGParams memory p;
        p.name = meta.name;
        p.description = description;
        p.attributes = attributes(id);
        p.background = meta.background;

        return p;
    }

    function attributes(uint256 id) public view returns (string memory) {
        Metadata memory meta = metadata[id];
        string memory res = string(abi.encodePacked('[', trait('Gender', genders[meta.body[BodyParts.GENDER]])));
        res = string(abi.encodePacked(res, ']'));
        return res;
    }

    // Helper for encoding as json w/ trait_type / value from opensea
    function trait(string memory traitType, string memory value) internal pure returns (string memory) {
        return string(abi.encodePacked('{', '"trait_type": "', traitType, '", ', '"value": "', value, '"', '}'));
    }
}
