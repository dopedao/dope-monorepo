pragma solidity ^0.8.0;

import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "./interfaces/IController.sol";

interface IRlesGetter {
    function getRles() external returns (uint256[] memory, bytes[] memory);
}

interface IRlesBodyGetter {
    function getRles() external returns (uint256, bytes[] memory);
}

interface IPaletteGetter {
    function getPalletes() external returns (bytes4[] memory);
}

contract Maintainer is Ownable {
    IController controller;
    uint256 palletIdx = 1;

    constructor(IController controller_) {
        controller = controller_;
    }

    function setPallete(uint8 idx, address getter) external onlyOwner {
        bytes4[] memory p = IPaletteGetter(getter).getPalletes();
        require(idx > palletIdx);
        palletIdx = idx;
        controller.setPalette(idx, p);
    }

    function setRles(address getter) external onlyOwner {
        (uint256[] memory ids, bytes[] memory rles) = IRlesGetter(getter)
            .getRles();
        controller.batchSetItemRle(ids, rles);
    }

    function addAccessory(string calldata component) external onlyOwner {
        controller.addAccessory(component);
    }

    function mintAccessory(
        address to,
        uint8[5] memory components_,
        uint256 amount,
        bytes memory data
    ) external onlyOwner {
        controller.mintAccessory(to, components_, amount, data);
    }

    function addBodyRles(address getter) external onlyOwner {
        (uint256 id, bytes[] memory rles) = IRlesBodyGetter(getter).getRles();
        controller.addBodyRles(uint8(id), rles);
    }

    function setItemRle(
        uint256 id,
        bytes memory male,
        bytes memory female
    ) external onlyOwner {
        controller.setItemRle(id, male, female);
    }
}
