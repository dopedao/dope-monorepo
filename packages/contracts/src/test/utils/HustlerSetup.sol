// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import 'ds-test/test.sol';

import './Hevm.sol';
import '../../DopeWarsLoot.sol';
import './iOVM_FakeCrossDomainMessenger.sol';
import { Paper } from '../../Paper.sol';
import { Hustler } from '../../Hustler.sol';
import { RleParts } from '../../HustlerMetadata.sol';
import { SwapMeet } from '../../SwapMeet.sol';
import { Components, ComponentTypes } from '../../Components.sol';
import { SwapMeetOwner, SwapMeetTester } from './SwapMeetSetup.sol';
import { iOVM_CrossDomainMessenger } from '../../interfaces/iOVM_CrossDomainMessenger.sol';
import { ISwapMeet } from '../../interfaces/ISwapMeet.sol';
import { IHustler } from '../../interfaces/IHustler.sol';

import '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';
import '@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol';

contract HustlerUser is ERC1155Holder, ERC721Holder {
    iOVM_CrossDomainMessenger cdm;
    DopeWarsLoot dope;
    SwapMeet swapmeet;
    Hustler hustler;

    constructor(DopeWarsLoot _dope, iOVM_CrossDomainMessenger _cdm) {
        dope = _dope;
        cdm = _cdm;
    }

    function setSwapMeet(SwapMeet _swapmeet) public {
        swapmeet = _swapmeet;
    }

    function setHustler(Hustler _hustler) public {
        hustler = _hustler;
    }

    function claim(uint256 tokenId) public {
        dope.claim(tokenId);
    }

    function open(
        uint256 id,
        address to,
        bytes memory data
    ) public {
        bytes memory message = abi.encodeWithSelector(ISwapMeet.open.selector, id, to, data);
        cdm.sendMessage(address(swapmeet), message, 1000000);
    }

    function mint() public {
        hustler.mintTo(address(this), '');
    }

    function mint(
        string calldata name,
        bytes4 color,
        bytes4 background,
        bytes2 options,
        uint8[4] calldata viewbox,
        uint8[4] calldata body,
        bytes2 mask
    ) public {
        hustler.mintTo(address(this), name, color, background, options, viewbox, body, mask, '');
    }

    function mintOG(
        uint256 id,
        string calldata name,
        bytes4 color,
        bytes4 background,
        bytes2 options,
        uint8[4] calldata viewbox,
        uint8[4] calldata body,
        bytes2 mask,
        bytes memory data
    ) public payable {
        bytes memory message = abi.encodeWithSelector(
            IHustler.mintOGTo.selector,
            id,
            address(this),
            name,
            color,
            background,
            options,
            viewbox,
            body,
            mask,
            data
        );
        cdm.sendMessage(address(hustler), message, 1000000);
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
}

contract Enforcer {
    bool shouldRevert;
    bool shouldReset = true;

    function set(bool r, bool t) external {
        shouldRevert = r;
        shouldReset = t;
    }

    function onERC1155BatchReceived(
        address,
        address,
        uint256[] calldata,
        uint256[] calldata,
        bytes calldata
    ) external view {
        require(!shouldRevert);
    }

    function onERC1155Received(
        address,
        address,
        uint256,
        uint256,
        bytes memory
    ) external view {
        require(!shouldRevert);
    }

    function onUnequip(uint256, uint8[] calldata) external view {
        require(!shouldRevert);
    }

    function beforeTokenTransfer(
        address,
        address,
        address,
        uint256[] memory,
        uint256[] memory,
        bytes memory
    ) external view returns (bool) {
        require(!shouldRevert);
        return shouldReset;
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

    function setEnforcer(address b) public {
        hustler.setEnforcer(b);
    }
}

contract Owner {}

contract HustlerTester is Hustler {
    constructor(
        address _owner,
        address _components,
        address _swapmeet,
        address _initiator,
        iOVM_CrossDomainMessenger cdm
    ) Hustler(_components, _swapmeet, _initiator) {
        ovmL2CrossDomainMessenger = cdm;
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
    Components internal components;
    SwapMeetTester internal swapmeet;
    HustlerTester internal hustler;
    iOVM_FakeCrossDomainMessenger internal cdm;

    // users
    HustlerOwner internal owner;
    HustlerUser internal alice;
    HustlerUser internal bob;

    function setUp() public virtual {
        cdm = new iOVM_FakeCrossDomainMessenger();
        owner = new HustlerOwner();

        // deploy contracts
        dope = new DopeWarsLoot();
        components = new Components();
        components.transferOwnership(address(owner));
        alice = new HustlerUser(dope, cdm);
        swapmeet = new SwapMeetTester(address(components), address(alice), cdm, address(owner));
        hustler = new HustlerTester(address(owner), address(components), address(swapmeet), address(alice), cdm);
        alice.setSwapMeet(swapmeet);
        alice.setHustler(hustler);

        owner.init(components, swapmeet, hustler);

        alice.claim(BAG);
        alice.open(BAG, address(alice), '');
        assertEq(dope.ownerOf(BAG), address(alice));

        alice.claim(OTHER_BAG);

        uint8[5] memory _components;
        _components[0] = owner.addItemComponent(ComponentTypes.ACCESSORY, 'hat');
        ACCESSORY = owner.mintItem(address(alice), _components, ComponentTypes.ACCESSORY, 1, '');

        bob = new HustlerUser(dope, cdm);
        bob.setSwapMeet(swapmeet);
        bob.setHustler(hustler);
    }
}
