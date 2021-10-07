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
    string private constant _name = 'Dope St. Swap Meet';
    string private constant description =
        'Get fitted with the freshest drip, strapped with the latest gat, rolling in the hottest ride, and re-up your supply at the Dope St. Swap Meet.';

    bytes internal constant female =
        hex'000a26361a050004240300040006240200040007240100020009240100020008240200020002240100052402000300012401000524020006000324030006000224040006000224040004000624020003000824010002000a2402000a2401000224010008240100012402000624010001240100012403000524010001240100012403000424020001240100012403000424020001240100012403000424020001240100012403000424020001240100012402000624010001240224020008240224020006240100012401240300022402000324010004000224020002240200040002240200022402000400022402000224020004000224020002240200040002240200022402000400022402000224020004000224020002240200040002240200022402000400012403000124030004000124030001240300040001240300012403000400012403000124030004000124030001240300040001240300012403000400012403000124030004000124030001240300040001240300012403000400012403000124030003000324020003240100';
    bytes internal constant man =
        hex'000927361907000324040006000524030006000524030006000524030006000524030007000424030007000324040007000224050004000724030002000b24010001000d2401000d2401000d240e240e24022401000b24022401000b24022401000b24022401000b24022401000b24022401000b24022401000b24022401000b24022401000b240c240100012402240100032402000524010003000324020004240200030003240300032402000300032403000324020003000324030003240200030003240300032402000300032403000324020003000324030003240200030003240300032402000300022404000224030003000224040002240300030002240400022403000300022404000224030003000224040002240300030002240400022403000300022404000224030003000224040002240300030002240400022403000300022404000324020003000324030004240100';
    bytes internal constant shadow = hex'0036283818024801000d48050009480200';

    // green, blue, red, yellow
    string[4] internal backgrounds = ['a3beb5', '8aa3c3', 'e0afae', 'f5d8a5'];

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
        bytes[] memory parts = new bytes[](6);

        bytes[3] memory male = genderParts(man, tokenId, Gender.MALE);
        bytes[3] memory female = genderParts(female, tokenId, Gender.FEMALE);

        parts[0] = male[0];
        parts[1] = male[1];
        parts[2] = male[2];
        parts[3] = female[0];
        parts[4] = female[1];
        parts[5] = female[2];

        MetadataBuilder.SVGParams memory p = params(tokenId);
        p.parts = parts;

        return MetadataBuilder.tokenURI(p, palettes);
    }

    function params(uint256 tokenId) internal view returns (MetadataBuilder.SVGParams memory) {
        (uint8[5] memory components, uint8 componentType) = TokenId.fromId(tokenId);

        uint8 bg = 0;
        string memory name = sc.name(componentType, components[0]);
        MetadataBuilder.SVGParams memory meta;
        meta.name = name;
        meta.description = description;
        meta.attributes = sc.attributes(components, componentType);

        if (components[1] > 0) {
            meta.name = string(abi.encodePacked(meta.name, ' ', sc.suffix(components[1])));
            meta.subtext = name;
            bg = 1;
        } else {
            meta.subtext = name;
        }

        if (components[2] > 0) {
            meta.text = sc.prefix(components[2], components[3]);
            meta.name = string(abi.encodePacked(meta.text, ' ', meta.name));
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

    function genderParts(
        bytes memory silouette,
        uint256 id,
        uint8 gender
    ) internal view returns (bytes[3] memory) {
        bytes[3] memory parts;

        int16 offset = 1;
        if (gender == Gender.MALE) {
            offset = -1;
        }

        bytes memory shadow_ = shadow;
        shadow_[2] = bytes1(uint8(uint16(int16(uint16(uint8(shadow_[2]))) + (offset * int16(12)))));
        shadow_[4] = bytes1(uint8(uint16(int16(uint16(uint8(shadow_[4]))) + (offset * int16(12)))));
        parts[0] = shadow_;

        silouette[2] = bytes1(uint8(uint16(int16(uint16(uint8(silouette[2]))) + (offset * int16(12)))));
        silouette[4] = bytes1(uint8(uint16(int16(uint16(uint8(silouette[4]))) + (offset * int16(12)))));
        parts[1] = silouette;

        bytes memory item = tokenRle(id, gender);
        item[2] = bytes1(uint8(uint16(int16(uint16(uint8(item[2]))) + (offset * int16(12)))));
        item[4] = bytes1(uint8(uint16(int16(uint16(uint8(item[4]))) + (offset * int16(12)))));
        parts[2] = item;

        return parts;
    }
}
