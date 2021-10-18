//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import { BitMask } from './BitMask.sol';
import { Gender } from './SwapMeetMetadata.sol';
import { DisplayTypes, MetadataBuilder } from './MetadataBuilder.sol';
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
        uint256 age;
        uint8[4] body;
        uint256[10] slots;
        string name;
    }

    string private constant _name = 'Hustlers';
    string private constant _symbol = 'HUSTLERS';
    string private constant description = 'Hustle Hard';
    string[12] private traitTypes = [
        'Weapon',
        'Clothes',
        'Vehicle',
        'Waist',
        'Feet',
        'Hands',
        'Drug',
        'Neck',
        'Ring',
        'Gender',
        'Initiation',
        'Respect'
    ];

    ISwapMeet internal immutable swapmeet;

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

        MetadataBuilder.Params memory p;
        p.name = meta.name;
        p.resolution = 64;
        p.color = meta.background;
        p.parts = parts(hustlerId);
        p.attributes = MetadataBuilder.attributes(attributes(hustlerId));
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

    function attributes(uint256 hustlerId) public view returns (bytes[] memory) {
        bytes memory none = 'None';

        bytes[] memory traits = new bytes[](12);

        for (uint8 i = 0; i < 9; i++) {
            bytes memory v;
            if (BitMask.get(metadata[hustlerId].mask, i)) {
                v = bytes(swapmeet.fullname(metadata[hustlerId].slots[i]));
            } else {
                v = none;
            }

            traits[i] = abi.encode(DisplayTypes.NONE, traitTypes[i], abi.encode(v));
        }

        traits[9] = abi.encode(
            DisplayTypes.NONE,
            traitTypes[9],
            abi.encode(genders[metadata[hustlerId].body[BodyParts.GENDER]])
        );
        traits[10] = abi.encode(DisplayTypes.DATE, traitTypes[10], abi.encode(metadata[hustlerId].age));
        // traits[11] = abi.encode(0x1, traitTypes[11], abi.encode(metadata[hustlerId].age));

        return traits;
    }

    function slot(uint256 id) internal pure returns (uint8) {
        return uint8(id & 0xff);
    }
}
