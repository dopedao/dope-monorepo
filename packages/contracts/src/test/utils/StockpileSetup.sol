// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import 'ds-test/test.sol';

import './Hevm.sol';
import '../../Loot.sol';
import { Stockpile } from '../../Stockpile.sol';
import { TokenId } from '../../TokenId.sol';

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

struct ItemIds {
    uint256 weapon;
    uint256 clothes;
    uint256 vehicle;
    uint256 waist;
    uint256 foot;
    uint256 hand;
    uint256 drugs;
    uint256 neck;
    uint256 ring;
}

struct ItemNames {
    string weapon;
    string clothes;
    string vehicle;
    string waist;
    string foot;
    string hand;
    string drugs;
    string neck;
    string ring;
}

contract StockpileOwner is ERC1155Holder {
    Stockpile stockpile;

    function setStockpile(Stockpile _stockpile) public {
        stockpile = _stockpile;
    }

    function addItemComponent(uint8 itemType, string calldata component) public returns (uint8) {
        return stockpile.addItemComponent(itemType, component);
    }

    function mint(
        address account,
        uint8[5] memory components,
        uint8 itemType,
        uint256 amount,
        bytes memory data
    ) public returns (uint256) {
        return stockpile.mint(account, components, itemType, amount, data);
    }

    function mintBatch(
        address to,
        uint8[] memory components,
        uint8[] memory itemTypes,
        uint256[] memory amounts,
        bytes memory data
    ) public returns (uint256[] memory) {
        return stockpile.mintBatch(to, components, itemTypes, amounts, data);
    }
}

contract StockpileTester is Stockpile {
    constructor(address _bags, address _owner) Stockpile(_bags, _owner) {}

    // View helpers for getting the item ID that corresponds to a bag's items
    function weaponId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(weaponComponents(tokenId), WEAPON);
    }

    function clothesId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(clothesComponents(tokenId), CLOTHES);
    }

    function vehicleId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(vehicleComponents(tokenId), VEHICLE);
    }

    function waistId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(waistComponents(tokenId), WAIST);
    }

    function footId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(footComponents(tokenId), FOOT);
    }

    function handId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(handComponents(tokenId), HAND);
    }

    function drugsId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(drugsComponents(tokenId), DRUGS);
    }

    function neckId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(neckComponents(tokenId), NECK);
    }

    function ringId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(ringComponents(tokenId), RING);
    }

    // Given an erc721 bag, returns the erc1155 token ids of the items in the bag
    function ids(uint256 tokenId) public view returns (ItemIds memory) {
        return
            ItemIds({
                weapon: weaponId(tokenId),
                clothes: clothesId(tokenId),
                vehicle: vehicleId(tokenId),
                waist: waistId(tokenId),
                foot: footId(tokenId),
                hand: handId(tokenId),
                drugs: drugsId(tokenId),
                neck: neckId(tokenId),
                ring: ringId(tokenId)
            });
    }

    function idsMany(uint256[] memory tokenIds) public view returns (ItemIds[] memory) {
        ItemIds[] memory itemids = new ItemIds[](tokenIds.length);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            itemids[i] = ids(tokenIds[i]);
        }

        return itemids;
    }

    // Given an ERC721 bag, returns the names of the items in the bag
    function names(uint256 tokenId) public view returns (ItemNames memory) {
        ItemIds memory items = ids(tokenId);
        return
            ItemNames({
                weapon: tokenName(items.weapon),
                clothes: tokenName(items.clothes),
                vehicle: tokenName(items.vehicle),
                waist: tokenName(items.waist),
                foot: tokenName(items.foot),
                hand: tokenName(items.hand),
                drugs: tokenName(items.drugs),
                neck: tokenName(items.neck),
                ring: tokenName(items.ring)
            });
    }

    function namesMany(uint256[] memory tokenNames) public view returns (ItemNames[] memory) {
        ItemNames[] memory itemNames = new ItemNames[](tokenNames.length);
        for (uint256 i = 0; i < tokenNames.length; i++) {
            itemNames[i] = names(tokenNames[i]);
        }

        return itemNames;
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
    StockpileTester internal stockpile;

    // users
    StockpileOwner internal owner;
    StockpileUser internal alice;

    function setUp() public virtual {
        owner = new StockpileOwner();

        // deploy contracts
        loot = new DopeWarsLoot();
        stockpile = new StockpileTester(address(loot), address(owner));

        owner.setStockpile(stockpile);

        // create alice's account & claim a bag
        alice = new StockpileUser(loot, stockpile);
        alice.claim(BAG);
        assertEq(loot.ownerOf(BAG), address(alice));

        alice.claim(FIRST_SILVER_RING_BAG);
        alice.claim(SECOND_SILVER_RING_BAG);
    }
}
