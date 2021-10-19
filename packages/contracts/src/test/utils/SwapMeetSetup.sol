// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import 'ds-test/test.sol';

import './Hevm.sol';
import '../../Loot.sol';
import { Paper } from '../../Paper.sol';
import { SwapMeet } from '../../SwapMeet.sol';
import { Components, ComponentTypes } from '../../Components.sol';
import { TokenId } from '../../TokenId.sol';

import '@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol';
import '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';

// NB: Using callbacks is hard, since we're a smart contract account we need
// to be implementing the callbacks
contract SwapMeetUser is ERC721Holder, ERC1155Holder {
    DopeWarsLoot dope;
    SwapMeet swapmeet;
    Paper paper;

    constructor(
        DopeWarsLoot _dope,
        SwapMeet _swapmeet,
        Paper _paper
    ) {
        dope = _dope;
        swapmeet = _swapmeet;
        paper = _paper;
    }

    function claim(uint256 tokenId) public {
        dope.claim(tokenId);
    }

    function open(uint256 tokenId) public {
        swapmeet.open(tokenId, address(this), '');
    }

    function batchOpen(uint256[] memory ids) public {
        swapmeet.batchOpen(ids, address(this), '');
    }

    function approvePaper(uint256 amount) public {
        paper.approve(address(swapmeet), amount);
    }

    function claimPaper() public {
        paper.claimAllForOwner();
    }

    function transferERC1155(
        address to,
        uint256 tokenId,
        uint256 amount
    ) public {
        swapmeet.safeTransferFrom(address(this), to, tokenId, amount, '0x');
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

contract SwapMeetOwner is ERC1155Holder {
    Components sc;
    SwapMeet swapmeet;

    function init(Components _components, SwapMeet _swapmeet) public {
        sc = _components;
        swapmeet = _swapmeet;

        bytes4[] memory palette = new bytes4[](228);
        bytes4[228] memory _palette = [
            bytes4(hex''),
            hex'00000038',
            hex'b3b3b3',
            hex'c9c9c9',
            hex'616161',
            hex'6e6e6e',
            hex'000000',
            hex'0d1114',
            hex'171717',
            hex'b38807',
            hex'cf9d08',
            hex'242424',
            hex'666666',
            hex'abbccc',
            hex'c1d3e5',
            hex'e3ebfa',
            hex'ccd3e0',
            hex'333333',
            hex'1a1a1a',
            hex'262626',
            hex'4d492c',
            hex'787346',
            hex'b38565',
            hex'9f6e4c',
            hex'452c09',
            hex'66410d',
            hex'ffffff',
            hex'cccccc',
            hex'f2f2f2',
            hex'e5e5e5',
            hex'bfbfbf',
            hex'd9d9d9',
            hex'982729',
            hex'283c2d',
            hex'5752ff',
            hex'ff3636',
            hex'b5b5b5',
            hex'302725',
            hex'c69455',
            hex'a56f3b',
            hex'a67b47',
            hex'b5874e',
            hex'8c5e32',
            hex'1f1f1f',
            hex'404040',
            hex'0d0d0d',
            hex'222421',
            hex'080808',
            hex'121212',
            hex'e0cccc',
            hex'9a5682',
            hex'c872a6',
            hex'b32424',
            hex'cc2929',
            hex'5c3c0d',
            hex'151515',
            hex'1a0402',
            hex'2f0704',
            hex'260603',
            hex'ebdfcc',
            hex'd92525',
            hex'f22929',
            hex'cc2323',
            hex'f52a2a',
            hex'e52727',
            hex'ccc2b1',
            hex'f3ebee',
            hex'343434',
            hex'ada8aa',
            hex'c7c1c3',
            hex'd9d2d4',
            hex'e5dfe1',
            hex'c18d8b',
            hex'bad1cb',
            hex'f4baac',
            hex'0f0f0f',
            hex'e0e0e0',
            hex'fcc02e',
            hex'190e06',
            hex'915b2f',
            hex'ae6c37',
            hex'415d66',
            hex'9f8176',
            hex'594330',
            hex'876549',
            hex'e0a879',
            hex'b58762',
            hex'787878',
            hex'b57979',
            hex'3b2513',
            hex'21150b',
            hex'292929',
            hex'402a09',
            hex'a8994c',
            hex'd9c562',
            hex'b06f5b',
            hex'fae0ff',
            hex'f3f3f4',
            hex'd4d5d9',
            hex'5c7350',
            hex'7a996b',
            hex'dfb0e8',
            hex'99beff',
            hex'c5ebf0',
            hex'f0c5ef',
            hex'ffeb69',
            hex'f0a800',
            hex'f0e1bd',
            hex'ad8540',
            hex'dba951',
            hex'fffad9',
            hex'ffeee0',
            hex'fef156',
            hex'cf799e',
            hex'ffe4cf',
            hex'd4bca9',
            hex'e1e2e5',
            hex'ffaf69',
            hex'f8f9f8',
            hex'e3e5e3',
            hex'c7c8cc',
            hex'f55656',
            hex'f57f7f',
            hex'fff8c9',
            hex'f0efc5',
            hex'465459',
            hex'5b6c73',
            hex'0d1314',
            hex'd1d1d1',
            hex'b0b0b0',
            hex'c2b9a9',
            hex'9e978a',
            hex'382a1e',
            hex'856448',
            hex'474747',
            hex'4a4a4a',
            hex'3d0c0c',
            hex'0f0d0d',
            hex'2e2319',
            hex'17110c',
            hex'9e7755',
            hex'211912',
            hex'4f3c2b',
            hex'fac52c',
            hex'cca225',
            hex'9ea3ad',
            hex'b38d6f',
            hex'a37855',
            hex'cfa380',
            hex'bd8b62',
            hex'de9400',
            hex'422b09',
            hex'7a5011',
            hex'704300',
            hex'42464d',
            hex'cc986e',
            hex'c59782',
            hex'b09986',
            hex'd4d2cf',
            hex'2e1412',
            hex'c7c7c7',
            hex'4372e0',
            hex'ad814b',
            hex'd2212b',
            hex'e33a3b',
            hex'2b2b2b',
            hex'636363',
            hex'ccca66',
            hex'a6a453',
            hex'f8e100',
            hex'c7b300',
            hex'664d37',
            hex'5e6e80',
            hex'718499',
            hex'7b8fa6',
            hex'8ea5bf',
            hex'4d4d4d',
            hex'c2bcbe',
            hex'808080',
            hex'585651',
            hex'000000cc',
            hex'd4d4d4',
            hex'a92223',
            hex'6e1616',
            hex'223136',
            hex'ffee58',
            hex'fed835',
            hex'3d4543',
            hex'd9d2d5',
            hex'a32121',
            hex'701616',
            hex'06090d',
            hex'c2c2c2',
            hex'162232',
            hex'dbdbdb',
            hex'141414',
            hex'010203',
            hex'0d151f',
            hex'1a206a',
            hex'222c90',
            hex'91bfb6',
            hex'7f8096',
            hex'17262b',
            hex'a1a1a1',
            hex'28414a',
            hex'1d2f36',
            hex'521010',
            hex'380a0a',
            hex'4b0e0e',
            hex'6e1515',
            hex'7e5a3f',
            hex'8e6546',
            hex'ccc6c8',
            hex'7b7b7b',
            hex'252d33',
            hex'495563',
            hex'353d45',
            hex'21262b',
            hex'1c2226',
            hex'bfaeae',
            hex'628b99',
            hex'19206a',
            hex'c72828',
            hex'634227',
            hex'b37746',
            hex'969696',
            hex'ccab91',
            hex'e0ba9b'
        ];

        for (uint256 i = 0; i < palette.length; i++) {
            palette[i] = _palette[i];
        }

        swapmeet.setPalette(0, palette);
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
        return swapmeet.mint(account, components, itemType, amount, data);
    }

    function mintBatch(
        address to,
        uint8[] memory components,
        uint8[] memory itemTypes,
        uint256[] memory amounts,
        bytes memory data
    ) public returns (uint256[] memory) {
        return swapmeet.mintBatch(to, components, itemTypes, amounts, data);
    }

    function setRle(
        uint256 id,
        bytes memory rle,
        bytes memory rle2
    ) public {
        swapmeet.setRle(id, rle, rle2);
    }

    function batchSetRle(uint256[] calldata ids, bytes[] calldata rles) public {
        swapmeet.batchSetRle(ids, rles);
    }
}

contract SwapMeetTester is SwapMeet {
    constructor(
        address _components,
        address _dope,
        address _paper,
        address _owner
    ) SwapMeet(_components, _dope, _paper) {
        transferOwnership(_owner);
    }

    // View helpers for getting the item ID that corresponds to a bag's items
    function weaponId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(sc.items(tokenId)[ComponentTypes.WEAPON], ComponentTypes.WEAPON);
    }

    function clothesId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(sc.items(tokenId)[ComponentTypes.CLOTHES], ComponentTypes.CLOTHES);
    }

    function vehicleId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(sc.items(tokenId)[ComponentTypes.VEHICLE], ComponentTypes.VEHICLE);
    }

    function waistId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(sc.items(tokenId)[ComponentTypes.WAIST], ComponentTypes.WAIST);
    }

    function footId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(sc.items(tokenId)[ComponentTypes.FOOT], ComponentTypes.FOOT);
    }

    function handId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(sc.items(tokenId)[ComponentTypes.HAND], ComponentTypes.HAND);
    }

    function drugsId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(sc.items(tokenId)[ComponentTypes.DRUGS], ComponentTypes.DRUGS);
    }

    function neckId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(sc.items(tokenId)[ComponentTypes.NECK], ComponentTypes.NECK);
    }

    function ringId(uint256 tokenId) public view returns (uint256) {
        return TokenId.toId(sc.items(tokenId)[ComponentTypes.RING], ComponentTypes.RING);
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

    // @notice Given an ERC1155 token id, it returns its name by decoding and parsing
    // the id
    function tokenName(uint256 id) public view returns (string memory) {
        (uint8[5] memory components, uint8 componentType) = TokenId.fromId(id);

        // component type: what slot to get
        // components[0] the index in the array
        string memory item = sc.name(componentType, components[0]);

        // We need to do -1 because the 'no description' is not part of dope components

        // add the suffix
        if (components[1] > 0) {
            item = string(abi.encodePacked(item, ' ', sc.suffixes(components[1] - 1)));
        }

        if (components[2] > 0) {
            item = string(abi.encodePacked('\\"', sc.prefix(components[2], components[3]), '\\" ', item));
        }

        // add the augmentation
        if (components[4] > 0) {
            item = string(abi.encodePacked(item, ' +1'));
        }

        return item;
    }
}

