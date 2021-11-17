//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import { Ownable } from '../lib/openzeppelin-contracts/contracts/access/Ownable.sol';
import { ERC1155Holder } from '../lib/openzeppelin-contracts/contracts/token/ERC1155/utils/ERC1155Holder.sol';

import { iOVM_CrossDomainMessenger } from './interfaces/iOVM_CrossDomainMessenger.sol';
import { ISwapMeet } from './interfaces/ISwapMeet.sol';
import { IHustler } from './interfaces/IHustler.sol';
import { IController } from './interfaces/IController.sol';
import { IComponents } from './interfaces/IComponents.sol';

library Errors {
    string constant NoMore = 'nomo';
}

contract Controller is IController, ERC1155Holder {
    bytes4 constant equip = bytes4(keccak256('swapmeetequip'));

    iOVM_CrossDomainMessenger ovmL2CrossDomainMessenger =
        iOVM_CrossDomainMessenger(0x4200000000000000000000000000000000000007);

    IComponents private components;
    IHustler private hustler;
    ISwapMeet private swapmeet;
    address public initiator;
    address public dao;
    address public maintainer;

    constructor(
        IComponents components_,
        ISwapMeet swapmeet_,
        IHustler hustler_
    ) {
        components = components_;
        swapmeet = swapmeet_;
        hustler = hustler_;
        dao = msg.sender;
        maintainer = msg.sender;
    }

    /** INITIATOR ACTIONS */

    function mintTo(
        uint256 dopeId,
        address to,
        string calldata name,
        bytes4 color,
        bytes4 background,
        bytes2 options,
        uint8[4] calldata viewbox,
        uint8[4] calldata body,
        bytes2 mask,
        bytes memory data
    ) external override onlyInitiator {
        uint256 hustlerId = hustler.mintTo(
            address(this),
            name,
            color,
            background,
            options,
            viewbox,
            body,
            mask,
            'init'
        );
        swapmeet.open(dopeId, address(hustler), abi.encode(equip, hustlerId));
        hustler.safeTransferFrom(address(this), to, hustlerId, 1, data);
    }

    function mintOGTo(
        uint256 dopeId,
        address to,
        string calldata name,
        bytes4 color,
        bytes4 background,
        bytes2 options,
        uint8[4] calldata viewbox,
        uint8[4] calldata body,
        bytes2 mask,
        bytes memory data
    ) external override onlyInitiator {
        uint256 hustlerId = hustler.mintOGTo(
            address(this),
            name,
            color,
            background,
            options,
            viewbox,
            body,
            mask,
            'init'
        );
        swapmeet.open(dopeId, address(hustler), abi.encode(equip, hustlerId));
        hustler.safeTransferFrom(address(this), to, hustlerId, 1, data);
    }

    function open(
        uint256 dopeId,
        address to,
        bytes memory data
    ) external override onlyInitiator {
        swapmeet.open(dopeId, to, data);
    }

    /** MAINTAINER ACTIONS */

    function addAccessory(string calldata component) external onlyMaintainer {
        components.addComponent(0x9, component);
    }

    function addBodyRles(uint8 part, bytes[] calldata _rles) external onlyMaintainer {
        hustler.addRles(part, _rles);
    }

    function setPalette(uint8 id, bytes4[] memory palette) external onlyMaintainer {
        swapmeet.setPalette(id, palette);
    }

    function setItemRle(
        uint256 id,
        bytes memory male,
        bytes memory female
    ) external onlyMaintainer {
        swapmeet.setRle(id, male, female);
    }

    function batchSetItemRle(uint256[] calldata ids, bytes[] calldata rles) external onlyMaintainer {
        swapmeet.batchSetRle(ids, rles);
    }

    /** DAO ACTIONS */

    function mintItem(
        address to,
        uint8[5] memory components_,
        uint8 componentType,
        uint256 amount,
        bytes memory data
    ) external override onlyDAO {
        swapmeet.mint(to, components_, componentType, amount, data);
    }

    function mintItemBatch(
        address to,
        uint8[] memory components_,
        uint8[] memory componentTypes,
        uint256[] memory amounts,
        bytes memory data
    ) external override onlyDAO {
        swapmeet.mintBatch(to, components_, componentTypes, amounts, data);
    }

    function addItemComponent(uint8 componentType, string calldata component) external override onlyDAO {
        components.addComponent(componentType, component);
    }

    function setEnforcer(address enforcer_) external override onlyDAO {
        hustler.setEnforcer(enforcer_);
    }

    function setInitiator(address initiator_) external override onlyDAO {
        initiator = initiator_;
    }

    function setMaintainer(address maintainer_) external override onlyDAO {
        maintainer = maintainer_;
    }

    function setDAO(address dao_) external override onlyDAO {
        dao = dao_;
    }

    function onERC1155Received(
        address operator,
        address,
        uint256,
        uint256,
        bytes memory
    ) public view override returns (bytes4) {
        if (operator != address(this)) {
            return '';
        }

        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] calldata,
        uint256[] calldata,
        bytes calldata
    ) public pure override returns (bytes4) {
        return '';
    }

    /**
     * @dev Throws if called by any account other than the l1 intiator.
     */
    modifier onlyInitiator() {
        require(
            msg.sender == address(ovmL2CrossDomainMessenger) &&
                ovmL2CrossDomainMessenger.xDomainMessageSender() == initiator
        );
        _;
    }

    modifier onlyMaintainer() {
        require(msg.sender == maintainer);
        _;
    }

    modifier onlyDAO() {
        if (msg.sender == address(ovmL2CrossDomainMessenger)) {
            require(ovmL2CrossDomainMessenger.xDomainMessageSender() == dao, 'not l1 dao');
        } else {
            require(msg.sender == dao, 'not l2 dao');
        }
        _;
    }
}
