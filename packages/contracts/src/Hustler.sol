//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

// ============ Imports ============

import { ERC1155 } from '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';
import { ERC1155Receiver } from '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';

import { ComponentTypes } from './Components.sol';
import { HustlerMetadata } from './HustlerMetadata.sol';

library Errors {
    string constant IsNotSwapMeet = 'msg.sender is not the swap meet contract';
    string constant IsHolder = 'msg.sender is not hustler holder';
    string constant EquipSignatureInvalid = 'equip signature invalid';
    string constant NumHustlerIdMismatch = 'num hustler ids does not match num token ids';
}

/// @title Hustlers
/// @author Tarrence van As
/// @notice Hustlers are avatars in the dope wars metaverse.
contract Hustler is ERC1155, ERC1155Receiver, HustlerMetadata, Ownable {
    bytes4 constant equip = bytes4(keccak256('swapmeetequip'));

    // First 500 are reserved for OG Hustlers.
    uint256 internal curId = 500;

    // No need for a URI since we're doing everything onchain
    constructor(address _owner, address _swapmeet) ERC1155('') HustlerMetadata(_swapmeet) {
        transferOwnership(_owner);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return tokenURI(tokenId);
    }

    /// @notice ERC1155 callback which will add an item to the hustlers inventory.
    function onERC1155Received(
        address,
        address,
        uint256 id,
        uint256 value,
        bytes memory data
    ) public override returns (bytes4) {
        // only supports callback from the SwapMeet contract
        require(msg.sender == address(swapmeet), Errors.IsNotSwapMeet);

        // Callers should encode the equip signature to explicity
        // indicate an encoded hustler id.
        (bytes4 sig, uint256 hustlerId) = abi.decode(data, (bytes4, uint256));
        require(sig == equip, Errors.EquipSignatureInvalid);

        inventories[hustlerId][id] += value;
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) public override returns (bytes4) {
        // only supports callback from the SwapMeet contract
        require(msg.sender == address(swapmeet), Errors.IsNotSwapMeet);

        // Callers should encode the equip signature to explicity
        // indicate an encoded hustler id.
        (bytes4 sig, uint256 hustlerId) = abi.decode(data, (bytes4, uint256));
        require(sig == equip, Errors.EquipSignatureInvalid);

        for (uint256 i = 0; i < ids.length; i++) {
            inventories[hustlerId][ids[i]] += values[i];
        }

        return this.onERC1155BatchReceived.selector;
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

    function mint(address to, bytes memory data) external returns (uint256) {
        uint256 id = curId;
        curId += 1;
        _mint(to, id, 1, data);
        return id;
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) external onlyOwner returns (uint256[] memory) {
        _mintBatch(to, ids, amounts, data);
        return ids;
    }

    function setPalette(uint8 id, string[] memory palette) public onlyOwner {
        palettes[id] = palette;
    }

    function setMetadata(
        uint256 id,
        string calldata name,
        string calldata background,
        uint8[4] calldata body,
        uint8 bmask,
        uint8[] calldata slots,
        uint256[] calldata items
    ) public onlyHolder(id) {
        if (bytes(name).length > 0) {
            metadata[id].name = name;
        }
        if (bytes(background).length > 0) {
            metadata[id].background = background;
        }

        setBody(id, body, bmask);
        setSlots(id, slots, items);
    }

    function setBody(
        uint256 id,
        uint8[4] calldata body,
        uint8 mask
    ) internal {
        for (uint256 i = 0; i < 4; i++) {
            if (uint8(mask & (1 << i)) != 0) {
                metadata[id].body[i] = body[i];
            }
        }
    }

    function setSlots(
        uint256 hustlerId,
        uint8[] calldata slots,
        uint256[] calldata items
    ) internal {
        if (slots.length == 0) {
            return;
        }

        require(items.length == slots.length, 'slots items length mismatch');
        uint256[] memory ids = new uint256[](slots.length);
        uint256[] memory amounts = new uint256[](slots.length);
        for (uint256 i = 0; i < slots.length; i++) {
            if (inventories[hustlerId][items[i]] == 0) {
                ids[i] = items[i];
                amounts[i] = 1;
            }

            metadata[hustlerId].slots[slots[i]] = items[i];
        }

        swapmeet.safeBatchTransferFrom(msg.sender, address(this), ids, amounts, abi.encode(equip, hustlerId));
    }

    function addBody(bytes calldata body) public onlyOwner {
        bodies.push(body);
    }

    function addBodies(bytes[] calldata _bodies) public onlyOwner {
        for (uint256 i = 0; i < _bodies.length; i++) {
            bodies.push(_bodies[i]);
        }
    }

    function addHead(bytes calldata head) public onlyOwner {
        heads.push(head);
    }

    function addHeads(bytes[] calldata _heads) public onlyOwner {
        for (uint256 i = 0; i < _heads.length; i++) {
            heads.push(_heads[i]);
        }
    }

    function addBeard(bytes calldata beard) public onlyOwner {
        beards.push(beard);
    }

    function addBeards(bytes[] calldata _beards) public onlyOwner {
        for (uint256 i = 0; i < _beards.length; i++) {
            beards.push(_beards[i]);
        }
    }

    modifier onlyHolder(uint256 id) {
        require(balanceOf(msg.sender, id) == 1, Errors.IsHolder);
        _;
    }
}
