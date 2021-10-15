//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import { BitMask } from './BitMask.sol';
import { Gender } from './SwapMeetMetadata.sol';
import { MetadataBuilder } from './MetadataBuilder.sol';
import { ISwapMeet } from './interfaces/ISwapMeet.sol';

library BodyParts {
    uint8 internal constant GENDER = 0x0;
    uint8 internal constant BODY = 0x1;
    uint8 internal constant HEAD = 0x2;
    uint8 internal constant BEARD = 0x3;
}

/// @title Hustler Metadata logic
/// @author Tarrence van As
contract HustlerMetadata {
    struct Metadata {
        bytes4 color;
        bytes4 background;
        bytes2 mask;
        uint8[4] body;
        uint256[10] slots;
        string name;
    }

    string private constant _name = 'Hustlers';
    string private constant _symbol = 'HUSTLERS';
    string private constant description = 'Hustle Hard';

    ISwapMeet immutable swapmeet;

    string[2] genders = ['Male', 'Female'];

    // Color Palettes (Index => Hex Colors)
    mapping(uint8 => bytes4[]) internal palettes;

    // Bodies (Body number => RLE)
    bytes[] internal bodies;

    // Heads (Head number => RLE)
    bytes[] internal heads;

    // Beards (Beard number => RLE)
    bytes[] internal beards;

    // Hustler metadata
    mapping(uint256 => Metadata) internal metadata;

    constructor(address _swapmeet) {
        swapmeet = ISwapMeet(_swapmeet);
    }

    function name() external pure returns (string memory) {
        return _name;
    }

    function symbol() external pure returns (string memory) {
        return _symbol;
    }

    /// @dev Opensea contract metadata: https://docs.opensea.io/docs/contract-level-metadata
    function contractURI() external pure returns (string memory) {
        return MetadataBuilder.contractURI(_name, description);
    }

    /// @notice Returns an SVG for the provided hustler id
    function tokenURI(uint256 hustlerId) public view returns (string memory) {
        Metadata memory meta = metadata[hustlerId];

        (string[] memory keys, string[] memory values) = attributes(hustlerId);

        MetadataBuilder.SVGParams memory p;
        p.name = meta.name;
        p.resolution = 64;
        p.color = meta.background;
        p.parts = parts(hustlerId);
        p.attributes = MetadataBuilder.attributes(keys, values);
        return MetadataBuilder.tokenURI(p, palettes);
    }

    function parts(uint256 hustlerId) public view returns (bytes[] memory) {
        Metadata memory meta = metadata[hustlerId];
        bytes[] memory parts_ = new bytes[](11);
        uint8 gender = meta.body[BodyParts.GENDER];

        parts_[0] = bodies[meta.body[BodyParts.BODY]];
        parts_[1] = heads[meta.body[BodyParts.HEAD]];
        parts_[2] = beards[meta.body[BodyParts.BEARD]];

        for (uint8 i = 0; i < 9; i++) {
            if (i == 0x2) {
                continue;
            }

            if (BitMask.get(meta.mask, i)) {
                parts_[i + 3] = swapmeet.tokenRle(meta.slots[i], gender);
            }
        }

        return parts_;
    }

    function attributes(uint256 hustlerId) public view returns (string[] memory, string[] memory) {
        string memory none = 'None';
        string[] memory keys = new string[](10);
        string[] memory values = new string[](10);

        keys[0] = 'Weapon';
        keys[1] = 'Clothes';
        keys[2] = 'Vehicle';
        keys[3] = 'Waist';
        keys[4] = 'Feet';
        keys[5] = 'Hands';
        keys[6] = 'Drug';
        keys[7] = 'Neck';
        keys[8] = 'Ring';
        keys[9] = 'Gender';

        values[0] = genders[metadata[hustlerId].body[BodyParts.GENDER]];

        for (uint8 i = 0; i < 9; i++) {
            if (BitMask.get(metadata[hustlerId].mask, i)) {
                values[i] = swapmeet.fullname(metadata[hustlerId].slots[i]);
            } else {
                values[1] = none;
            }
        }

        return (keys, values);
    }

    function slot(uint256 id) internal pure returns (uint8) {
        return uint8(id & 0xff);
    }
}
