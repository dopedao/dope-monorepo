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
