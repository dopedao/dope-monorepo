// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import './utils/InitiatorSetup.sol';

contract Owner is InitiatorTest {
    function testCanSetRelease() public {
        uint256 release = 420;
        owner.setRelease(release);
        assertEq(initiator.release(), release);
    }
}

contract UserBeforeRelease is InitiatorTest {
    function testFailMintFromDopeTo() public {
        user.mintFromDopeTo(1, address(initiator), name, color, background, hex'', viewbox, body, hex'', '');
    }

    function testFailMintOGFromDopeTo() public {
        user.mintOGFromDopeTo(1, address(initiator), name, color, background, hex'', viewbox, body, hex'', '');
    }

    function testFailOpen() public {
        user.open(1, address(initiator), '');
    }
}

contract UserAfterRelease is InitiatorTest {
    function setUp() public override {
        super.setUp();

        uint256 release = 420;
        owner.setRelease(release);
        hevm.warp(release + 1);
    }

    function testFailMintFromDopeToWithNoPaperApproval() public {
        user.mintFromDopeTo(1, address(initiator), name, color, background, hex'', viewbox, body, hex'', '');
    }

    function testFailMintOGFromDopeToWithNoPaperApproval() public {
        user.mintOGFromDopeTo{ value: 250000000000000000 }(
            1,
            address(initiator),
            name,
            color,
            background,
            hex'',
            viewbox,
            body,
            hex'',
            ''
        );
    }

    function testFailOpenWithNoPaperApproval() public {
        user.open(1, address(initiator), '');
    }

    function testMintFromDopeTo() public {
        user.approvePaper(address(initiator), 1e25);
        user.mintFromDopeTo(1, address(initiator), name, color, background, hex'', viewbox, body, hex'', '');
    }

    function testMintOGFromDopeTo() public {
        user.approvePaper(address(initiator), 1e25);
        user.mintOGFromDopeTo{ value: 250000000000000000 }(
            1,
            address(initiator),
            name,
            color,
            background,
            hex'',
            viewbox,
            body,
            hex'',
            ''
        );
    }

    function testFailMintOGFromDopeWithLessEth() public {
        user.approvePaper(address(initiator), 1e25);
        user.mintOGFromDopeTo{ value: 250000000000000000 - 1 }(
            1,
            address(initiator),
            name,
            color,
            background,
            hex'',
            viewbox,
            body,
            hex'',
            ''
        );
    }

    function testFailMintOGFromDopeWithMoreEth() public {
        user.approvePaper(address(initiator), 1e25);
        user.mintOGFromDopeTo{ value: 250000000000000000 + 1 }(
            1,
            address(initiator),
            name,
            color,
            background,
            hex'',
            viewbox,
            body,
            hex'',
            ''
        );
    }

    function testOpen() public {
        user.approvePaper(address(initiator), 1e25);
        user.open(1, address(initiator), '');
    }

    function testFailMintFromDopeToTwice() public {
        testMintFromDopeTo();
        testMintFromDopeTo();
    }

    function testFailMintOGFromDopeToTwice() public {
        testMintOGFromDopeTo();
        testMintOGFromDopeTo();
    }

    function testFailOpenTwice() public {
        testOpen();
        testOpen();
    }

    function testFailMintFromDopeToWhenNotOwner() public {
        user.approvePaper(address(initiator), 1e25);
        user.mintFromDopeTo(2, address(initiator), name, color, background, hex'', viewbox, body, hex'', '');
    }

    function testFailMintOGFromDopeToWhenNotOwner() public {
        user.approvePaper(address(initiator), 1e25);
        user.mintOGFromDopeTo{ value: 250000000000000000 }(
            2,
            address(initiator),
            name,
            color,
            background,
            hex'',
            viewbox,
            body,
            hex'',
            ''
        );
    }

    function testFailOpenWhenNotOwner() public {
        user.approvePaper(address(initiator), 1e25);
        user.open(2, address(initiator), '');
    }
}
