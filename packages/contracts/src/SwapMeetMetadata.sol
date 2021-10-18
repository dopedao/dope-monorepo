//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import './Components.sol';
import './TokenId.sol';

import { MetadataBuilder } from './MetadataBuilder.sol';

library Gender {
    uint8 internal constant MALE = 0x0;
    uint8 internal constant FEMALE = 0x1;
}

/// @title Helper contract for generating ERC-1155 token ids and descriptions for
/// the individual items inside a Loot bag.
/// @author Tarrence van As, forked from Georgios Konstantopoulos
/// @dev Inherit from this contract and use it to generate metadata for your tokens
contract SwapMeetMetadata {
    string private constant _name = 'Swap Meet';
    string private constant description = 'Get fitted.';
    bytes private constant female =
        hex'000a26361a050004d00300040006d00200040007d00100020009d00100020008d00200020002d0010005d00200030001d0010005d00200060003d00300060002d00400060002d00400040006d00200030008d0010002000ad002000ad0010002d0010008d0010001d0020006d0010001d0010001d0030005d0010001d0010001d0030004d0020001d0010001d0030004d0020001d0010001d0030004d0020001d0010001d0030004d0020001d0010001d0020006d0010001d002d0010009d002d0010007d0010001d001d0020008d00100040002d0020002d00200040002d0020002d00200040002d0020002d00200040002d0020002d00200040002d0020002d00200040002d0020002d00200040002d0020002d00200040002d0020002d00200040001d0030001d00300040001d0030001d00300040001d0030001d00300040001d0030001d00300040001d0030001d00300040001d0030001d00300040001d0030001d00300040001d0030001d00300040001d0030001d00300040001d0030001d00300040002d0020003d00100';
    bytes private constant male =
        hex'0009273619070003d00400060005d00300060005d00300060005d00300060005d00300070004d00300070003d00400070002d00500040007d0030002000bd0010001000dd001000dd001000dd00ed00ed002d001000bd002d001000bd002d001000bd002d001000bd002d001000bd002d001000bd002d001000bd002d001000bd002d001000bd00cd0010001d002d0010003d0030004d00100030003d0030003d00200030003d0030003d00200030003d0030003d00200030003d0030003d00200030003d0030003d00200030003d0030003d00200030003d0030003d00200030003d0030003d00200030002d0040002d00300030002d0040002d00300030002d0040002d00300030002d0040002d00300030002d0040002d00300030002d0040002d00300030002d0040002d00300030002d0040002d00300030002d0040002d00300030002d0040003d00200030003d0030004d00100';
    bytes private constant shadow = hex'0036283818021c01000d1c0500091c0200';
    bytes private constant drugShadow = hex'00362f3729061c';

    // green, blue, red, yellow
    bytes4[4] private backgrounds = [bytes3(hex'b6ccc3'), hex'97adcc', hex'f2c4c5', hex'f1d8ab'];

    // Color Palettes (Index => Hex Colors)
    mapping(uint8 => bytes4[]) internal palettes;

    // Item RLE (TokenID => RLE)
    mapping(uint256 => bytes[2]) internal rles;

    Components internal sc;

    constructor(address _components) {
        sc = Components(_components);
    }

    function name() external pure returns (string memory) {
        return _name;
    }

    function symbol() external pure returns (string memory) {
        return 'SWAP';
    }

    /// @dev Opensea contract metadata: https://docs.opensea.io/docs/contract-level-metadata
    function contractURI() external pure returns (string memory) {
        return MetadataBuilder.contractURI(_name, description);
    }

    /// @notice Returns an SVG for the provided token id
    function tokenURI(uint256 tokenId) public view returns (string memory) {
        (
            string memory name_,
            string memory description_,
            string memory attributes_,
            string memory prefix_,
            string memory subtext_,
            bytes4 background_
        ) = params(tokenId);

        MetadataBuilder.Params memory p;
        p.name = name_;
        p.description = description_;
        p.color = hex'202221';
        p.background = background_;
        p.text = prefix_;
        p.subtext = subtext_;
        p.attributes = attributes_;

        if (TokenId.decode(tokenId, 0) == ComponentTypes.VEHICLE) {
            p.parts = vehicleParts(tokenId);
            p.resolution = 160;
        } else {
            p.parts = itemParts(tokenId);
            p.resolution = 64;
        }

        return MetadataBuilder.tokenURI(p, palettes);
    }

    function fullname(uint256 tokenId) public view returns (string memory n) {
        (n, , , , , ) = params(tokenId);
    }

    function params(uint256 tokenId)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            bytes4
        )
    {
        (uint8[5] memory components, uint8 componentType) = TokenId.fromId(tokenId);

        uint8 bg = 0;
        string memory name_ = sc.name(componentType, components[0]);

        if (components[1] > 0) {
            name_ = string(abi.encodePacked(name_, ' ', sc.suffix(components[1])));
            bg = 1;
        }

        string memory subtext = name_;
        string memory prefix;

        if (components[2] > 0) {
            prefix = sc.prefix(components[2], components[3]);
            name_ = string(abi.encodePacked('\\"', prefix, '\\" ', name_));

            // NOTE: abi encoding requires a double escape to render double quotes in json.
            // the svg renderer can't handle this (renders \"), so we use a modified font
            // which renders a double quote for back ticks.
            prefix = string(abi.encodePacked('`', prefix, '`'));
            bg = 2;
        }

        if (components[4] > 0) {
            subtext = string(abi.encodePacked(subtext, ' +1'));
            name_ = string(abi.encodePacked(name_, ' +1'));
            bg = 3;
        }

        return (name_, description, sc.attributes(components, componentType), prefix, subtext, backgrounds[bg]);
    }

    function tokenRle(uint256 id, uint8 gender) public view returns (bytes memory) {
        if (rles[id][gender].length > 0) {
            return rles[id][gender];
        }

        (uint8[5] memory components, uint8 componentType) = TokenId.fromId(id);
        components[1] = 0;
        components[2] = 0;
        components[3] = 0;
        components[4] = 0;
        return rles[TokenId.toId(components, componentType)][gender];
    }

    function toId(uint8[5] memory components, uint8 componentType) public pure returns (uint256) {
        return TokenId.toId(components, componentType);
    }

    function itemParts(uint256 tokenId) internal view returns (bytes[] memory) {
        uint8 componentType = TokenId.decode(tokenId, 0);

        bytes[] memory parts = new bytes[](8);

        bytes[4] memory male_ = genderParts(male, tokenId, Gender.MALE, componentType);
        bytes[4] memory female_ = genderParts(female, tokenId, Gender.FEMALE, componentType);

        parts[0] = male_[0];
        parts[1] = male_[1];
        parts[2] = male_[2];
        parts[3] = male_[3];
        parts[4] = female_[0];
        parts[5] = female_[1];
        parts[6] = female_[2];
        parts[7] = female_[3];

        return parts;
    }

    function genderParts(
        bytes memory silhouette,
        uint256 id,
        uint8 gender,
        uint8 componentType
    ) internal view returns (bytes[4] memory) {
        bytes[4] memory parts;

        int16 offset = 1;
        if (gender == Gender.MALE) {
            offset = -1;
        }

        bytes memory shadow_ = shadow;
        shadow_[2] = bytes1(uint8(uint16(int16(uint16(uint8(shadow_[2]))) + (offset * int16(12)))));
        shadow_[4] = bytes1(uint8(uint16(int16(uint16(uint8(shadow_[4]))) + (offset * int16(12)))));
        parts[0] = shadow_;

        if (componentType == ComponentTypes.DRUGS) {
            bytes memory drugShadow_ = drugShadow;
            drugShadow_[2] = bytes1(uint8(uint16(int16(uint16(uint8(drugShadow_[2]))) + (offset * int16(12)))));
            drugShadow_[4] = bytes1(uint8(uint16(int16(uint16(uint8(drugShadow_[4]))) + (offset * int16(12)))));
            parts[1] = drugShadow_;
        }

        silhouette[2] = bytes1(uint8(uint16(int16(uint16(uint8(silhouette[2]))) + (offset * int16(12)))));
        silhouette[4] = bytes1(uint8(uint16(int16(uint16(uint8(silhouette[4]))) + (offset * int16(12)))));
        parts[2] = silhouette;

        bytes memory item = tokenRle(id, gender);
        if (item.length > 0) {
            item[2] = bytes1(uint8(uint16(int16(uint16(uint8(item[2]))) + (offset * int16(12)))));
            item[4] = bytes1(uint8(uint16(int16(uint16(uint8(item[4]))) + (offset * int16(12)))));
            parts[3] = item;
        }

        return parts;
    }

    function vehicleParts(uint256 tokenId) internal view returns (bytes[] memory) {
        bytes[] memory parts = new bytes[](1);
        parts[0] = tokenRle(tokenId, 0);
        return parts;
    }
}
