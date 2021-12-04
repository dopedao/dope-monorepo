// SPDX-License-Identifier: GPL-3.0

/// @title Interface for Hustler

pragma solidity ^0.8.6;

interface IComponents {
    function addComponent(uint8 componentType, string calldata component) external returns (uint8);
}
