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
import { SwapMeetOwner, SwapMeetTester } from './SwapMeetSetup.sol';

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
        bytes4 color,
        bytes4 background,
        bytes2 options,
        uint8[4] calldata viewbox,
        uint8[4] calldata body,
        bytes2 mask
    ) public {
        hustler.mintFromDope(tokenId, name, color, background, options, viewbox, body, mask, '');
    }

    function mintOGFromDope(
        uint256 tokenId,
        string calldata name,
        bytes4 color,
        bytes4 background,
        bytes2 options,
        uint8[4] calldata viewbox,
        uint8[4] calldata body,
        bytes2 mask,
        bytes memory data
    ) public payable {
        hustler.mintOGFromDope{ value: msg.value }(
            tokenId,
            name,
            color,
            background,
            options,
            viewbox,
            body,
            mask,
            data
        );
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

contract HustlerOwner is ERC1155Holder, SwapMeetOwner {
    Hustler hustler;

    function init(
        Components _components,
        SwapMeet _swapmeet,
        Hustler _hustler
    ) public {
        super.init(_components, _swapmeet);
        hustler = _hustler;
    }

    function addRles(uint8 part, bytes[] calldata _rles) public {
        hustler.addRles(part, _rles);
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

    function setRelease(uint256 timestamp) public {
        hustler.setRelease(timestamp);
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

    function getBody(uint8 slot, uint256 id) public view returns (bytes memory) {
        return rles[slot][id];
    }

    function getHair(uint8 slot, uint256 id) public view returns (bytes memory) {
        return rles[slot][id];
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
