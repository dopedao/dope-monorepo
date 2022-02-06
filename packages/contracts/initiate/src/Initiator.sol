// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {IWyvernExchange} from "./interfaces/IWyvernExchange.sol";
import {IInitiator, IHustlerActions} from "./interfaces/IInitiator.sol";
import {ISwapRouter} from "./interfaces/ISwapRouter.sol";
import {IQuoter} from "./interfaces/IQuoter.sol";

interface ERC721 {
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
}

interface ERC20 {
    function approve(address spender, uint256 amount) external returns (bool);

    function balanceOf(address account) external returns (uint256);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);
}

contract Initiator {
    ISwapRouter private constant uniswapRouter =
        ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
    IQuoter private constant quoter =
        IQuoter(0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6);

    IInitiator private constant initiator =
        IInitiator(0x7aa8e897d712CFB9C7cb6B37634A1C4d21181c8B);
    IWyvernExchange private constant wyvern =
        IWyvernExchange(0x7Be8076f4EA4A4AD08075C2508e481d6C946D12b);

    ERC721 private constant DOPE =
        ERC721(0x8707276DF042E89669d69A177d3DA7dC78bd8723);
    address private immutable WETH9 =
        0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    ERC20 private immutable PAPER =
        ERC20(0x7aE1D57b58fA6411F32948314BadD83583eE0e8C);
    uint24 private immutable fee = 10000;

    struct OpenSeaOrder {
        address[14] addrs;
        uint256[18] uints;
        uint8[8] feeMethodsSidesKindsHowToCalls;
        bytes calldataBuy;
        bytes calldataSell;
        bytes replacementPatternBuy;
        bytes replacementPatternSell;
        bytes staticExtradataBuy;
        bytes staticExtradataSell;
        uint8[2] vs;
        bytes32[5] rssMetadata;
    }

    constructor() {
        PAPER.approve(address(initiator), type(uint256).max);
    }

    function buy(uint256 openseaEth, OpenSeaOrder memory order) internal {
        wyvern.atomicMatch_{value: openseaEth}(
            order.addrs,
            order.uints,
            order.feeMethodsSidesKindsHowToCalls,
            order.calldataBuy,
            order.calldataSell,
            order.replacementPatternBuy,
            order.replacementPatternSell,
            order.staticExtradataBuy,
            order.staticExtradataSell,
            order.vs,
            order.rssMetadata
        );
    }

    function initiate(
        OpenSeaOrder memory order,
        uint256 id,
        IHustlerActions.SetMetadata calldata meta,
        address to,
        uint256 openseaEth,
        uint256 paperEth,
        uint256 paperOut,
        uint256 deadline
    ) external payable {
        buy(openseaEth, order);
        swap(paperEth, paperOut, deadline);
        initiator.mintFromDopeTo(id, to, meta, "", 1e6 + 1);
        DOPE.safeTransferFrom(address(this), msg.sender, id);
        PAPER.transfer(msg.sender, PAPER.balanceOf(address(this)));

        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "refund failed");
    }

    function swap(
        uint256 eth,
        uint256 out,
        uint256 deadline
    ) internal {
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams(
                WETH9,
                address(PAPER),
                fee,
                address(this),
                deadline,
                eth,
                out,
                0
            );

        uniswapRouter.exactInputSingle{value: eth}(params);
        uniswapRouter.refundETH();
    }

    function estimate(uint256 paper) external payable returns (uint256) {
        return
            quoter.quoteExactOutputSingle(WETH9, address(PAPER), fee, paper, 0);
    }

    receive() external payable {}
}
