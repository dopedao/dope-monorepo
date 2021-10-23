// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import 'ds-test/test.sol';

import './Hevm.sol';
import '../../Loot.sol';
import { Paper } from '../../Paper.sol';
import { Hustler } from '../../Hustler.sol';
import { RleParts } from '../../HustlerMetadata.sol';
import { SwapMeet } from '../../SwapMeet.sol';
import { Components, ComponentTypes } from '../../Components.sol';
import { SwapMeetTester } from './SwapMeetSetup.sol';

import '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';
import '@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol';

contract HustlerUser is ERC1155Holder, ERC721Holder {
    DopeWarsLoot dope;
    SwapMeet swapmeet;
    Hustler hustler;
    Paper paper;

    constructor(
        DopeWarsLoot _dope,
        SwapMeet _swapmeet,
        Hustler _hustler,
        Paper _paper
    ) {
        dope = _dope;
        swapmeet = _swapmeet;
        hustler = _hustler;
        paper = _paper;
    }

    function claim(uint256 tokenId) public {
        dope.claim(tokenId);
    }

    function open(uint256 tokenId) public {
        swapmeet.open(tokenId, address(this), '');
    }

    function mint() public {
        hustler.mint('');
    }

    function mintFromDope(
        uint256 tokenId,
        string calldata name,
        bytes4 background,
        bytes4 color
    ) public {
        hustler.mintFromDope(tokenId, name, background, color, '');
    }

    function mintOG(bytes memory data) public payable {
        hustler.mintOG{ value: msg.value }(data);
    }

    function mintOGFromDope(
        uint256 tokenId,
        string calldata name,
        bytes4 background,
        bytes4 color,
        bytes memory data
    ) public payable {
        hustler.mintOGFromDope{ value: msg.value }(tokenId, name, background, color, data);
    }

    function unequip(uint256 hustlerId, uint8[] calldata slots) public {
        hustler.unequip(hustlerId, slots);
    }

    function setApprovalForAll(address operator, bool approved) public {
        swapmeet.setApprovalForAll(operator, approved);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public {
        swapmeet.safeTransferFrom(from, to, id, amount, data);
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public {
        swapmeet.safeBatchTransferFrom(from, to, ids, amounts, data);
    }

    function safeTransferHustlerFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public {
        hustler.safeTransferFrom(from, to, id, amount, data);
    }

    function setDopeApprovalForAll(address operator, bool approved) public {
        dope.setApprovalForAll(operator, approved);
    }

    function setMetadata(
        uint256 id,
        string calldata name,
        bytes4 color,
        bytes4 background,
        bytes2 options,
        uint8[4] calldata viewport,
        uint8[4] calldata body,
        bytes2 bmask
    ) public {
        hustler.setMetadata(id, name, color, background, options, viewport, body, bmask);
    }

    function transferERC1155(
        address to,
        uint256 tokenId,
        uint256 amount
    ) public {
        swapmeet.safeTransferFrom(address(this), to, tokenId, amount, '0x');
    }

    function approvePaper(address who, uint256 amount) public {
        paper.approve(who, amount);
    }

    function claimPaper() public {
        paper.claimAllForOwner();
    }
}

contract HustlerOwner is ERC1155Holder {
    Components components;
    SwapMeet swapmeet;
    Hustler hustler;

    function init(
        Components _components,
        SwapMeet _swapmeet,
        Hustler _hustler
    ) public {
        components = _components;
        swapmeet = _swapmeet;
        hustler = _hustler;

        bytes4[] memory palette = new bytes4[](255);
        bytes4[255] memory _palette = [
            bytes4(hex''),
            hex'ccd3e0ff',
            hex'e0e0e0ff',
            hex'fcc02eff',
            hex'0f0f0fff',
            hex'bad1cbff',
            hex'f4baacff',
            hex'c1d3e5ff',
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
            hex'de9400ff',
            hex'915b2fff',
            hex'ae6c37ff',
            hex'415d66ff',
            hex'9f8176ff',
            hex'634227ff',
            hex'b98359ff',
            hex'd29564ff',
            hex'e6a46eff',
            hex'757575ff',
            hex'b77171ff',
            hex'b9733bff',
            hex'cc8850ff',
            hex'82512aff',
            hex'9e6333ff',
            hex'00000038',
            hex'f8e100ff',
            hex'c7b300ff',
            hex'5e6e80ff',
            hex'718499ff',
            hex'ccca66ff',
            hex'a6a453ff',
            hex'2b2b2bff',
            hex'4d4d4dff',
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
            hex'ccccccff',
            hex'e5e5e5ff',
            hex'f2f2f2ff',
            hex'c7c7c7ff',
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
            hex'402a09ff',
            hex'696969ff',
            hex'403022ff',
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
            hex'9ea3adff',
            hex'b38d6fff',
            hex'a37855ff',
            hex'cfa380ff',
            hex'bd8b62ff',
            hex'704f1eff',
            hex'965e30ff',
            hex'787878ff',
            hex'704300ff',
            hex'0000004d',
            hex'e11734ff',
            hex'000a0a9d',
            hex'f8d700ff',
            hex'0000003d',
            hex'223136ff',
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
            hex'00000042',
            hex'786455ff',
            hex'ccab91ff',
            hex'a89280ff',
            hex'ccb19bff',
            hex'42464dff',
            hex'917157ff',
            hex'303030ff',
            hex'c7b37dff',
            hex'f7df9cff',
            hex'c2af7aff',
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

        for (uint256 i = 0; i < palette.length; i++) {
            palette[i] = _palette[i];
        }

        hustler.setPalette(0, palette);
    }

    function addRles(uint8 part, bytes[] calldata _rles) public {
        hustler.addRles(part, _rles);
    }

    function addItemComponent(uint8 itemType, string calldata component) public returns (uint8) {
        return components.addComponent(itemType, component);
    }

    function mintItem(
        address account,
        uint8[5] memory _components,
        uint8 itemType,
        uint256 amount,
        bytes memory data
    ) public returns (uint256) {
        return swapmeet.mint(account, _components, itemType, amount, data);
    }
}

contract Owner {}

contract HustlerTester is Hustler {
    constructor(
        address _owner,
        address _components,
        address _swapmeet,
        address _paper
    ) Hustler(_components, _swapmeet, _paper) {
        transferOwnership(_owner);
    }

    function getMetadata(uint256 id) public view returns (Metadata memory) {
        return metadata[id];
    }

    function getBody(uint256 id) public view returns (bytes memory) {
        return rles[RleParts.BODY][id];
    }

    function getHair(uint8 gender, uint256 id) public view returns (bytes memory) {
        return rles[gender][id];
    }

    function getBeard(uint256 id) public view returns (bytes memory) {
        return rles[RleParts.BEARD][id];
    }
}

contract HustlerTest is ERC1155Holder, DSTest {
    bytes4 constant equip = bytes4(keccak256('swapmeetequip'));
    bytes constant bodyRle =
        hex'000b26361a060003090300050001090313010902000500010904130200050001130114011301090114020005000109021301090113020006000113021501130200060001090213030006000209040006000109011304000400020904130200030001090713010002000109091302000109041301090413010001090113010001090213010902130109011301000113020001090113011601090113011601000113010001130300020901130209010001130100011303000109031302000113010001130300010903130200011301000113030001090113010901130200011301000113030001090313020001130100011302000209041301000113010901130100020907130109011301000209051301000113010902000209021301090313010004000109011302000109011302000400010901130200010901130200040001090113020001090113020004000109011302000109011302000400010901130200010901130200040001090113020001090113020004000109011302000109011302000400021302000213020004000109030001090300040001130300011303000400011303000113030004000113030001130300040001130300011303000400011303000113030004000113030001130300040001130300011303000400011303000113030004000113030001130300040002090200021301090100';
    bytes constant hairRle =
        hex'000924111f0100014d010d014d01000117010d0218010d014d010d031801180119011801170119014d021801170118014d011802100118014d011702180100010002170200';
    bytes constant beardRle = hex'000e24102001080109020a0100020a0100';

    uint256 internal constant BAG = 10;
    uint256 internal constant OTHER_BAG = 100;
    uint256 internal constant UZI_BAG_1 = 4333;
    uint256 internal constant UZI_BAG_2 = 6396;
    uint256 internal ACCESSORY;
    Hevm internal constant hevm = Hevm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);

    // contracts
    DopeWarsLoot internal dope;
    Paper internal paper;
    Components internal components;
    SwapMeetTester internal swapmeet;
    HustlerTester internal hustler;

    // users
    HustlerOwner internal owner;
    HustlerUser internal alice;
    HustlerUser internal bob;

    function setUp() public virtual {
        owner = new HustlerOwner();

        // deploy contracts
        dope = new DopeWarsLoot();
        paper = new Paper(address(dope));
        components = new Components(address(owner));
        swapmeet = new SwapMeetTester(address(components), address(dope), address(paper), address(owner));
        hustler = new HustlerTester(address(owner), address(components), address(swapmeet), address(paper));

        owner.init(components, swapmeet, hustler);

        // create alice's account & claim a bag
        alice = new HustlerUser(dope, swapmeet, hustler, paper);
        alice.claim(BAG);
        alice.claimPaper();
        alice.approvePaper(address(swapmeet), type(uint256).max);
        alice.approvePaper(address(hustler), type(uint256).max);
        alice.open(BAG);
        assertEq(dope.ownerOf(BAG), address(alice));

        alice.claim(OTHER_BAG);

        uint8[5] memory _components;
        _components[0] = owner.addItemComponent(ComponentTypes.ACCESSORIES, 'hat');
        ACCESSORY = owner.mintItem(address(alice), _components, ComponentTypes.ACCESSORIES, 1, '');

        bob = new HustlerUser(dope, swapmeet, hustler, paper);
    }
}
