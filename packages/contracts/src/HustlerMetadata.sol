//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import { BitMask } from './BitMask.sol';
import { Components, ComponentTypes } from './Components.sol';
import { Gender } from './SwapMeetMetadata.sol';
import { DisplayTypes, MetadataBuilder, Transform } from './MetadataBuilder.sol';
import { ISwapMeet } from './interfaces/ISwapMeet.sol';

library BodyParts {
    uint8 internal constant GENDER = 0x0;
    uint8 internal constant BODY = 0x1;
    uint8 internal constant HAIR = 0x2;
    uint8 internal constant BEARD = 0x3;
}

library RleParts {
    uint8 internal constant MALE_BODY = 0x0;
    uint8 internal constant FEMALE_BODY = 0x1;
    uint8 internal constant MALE_HAIR = 0x2;
    uint8 internal constant FEMALE_HAIR = 0x3;
    uint8 internal constant BEARD = 0x4;
}

library RenderOptions {
    uint8 internal constant CAR = 0x0;
    uint8 internal constant TITLE = 0x1;
    uint8 internal constant NAME = 0x2;
    uint8 internal constant ORDERING = 0x2;
}

/// @title Hustler Metadata logic
/// @author tarrence llc
contract HustlerMetadata {
    struct Metadata {
        bytes4 color;
        bytes4 background;
        bytes2 mask;
        bytes2 options;
        uint8[4] viewbox;
        uint8[4] body;
        uint8[10] order;
        uint256 age;
        uint256[10] slots;
        string name;
    }

    string private constant _name = 'Hustlers';
    string private constant _symbol = 'HUSTLERS';
    string private constant description = 'Hustle Hard';
    string[14] private traitTypes = [
        'Class',
        'Sex',
        'Weapon',
        'Clothes',
        'Vehicle',
        'Waist',
        'Feet',
        'Hands',
        'Drug',
        'Neck',
        'Ring',
        'Accessory',
        'Initiation',
        'Respect'
    ];

    ISwapMeet internal immutable swapmeet;
    Components internal immutable components;
    uint256 private immutable deployedAt = block.timestamp;

    bytes private constant shadow = hex'0036283818022b01000d2b0500092b0200';
    bytes private constant drugShadow = hex'00362f3729062b';
    string[2] genders = ['Male', 'Female'];

    // Body part rles
    mapping(uint8 => bytes[]) internal rles;

    // Hustler metadata
    mapping(uint256 => Metadata) public metadata;

    constructor(address _components, address _swapmeet) {
        swapmeet = ISwapMeet(_swapmeet);
        components = Components(_components);
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

        p.background = metadata[hustlerId].background;
        p.color = metadata[hustlerId].color;

        if (BitMask.get(metadata[hustlerId].options, RenderOptions.NAME)) {
            p.subtext = metadata[hustlerId].name;
        }

        p.viewbox = metadata[hustlerId].viewbox;

        if (BitMask.get(metadata[hustlerId].options, RenderOptions.TITLE) && hustlerId < 500) {
            p.text = components.title(hustlerId);
        }

        if (BitMask.get(metadata[hustlerId].options, RenderOptions.CAR)) {
            p.resolution = 160;
            p.parts = carParts(hustlerId);
        } else {
            p.resolution = 64;
            p.parts = hustlerParts(hustlerId);
        }

        p.attributes = MetadataBuilder.attributes(attributes(hustlerId));
        return MetadataBuilder.tokenURI(p, swapmeet);
    }

    function hustlerParts(uint256 hustlerId) public view returns (bytes[] memory) {
        bytes[] memory parts = new bytes[](15);
        // Gender index corresponds to rle index
        parts[0] = shadow;
        parts[2] = rles[metadata[hustlerId].body[BodyParts.GENDER]][metadata[hustlerId].body[BodyParts.BODY]];
        parts[3] = rles[metadata[hustlerId].body[BodyParts.GENDER] + 2][metadata[hustlerId].body[BodyParts.HAIR]];
        parts[4] = rles[RleParts.BEARD][metadata[hustlerId].body[BodyParts.BEARD]];

        if (BitMask.get(metadata[hustlerId].options, RenderOptions.ORDERING)) {}

        for (uint8 i = 0; i < 10; i++) {
            if (i == ComponentTypes.VEHICLE) {
                continue;
            }

            if (BitMask.get(metadata[hustlerId].mask, i)) {
                parts[i + 5] = swapmeet.tokenRle(
                    metadata[hustlerId].slots[i],
                    metadata[hustlerId].body[BodyParts.GENDER]
                );

                if (i == ComponentTypes.DRUGS) {
                    parts[1] = drugShadow;
                }
            }
        }

        return parts;
    }

    function carParts(uint256 hustlerId) public view returns (bytes[] memory) {
        bytes[] memory parts = new bytes[](16);

        if (BitMask.get(metadata[hustlerId].mask, ComponentTypes.VEHICLE)) {
            parts[0] = swapmeet.tokenRle(metadata[hustlerId].slots[ComponentTypes.VEHICLE], 0);
        }

        bytes32 offset = hex'00331D331D';
        parts[1] = Transform.translate(1, shadow, offset);

        parts[3] = Transform.translate(
            1,
            rles[metadata[hustlerId].body[BodyParts.GENDER]][metadata[hustlerId].body[BodyParts.BODY]],
            offset
        );

        // Gender index corresponds to rle index
        parts[4] = Transform.translate(
            1,
            rles[metadata[hustlerId].body[BodyParts.GENDER] + 2][metadata[hustlerId].body[BodyParts.HAIR]],
            offset
        );

        parts[5] = Transform.translate(1, rles[RleParts.BEARD][metadata[hustlerId].body[BodyParts.BEARD]], offset);

        for (uint8 i = 0; i < 10; i++) {
            if (BitMask.get(metadata[hustlerId].mask, i)) {
                if (i == ComponentTypes.VEHICLE) {
                    continue;
                }

                bytes memory rle_ = swapmeet.tokenRle(
                    metadata[hustlerId].slots[i],
                    metadata[hustlerId].body[BodyParts.GENDER]
                );
                if (rle_.length > 4) {
                    Transform.translate(1, rle_, offset);
                }

                parts[i + 6] = rle_;

                if (i == ComponentTypes.DRUGS) {
                    parts[2] = Transform.translate(1, drugShadow, offset);
                }
            }
        }

        return parts;
    }

    function attributes(uint256 hustlerId) public view returns (bytes[] memory) {
        bytes memory none = 'None';

        bytes[] memory traits = new bytes[](14);

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

        for (uint8 i = 0; i < 11; i++) {
            bytes memory v;
            if (BitMask.get(metadata[hustlerId].mask, i)) {
                v = bytes(swapmeet.fullname(metadata[hustlerId].slots[i]));
            } else {
                v = none;
            }

            traits[i + 2] = abi.encode(DisplayTypes.NONE, traitTypes[i + 2], abi.encode(v));
        }

        traits[12] = abi.encode(DisplayTypes.DATE, traitTypes[12], abi.encode(metadata[hustlerId].age));

        uint256 respect = (1e5 -
            ((metadata[hustlerId].age - deployedAt) * 1e5) /
            ((block.timestamp - deployedAt) * 1e5)) / 1e3;

        if (hustlerId < 500) {
            respect = 100;
        }
        traits[13] = abi.encode(DisplayTypes.RANKING, traitTypes[13], abi.encode(respect));

        return traits;
    }

    function slot(uint256 id) internal pure returns (uint8) {
        return uint8(id & 0xff);
    }
}
