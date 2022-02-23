// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from 'openzeppelin-contracts/token/ERC20/ERC20.sol';
import { ERC20Permit } from 'openzeppelin-contracts/token/ERC20/extensions/draft-ERC20Permit.sol';
import { Ownable } from 'openzeppelin-contracts/access/Ownable.sol';
import { L2ERC20Votes } from 'rollcall/standards/L2ERC20Votes.sol';
import { IL2VotingERC20 } from 'rollcall/standards/IL2VotingERC20.sol';

contract StreetCred is ERC20, ERC20Permit, L2ERC20Votes, Ownable {
    /**
     * @param _name ERC20 name.
     * @param _symbol ERC20 symbol.
     */
    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) ERC20Permit(_name) {}

    function mint(address _to, uint256 _amount) public virtual onlyOwner {
        _mint(_to, _amount);
    }

    function burn(address _from, uint256 _amount) public virtual onlyOwner {
        _burn(_from, _amount);
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
