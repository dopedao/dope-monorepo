//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import './Components.sol';
import './TokenId.sol';

import { MetadataBuilder } from './MetadataBuilder.sol';

/// @title Helper contract for generating ERC-1155 token ids and descriptions for
/// the individual items inside a Loot bag.
/// @author Tarrence van As, forked from Georgios Konstantopoulos
/// @dev Inherit from this contract and use it to generate metadata for your tokens
contract StockpileMetadata {
    string private constant _name = 'Dope St. Swap Meet';
    string private constant description =
        'Get fitted with the freshest drip, strapped with the latest gat, rolling in the hottest ride, and re-up your supply at the Dope St. Swap Meet.';
    string[] internal componentTypes = [
        'Weapon',
        'Clothes',
        'Vehicle',
        'Waist',
        'Foot',
        'Hand',
        'Drugs',
        'Neck',
        'Ring'
    ];

    bytes internal constant lady =
        hex'000a26361a050004240300040006240200040007240100020009240100020008240200020002240100052402000300012401000524020006000324030006000224040006000224040004000624020003000824010002000a2402000a2401000224010008240100012402000624010001240100012403000524010001240100012403000424020001240100012403000424020001240100012403000424020001240100012403000424020001240100012402000624010001240224020008240224020006240100012401240300022402000324010004000224020002240200040002240200022402000400022402000224020004000224020002240200040002240200022402000400022402000224020004000224020002240200040002240200022402000400012403000124030004000124030001240300040001240300012403000400012403000124030004000124030001240300040001240300012403000400012403000124030004000124030001240300040001240300012403000400012403000124030003000324020003240100';
    bytes internal constant man =
        hex'000927361907000324040006000524030006000524030006000524030006000524030007000424030007000324040007000224050004000724030002000b24010001000d2401000d2401000d240e240e24022401000b24022401000b24022401000b24022401000b24022401000b24022401000b24022401000b24022401000b24022401000b240c240100012402240100032402000524010003000324020004240200030003240300032402000300032403000324020003000324030003240200030003240300032402000300032403000324020003000324030003240200030003240300032402000300022404000224030003000224040002240300030002240400022403000300022404000224030003000224040002240300030002240400022403000300022404000224030003000224040002240300030002240400022403000300022404000324020003000324030004240100';

    // Color Palettes (Index => Hex Colors)
    mapping(uint8 => string[]) internal palettes;

    // Backgrounds (Hex Colors)
    string[] public backgrounds;

    // Item RLE (TokenID => RLE)
    mapping(uint256 => bytes) internal rles;

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
        bytes[] memory parts = new bytes[](3);

        bytes memory man_ = man;
        man_[2] = bytes1(uint8(man_[2]) - uint8(12));
        man_[4] = bytes1(uint8(man_[4]) - uint8(12));
        parts[0] = man_;

        bytes memory rle = tokenRLE(tokenId);
        rle[2] = bytes1(uint8(rle[2]) - uint8(12));
        rle[4] = bytes1(uint8(rle[4]) - uint8(12));
        parts[1] = rle;

        bytes memory lady_ = lady;
        lady_[2] = bytes1(uint8(lady_[2]) + uint8(12));
        lady_[4] = bytes1(uint8(lady_[4]) + uint8(12));
        parts[2] = lady_;

        return
            MetadataBuilder.tokenURI(
                tokenName(tokenId),
                description,
                attributes(tokenId),
                MetadataBuilder.SVGParams({ parts: parts, background: '#000000' }),
                palettes
            );
    }

    function tokenRLE(uint256 id) public view returns (bytes memory) {
        if (rles[id].length > 0) {
            return rles[id];
        }

        return rles[TokenId.decode(id, 1)];
    }

    /// @notice Returns the attributes associated with this item.
    /// @dev Opensea Standards: https://docs.opensea.io/docs/metadata-standards
    function attributes(uint256 id) public view returns (string memory) {
        (uint8[5] memory components, uint8 componentType) = TokenId.fromId(id);
        // should we also use components[0] which contains the item name?
        string memory slot = componentTypes[componentType];
        string memory res = string(abi.encodePacked('[', trait('Slot', slot)));

        string memory item = sc.itemName(componentType, components[0]);
        res = string(abi.encodePacked(res, ', ', trait('Item', item)));

        if (components[1] > 0) {
            string memory data = sc.suffixes(components[1] - 1);
            res = string(abi.encodePacked(res, ', ', trait('Suffix', data)));
        }

        if (components[2] > 0) {
            string memory data = sc.namePrefixes(components[2] - 1);
            res = string(abi.encodePacked(res, ', ', trait('Name Prefix', data)));
        }

        if (components[3] > 0) {
            string memory data = sc.nameSuffixes(components[3] - 1);
            res = string(abi.encodePacked(res, ', ', trait('Name Suffix', data)));
        }

        if (components[4] > 0) {
            res = string(abi.encodePacked(res, ', ', trait('Augmentation', 'Yes')));
        }

        res = string(abi.encodePacked(res, ']'));

        return res;
    }

    // Helper for encoding as json w/ trait_type / value from opensea
    function trait(string memory _traitType, string memory _value) internal pure returns (string memory) {
        return string(abi.encodePacked('{', '"trait_type": "', _traitType, '", ', '"value": "', _value, '"', '}'));
    }

    // @notice Given an ERC1155 token id, it returns its name by decoding and parsing
    // the id
    function tokenName(uint256 id) public view returns (string memory) {
        (uint8[5] memory components, uint8 componentType) = TokenId.fromId(id);
        return sc.componentsToString(components, componentType);
    }
}
