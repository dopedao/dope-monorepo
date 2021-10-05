// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import 'ds-test/test.sol';

import './Hevm.sol';
import '../../Loot.sol';
import { Stockpile } from '../../Stockpile.sol';
import { Components, ComponentTypes } from '../../Components.sol';
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

    function batchOpen(uint256[] memory ids) public {
        stockpile.batchOpen(ids);
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
    Components sc;
    Stockpile stockpile;

    function init(Components _components, Stockpile _stockpile) public {
        sc = _components;
        stockpile = _stockpile;

        string[] memory palette = new string[](228);
        string[228] memory _palette = [
            '',
            '00000038',
            'b3b3b3',
            'c9c9c9',
            '616161',
            '6e6e6e',
            '000000',
            '0d1114',
            '171717',
            'b38807',
            'cf9d08',
            '242424',
            '666666',
            'abbccc',
            'c1d3e5',
            'e3ebfa',
            'ccd3e0',
            '333333',
            '1a1a1a',
            '262626',
            '4d492c',
            '787346',
            'b38565',
            '9f6e4c',
            '452c09',
            '66410d',
            'ffffff',
            'cccccc',
            'f2f2f2',
            'e5e5e5',
            'bfbfbf',
            'd9d9d9',
            '982729',
            '283c2d',
            '5752ff',
            'ff3636',
            'b5b5b5',
            '302725',
            'c69455',
            'a56f3b',
            'a67b47',
            'b5874e',
            '8c5e32',
            '1f1f1f',
            '404040',
            '0d0d0d',
            '222421',
            '080808',
            '121212',
            'e0cccc',
            '9a5682',
            'c872a6',
            'b32424',
            'cc2929',
            '5c3c0d',
            '151515',
            '1a0402',
            '2f0704',
            '260603',
            'ebdfcc',
            'd92525',
            'f22929',
            'cc2323',
            'f52a2a',
            'e52727',
            'ccc2b1',
            'f3ebee',
            '343434',
            'ada8aa',
            'c7c1c3',
            'd9d2d4',
            'e5dfe1',
            'c18d8b',
            'bad1cb',
            'f4baac',
            '0f0f0f',
            'e0e0e0',
            'fcc02e',
            '190e06',
            '915b2f',
            'ae6c37',
            '415d66',
            '9f8176',
            '594330',
            '876549',
            'e0a879',
            'b58762',
            '787878',
            'b57979',
            '3b2513',
            '21150b',
            '292929',
            '402a09',
            'a8994c',
            'd9c562',
            'b06f5b',
            'fae0ff',
            'f3f3f4',
            'd4d5d9',
            '5c7350',
            '7a996b',
            'dfb0e8',
            '99beff',
            'c5ebf0',
            'f0c5ef',
            'ffeb69',
            'f0a800',
            'f0e1bd',
            'ad8540',
            'dba951',
            'fffad9',
            'ffeee0',
            'fef156',
            'cf799e',
            'ffe4cf',
            'd4bca9',
            'e1e2e5',
            'ffaf69',
            'f8f9f8',
            'e3e5e3',
            'c7c8cc',
            'f55656',
            'f57f7f',
            'fff8c9',
            'f0efc5',
            '465459',
            '5b6c73',
            '0d1314',
            'd1d1d1',
            'b0b0b0',
            'c2b9a9',
            '9e978a',
            '382a1e',
            '856448',
            '474747',
            '4a4a4a',
            '3d0c0c',
            '0f0d0d',
            '2e2319',
            '17110c',
            '9e7755',
            '211912',
            '4f3c2b',
            'fac52c',
            'cca225',
            '9ea3ad',
            'b38d6f',
            'a37855',
            'cfa380',
            'bd8b62',
            'de9400',
            '422b09',
            '7a5011',
            '704300',
            '42464d',
            'cc986e',
            'c59782',
            'b09986',
            'd4d2cf',
            '2e1412',
            'c7c7c7',
            '4372e0',
            'ad814b',
            'd2212b',
            'e33a3b',
            '2b2b2b',
            '636363',
            'ccca66',
            'a6a453',
            'f8e100',
            'c7b300',
            '664d37',
            '5e6e80',
            '718499',
            '7b8fa6',
            '8ea5bf',
            '4d4d4d',
            'c2bcbe',
            '808080',
            '585651',
            '000000cc',
            'd4d4d4',
            'a92223',
            '6e1616',
            '223136',
            'ffee58',
            'fed835',
            '3d4543',
            'd9d2d5',
            'a32121',
            '701616',
            '06090d',
            'c2c2c2',
            '162232',
            'dbdbdb',
            '141414',
            '010203',
            '0d151f',
            '1a206a',
            '222c90',
            '91bfb6',
            '7f8096',
            '17262b',
            'a1a1a1',
            '28414a',
            '1d2f36',
            '521010',
            '380a0a',
            '4b0e0e',
            '6e1515',
            '7e5a3f',
            '8e6546',
            'ccc6c8',
            '7b7b7b',
            '252d33',
            '495563',
            '353d45',
            '21262b',
            '1c2226',
            'bfaeae',
            '628b99',
            '19206a',
            'c72828',
            '634227',
            'b37746',
            '969696',
            'ccab91',
            'e0ba9b'
        ];

        for (uint256 i = 0; i < palette.length; i++) {
            palette[i] = _palette[i];
        }

        stockpile.setPalette(0, palette);
    }

    function addItemComponent(uint8 itemType, string calldata component) public returns (uint8) {
        return sc.addComponent(itemType, component);
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

    function setRle(
        uint256 id,
        bytes memory rle,
        bytes memory rle2
    ) public {
        stockpile.setRle(id, rle, rle2);
    }

    function batchSetRle(uint256[] calldata ids, bytes[] calldata rles) public {
        stockpile.batchSetRle(ids, rles);
    }
}

contract StockpileTester is Stockpile {
    constructor(
        address _components,
        address _bags,
        address _owner
    ) Stockpile(_components, _bags, _owner) {}

    // View helpers for getting the item ID that corresponds to a bag's items
    function weaponId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(sc.weaponComponents(tokenId), ComponentTypes.WEAPON);
    }

    function clothesId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(sc.clothesComponents(tokenId), ComponentTypes.CLOTHES);
    }

    function vehicleId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(sc.vehicleComponents(tokenId), ComponentTypes.VEHICLE);
    }

    function waistId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(sc.waistComponents(tokenId), ComponentTypes.WAIST);
    }

    function footId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(sc.footComponents(tokenId), ComponentTypes.FOOT);
    }

    function handId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(sc.handComponents(tokenId), ComponentTypes.HAND);
    }

    function drugsId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(sc.drugsComponents(tokenId), ComponentTypes.DRUGS);
    }

    function neckId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(sc.neckComponents(tokenId), ComponentTypes.NECK);
    }

    function ringId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(sc.ringComponents(tokenId), ComponentTypes.RING);
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
    uint256 internal constant BULK1_BAG = 101;
    uint256 internal constant BULK2_BAG = 102;

    uint256 internal constant FIRST_SILVER_RING_BAG = 4757;
    uint256 internal constant SECOND_SILVER_RING_BAG = 7253;

    Hevm internal constant hevm = Hevm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);

    // contracts
    DopeWarsLoot internal loot;
    Components internal components;
    StockpileTester internal stockpile;

    // users
    StockpileOwner internal owner;
    StockpileUser internal alice;

    function setUp() public virtual {
        owner = new StockpileOwner();

        // deploy contracts
        loot = new DopeWarsLoot();
        components = new Components(address(owner));
        stockpile = new StockpileTester(address(components), address(loot), address(owner));

        owner.init(components, stockpile);

        // create alice's account & claim a bag
        alice = new StockpileUser(loot, stockpile);
        alice.claim(BAG);
        assertEq(loot.ownerOf(BAG), address(alice));

        alice.claim(BULK1_BAG);
        alice.claim(BULK2_BAG);

        alice.claim(FIRST_SILVER_RING_BAG);
        alice.claim(SECOND_SILVER_RING_BAG);
    }
}
