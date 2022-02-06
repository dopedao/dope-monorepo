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

    function order() internal pure returns (Initiator.OpenSeaOrder memory) {
        address[14] memory addrs = [
            0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b,
            0xCe71065D4017F316EC606Fe4422e11eB2c47c246,
            0xc08c7d598Fb8026a8BBD698eE0d5A0199db880ff,
            0x0000000000000000000000000000000000000000,
            0x8707276DF042E89669d69A177d3DA7dC78bd8723,
            0x0000000000000000000000000000000000000000,
            0x0000000000000000000000000000000000000000,
            0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b,
            0xc08c7d598Fb8026a8BBD698eE0d5A0199db880ff,
            0x0000000000000000000000000000000000000000,
            0x5b3256965e7C3cF26E11FCAf296DfC8807C01073,
            0x8707276DF042E89669d69A177d3DA7dC78bd8723,
            0x0000000000000000000000000000000000000000,
            0x0000000000000000000000000000000000000000
        ];

        uint256[18] memory uints = [
            750,
            0,
            0,
            0,
            250000000000000000,
            0,
            1644079410,
            0,
            35695189824420391154412526479129150876386553869984530461125582879342087636480,
            750,
            0,
            0,
            0,
            250000000000000000,
            0,
            1643959855,
            0,
            50780398416130641293232073185361917700112638313128836448284866070742720842527
        ];

        uint8[8] memory feeMethodsSidesKindsHowToCalls = [
            1,
            0,
            0,
            0,
            1,
            1,
            0,
            0
        ];
        bytes
            memory calldataBuy = hex"23b872dd0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000Ce71065D4017F316EC606Fe4422e11eB2c47c2460000000000000000000000000000000000000000000000000000000000000801";
        bytes
            memory calldataSell = hex"23b872dd000000000000000000000000c08c7d598fb8026a8bbd698ee0d5a0199db880ff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000801";
        bytes
            memory replacementPatternBuy = hex"00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
        bytes
            memory replacementPatternSell = hex"000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000";
        bytes memory staticExtradataBuy = "";
        bytes memory staticExtradataSell = "";
        uint8[2] memory vs = [27, 27];
        bytes32[5] memory rssMetadata = [
            bytes32(
                0x0826170f5cb8ad3c727b00c55ad116060e4c7b109749299956b456033c01265e
            ),
            0x7061bc89552cc84e33d5eac3913942dc7f9cc38b4a79f7e711f5f173547e0aad,
            0x0826170f5cb8ad3c727b00c55ad116060e4c7b109749299956b456033c01265e,
            0x7061bc89552cc84e33d5eac3913942dc7f9cc38b4a79f7e711f5f173547e0aad,
            0x0000000000000000000000000000000000000000000000000000000000000000
        ];

        return
            Initiator.OpenSeaOrder({
                addrs: addrs,
                uints: uints,
                feeMethodsSidesKindsHowToCalls: feeMethodsSidesKindsHowToCalls,
                calldataBuy: calldataBuy,
                calldataSell: calldataSell,
                replacementPatternBuy: replacementPatternBuy,
                replacementPatternSell: replacementPatternSell,
                staticExtradataBuy: staticExtradataBuy,
                staticExtradataSell: staticExtradataSell,
                vs: vs,
                rssMetadata: rssMetadata
            });
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

        vm.prank(from);
        initiator.initiate{value: 50e17}(
            order(),
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
