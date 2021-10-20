//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import { BitMask } from './BitMask.sol';
import { Components } from './Components.sol';
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
        bytes4 viewport;
        uint256 age;
        uint8[4] body;
        uint256[10] slots;
        string name;
    }

    string private constant _name = 'Hustlers';
    string private constant _symbol = 'HUSTLERS';
    string private constant description = 'Hustle Hard';
    string[13] private traitTypes = [
        'Class',
        'Gender',
        'Weapon',
        'Clothes',
        'Vehicle',
        'Waist',
        'Feet',
        'Hands',
        'Drug',
        'Neck',
        'Ring',
        'Initiation',
        'Respect'
    ];

    ISwapMeet internal immutable swapmeet;
    Components internal immutable components;
    uint256 private immutable deployedAt;

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
    mapping(uint256 => Metadata) public metadata;

    constructor(address _components, address _swapmeet) {
        swapmeet = ISwapMeet(_swapmeet);
        components = Components(_components);
        deployedAt = block.timestamp;
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
        MetadataBuilder.Params memory p;
        p.name = metadata[hustlerId].name;
        p.resolution = 64;
        p.background = metadata[hustlerId].background;
        p.color = metadata[hustlerId].color;
        p.subtext = metadata[hustlerId].name;

        if (hustlerId < 500) {
            p.text = components.title(hustlerId);
        }

        p.parts = new bytes[](12);
        p.parts[0] = bodies[metadata[hustlerId].body[BodyParts.BODY]];
        p.parts[1] = heads[metadata[hustlerId].body[BodyParts.HEAD]];
        p.parts[2] = beards[metadata[hustlerId].body[BodyParts.BEARD]];

        for (uint8 i = 0; i < 9; i++) {
            if (i == 0x2) {
                continue;
            }

            if (BitMask.get(metadata[hustlerId].mask, i)) {
                p.parts[i + 3] = swapmeet.tokenRle(
                    metadata[hustlerId].slots[i],
                    metadata[hustlerId].body[BodyParts.GENDER]
                );
            }
        }

        p.attributes = MetadataBuilder.attributes(attributes(hustlerId));
        return MetadataBuilder.tokenURI(p, palettes);
    }

    function attributes(uint256 hustlerId) public view returns (bytes[] memory) {
        bytes memory none = 'None';

        bytes[] memory traits = new bytes[](13);

        if (metadata[hustlerId].age == 0) {
            return traits;
        }

        string memory class = 'Hustler';
        if (hustlerId < 500) {
            class = 'Original Gangsta';
        }
        traits[0] = abi.encode(DisplayTypes.NONE, traitTypes[0], abi.encode(class));
        traits[1] = abi.encode(
            DisplayTypes.NONE,
            traitTypes[1],
            abi.encode(genders[metadata[hustlerId].body[BodyParts.GENDER]])
        );

        for (uint8 i = 0; i < 9; i++) {
            bytes memory v;
            if (BitMask.get(metadata[hustlerId].mask, i)) {
                v = bytes(swapmeet.fullname(metadata[hustlerId].slots[i]));
            } else {
                v = none;
            }

            traits[i + 2] = abi.encode(DisplayTypes.NONE, traitTypes[i + 2], abi.encode(v));
        }

        traits[11] = abi.encode(DisplayTypes.DATE, traitTypes[11], abi.encode(metadata[hustlerId].age));

        uint256 respect = (1e5 - ((metadata[hustlerId].age - deployedAt) * 1e5) / (block.timestamp * 1e5)) / 1e3;
        if (hustlerId < 500) {
            respect = 100;
        }
        traits[12] = abi.encode(DisplayTypes.RANKING, traitTypes[12], abi.encode(respect));

        return traits;
    }

    function slot(uint256 id) internal pure returns (uint8) {
        return uint8(id & 0xff);
    }
}
