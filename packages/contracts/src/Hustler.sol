// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

// ============ Imports ============

import '../lib/openzeppelin-contracts/contracts/token/ERC1155/ERC1155.sol';
import '../lib/openzeppelin-contracts/contracts/access/Ownable.sol';
import '../lib/openzeppelin-contracts/contracts/token/ERC1155/utils/ERC1155Holder.sol';

import './BitMask.sol';
import './HustlerMetadata.sol';
import './interfaces/IHustler.sol';

library Errors {
    string constant IsNotSwapMeet = 'snsm';
    string constant IsHolder = 'snhh';
    string constant EquipSignatureInvalid = 'esi';
    string constant ValueNotOne = 'vno';
    string constant NotOG = 'notog';
}

/// @title Hustlers
/// @author tarrence llc
/// @notice Hustlers are avatars in the dope wars metaverse.
contract Hustler is IHustler, ERC1155, ERC1155Receiver, HustlerMetadata, Ownable {
    bytes4 constant equip = bytes4(keccak256('swapmeetequip'));
    IEnforcer public enforcer;

    event AddRles(uint8 part, uint256 len);
    event MetadataUpdate(uint256 id);

    // First 500 are reserved for OG Hustlers.
    uint256 internal ogs = 0;
    uint256 internal hustlers = 500;

    constructor(address _components, address _swapmeet) HustlerMetadata(_components, _swapmeet) {}

    function uri(uint256 tokenId) public view override returns (string memory) {
        return tokenURI(tokenId);
    }

    /// @notice ERC1155 callback which will add an item to the hustlers inventory.
    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes memory data
    ) public override returns (bytes4) {
        // only supports callback from the SwapMeet contract
        require(_msgSender() == address(swapmeet), Errors.IsNotSwapMeet);

        if (address(enforcer) != address(0)) {
            enforcer.onERC1155Received(operator, from, id, value, data);
        }

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

        if (address(enforcer) != address(0)) {
            enforcer.onERC1155BatchReceived(operator, from, ids, values, data);
        }

        // Callers should encode the equip signature to explicity
        // indicate an encoded hustler id.
        (bytes4 sig, uint256 hustlerId) = abi.decode(data, (bytes4, uint256));
        require(sig == equip, Errors.EquipSignatureInvalid);

        require(balanceOf(from, hustlerId) == 1, Errors.IsHolder);

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
        override(IERC165, ERC1155, ERC1155Receiver)
        returns (bool)
    {
        return ERC1155.supportsInterface(interfaceId) || ERC1155Receiver.supportsInterface(interfaceId);
    }

    function mintTo(
        address to,
        SetMetadata calldata m,
        bytes calldata data
    ) external override returns (uint256) {
        uint256 hustlerId = hustlers;
        setMeta(hustlerId, m.name, m.color, m.background, m.options, m.viewbox, m.body, m.order, m.mask);
        mintTo(to, data);
        return hustlerId;
    }

    function mintTo(address to, bytes calldata data) public {
        uint256 id = hustlers;
        metadata[hustlers].age = block.timestamp;
        hustlers += 1;
        _mint(to, id, 1, data);
    }

    function mintOGTo(
        address to,
        SetMetadata calldata m,
        bytes calldata data
    ) external override onlyOwner returns (uint256) {
        require(ogs < 500, 'to big id');
        uint256 hustlerId = ogs;
        ogs += 1;

        metadata[hustlerId].age = block.timestamp;
        setMeta(hustlerId, m.name, m.color, m.background, m.options, m.viewbox, m.body, m.order, m.mask);
        _mint(to, hustlerId, 1, data);

        return hustlerId;
    }

    function unequip(uint256 hustlerId, uint8[] calldata slots) public {
        require(balanceOf(_msgSender(), hustlerId) == 1 || _msgSender() == address(enforcer), Errors.IsHolder);

        if (address(enforcer) != address(0)) {
            enforcer.onUnequip(hustlerId, slots);
        }

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
        SetMetadata calldata m
    ) public onlyHustler(hustlerId) {
        setMeta(hustlerId, m.name, m.color, m.background, m.options, m.viewbox, m.body, m.order, m.mask);
    }

    function setMeta(
        uint256 hustlerId,
        string calldata name,
        bytes4 color,
        bytes4 background,
        bytes2 options,
        uint8[4] calldata viewbox,
        uint8[4] calldata body,
        uint8[10] calldata order,
        bytes2 mask
    ) internal {
        if (BitMask.get(mask, 0)) {
            require(bytes(name).length < 21, 'nl');
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
                require(!(i == BodyParts.BODY && (body[i] + 1) % 6 == 0) || hustlerId < 500, Errors.NotOG);
                metadata[hustlerId].body[i] = body[i];
            }
        }

        metadata[hustlerId].options = options;
        
        if (BitMask.get(mask, 8)) {
            metadata[hustlerId].order = order;
        }

        emit MetadataUpdate(hustlerId);
    }

    function addRles(uint8 part, bytes[] calldata _rles) external override onlyOwner {
        for (uint256 i = 0; i < _rles.length; i++) {
            rles[part].push(_rles[i]);
        }

        emit AddRles(part, _rles.length);
    }

    function setEnforcer(address enforcer_) external override onlyOwner {
        enforcer = IEnforcer(enforcer_);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override {
        if (address(enforcer) != address(0)) {
            bool reset = enforcer.beforeTokenTransfer(operator, from, to, ids, amounts, data);

            if (!reset) {
                return;
            }
        }

        for (uint256 i = 0; i < ids.length; i++) {
            if (ids[i] >= 500) {
                metadata[ids[i]].age = block.timestamp;
            }
        }
    }

    modifier onlyHustler(uint256 id) {
        require(balanceOf(_msgSender(), id) == 1, Errors.IsHolder);
        _;
    }
}
