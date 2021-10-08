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
contract StockpileMetadata {
    string private constant _name = 'Dope Swap Meet';
    string private constant description =
        'Get fitted with the freshest drip, strapped with the latest gat, rolling in the hottest ride, and re-up your supply at the Dope St. Swap Meet.';

    bytes internal constant female =
        hex'000a26361a050004600300040006600200040007600100020009600100020008600200020002600100056002000300016001000560020006000360030006000260040006000260040004000660020003000860010002000a6002000a60010002600100086001000160020006600100016001000160030005600100016001000160030004600200016001000160030004600200016001000160030004600200016001000160030004600200016001000160020006600100016002600100096002600100076001000160016002000860010004000260020002600200040002600200026002000400026002000260020004000260020002600200040002600200026002000400026002000260020004000260020002600200040002600200026002000400016003000160030004000160030001600300040001600300016003000400016003000160030004000160030001600300040001600300016003000400016003000160030004000160030001600300040001600300016003000400016003000160030004000260020003600100';
    bytes internal constant man =
        hex'000927361907000360040006000560030006000560030006000560030006000560030007000460030007000360040007000260050004000760030002000b60010001000d6001000d6001000d600e600e60026001000b60026001000b60026001000b60026001000b60026001000b60026001000b60026001000b60026001000b60026001000b600c600100016002600100036003000460010003000360030003600200030003600300036002000300036003000360020003000360030003600200030003600300036002000300036003000360020003000360030003600200030003600300036002000300026004000260030003000260040002600300030002600400026003000300026004000260030003000260040002600300030002600400026003000300026004000260030003000260040002600300030002600400026003000300026004000360020003000360030004600100';
    bytes internal constant shadow = hex'0036283818021c01000d1c0500091c0200';
    bytes internal constant drugShadow = hex'00362f3729061c';

    // green, blue, red, yellow
    string[4] internal backgrounds = ['E6F0DE', 'E6F0DE', 'FAE8DF', 'FFFEBF'];

    // Color Palettes (Index => Hex Colors)
    mapping(uint8 => string[]) internal palettes;

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
        (uint8[5] memory components, uint8 componentType) = TokenId.fromId(tokenId);

        if (componentType == ComponentTypes.VEHICLE) {
            return MetadataBuilder.tokenURI(vehicleSVG(tokenId, components, componentType), palettes);
        }

        return MetadataBuilder.tokenURI(itemSVG(tokenId, components, componentType), palettes);
    }

    function params(uint8[5] memory components, uint8 componentType)
        internal
        view
        returns (MetadataBuilder.SVGParams memory)
    {
        uint8 bg = 0;
        string memory name = sc.name(componentType, components[0]);
        MetadataBuilder.SVGParams memory meta;
        meta.name = name;
        meta.description = description;
        meta.attributes = sc.attributes(components, componentType);

        if (components[1] > 0) {
            meta.name = string(abi.encodePacked(meta.name, ' ', sc.suffix(components[1])));
            meta.subtext = meta.name;
            bg = 1;
        } else {
            meta.subtext = name;
        }

        if (components[2] > 0) {
            string memory prefix = sc.prefix(components[2], components[3]);

            // NOTE: abi encoding requires a double escape to render double quotes in json.
            // the svg renderer can't handle this (renders \"), so we use a modified font
            // which renders a double quote for back ticks.
            meta.text = string(abi.encodePacked('`', prefix, '`'));
            meta.name = string(abi.encodePacked('\\"', prefix, '\\" ', meta.name));
            bg = 2;
        }

        if (components[4] > 0) {
            meta.subtext = string(abi.encodePacked(meta.subtext, ' +1'));
            meta.name = string(abi.encodePacked(meta.name, ' +1'));
            bg = 3;
        }

        meta.background = backgrounds[bg];

        return meta;
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

    function itemSVG(
        uint256 tokenId,
        uint8[5] memory components,
        uint8 componentType
    ) internal view returns (MetadataBuilder.SVGParams memory) {
        bytes[] memory parts = new bytes[](8);

        bytes[4] memory male = genderParts(man, tokenId, Gender.MALE, componentType);
        bytes[4] memory female = genderParts(female, tokenId, Gender.FEMALE, componentType);

        parts[0] = male[0];
        parts[1] = male[1];
        parts[2] = male[2];
        parts[3] = male[3];
        parts[4] = female[0];
        parts[5] = female[1];
        parts[6] = female[2];
        parts[7] = female[3];

        MetadataBuilder.SVGParams memory p = params(components, componentType);
        p.resolution = 64;
        p.color = '000';
        p.parts = parts;
        return p;
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
        item[2] = bytes1(uint8(uint16(int16(uint16(uint8(item[2]))) + (offset * int16(12)))));
        item[4] = bytes1(uint8(uint16(int16(uint16(uint8(item[4]))) + (offset * int16(12)))));
        parts[3] = item;

        return parts;
    }

    function vehicleSVG(
        uint256 tokenId,
        uint8[5] memory components,
        uint8 componentType
    ) internal view returns (MetadataBuilder.SVGParams memory) {
        bytes[] memory parts = new bytes[](1);
        parts[0] = tokenRle(tokenId, 0);
        MetadataBuilder.SVGParams memory p = params(components, componentType);
        p.resolution = 160;
        p.color = '000';
        p.parts = parts;
        return p;
    }
}
