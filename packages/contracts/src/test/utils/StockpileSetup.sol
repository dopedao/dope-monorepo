// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import 'ds-test/test.sol';

import './Hevm.sol';
import '../../Loot.sol';
import { Stockpile } from '../../Stockpile.sol';

import '@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol';
import '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';

// NB: Using callbacks is hard, since we're a smart contract account we need
// to be implementing the callbacks
contract StockpileUser is ERC721Holder, ERC1155Holder {
    DopeWarsLoot loot;
    Stockpile stockpile;

    constructor(DopeWarsLoot _loot, Stockpile _stockpile) {
        loot = _loot;
        stockpile = _stockpile;
    }

    function claim(uint256 tokenId) public {
        loot.claim(tokenId);
    }

    function open(uint256 tokenId) public {
        stockpile.open(tokenId);
    }

    function transferERC1155(
        address to,
        uint256 tokenId,
        uint256 amount
    ) public {
        stockpile.safeTransferFrom(address(this), to, tokenId, amount, '0x');
    }
}

contract StockpileTest is DSTest {
    uint256 internal constant BAG = 10;
    uint256 internal constant OTHER_BAG = 100;
    uint256 internal constant FIRST_SILVER_RING_BAG = 4757;
    uint256 internal constant SECOND_SILVER_RING_BAG = 7253;

    Hevm internal constant hevm = Hevm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);

    // contracts
    DopeWarsLoot internal loot;
    Stockpile internal stockpile;

    // users
    StockpileUser internal alice;

    function setUp() public virtual {
        // deploy contracts
        loot = new DopeWarsLoot();
        stockpile = new Stockpile(address(loot));

        // create alice's account & claim a bag
        alice = new StockpileUser(loot, stockpile);
        alice.claim(BAG);
        assertEq(loot.ownerOf(BAG), address(alice));

        alice.claim(FIRST_SILVER_RING_BAG);
        alice.claim(SECOND_SILVER_RING_BAG);
    }
}
