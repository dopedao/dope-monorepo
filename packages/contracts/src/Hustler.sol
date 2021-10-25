//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

// ============ Imports ============

import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import { ERC1155 } from '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';
import { ERC1155Receiver } from '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';

import { BitMask } from './BitMask.sol';
import { BodyParts, HustlerMetadata } from './HustlerMetadata.sol';

library Errors {
    string constant IsNotSwapMeet = 'snsm';
    string constant IsHolder = 'snhh';
    string constant EquipSignatureInvalid = 'esi';
    string constant HustlerDoesntOwnItem = 'hdoi';
    string constant ValueNotOne = 'vno';
    string constant NotRightETH = 'ngmi';
    string constant NoMore = 'nomo';
    string constant NotOG = 'notog';
}

/// @title Hustlers
/// @author tarrence llc
/// @notice Hustlers are avatars in the dope wars metaverse.
contract Hustler is ERC1155, ERC1155Receiver, HustlerMetadata, Ownable {
    bytes4 constant equip = bytes4(keccak256('swapmeetequip'));
    address private constant timelock = 0xB57Ab8767CAe33bE61fF15167134861865F7D22C;
    address private constant tarrencellc = 0x75043C4d65f87FBB69b51Fa06F227E8d29731cDD;
    address private constant subimagellc = 0xA776C616c223b31Ccf1513E2CB1b5333730AA239;

    IERC20 immutable paper;

    // First 500 are reserved for OG Hustlers.
    uint256 internal ogs = 0;
    uint256 internal hustlers = 500;

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
        bytes4 color,
        bytes4 background,
        bytes2 options,
        uint8[4] calldata viewbox,
        uint8[4] calldata body,
        bytes2 mask,
        bytes memory data
    ) external {
        uint256 hustlerId = hustlers;
        metadata[hustlerId].name = name;
        metadata[hustlerId].background = background;
        metadata[hustlerId].color = color;

        setMeta(hustlerId, name, color, background, options, viewbox, body, mask);
        mint(data);
        paper.transferFrom(_msgSender(), address(this), swapmeet.cost());
        swapmeet.open(tokenId, address(this), abi.encode(equip, hustlerId));
    }

    function mint(bytes memory data) public {
        uint256 id = hustlers;
        metadata[hustlers].age = block.timestamp;
        hustlers += 1;
        _mint(_msgSender(), id, 1, data);
    }

    function mintOGFromDope(
        uint256 tokenId,
        string calldata name,
        bytes4 color,
        bytes4 background,
        bytes2 options,
        uint8[4] calldata viewbox,
        uint8[4] calldata body,
        bytes2 mask,
        bytes memory data
    ) external payable {
        require(msg.value == 250000000000000000, Errors.NotRightETH);
        require(ogs < 500, Errors.NoMore);

        uint256 id = ogs;
        ogs += 1;

        metadata[id].age = block.timestamp;
        setMeta(id, name, color, background, options, viewbox, body, mask);

        _mint(_msgSender(), id, 1, data);

        paper.transferFrom(_msgSender(), address(this), swapmeet.cost());
        swapmeet.open(tokenId, address(this), abi.encode(equip, id));
    }

    function unequip(uint256 hustlerId, uint8[] calldata slots) public onlyHustler(hustlerId) {
        uint256[] memory ids = new uint256[](slots.length);
        uint256[] memory amounts = new uint256[](slots.length);
        bytes2 mask = metadata[hustlerId].mask;

        for (uint256 i = 0; i < slots.length; i++) {
            require(BitMask.get(mask, slots[i]), 'ne');
            ids[i] = metadata[hustlerId].slots[slots[i]];
            amounts[i] = 1;
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
        bytes2 options,
        uint8[4] calldata viewbox,
        uint8[4] calldata body,
        bytes2 mask
    ) public onlyHustler(hustlerId) {
        setMeta(hustlerId, name, color, background, options, viewbox, body, mask);
    }

    function setMeta(
        uint256 hustlerId,
        string calldata name,
        bytes4 color,
        bytes4 background,
        bytes2 options,
        uint8[4] calldata viewbox,
        uint8[4] calldata body,
        bytes2 mask
    ) internal {
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
            metadata[hustlerId].viewbox = viewbox;
        }

        for (uint8 i = 0; i < 4; i++) {
            if (BitMask.get(mask, i + 4)) {
                require(!(i == BodyParts.BODY && body[i] % 5 == 0) || hustlerId < 500, Errors.NotOG);
                metadata[hustlerId].body[i] = body[i];
            }
        }

        metadata[hustlerId].options = options;
    }

    function addRles(uint8 part, bytes[] calldata _rles) public onlyOwner {
        for (uint256 i = 0; i < _rles.length; i++) {
            rles[part].push(_rles[i]);
        }
    }

    function withdraw() public {
        // First half
        payable(timelock).transfer(address(this).balance / 2);
        // Half of second half (1/4)
        payable(tarrencellc).transfer(address(this).balance / 2);
        // Remainder
        payable(subimagellc).transfer(address(this).balance);
    }

    modifier onlyHustler(uint256 id) {
        require(balanceOf(_msgSender(), id) == 1, Errors.IsHolder);
        _;
    }
}
