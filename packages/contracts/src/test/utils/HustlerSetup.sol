// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import 'ds-test/test.sol';

import './Hevm.sol';
import '../../Loot.sol';
import { Hustler } from '../../Hustler.sol';
import { SwapMeet } from '../../SwapMeet.sol';
import { Components } from '../../Components.sol';
import { SwapMeetTester } from './SwapMeetSetup.sol';

import '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';
import '@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol';

contract HustlerUser is ERC1155Holder, ERC721Holder {
    DopeWarsLoot loot;
    SwapMeet swapMeet;
    Hustler hustler;

    constructor(
        DopeWarsLoot _loot,
        SwapMeet _swapMeet,
        Hustler _hustler
    ) {
        loot = _loot;
        swapMeet = _swapMeet;
        hustler = _hustler;
    }

    function claim(uint256 tokenId) public {
        loot.claim(tokenId);
    }

    function open(uint256 tokenId) public {
        swapMeet.open(tokenId);
    }

    function mint() public returns (uint256) {
        return hustler.mint(address(this), '');
    }

    function setApprovalForAll(address operator, bool approved) public {
        swapMeet.setApprovalForAll(operator, approved);
    }

    function setMetadata(
        uint256 id,
        string calldata name,
        string calldata background,
        uint8[4] calldata body,
        uint8 bmask,
        uint256[10] calldata slots,
        uint16 smask
    ) public {
        hustler.setMetadata(id, name, background, body, bmask, slots, smask);
    }

    function transferERC1155(
        address to,
        uint256 tokenId,
        uint256 amount
    ) public {
        swapMeet.safeTransferFrom(address(this), to, tokenId, amount, '0x');
    }
}

contract HustlerOwner is ERC1155Holder {
    SwapMeet swapMeet;
    Hustler hustler;

    function init(SwapMeet _swapMeet, Hustler _hustler) public {
        swapMeet = _swapMeet;
        hustler = _hustler;

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

        hustler.setPalette(0, palette);
    }

    function addBody(bytes calldata body) public {
        hustler.addBody(body);
    }

    function addBodies(bytes[] calldata _bodies) public {
        hustler.addBodies(_bodies);
    }

    function addHead(bytes calldata head) public {
        hustler.addHead(head);
    }

    function addHeads(bytes[] calldata _heads) public {
        hustler.addHeads(_heads);
    }

    function addBeard(bytes calldata beard) public {
        hustler.addBeard(beard);
    }

    function addBeards(bytes[] calldata _beards) public {
        hustler.addBeards(_beards);
    }
}

contract Owner {}

contract HustlerTester is Hustler {
    constructor(address _owner, address _swapmeet) Hustler(_owner, _swapmeet) {}

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

contract HustlerTest is DSTest {
    uint256 internal constant BAG = 10;
    uint256 internal constant OTHER_BAG = 100;
    Hevm internal constant hevm = Hevm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);

    // contracts
    DopeWarsLoot internal loot;
    Components internal components;
    SwapMeetTester internal swapMeet;
    HustlerTester internal hustler;

    // users
    HustlerOwner internal owner;
    HustlerUser internal alice;

    function setUp() public virtual {
        owner = new HustlerOwner();

        // deploy contracts
        loot = new DopeWarsLoot();
        components = new Components(address(owner));
        swapMeet = new SwapMeetTester(address(components), address(loot), address(owner));
        hustler = new HustlerTester(address(owner), address(swapMeet));

        owner.init(swapMeet, hustler);

        // create alice's account & claim a bag
        alice = new HustlerUser(loot, swapMeet, hustler);
        alice.claim(BAG);
        alice.open(BAG);
        assertEq(loot.ownerOf(BAG), address(alice));
    }
}
