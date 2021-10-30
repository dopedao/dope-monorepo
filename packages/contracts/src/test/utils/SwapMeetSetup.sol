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
    Components components;
    SwapMeet swapmeet;

    function init(Components _components, SwapMeet _swapmeet) public {
        components = _components;
        swapmeet = _swapmeet;

        bytes4[] memory palette0 = new bytes4[](83);
        bytes4[83] memory _palette0 = [
            bytes4(hex''),
            hex'0d0d0dff',
            hex'262626ff',
            hex'5c3c0dff',
            hex'0d1114ff',
            hex'2e1e06ff',
            hex'422b09ff',
            hex'e3cd8fff',
            hex'1c1c1c59',
            hex'0d0d0d99',
            hex'26262699',
            hex'965e3091',
            hex'ae6c37ff',
            hex'cc8850ff',
            hex'415d66ff',
            hex'82512aff',
            hex'9e6333ff',
            hex'915b2fff',
            hex'9f8176ff',
            hex'634227ff',
            hex'3ccbcbff',
            hex'60f1f1ff',
            hex'77f8f8ff',
            hex'257e7eff',
            hex'5ceeeeff',
            hex'3bc7c7ff',
            hex'f0b482ff',
            hex'ffc990ff',
            hex'ffd99cff',
            hex'a5a5a5ff',
            hex'eda0a0ff',
            hex'f0a25bff',
            hex'b98359ff',
            hex'd29564ff',
            hex'e6a46eff',
            hex'757575ff',
            hex'b77171ff',
            hex'b9733bff',
            hex'2a1201ff',
            hex'69290bff',
            hex'983b0fff',
            hex'162b34ff',
            hex'301608ff',
            hex'00000038',
            hex'402a09ff',
            hex'000000ff',
            hex'333333ff',
            hex'1a1a1aff',
            hex'696969ff',
            hex'594330ff',
            hex'403022ff',
            hex'876549ff',
            hex'b58762ff',
            hex'664c37ff',
            hex'a8994cff',
            hex'd9c562ff',
            hex'3b2513ff',
            hex'21150bff',
            hex'292929ff',
            hex'190e06ff',
            hex'968944ff',
            hex'7d7138ff',
            hex'787878ff',
            hex'298989ff',
            hex'a8a8a8ff',
            hex'704300ff',
            hex'704f1eff',
            hex'965e30ff',
            hex'00000042',
            hex'786455ff',
            hex'ccab91ff',
            hex'666666ff',
            hex'b5b5b5ff',
            hex'ccccccff',
            hex'a89280ff',
            hex'ccb19bff',
            hex'42464dff',
            hex'917157ff',
            hex'343434ff',
            hex'303030ff',
            hex'c7b37dff',
            hex'f7df9cff',
            hex'c2af7aff'
        ];

        for (uint256 i = 0; i < palette0.length; i++) {
            palette0[i] = _palette0[i];
        }

        swapmeet.setPalette(0, palette0);

        bytes4[] memory palette1 = new bytes4[](207);
        bytes4[207] memory _palette1 = [
            bytes4(hex''),
            hex'ccd3e0ff',
            hex'e0e0e0ff',
            hex'fcc02eff',
            hex'0f0f0fff',
            hex'bad1cbff',
            hex'f4baacff',
            hex'c1d3e5ff',
            hex'de9400ff',
            hex'f8e100ff',
            hex'c7b300ff',
            hex'5e6e80ff',
            hex'718499ff',
            hex'ccca66ff',
            hex'a6a453ff',
            hex'2b2b2bff',
            hex'4d4d4dff',
            hex'262626ff',
            hex'1a1a1aff',
            hex'f3ebeeff',
            hex'd2212bff',
            hex'e33a3bff',
            hex'17110cff',
            hex'664d37ff',
            hex'594330ff',
            hex'876549ff',
            hex'7b8fa6ff',
            hex'8ea5bfff',
            hex'343434ff',
            hex'636363ff',
            hex'4a4a4aff',
            hex'0d1114ff',
            hex'ccccccff',
            hex'e5e5e5ff',
            hex'f2f2f2ff',
            hex'c7c7c7ff',
            hex'5c3c0dff',
            hex'151515ff',
            hex'302725ff',
            hex'c69455ff',
            hex'ad814bff',
            hex'a56f3bff',
            hex'ffffffff',
            hex'd9d9d9ff',
            hex'452c09ff',
            hex'66410dff',
            hex'4372e0ff',
            hex'283c2dff',
            hex'982729ff',
            hex'ebdfccff',
            hex'f52a2aff',
            hex'd92525ff',
            hex'cc2323ff',
            hex'e52727ff',
            hex'ccc2b1ff',
            hex'5752ffff',
            hex'ff3636ff',
            hex'1f1f1fff',
            hex'404040ff',
            hex'000000ff',
            hex'0d0d0dff',
            hex'080808ff',
            hex'121212ff',
            hex'b5b5b5ff',
            hex'd4d2cfff',
            hex'cc2929ff',
            hex'1a0402ff',
            hex'2e1412ff',
            hex'2f0704ff',
            hex'bfbfbfff',
            hex'465459ff',
            hex'5b6c73ff',
            hex'2e2319ff',
            hex'c2b9a9ff',
            hex'9e978aff',
            hex'382a1eff',
            hex'4f3c2bff',
            hex'856448ff',
            hex'474747ff',
            hex'd1d1d1ff',
            hex'b0b0b0ff',
            hex'211912ff',
            hex'0d1314ff',
            hex'ae6c37ff',
            hex'3d0c0cff',
            hex'0f0d0dff',
            hex'333333ff',
            hex'9e7755ff',
            hex'fac52cff',
            hex'cca225ff',
            hex'242424ff',
            hex'666666ff',
            hex'b38807ff',
            hex'cf9d08ff',
            hex'616161ff',
            hex'6e6e6eff',
            hex'171717ff',
            hex'b3b3b3ff',
            hex'c9c9c9ff',
            hex'4d492cff',
            hex'787346ff',
            hex'abbcccff',
            hex'e3ebfaff',
            hex'b38565ff',
            hex'9f6e4cff',
            hex'9ea3adff',
            hex'b38d6fff',
            hex'a37855ff',
            hex'cfa380ff',
            hex'bd8b62ff',
            hex'0000004d',
            hex'e11734ff',
            hex'000a0a9d',
            hex'f8d700ff',
            hex'0000003d',
            hex'223136ff',
            hex'415d66ff',
            hex'c2bcbeff',
            hex'2d8c2dff',
            hex'34a534ff',
            hex'17262bff',
            hex'a1a1a1ff',
            hex'28414aff',
            hex'dbdbdbff',
            hex'1d2f36ff',
            hex'a32121ff',
            hex'701616ff',
            hex'ffee58ff',
            hex'fed835ff',
            hex'd4d4d4ff',
            hex'a92223ff',
            hex'6e1616ff',
            hex'521010ff',
            hex'380a0aff',
            hex'4b0e0eff',
            hex'6e1515ff',
            hex'1a206aff',
            hex'222c90ff',
            hex'b38c00ff',
            hex'7f8096ff',
            hex'd9d2d5ff',
            hex'06090dff',
            hex'c2c2c2ff',
            hex'162232ff',
            hex'141414ff',
            hex'010203ff',
            hex'0d151fff',
            hex'3d4543ff',
            hex'b32424ff',
            hex'a67b47ff',
            hex'b5874eff',
            hex'8c5e32ff',
            hex'e0ccccff',
            hex'9a5682ff',
            hex'c872a6ff',
            hex'f22929ff',
            hex'260603ff',
            hex'ada8aaff',
            hex'c7c1c3ff',
            hex'd9d2d4ff',
            hex'e5dfe1ff',
            hex'222421ff',
            hex'7e5a3fff',
            hex'8e6546ff',
            hex'ccc6c8ff',
            hex'ffe4cfff',
            hex'd4bca9ff',
            hex'dfb0e8ff',
            hex'fae0ffff',
            hex'f8f9f8ff',
            hex'fef156ff',
            hex'cf799eff',
            hex'f0a800ff',
            hex'f0e1bdff',
            hex'5c7350ff',
            hex'7a996bff',
            hex'99beffff',
            hex'f0efc5ff',
            hex'c5ebf0ff',
            hex'f0c5efff',
            hex'ffeb69ff',
            hex'ffaf69ff',
            hex'c7c8ccff',
            hex'f55656ff',
            hex'f57f7fff',
            hex'ffeee0ff',
            hex'f3f3f4ff',
            hex'e1e2e5ff',
            hex'ad8540ff',
            hex'dba951ff',
            hex'fffad9ff',
            hex'e3e5e3ff',
            hex'fff8c9ff',
            hex'd4d5d9ff',
            hex'628b99ff',
            hex'c72828ff',
            hex'bfaeaeff',
            hex'353d45ff',
            hex'21262bff',
            hex'1c2226ff',
            hex'19206aff',
            hex'252d33ff',
            hex'495563ff',
            hex'808080ff',
            hex'585651ff',
            hex'91bfb6ff',
            hex'000000cc'
        ];

        for (uint256 i = 0; i < palette1.length; i++) {
            palette1[i] = _palette1[i];
        }

        swapmeet.setPalette(1, palette1);
    }

    function addItemComponent(uint8 itemType, string calldata component) public returns (uint8) {
        return components.addComponent(itemType, component);
    }

    function mint(
        address account,
        uint8[5] memory components_,
        uint8 itemType,
        uint256 amount,
        bytes memory data
    ) public returns (uint256) {
        return swapmeet.mint(account, components_, itemType, amount, data);
    }

    function mintBatch(
        address to,
        uint8[] memory components_,
        uint8[] memory itemTypes,
        uint256[] memory amounts,
        bytes memory data
    ) public returns (uint256[] memory) {
        return swapmeet.mintBatch(to, components_, itemTypes, amounts, data);
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
