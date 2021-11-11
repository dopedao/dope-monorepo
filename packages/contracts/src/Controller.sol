//SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import { Ownable } from '../lib/openzeppelin-contracts/contracts/access/Ownable.sol';

import { iOVM_CrossDomainMessenger } from './interfaces/iOVM_CrossDomainMessenger.sol';
import { ISwapMeet } from './interfaces/ISwapMeet.sol';
import { IHustler } from './interfaces/IHustler.sol';
import { IController } from './interfaces/IController.sol';
import { IComponents } from './interfaces/IComponents.sol';

library Errors {
    string constant NoMore = 'nomo';
}

contract Controller is IController {
    bytes4 constant equip = bytes4(keccak256('swapmeetequip'));

    iOVM_CrossDomainMessenger ovmL2CrossDomainMessenger =
        iOVM_CrossDomainMessenger(0x4200000000000000000000000000000000000007);

    IComponents private components;
    IHustler private hustler;
    ISwapMeet private swapmeet;
    address immutable initiator;
    address public dao = 0xB57Ab8767CAe33bE61fF15167134861865F7D22C;
    address public maintainer;

    constructor(
        IComponents components_,
        ISwapMeet swapmeet_,
        IHustler hustler_,
        address initiator_
    ) {
        components = components_;
        swapmeet = swapmeet_;
        hustler = hustler_;
        initiator = initiator_;
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
        uint256 hustlerId = hustler.mintTo(address(this), name, color, background, options, viewbox, body, mask, '');
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
        uint256 hustlerId = hustler.mintOGTo(address(this), name, color, background, options, viewbox, body, mask, '');
        swapmeet.open(dopeId, address(hustler), abi.encode(equip, hustlerId));
        hustler.safeTransferFrom(address(this), to, hustlerId, 1, data);
    }

    function open(uint256 dopeId, address to) external override onlyInitiator {
        swapmeet.open(dopeId, to, '');
    }

    /** MAINTAINER ACTIONS */

    function addAccessory(string calldata component) external onlyMaintainer {
        components.addComponent(0x9, component);
    }

    function setPalette(uint8 id, bytes4[] memory palette) external onlyMaintainer {
        swapmeet.setPalette(id, palette);
    }

    function setRle(
        uint256 id,
        bytes memory male,
        bytes memory female
    ) external onlyMaintainer {
        swapmeet.setRle(id, male, female);
    }

    function batchSetRle(uint256[] calldata ids, bytes[] calldata rles) external onlyMaintainer {
        swapmeet.batchSetRle(ids, rles);
    }

    /** DAO ACTIONS */

    function mint(
        address to,
        uint8[5] memory components_,
        uint8 componentType,
        uint256 amount,
        bytes memory data
    ) external onlyDAO {
        swapmeet.mint(to, components_, componentType, amount, data);
    }

    function mintBatch(
        address to,
        uint8[] memory components_,
        uint8[] memory componentTypes,
        uint256[] memory amounts,
        bytes memory data
    ) external onlyDAO {
        swapmeet.mintBatch(to, components_, componentTypes, amounts, data);
    }

    function addComponent(uint8 componentType, string calldata component) external onlyDAO {
        components.addComponent(componentType, component);
    }

    function addRles(uint8 part, bytes[] calldata _rles) external onlyDAO {
        hustler.addRles(part, _rles);
    }

    function setEnforcer(address enforcer_) external onlyDAO {
        hustler.setEnforcer(enforcer_);
    }

    function setMaintainer(address maintainer_) external onlyDAO {
        maintainer = maintainer_;
    }

    function setDAO(address dao_) external onlyDAO {
        dao = dao_;
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
            require(ovmL2CrossDomainMessenger.xDomainMessageSender() == dao);
        } else {
            require(msg.sender == dao);
        }
        _;
    }
}
