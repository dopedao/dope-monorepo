// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

import {DSTest} from "ds-test/test.sol";
import {Vm} from "forge-std/Vm.sol";
import {MockERC20} from "solmate/test/utils/mocks/MockERC20.sol";
import {MockERC1155} from "solmate/test/utils/mocks/MockERC1155.sol";
import {IERC20} from "openzeppelin-contracts/token/ERC20/IERC20.sol";

import {IMaintainer} from "../interfaces/IMaintainer.sol";
import {TokenId} from "../utils/TokenId.sol";
import {Hongbao} from "../Hongbao.sol";

contract FakeMaintainer {
    MockERC1155 internal swapmeet = new MockERC1155();

    function mintAccessory(
        address to,
        uint8[5] memory components,
        uint256 amount,
        bytes memory data
    ) external {
        uint256 id = TokenId.toId(components, 0x9);
        swapmeet.mint(to, id, amount, data);
    }
}

contract ContractTest is DSTest {
    Vm internal vm = Vm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);
    MockERC20 paper = MockERC20(0x00F932F0FE257456b32dedA4758922E56A4F4b42);
    MockERC1155 swapmeet = new MockERC1155();
    address alice = 0x016C8780e5ccB32E5CAA342a926794cE64d9C364; // can claim 5
    address bob = 0x185a4dc360CE69bDCceE33b3784B0282f7961aea; // can claim 10
    address charlie = vm.addr(1); // can claim none

    Hongbao hongbao;

    function setUp() public {
        MockERC20 paper_ = new MockERC20("Paper", "paper", 18);
        vm.etch(
            0x00F932F0FE257456b32dedA4758922E56A4F4b42,
            address(paper_).code
        );

        paper.mint(alice, 1e28);

        FakeMaintainer maintainer = new FakeMaintainer();
        vm.etch(
            0xb949A2648cf9209AAa1EeA5DBc65B7AAAEdC78dc,
            address(maintainer).code
        );

        vm.store(
            0xb949A2648cf9209AAa1EeA5DBc65B7AAAEdC78dc,
            bytes32(0),
            bytes32(uint256(uint160(address(swapmeet))))
        );

        hongbao = new Hongbao(
            hex"a25e638f7339b4d85c818aa7541dd818040e35aebdb605f6edaf450270f99cc8"
        );

        vm.deal(alice, 1e22);
    }

    function testMintShouldGiveBase() public {
        vm.startPrank(alice);
        paper.approve(address(hongbao), type(uint256).max);
        hongbao.mint();

        uint256 want = TokenId.toId([1, 10, 65, 5, 0], 0x9);
        assertEq(swapmeet.balanceOf(alice, want), 1);
        assertEq(paper.balanceOf(alice), 1e28 - 5000e18);
        assertEq(paper.balanceOf(address(hongbao)), 5000e18);
    }

    function testMintShouldGiveZodiacAndBigTiger() public {
        vm.startPrank(alice);
        paper.approve(address(hongbao), type(uint256).max);

        vm.roll(0); // rolls 117
        hongbao.mint{value: 783e16}();
        uint256 want = TokenId.toId([1, 10, 6, 5, 0], 0x9);
        assertEq(swapmeet.balanceOf(alice, want), 1);

        want = TokenId.toId([1, 10, 65, 10, 0], 0x9);
        assertEq(swapmeet.balanceOf(alice, want), 1);
        assertEq(paper.balanceOf(alice), 1e28 - 5000e18);
        assertEq(paper.balanceOf(address(hongbao)), 5000e18);
    }

    function testMintShouldGiveZodiacAndNotoriousTiger() public {
        vm.startPrank(alice);
        paper.approve(address(hongbao), type(uint256).max);

        vm.roll(0); // rolls 117
        hongbao.mint{value: 878e16}();
        uint256 want = TokenId.toId([1, 10, 20, 5, 1], 0x9);
        assertEq(swapmeet.balanceOf(alice, want), 1);

        want = TokenId.toId([1, 10, 65, 10, 0], 0x9);
        assertEq(swapmeet.balanceOf(alice, want), 1);
        assertEq(paper.balanceOf(alice), 1e28 - 5000e18);
        assertEq(paper.balanceOf(address(hongbao)), 5000e18);
    }

    function testClaim() public {}
}
