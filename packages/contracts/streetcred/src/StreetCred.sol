// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from 'openzeppelin-contracts/token/ERC20/ERC20.sol';
import { ERC20Permit } from 'openzeppelin-contracts/token/ERC20/extensions/draft-ERC20Permit.sol';
import { AccessControl } from 'openzeppelin-contracts/access/AccessControl.sol';
import { L2ERC20Votes } from 'rollcall/standards/L2ERC20Votes.sol';
import { IL2VotingERC20 } from 'rollcall/standards/IL2VotingERC20.sol';

contract StreetCred is ERC20, ERC20Permit, L2ERC20Votes, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256('MINTER_ROLE');
    bytes32 public constant BURNER_ROLE = keccak256('BURNER_ROLE');
    bytes32 public constant TRANSFERRER_ROLE = keccak256('TRANSFERRER_ROLE');

    constructor() ERC20('Streetcred', 'STREETCRED') ERC20Permit('Streetcred') {}

    function mint(address _to, uint256 _amount) public virtual onlyRole(MINTER_ROLE) {
        _mint(_to, _amount);
    }

    function burn(address _from, uint256 _amount) public virtual onlyRole(BURNER_ROLE) {
        _burn(_from, _amount);
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public override onlyRole(TRANSFERRER_ROLE) returns (bool) {
        return super.transferFrom(from, to, amount);
    }

    function transfer(address to, uint256 amount) public override onlyRole(TRANSFERRER_ROLE) returns (bool) {
        return super.transfer(to, amount);
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, L2ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override(ERC20, L2ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount) internal override(ERC20, L2ERC20Votes) {
        super._burn(account, amount);
    }
}
