//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

// ============ Imports ============

import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import { ERC1155 } from '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';
import { ERC1155Receiver } from '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';

import { BitMask } from './BitMask.sol';
import { HustlerMetadata } from './HustlerMetadata.sol';

library Errors {
    string constant IsNotSwapMeet = 'sender not swap meet';
    string constant IsHolder = 'sender not hustler holder';
    string constant EquipSignatureInvalid = 'equip sig invalid';
    string constant HustlerDoesntOwnItem = 'hustler doesnt own item';
    string constant ValueNotOne = 'value not one';
}

/// @title Hustlers
/// @author Tarrence van As
/// @notice Hustlers are avatars in the dope wars metaverse.
contract Hustler is ERC1155, ERC1155Receiver, HustlerMetadata, Ownable {
    bytes4 constant equip = bytes4(keccak256('swapmeetequip'));

    IERC20 immutable paper;

    // First 500 are reserved for OG Hustlers.
    uint256 internal ogId = 0;
    uint256 internal curId = 500;

    // No need for a URI since we're doing everything onchain
    constructor(
        address _components,
        address _swapmeet,
        address _paper
    ) HustlerMetadata(_components, _swapmeet) {
        paper = IERC20(_paper);
        IERC20(_paper).approve(_swapmeet, type(uint256).max);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return tokenURI(tokenId);
    }

    /// @notice ERC1155 callback which will add an item to the hustlers inventory.
    function onERC1155Received(
        address,
        address from,
        uint256 id,
        uint256 value,
        bytes memory data
    ) public override returns (bytes4) {
        // only supports callback from the SwapMeet contract
        require(_msgSender() == address(swapmeet), Errors.IsNotSwapMeet);

        // Callers should encode the equip signature to explicity
        // indicate an encoded hustler id.
        (bytes4 sig, uint256 hustlerId) = abi.decode(data, (bytes4, uint256));
        require(sig == equip, Errors.EquipSignatureInvalid);
        require(balanceOf(from, hustlerId) == 1, Errors.IsHolder);
        require(value == 1, Errors.ValueNotOne);

        uint8 slot = slot(id);

        // Return the existing item if one is set.
        if (BitMask.get(metadata[hustlerId].mask, slot)) {
            swapmeet.safeTransferFrom(address(this), from, metadata[hustlerId].slots[slot], 1, '');
        }

        metadata[hustlerId].mask = BitMask.set(metadata[hustlerId].mask, slot);
        metadata[hustlerId].slots[slot] = id;

        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) public override returns (bytes4) {
        // only supports callback from the SwapMeet contract
        require(_msgSender() == address(swapmeet), Errors.IsNotSwapMeet);

        // Callers should encode the equip signature to explicity
        // indicate an encoded hustler id.
        (bytes4 sig, uint256 hustlerId) = abi.decode(data, (bytes4, uint256));
        require(sig == equip, Errors.EquipSignatureInvalid);
        require(operator == address(this) || balanceOf(from, hustlerId) == 1, Errors.IsHolder);

        (uint256[] memory unequipIds, uint256[] memory unequipValues) = batchEquip(hustlerId, ids, values);

        if (unequipIds.length > 0) {
            swapmeet.safeBatchTransferFrom(address(this), from, unequipIds, unequipValues, '');
        }

        return this.onERC1155BatchReceived.selector;
    }

    function batchEquip(
        uint256 hustlerId,
        uint256[] calldata ids,
        uint256[] calldata values
    ) internal returns (uint256[] memory, uint256[] memory) {
        uint256[] memory unequipIds = new uint256[](ids.length);
        uint256[] memory unequipValues = new uint256[](ids.length);

        uint256 j = 0;
        for (uint256 i = 0; i < ids.length; i++) {
            require(values[i] == 1, Errors.ValueNotOne);
            uint8 slot = slot(ids[i]);

            if (BitMask.get(metadata[hustlerId].mask, slot)) {
                unequipIds[j] = metadata[hustlerId].slots[slot];
                unequipValues[j] = 1;
                j++;
            }

            metadata[hustlerId].mask = BitMask.set(metadata[hustlerId].mask, slot);
            metadata[hustlerId].slots[slot] = ids[i];
        }

        uint256 diff = ids.length - j;
        assembly {
            // Shrink slice to fit returned ids.
            mstore(unequipIds, sub(mload(unequipIds), diff))
            mstore(unequipValues, sub(mload(unequipValues), diff))
        }

        return (unequipIds, unequipValues);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC1155Receiver)
        returns (bool)
    {
        return ERC1155.supportsInterface(interfaceId) || ERC1155Receiver.supportsInterface(interfaceId);
    }

    function mintFromDope(
        uint256 tokenId,
        string calldata name,
        bytes4 background,
        bytes4 color,
        bytes memory data
    ) external returns (uint256) {
        uint256 hustlerId = mint(data);
        metadata[hustlerId].name = name;
        metadata[hustlerId].background = background;
        metadata[hustlerId].color = color;
        paper.transferFrom(_msgSender(), address(this), swapmeet.cost());
        swapmeet.open(tokenId, address(this), abi.encode(equip, hustlerId));
        return hustlerId;
    }

    function mint(bytes memory data) public returns (uint256) {
        uint256 id = curId;
        curId += 1;
        metadata[id].age = block.timestamp;
        _mint(_msgSender(), id, 1, data);
        return id;
    }

    function mintOG(bytes memory data) public returns (uint256) {
        uint256 id = ogId;
        ogId += 1;
        metadata[id].age = block.timestamp;
        _mint(_msgSender(), id, 1, data);
        return id;
    }

    function setPalette(uint8 id, bytes4[] memory palette) public onlyOwner {
        palettes[id] = palette;
    }

    function unequip(uint256 hustlerId, uint8[] calldata slots) public onlyHustler(hustlerId) {
        uint256[] memory ids = new uint256[](slots.length);
        uint256[] memory amounts = new uint256[](slots.length);
        bytes2 mask = metadata[hustlerId].mask;

        for (uint256 i = 0; i < slots.length; i++) {
            require(BitMask.get(mask, slots[i]), 'not equipped');
            ids[i] = metadata[hustlerId].slots[slots[i]];
            mask = BitMask.unset(mask, slots[i]);
        }

        metadata[hustlerId].mask = mask;
        swapmeet.safeBatchTransferFrom(address(this), _msgSender(), ids, amounts, '');
    }

    function setMetadata(
        uint256 hustlerId,
        string calldata name,
        bytes4 color,
        bytes4 background,
        bytes4 viewport,
        uint8[4] calldata body,
        bytes2 mask
    ) public onlyHustler(hustlerId) {
        if (BitMask.get(mask, 0)) {
            require(bytes(name).length < 10, 'nl');
            metadata[hustlerId].name = name;
        }

        if (BitMask.get(mask, 1)) {
            metadata[hustlerId].color = color;
        }

        if (BitMask.get(mask, 2)) {
            metadata[hustlerId].background = background;
        }

        if (BitMask.get(mask, 3)) {
            metadata[hustlerId].viewport = viewport;
        }

        for (uint8 i = 0; i < 4; i++) {
            if (BitMask.get(mask, i + 4)) {
                metadata[hustlerId].body[i] = body[i];
            }
        }
    }

    function addBodies(bytes[] calldata _bodies) public onlyOwner {
        for (uint256 i = 0; i < _bodies.length; i++) {
            bodies.push(_bodies[i]);
        }
    }

    function addHeads(bytes[] calldata _heads) public onlyOwner {
        for (uint256 i = 0; i < _heads.length; i++) {
            heads.push(_heads[i]);
        }
    }

    function addBeards(bytes[] calldata _beards) public onlyOwner {
        for (uint256 i = 0; i < _beards.length; i++) {
            beards.push(_beards[i]);
        }
    }

    modifier onlyHustler(uint256 id) {
        require(balanceOf(_msgSender(), id) == 1, Errors.IsHolder);
        _;
    }
}
