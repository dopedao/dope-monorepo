//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

// ============ Imports ============

import { ERC1155 } from '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';
import { ERC1155Receiver } from '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';

import { BitMask } from './BitMask.sol';
import { ComponentTypes } from './Components.sol';
import { HustlerMetadata } from './HustlerMetadata.sol';

library Errors {
    string constant IsNotSwapMeet = 'msg.sender is not the swap meet contract';
    string constant IsHolder = 'msg.sender is not hustler holder';
    string constant EquipSignatureInvalid = 'equip signature invalid';
    string constant NumHustlerIdMismatch = 'num hustler ids does not match num token ids';
    string constant HustlerDoesntOwnItem = 'hustlder doesnt own item';
}

/// @title Hustlers
/// @author Tarrence van As
/// @notice Hustlers are avatars in the dope wars metaverse.
contract Hustler is ERC1155, ERC1155Receiver, HustlerMetadata, Ownable {
    bytes4 constant equip = bytes4(keccak256('swapmeetequip'));

    // First 500 are reserved for OG Hustlers.
    uint256 internal curId = 500;

    struct Attributes {
        string name;
        string color;
        string background;
    }

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
        address from,
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
        require(balanceOf(from, hustlerId) == 1, 'not hustler owner');

        uint8 slot = slot(id);
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
        require(msg.sender == address(swapmeet), Errors.IsNotSwapMeet);

        // Callers should encode the equip signature to explicity
        // indicate an encoded hustler id.
        (bytes4 sig, uint256 hustlerId) = abi.decode(data, (bytes4, uint256));
        require(sig == equip, Errors.EquipSignatureInvalid);

        // If this transfer is initiated from the hustler contract
        // and it a new mint, then it is a mint from dope call.
        require(operator == address(this) || balanceOf(from, hustlerId) == 1, 'bla');

        Metadata memory meta = metadata[hustlerId];
        uint256[] memory unequipIds = new uint256[](ids.length);
        uint256[] memory unequipValues = new uint256[](ids.length);

        uint256 j = 0;
        for (uint8 i = 0; i < ids.length; i++) {
            require(values[i] == 1, 'more than one');
            uint8 slot = slot(ids[i]);

            if (BitMask.get(meta.mask, slot)) {
                unequipIds[j] = ids[j];
                unequipValues[j] = values[i];
                j++;
            }

            metadata[hustlerId].mask = BitMask.set(meta.mask, slot);
            metadata[hustlerId].slots[slot] = ids[i];
        }

        uint256 diff = ids.length - j;
        assembly {
            // Shrink slice to fit returned ids.
            mstore(unequipIds, sub(mload(unequipIds), diff))
            mstore(unequipValues, sub(mload(unequipValues), diff))
        }

        if (unequipIds.length > 0) {
            swapmeet.safeBatchTransferFrom(address(this), msg.sender, unequipIds, unequipValues, '');
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

    function mintFromDope(
        uint256 tokenId,
        string calldata name,
        string calldata background,
        string calldata color,
        bytes memory data
    ) external returns (uint256) {
        uint256 hustlerId = mint(data);
        metadata[hustlerId].name = name;
        metadata[hustlerId].background = background;
        metadata[hustlerId].color = color;
        swapmeet.open(tokenId, address(this), abi.encode(equip, hustlerId));
        return hustlerId;
    }

    function mint(bytes memory data) public returns (uint256) {
        uint256 id = curId;
        curId += 1;
        _mint(msg.sender, id, 1, data);
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

    // function withdraw(
    //     uint256 hustlerId,
    //     uint256 tokenId,
    //     uint256 amount
    // ) public onlyHustler(hustlerId) {
    //     require(inventories[hustlerId][tokenId] >= amount, Errors.HustlerDoesntOwnItem);
    //     uint8 slot = slot(tokenId);
    //     if (metadata[hustlerId].slots[slot] == tokenId) {
    //         metadata[hustlerId].slots[slot] = 0;
    //     }

    //     inventories[hustlerId][tokenId] -= amount;
    //     swapmeet.safeTransferFrom(address(this), msg.sender, tokenId, amount, '');
    // }

    function setMetadata(
        uint256 hustlerId,
        Attributes calldata attributes,
        uint8[4] calldata body,
        uint8 bmask
    ) public onlyHustler(hustlerId) {
        setAttributes(hustlerId, attributes);
        setBody(hustlerId, body, bmask);
    }

    function setAttributes(uint256 id, Attributes calldata attributes) internal {
        if (bytes(attributes.name).length > 0) {
            metadata[id].name = attributes.name;
        }
        if (bytes(attributes.color).length > 0) {
            metadata[id].color = attributes.color;
        }
        if (bytes(attributes.background).length > 0) {
            metadata[id].background = attributes.background;
        }
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
        require(balanceOf(msg.sender, id) == 1, Errors.IsHolder);
        _;
    }
}
