// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import 'ds-test/test.sol';

import './Hevm.sol';
import '../../Loot.sol';
import { Paper } from '../../Paper.sol';
import { Hustler } from '../../Hustler.sol';
import { SwapMeet } from '../../SwapMeet.sol';
import { Components } from '../../Components.sol';
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

    function mint() public returns (uint256) {
        return hustler.mint('');
    }

    function mintFromDope(
        uint256 tokenId,
        string calldata name,
        bytes4 background,
        bytes4 color
    ) public returns (uint256) {
        return hustler.mintFromDope(tokenId, name, background, color, '');
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
        bytes4 viewport,
        uint8[4] calldata body,
        bytes2 bmask
    ) public {
        hustler.setMetadata(id, name, color, background, viewport, body, bmask);
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
    SwapMeet swapmeet;
    Hustler hustler;

    function init(SwapMeet _swapmeet, Hustler _hustler) public {
        swapmeet = _swapmeet;
        hustler = _hustler;

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

        hustler.setPalette(0, palette);
    }

    function addBodies(bytes[] calldata _bodies) public {
        hustler.addBodies(_bodies);
    }

    function addHeads(bytes[] calldata _heads) public {
        hustler.addHeads(_heads);
    }

    function addBeards(bytes[] calldata _beards) public {
        hustler.addBeards(_beards);
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
        return bodies[id];
    }

    function getHead(uint256 id) public view returns (bytes memory) {
        return heads[id];
    }

    function getBeard(uint256 id) public view returns (bytes memory) {
        return beards[id];
    }
}

contract HustlerTest is ERC1155Holder, DSTest {
    uint256 internal constant BAG = 10;
    uint256 internal constant OTHER_BAG = 100;
    uint256 internal constant UZI_BAG_1 = 4333;
    uint256 internal constant UZI_BAG_2 = 6396;
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

        owner.init(swapmeet, hustler);

        // create alice's account & claim a bag
        alice = new HustlerUser(dope, swapmeet, hustler, paper);
        alice.claim(BAG);
        alice.claimPaper();
        alice.approvePaper(address(swapmeet), type(uint256).max);
        alice.approvePaper(address(hustler), type(uint256).max);
        alice.open(BAG);
        assertEq(dope.ownerOf(BAG), address(alice));

        alice.claim(OTHER_BAG);

        bob = new HustlerUser(dope, swapmeet, hustler, paper);
    }
}
