// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import 'ds-test/test.sol';

import './Hevm.sol';
import './iOVM_FakeCrossDomainMessenger.sol';

import { iOVM_CrossDomainMessenger } from '../../interfaces/iOVM_CrossDomainMessenger.sol';
import { IComponents } from '../../interfaces/IComponents.sol';
import { IHustler, IHustlerActions } from '../../interfaces/IHustler.sol';
import { ISwapMeet } from '../../interfaces/ISwapMeet.sol';
import { IController } from '../../interfaces/IController.sol';
import { Controller } from '../../Controller.sol';

import '@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol';
import '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';

contract ControllerMaintainer {
    Controller internal controller;

    constructor(Controller controller_) {
        controller = controller_;
    }

    function addAccessory(string calldata component) external {
        controller.addAccessory(component);
    }

    function addBodyRles(uint8 part, bytes[] calldata _rles) external {
        controller.addBodyRles(part, _rles);
    }

    function setPalette(uint8 id, bytes4[] memory palette) external {
        controller.setPalette(id, palette);
    }

    function setItemRle(
        uint256 id,
        bytes memory male,
        bytes memory female
    ) external {
        controller.setItemRle(id, male, female);
    }

    function batchSetItemRle(uint256[] calldata ids, bytes[] calldata rles) external {
        controller.batchSetItemRle(ids, rles);
    }
}

contract ControllerL1DAO {
    address internal controller;
    iOVM_CrossDomainMessenger internal cdm;

    constructor(address controller_, iOVM_CrossDomainMessenger cdm_) {
        controller = controller_;
        cdm = cdm_;
    }

    function mintItem(
        address to,
        uint8[5] memory components_,
        uint8 componentType,
        uint256 amount,
        bytes memory data
    ) external {
        bytes memory message = abi.encodeWithSelector(
            IController.mintItem.selector,
            to,
            components_,
            componentType,
            amount,
            data
        );
        cdm.sendMessage(controller, message, 1000000);
    }

    function mintItemBatch(
        address to,
        uint8[] memory components_,
        uint8[] memory componentTypes,
        uint256[] memory amounts,
        bytes memory data
    ) external {
        bytes memory message = abi.encodeWithSelector(
            IController.mintItemBatch.selector,
            to,
            components_,
            componentTypes,
            amounts,
            data
        );
        cdm.sendMessage(controller, message, 1000000);
    }

    function addItemComponent(uint8 componentType, string calldata component) external {
        bytes memory message = abi.encodeWithSelector(IController.addItemComponent.selector, componentType, component);
        cdm.sendMessage(controller, message, 1000000);
    }

    function setEnforcer(address enforcer_) external {
        bytes memory message = abi.encodeWithSelector(IController.setEnforcer.selector, enforcer_);
        cdm.sendMessage(controller, message, 1000000);
    }

    function setInitiator(address initiator_) external {
        bytes memory message = abi.encodeWithSelector(IController.setInitiator.selector, initiator_);
        cdm.sendMessage(controller, message, 1000000);
    }

    function setMaintainer(address maintainer_) external {
        bytes memory message = abi.encodeWithSelector(IController.setMaintainer.selector, maintainer_);
        cdm.sendMessage(controller, message, 1000000);
    }

    function setDAO(address dao_) external {
        bytes memory message = abi.encodeWithSelector(IController.setDAO.selector, dao_);
        cdm.sendMessage(controller, message, 1000000);
    }
}

contract ControllerL2DAO {
    IController internal controller;

    constructor(IController controller_) {
        controller = controller_;
    }

    function mintItem(
        address to,
        uint8[5] memory components_,
        uint8 componentType,
        uint256 amount,
        bytes memory data
    ) external {
        controller.mintItem(to, components_, componentType, amount, data);
    }

    function mintItemBatch(
        address to,
        uint8[] memory components_,
        uint8[] memory componentTypes,
        uint256[] memory amounts,
        bytes memory data
    ) external {
        controller.mintItemBatch(to, components_, componentTypes, amounts, data);
    }

    function addItemComponent(uint8 componentType, string calldata component) external {
        controller.addItemComponent(componentType, component);
    }

    function setEnforcer(address enforcer_) external {
        controller.setEnforcer(enforcer_);
    }

    function setInitiator(address initiator_) external {
        controller.setInitiator(initiator_);
    }

    function setMaintainer(address maintainer_) external {
        controller.setMaintainer(maintainer_);
    }

    function setDAO(address dao_) external {
        controller.setDAO(dao_);
    }
}

