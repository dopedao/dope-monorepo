// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import './utils/ControllerSetup.sol';

contract Initiator is ControllerTest {
    function testInitiatorCanMintTo() public {
        string memory name = 'gangsta';
        bytes4 background = hex'000000ff';
        bytes4 color = hex'fafafaff';
        uint8[4] memory body;
        uint8[4] memory viewbox;
        uint8[10] memory order;

        initiator.mintTo(1, address(initiator), name, color, background, hex'', viewbox, body, order, hex'', '');
    }

    function testFailNonInitiatorCanMintTo() public {
        daoL2.setInitiator(address(0));
        testInitiatorCanMintTo();
    }

    function testInitiatorCanMintOGTo() public {
        string memory name = 'gangsta';
        bytes4 background = hex'000000ff';
        bytes4 color = hex'fafafaff';
        uint8[4] memory body;
        uint8[4] memory viewbox;
        uint8[10] memory order;

        initiator.mintOGTo(420, address(initiator), name, color, background, hex'', viewbox, body, order, hex'', '');
    }

    function testFailNonInitiatorCanMintOGTo() public {
        daoL2.setInitiator(address(0));
        testInitiatorCanMintOGTo();
    }

    function testInitiatorCanOpen() public {
        initiator.open(420, address(initiator));
    }

    function testFailNonInitiatorCanOpen() public {
        daoL2.setInitiator(address(0));
        testInitiatorCanOpen();
    }
}

contract L1DAO is ControllerTest {
    function setUp() public override {
        super.setUp();
        daoL2.setDAO(address(daoL1));
    }

    function testDAOCanMintTo() public {
        uint8[5] memory components;
        daoL1.mintItem(address(initiator), components, 0, 1, '');
    }

    function testFailNoneDAOCanMintTo() public {
        daoL1.setDAO(address(0));
        testDAOCanMintTo();
    }

    function testDAOCanBatchMintTo() public {
        uint8[] memory components;
        uint8[] memory types;
        uint256[] memory amounts;
        daoL1.mintItemBatch(address(initiator), components, types, amounts, '');
    }

    function testFailNoneDAOCanBatchMintTo() public {
        daoL1.setDAO(address(0));
        testDAOCanBatchMintTo();
    }

    function testDAOCanAddItemComponent() public {
        daoL1.addItemComponent(0, 'hat');
    }

    function testFailNoneDAOCanAddItemComponent() public {
        daoL1.setDAO(address(0));
        testDAOCanAddItemComponent();
    }

    function testDAOCanSetEnforcer() public {
        daoL1.setEnforcer(address(0));
    }

    function testFailNoneDAOCanSetEnforcer() public {
        daoL1.setDAO(address(0));
        testDAOCanSetEnforcer();
    }

    function testDAOCanSetMaintainer() public {
        daoL1.setMaintainer(address(0));
    }

    function testFailNoneDAOCanSetMaintainer() public {
        daoL1.setDAO(address(0));
        testDAOCanSetMaintainer();
    }
}

contract L2DAO is ControllerTest {
    function testDAOCanMintTo() public {
        uint8[5] memory components;
        daoL2.mintItem(address(initiator), components, 0, 1, '');
    }

    function testFailNoneDAOCanMintTo() public {
        daoL2.setDAO(address(0));
        testDAOCanMintTo();
    }

    function testDAOCanBatchMintTo() public {
        uint8[] memory components;
        uint8[] memory types;
        uint256[] memory amounts;
        daoL2.mintItemBatch(address(initiator), components, types, amounts, '');
    }

    function testFailNoneDAOCanBatchMintTo() public {
        daoL2.setDAO(address(0));
        testDAOCanBatchMintTo();
    }

    function testDAOCanAddItemComponent() public {
        daoL2.addItemComponent(0, 'hat');
    }

    function testFailNoneDAOCanAddItemComponent() public {
        daoL2.setDAO(address(0));
        testDAOCanAddItemComponent();
    }

    function testDAOCanSetEnforcer() public {
        daoL2.setEnforcer(address(0));
    }

    function testFailNoneDAOCanSetEnforcer() public {
        daoL2.setDAO(address(0));
        testDAOCanSetEnforcer();
    }

    function testDAOCanSetMaintainer() public {
        daoL2.setMaintainer(address(0));
    }

    function testFailNoneDAOCanSetMaintainer() public {
        daoL2.setDAO(address(0));
        testDAOCanSetMaintainer();
    }
}

contract Maintainer is ControllerTest {
    function testMaintainerCanAddAccessory() public {
        maintainer.addAccessory('flower');
    }

    function testFailNonMaintainerCanAddAccessory() public {
        daoL2.setMaintainer(address(0));
        testMaintainerCanAddAccessory();
    }

    function testMaintainerCanAddBodyRles() public {
        bytes[] memory rles;
        maintainer.addBodyRles(1, rles);
    }

    function testFailNonMaintainerCanAddBodyRles() public {
        daoL2.setMaintainer(address(0));
        testMaintainerCanAddBodyRles();
    }

    function testMaintainerCanSetPalette() public {
        bytes4[] memory palette;
        maintainer.setPalette(1, palette);
    }

    function testFailNonMaintainerCanSetPalette() public {
        daoL2.setMaintainer(address(0));
        testMaintainerCanSetPalette();
    }

    function testMaintainerCanSetItemRle() public {
        bytes memory rle;
        maintainer.setItemRle(1, rle, rle);
    }

    function testFailNonMaintainerCanSetItemRle() public {
        daoL2.setMaintainer(address(0));
        testMaintainerCanSetItemRle();
    }

    function testMaintainerCanBatchSetItemRle() public {
        uint256[] memory ids;
        bytes[] memory rles;
        maintainer.batchSetItemRle(ids, rles);
    }

    function testFailNonMaintainerCanBatchSetItemRle() public {
        daoL2.setMaintainer(address(0));
        testMaintainerCanBatchSetItemRle();
    }
}
