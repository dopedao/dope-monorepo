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
contract HustlerMetadata {
    string private constant _name = 'Hustlers';
    string private constant description = 'Hustle Hard';

    // Color Palettes (Index => Hex Colors)
    mapping(uint8 => string[]) internal palettes;

    // Item RLE (TokenID => RLE)
    mapping(uint256 => bytes[2]) internal rles;

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
    // function tokenURI(uint256 tokenId) public view returns (string memory) {
    //     (uint8[5] memory components, uint8 componentType) = TokenId.fromId(tokenId);

    //     return MetadataBuilder.tokenURI(itemSVG(tokenId, components, componentType), palettes);
    // }

    function params(uint8[5] memory components, uint8 componentType)
        internal
        view
        returns (MetadataBuilder.SVGParams memory)
    {
        // uint8 bg = 0;
        // string memory name = sc.name(componentType, components[0]);
        MetadataBuilder.SVGParams memory meta;
        // meta.name = name;
        meta.description = description;
        // meta.attributes = sc.attributes(components, componentType);
        // meta.background = backgrounds[bg];

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
}