contract ControllerInitiator is ERC721Holder, ERC1155Holder {
    address internal controller;
    iOVM_CrossDomainMessenger internal cdm;

    constructor(address controller_, iOVM_CrossDomainMessenger cdm_) {
        controller = controller_;
        cdm = cdm_;
    }

    function mintTo(
        uint256 id,
        address to,
        string calldata name,
        bytes4 color,
        bytes4 background,
        bytes2 options,
        uint8[4] calldata viewbox,
        uint8[4] calldata body,
        uint8[10] calldata order,
        bytes2 mask,
        bytes memory data
    ) external {
        IHustlerActions.SetMetadata memory metadata = IHustlerActions.SetMetadata({
            name: name,
            color: color,
            background: background,
            options: options,
            viewbox: viewbox,
            body: body,
            order: order,
            mask: mask
        });
        bytes memory message = abi.encodeWithSelector(
            IController.mintTo.selector,
            id,
            to,
            metadata,
            data
        );
        cdm.sendMessage(controller, message, 1000000);
    }

    function mintOGTo(
        uint256 id,
        address to,
        string calldata name,
        bytes4 color,
        bytes4 background,
        bytes2 options,
        uint8[4] calldata viewbox,
        uint8[4] calldata body,
        uint8[10] calldata order,
        bytes2 mask,
        bytes memory data
    ) external {
        IHustlerActions.SetMetadata memory metadata = IHustlerActions.SetMetadata({
            name: name,
            color: color,
            background: background,
            options: options,
            viewbox: viewbox,
            body: body,
            order: order,
            mask: mask
        });
        bytes memory message = abi.encodeWithSelector(
            IController.mintOGTo.selector,
            id,
            to,
            metadata,
            data
        );
        cdm.sendMessage(controller, message, 1000000);
    }

    function open(
        uint256 id,
        address to,
        bytes memory data
    ) external {
        bytes memory message = abi.encodeWithSelector(IController.open.selector, id, to, data);
        cdm.sendMessage(controller, message, 1000000);
    }
}

contract FakeComponents is IComponents {
    function addComponent(uint8 componentType, string calldata component) external override returns (uint8) {
        return 1;
    }
}

contract FakeHustler is ERC1155, IHustler {
    function mintOGTo(
        address to,
        IHustler.SetMetadata calldata m,
        bytes memory data
    ) external override returns (uint256) {
        _mint(to, 69, 1, data);
        return 69;
    }

    function mintTo(
        address to,
        IHustler.SetMetadata calldata m,
        bytes memory data
    ) external override returns (uint256) {
        _mint(to, 420, 1, data);
        return 420;
    }

    function setEnforcer(address enforcer_) external override {}

    function addRles(uint8 part, bytes[] calldata _rles) external override {}
}

contract FakeSwapMeet is ISwapMeet, ERC1155 {
    function fullname(uint256 id) external view override returns (string memory n) {}

    function tokenRle(uint256 id, uint8 gender) external view override returns (bytes memory) {}

    function params(uint256 id)
        external
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
    {}

    function open(
        uint256 id,
        address to,
        bytes memory data
    ) external override {}

    function mint(
        address to,
        uint8[5] memory components,
        uint8 componentType,
        uint256 amount,
        bytes memory data
    ) external override returns (uint256) {}

    function mintBatch(
        address to,
        uint8[] memory components,
        uint8[] memory componentTypes,
        uint256[] memory amounts,
        bytes memory data
    ) external override returns (uint256[] memory) {}

    function setPalette(uint8 id, bytes4[] memory palette) external override {}

    function palette(uint8) external view override returns (bytes4[] memory) {}

    function setRle(
        uint256 id,
        bytes memory male,
        bytes memory female
    ) external override {}

    function batchSetRle(uint256[] calldata ids, bytes[] calldata rles) external override {}
}

contract ControllerTester is Controller {
    constructor(
        IComponents components_,
        ISwapMeet swapmeet_,
        IHustler hustler_,
        address dao_,
        address cdm_
    ) Controller(components_, swapmeet_, hustler_) {
        ovmL2CrossDomainMessenger = iOVM_CrossDomainMessenger(cdm_);
        dao = dao_;
    }
}

contract ControllerTest is DSTest {
    Hevm internal constant hevm = Hevm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);
    iOVM_FakeCrossDomainMessenger cdm = new iOVM_FakeCrossDomainMessenger();

    // contracts
    IComponents private components;
    ISwapMeet internal swapmeet;
    IHustler private hustler;
    ControllerTester internal controller;

    // users
    ControllerMaintainer internal maintainer;
    ControllerL1DAO internal daoL1;
    ControllerL2DAO internal daoL2;
    ControllerInitiator internal initiator;

    function setUp() public virtual {
        components = IComponents(address(new FakeComponents()));
        hustler = IHustler(address(new FakeHustler()));
        swapmeet = ISwapMeet(address(new FakeSwapMeet()));

        controller = new ControllerTester(components, swapmeet, hustler, address(this), address(cdm));

        daoL1 = new ControllerL1DAO(address(controller), cdm);
        daoL2 = new ControllerL2DAO(controller);
        initiator = new ControllerInitiator(address(controller), cdm);
        maintainer = new ControllerMaintainer(controller);

        controller.setInitiator(address(initiator));
        controller.setMaintainer(address(maintainer));
        controller.setDAO(address(daoL2));
    }
}
