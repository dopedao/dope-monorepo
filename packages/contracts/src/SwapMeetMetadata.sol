//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import './Components.sol';
import './TokenId.sol';

import './interfaces/ISwapMeet.sol';
import './MetadataBuilder.sol';
import './interfaces/ISwapMeet.sol';

library Gender {
    uint8 internal constant MALE = 0x0;
    uint8 internal constant FEMALE = 0x1;
}

/// @title Helper contract for generating ERC-1155 token ids and descriptions for
/// the individual items inside a Loot bag.
/// @author Tarrence van As, forked from Georgios Konstantopoulos
/// @dev Inherit from this contract and use it to generate metadata for your tokens
contract SwapMeetMetadata is ISwapMeetMetadata, IPaletteProvider {
    string private constant _name = 'Swap Meet';
    string private constant description = 'Get fitted.';
    bytes private constant female =
        hex'000a26361a050004440300040006440200040007440100020009440100020008440200020002440100054402000300014401000544020006000344030006000244040006000244040004000644020003000844010002000a4402000a44010002440100084401000144020006440100014401000144030005440100014401000144030004440200014401000144030004440200014401000144030004440200014401000144030004440200014401000144020006440100014402440100094402440100074401000144014402000844010004000244020002440200040002440200024402000400024402000244020004000244020002440200040002440200024402000400024402000244020004000244020002440200040002440200024402000400014403000144030004000144030001440300040001440300014403000400014403000144030004000144030001440300040001440300014403000400014403000144030004000144030001440300040001440300014403000400014403000144030004000244020003440100';
    bytes private constant male =
        hex'000927361907000344040006000544030006000544030006000544030006000544030007000444030007000344040007000244050004000744030002000b44010001000d4401000d4401000d440e440e44024401000b44024401000b44024401000b44024401000b44024401000b44024401000b44024401000b44024401000b44024401000b440c440100014402440100034403000444010003000344030003440200030003440300034402000300034403000344020003000344030003440200030003440300034402000300034403000344020003000344030003440200030003440300034402000300024404000244030003000244040002440300030002440400024403000300024404000244030003000244040002440300030002440400024403000300024404000244030003000244040002440300030002440400024403000300024404000344020003000344030004440100';
    bytes private constant shadow = hex'0036283818022b01000d2b0500092b0200';
    bytes private constant drugShadow = hex'00362f3729062b';

    // green, blue, red, yellow
    bytes4[4] private backgrounds = [bytes4(hex'b6ccc3ff'), hex'97adccff', hex'f2c4c5ff', hex'f1d8abff'];

    // Color Palettes (Index => Hex Colors)
    mapping(uint8 => bytes4[]) internal palettes;

    // Item RLE (TokenID => RLE)
    mapping(uint256 => bytes[2]) internal rles;

    Components internal immutable sc;

    constructor(address _components) {
        sc = Components(_components);
    }

    function name() external pure returns (string memory) {
        return _name;
    }

    function symbol() external pure returns (string memory) {
        return 'SWAP';
    }

    function palette(uint8 id) external view override returns (bytes4[] memory) {
        return palettes[id];
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
        p.color = hex'202221ff';
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

        return MetadataBuilder.tokenURI(p, this);
    }

    function fullname(uint256 id) public view override returns (string memory n) {
        (n, , , , , ) = params(id);
    }

    function params(uint256 id)
        public
        view
        override
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            bytes4
        )
    {
        (uint8[5] memory components, uint8 componentType) = TokenId.fromId(id);

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

    function tokenRle(uint256 id, uint8 gender) public view override returns (bytes memory) {
        if (rles[id][gender].length > 0) {
            return rles[id][gender];
        }

        return rles[toBaseId(id)][gender];
    }

    function toId(uint8[5] memory components, uint8 componentType) public pure returns (uint256) {
        return TokenId.toId(components, componentType);
    }

    function toBaseId(uint256 id) public pure returns (uint256) {
        (uint8[5] memory components, uint8 componentType) = TokenId.fromId(id);
        components[1] = 0;
        components[2] = 0;
        components[3] = 0;
        components[4] = 0;
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

        int256 direction = 1;
        if (gender == Gender.MALE) {
            direction = -1;
        }

        bytes32 offset = hex'00000C000C';

        parts[0] = Transform.translate(direction, shadow, offset);

        if (componentType == ComponentTypes.DRUGS) {
            parts[1] = Transform.translate(direction, drugShadow, offset);
        }

        parts[2] = Transform.translate(direction, silhouette, offset);

        bytes memory item = tokenRle(id, gender);
        if (item.length > 0) {
            parts[3] = Transform.translate(direction, item, offset);
        }

        return parts;
    }

    function vehicleParts(uint256 tokenId) internal view returns (bytes[] memory) {
        bytes[] memory parts = new bytes[](1);
        parts[0] = tokenRle(tokenId, 0);
        return parts;
    }
}