contract SwapMeetTest is DSTest {
    uint256 internal constant BAG = 10;
    uint256 internal constant OTHER_BAG = 100;
    uint256 internal constant BULK1_BAG = 101;
    uint256 internal constant BULK2_BAG = 102;

    uint256 internal constant FIRST_SILVER_RING_BAG = 4757;
    uint256 internal constant SECOND_SILVER_RING_BAG = 7253;

    Hevm internal constant hevm = Hevm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);

    // contracts
    DopeWarsLoot internal dope;
    Paper internal paper;
    Components internal components;
    SwapMeetTester internal swapmeet;

    // users
    SwapMeetOwner internal owner;
    SwapMeetUser internal alice;

    function setUp() public virtual {
        owner = new SwapMeetOwner();

        // deploy contracts
        dope = new DopeWarsLoot();
        paper = new Paper(address(dope));
        components = new Components(address(owner));
        swapmeet = new SwapMeetTester(address(components), address(dope), address(paper), address(owner));

        owner.init(components, swapmeet);

        // create alice's account & claim a bag
        alice = new SwapMeetUser(dope, swapmeet, paper);
        alice.claim(BAG);
        assertEq(dope.ownerOf(BAG), address(alice));

        alice.claim(BULK1_BAG);
        alice.claim(BULK2_BAG);

        alice.claim(FIRST_SILVER_RING_BAG);
        alice.claim(SECOND_SILVER_RING_BAG);

        alice.claimPaper();
        alice.approvePaper(type(uint256).max);
    }
}
