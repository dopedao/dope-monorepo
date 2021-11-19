// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import 'ds-test/test.sol';

import './Hevm.sol';
import './iOVM_FakeCrossDomainMessenger.sol';

import { iOVM_CrossDomainMessenger } from '../../interfaces/iOVM_CrossDomainMessenger.sol';
import { IController } from '../../interfaces/IController.sol';
import { IHustler, IHustlerActions } from '../../interfaces/IController.sol';
import { Initiator } from '../../Initiator.sol';

import { ERC20 } from '../../../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol';
import { ERC721 } from '../../../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol';

import '@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol';
import '@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol';
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';

contract InitiatorOwner {
    Initiator internal initiator;

    constructor(Initiator initiator_) {
        initiator = initiator_;
    }

    function setRelease(uint256 release) public {
        initiator.setRelease(release);
    }
}

contract InitiatorUser is ERC721Holder, ERC1155Holder {
    Initiator internal initiator;
    iOVM_CrossDomainMessenger internal cdm;
    ERC721 internal dope;
    ERC20 internal paper;

    constructor(
        Initiator initiator_,
        iOVM_CrossDomainMessenger cdm_,
        ERC721 dope_,
        ERC20 paper_
    ) {
        initiator = initiator_;
        cdm = cdm_;
        dope = dope_;
        paper = paper_;
    }

    function mintFromDopeTo(
        uint256 id,
        address to,
        string calldata name,
        bytes4 color,
        bytes4 background,
        bytes2 options,
        uint8[4] calldata viewbox,
        uint8[4] calldata body,
        uint8[10] calldata order,
        bytes2 mask,
        bytes memory data
    ) public {
        IHustlerActions.SetMetadata memory metadata = IHustlerActions.SetMetadata({
            name: name,
            color: color,
            background: background,
            options: options,
            viewbox: viewbox,
            body: body,
            order: order,
            mask: mask
        });
        initiator.mintFromDopeTo(id, to, metadata, data, 1e7);
    }

    function mintOGFromDopeTo(
        uint256 id,
        address to,
        string calldata name,
        bytes4 color,
        bytes4 background,
        bytes2 options,
        uint8[4] calldata viewbox,
        uint8[4] calldata body,
        uint8[10] calldata order,
        bytes2 mask,
        bytes memory data
    ) public payable {
        IHustlerActions.SetMetadata memory metadata = IHustlerActions.SetMetadata({
            name: name,
            color: color,
            background: background,
            options: options,
            viewbox: viewbox,
            body: body,
            order: order,
            mask: mask
        });
        initiator.mintOGFromDopeTo{ value: msg.value }(
            id,
            to,
            metadata,
            data,
            1e7
        );
    }

    function open(
        uint256 id,
        address to,
        bytes memory data
    ) public {
        initiator.open(id, to, data, 1e7);
    }

    function approvePaper(address spender, uint256 amount) public {
        paper.approve(spender, amount);
    }

    function approveDope(address spender) public {
        dope.setApprovalForAll(spender, true);
    }
}

contract InitiatorTester is Initiator {
    constructor(
        ERC721 dope_,
        ERC20 paper_,
        address controller_,
        address cdm_
    ) Initiator(dope_, paper_, controller_) {
        messenger = iOVM_CrossDomainMessenger(cdm_);
    }
}

contract Dope is ERC721 {
    constructor() ERC721('Dope', 'DOPE') {}

    function mint(address to, uint256 id) public {
        _mint(to, id);
    }
}

contract Paper is ERC20 {
    constructor() ERC20('Paper', 'PAPER') {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}

contract FakeController {
    function mintOGTo(
        uint256 dopeId,
        address to,
        IHustler.SetMetadata calldata m,
        bytes memory data
    ) external payable {}

    function mintTo(
        uint256 dopeId,
        address to,
        IHustler.SetMetadata calldata m,
        bytes memory data
    ) external {}

    function open(
        uint256 dopeId,
        address to,
        bytes memory data
    ) external {}
}

contract InitiatorTest is DSTest {
    Hevm internal constant hevm = Hevm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);
    iOVM_FakeCrossDomainMessenger cdm = new iOVM_FakeCrossDomainMessenger();

    // contracts
    Dope internal dope;
    Paper internal paper;
    InitiatorTester internal initiator;
    IController internal controller;

    // users
    InitiatorOwner internal owner;
    InitiatorUser internal user;

    string internal name = 'gangsta';
    bytes4 internal background = hex'000000ff';
    bytes4 internal color = hex'fafafaff';
    uint8[4] internal body;
    uint8[4] internal viewbox;
    uint8[10] internal order;

    function setUp() public virtual {
        dope = new Dope();
        paper = new Paper();
        controller = IController(address(new FakeController()));
        initiator = new InitiatorTester(dope, paper, address(controller), address(cdm));

        owner = new InitiatorOwner(initiator);
        initiator.transferOwnership(address(owner));
        user = new InitiatorUser(initiator, cdm, dope, paper);

        dope.mint(address(user), 1);
        paper.mint(address(user), 1e25);
    }
}
