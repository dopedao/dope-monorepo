// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "ds-test/test.sol";
import {Vm} from "forge-std/Vm.sol";

import {Initiator} from "../Initiator.sol";
import {IHustlerActions} from "../interfaces/IInitiator.sol";

contract ContractTest is DSTest {
    Vm private constant vm =
        Vm(address(uint160(uint256(keccak256("hevm cheat code")))));

    Initiator initiator;

    function setUp() public {
        initiator = new Initiator();
    }

    function testPurchase() public {
        // from tx https://etherscan.io/tx/0xbccac322a93184bc46b2be3b972681014fe85cdfff66dcfca83676452add36f3/advanced
        address from = 0x728B87636f8DB404f70cBE4E86c9c5a23cB74783;

        string memory name = "gangsta";
        bytes4 background = hex"000000ff";
        bytes4 color = hex"fafafaff";
        uint8[4] memory body;
        uint8[4] memory viewbox;
        uint8[10] memory order2;

        IHustlerActions.SetMetadata memory meta = IHustlerActions.SetMetadata({
            color: color,
            background: background,
            options: 0x00,
            viewbox: viewbox,
            body: body,
            order: order2,
            mask: 0x00,
            name: name
        });

        //0x23b872dd000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c08c7d598fb8026a8bbd698ee0d5a0199db880ff00000801
        //0x23b872dd0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000Ce71065D4017F316EC606Fe4422e11eB2c47c2460000000000000000000000000000000000000000000000000000000000000801
        //0x23b872dd0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000Ce71065D4017F316EC606Fe4422e11eB2c47c2460000000000000000000000000000000000000000000000000000000000000801
        vm.prank(from);
        initiator.initiate{value: 50e17}(
            Initiator.Order({
                maker: 0xc08c7d598Fb8026a8BBD698eE0d5A0199db880ff,
                vs: 27,
                fee: 750,
                price: 250000000000000000,
                expiration: 0,
                listing: 1643959855,
                salt: 50780398416130641293232073185361917700112638313128836448284866070742720842527,
                calldataBuy: hex"23b872dd0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000Ce71065D4017F316EC606Fe4422e11eB2c47c2460000000000000000000000000000000000000000000000000000000000000801",
                calldataSell: hex"23b872dd000000000000000000000000c08c7d598fb8026a8bbd698ee0d5a0199db880ff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000801",
                rss: [
                    bytes32(
                        0x0826170f5cb8ad3c727b00c55ad116060e4c7b109749299956b456033c01265e
                    ),
                    0x7061bc89552cc84e33d5eac3913942dc7f9cc38b4a79f7e711f5f173547e0aad
                ]
            }),
            2049,
            meta,
            from,
            25e16,
            1e18,
            12500,
            block.timestamp + 15
        );
    }
}
