// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import "ds-test/test.sol";

import "./Hevm.sol";
import "../../Loot.sol";
import { Inventory } from "../../Inventory.sol";

import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

// NB: Using callbacks is hard, since we're a smart contract account we need
// to be implementing the callbacks
contract InventoryUser is ERC721Holder, ERC1155Holder {
    DopeWarsLoot loot;
    Inventory inventory;

    constructor(DopeWarsLoot _loot, Inventory _inventory) {
        loot = _loot;
        inventory = _inventory;
    }

    function claim(uint256 tokenId) public {
        loot.claim(tokenId);
    }

    function open(uint256 tokenId) public {
        inventory.open(tokenId);
    }

    function transferERC1155(address to, uint256 tokenId, uint256 amount) public {
        inventory.safeTransferFrom(address(this), to, tokenId, amount, "0x");
    }
}

contract InventoryTest is DSTest {
    uint256 internal constant BAG = 10;
    uint256 internal constant OTHER_BAG = 100;
    Hevm internal constant hevm =
        Hevm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);

    // contracts
    DopeWarsLoot internal loot;
    Inventory internal inventory;

    // users
    InventoryUser internal alice;

    function setUp() public virtual {
        // deploy contracts
        loot = new DopeWarsLoot();
        inventory = new Inventory(address(loot));

        // create alice's account & claim a bag
        alice = new InventoryUser(loot, inventory);
        alice.claim(BAG);
        assertEq(loot.ownerOf(BAG), address(alice));
    }
}
