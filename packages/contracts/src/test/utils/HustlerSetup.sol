// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import 'ds-test/test.sol';

import './Hevm.sol';
import '../../Loot.sol';
import { Hustler } from '../../Hustler.sol';
import { Stockpile } from '../../Stockpile.sol';
import { Components } from '../../Components.sol';
import { StockpileTester } from './StockpileSetup.sol';

import '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';
import '@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol';

contract HustlerUser is ERC1155Holder, ERC721Holder {
    DopeWarsLoot loot;
    Stockpile stockpile;
    Hustler hustler;

    constructor(
        DopeWarsLoot _loot,
        Stockpile _stockpile,
        Hustler _hustler
    ) {
        loot = _loot;
        stockpile = _stockpile;
        hustler = _hustler;
    }

    function claim(uint256 tokenId) public {
        loot.claim(tokenId);
    }

    function open(uint256 tokenId) public {
        stockpile.open(tokenId);
    }

    function mint() public returns (uint256) {
        return hustler.mint(address(this), '');
    }

    function setBody(
        uint256 id,
        uint8[4] memory body,
        uint8 mask
    ) public {
        hustler.setBody(id, body, mask);
    }

    function setSlots(
        uint256 id,
        uint256[10] memory slots,
        uint8 mask
    ) public {
        hustler.setSlots(id, slots, mask);
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

contract HustlerTester is Hustler {
    constructor(address _owner, address _swapmeet) Hustler(_owner, _swapmeet) {}

    function getMetadata(uint256 id) public view returns (Metadata memory) {
        return metadata[id];
    }
}

contract HustlerTest is DSTest {
    uint256 internal constant BAG = 10;
    uint256 internal constant OTHER_BAG = 100;
    Hevm internal constant hevm = Hevm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);

    // contracts
    DopeWarsLoot internal loot;
    Components internal components;
    StockpileTester internal stockpile;
    HustlerTester internal hustler;

    // users
    Owner internal owner;
    HustlerUser internal alice;

    function setUp() public virtual {
        owner = new Owner();

        // deploy contracts
        loot = new DopeWarsLoot();
        components = new Components(address(owner));
        stockpile = new StockpileTester(address(components), address(loot), address(owner));
        hustler = new HustlerTester(address(owner), address(stockpile));

        // create alice's account & claim a bag
        alice = new HustlerUser(loot, stockpile, hustler);
        alice.claim(BAG);
        alice.open(BAG);
        assertEq(loot.ownerOf(BAG), address(alice));
    }
}
