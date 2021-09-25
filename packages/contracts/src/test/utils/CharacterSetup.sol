// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import 'ds-test/test.sol';

import './Hevm.sol';
import '../../Loot.sol';
import { Character } from '../../Character.sol';
import { Stockpile } from '../../Stockpile.sol';
import { StockpileComponents } from '../../StockpileComponents.sol';
import { StockpileTester } from './StockpileSetup.sol';

import '@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol';
import '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';

contract CharacterUser is ERC721Holder, ERC1155Holder {
    DopeWarsLoot loot;
    Stockpile stockpile;
    Character character;

    constructor(
        DopeWarsLoot _loot,
        Stockpile _stockpile,
        Character _character
    ) {
        loot = _loot;
        stockpile = _stockpile;
        character = _character;
    }

    function claim(uint256 tokenId) public {
        loot.claim(tokenId);
    }

    function open(uint256 tokenId) public {
        stockpile.open(tokenId);
    }

    function equip(uint48[] memory tokenIds) public {
        character.equip(tokenIds);
    }

    function transferERC1155(
        address to,
        uint256 tokenId,
        uint256 amount
    ) public {
        stockpile.safeTransferFrom(address(this), to, tokenId, amount, '0x');
    }
}

contract Owner {}

contract CharacterTest is DSTest {
    uint256 internal constant BAG = 10;
    uint256 internal constant OTHER_BAG = 100;
    Hevm internal constant hevm = Hevm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);

    // contracts
    DopeWarsLoot internal loot;
    StockpileComponents internal components;
    StockpileTester internal stockpile;
    Character internal character;

    // users
    Owner internal owner;
    CharacterUser internal alice;

    function setUp() public virtual {
        owner = new Owner();

        // deploy contracts
        loot = new DopeWarsLoot();
        components = new StockpileComponents(address(owner));
        stockpile = new StockpileTester(address(components), address(loot), address(owner));
        character = new Character(address(stockpile));

        // create alice's account & claim a bag
        alice = new CharacterUser(loot, stockpile, character);
        alice.claim(BAG);
        alice.open(BAG);
        assertEq(loot.ownerOf(BAG), address(alice));
    }
}
