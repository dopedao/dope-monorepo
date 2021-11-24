pragma solidity ^0.8.0;

import '../lib/openzeppelin-contracts/contracts/access/Ownable.sol';
import './interfaces/IHustler.sol';
import './interfaces/ISwapMeet.sol';

interface IRlesGetter {
    function getRles() external returns (uint256[] memory, bytes[] memory);
}

interface IRlesBodyGetter {
    function getRles() external returns (uint256, bytes[] memory);
}

interface IPaletteGetter {
    function getPalletes() external returns (bytes4[] memory, bytes4[] memory);
}

contract SetAll is Ownable {
    IHustler h;
    ISwapMeet sm;

    constructor(IHustler h_, ISwapMeet sm_) {
        h = h_;
        sm = sm_;
    }

    function setPalletes() external onlyOwner {
        (bytes4[] memory hp, bytes4[] memory sp) = IPaletteGetter(0xaa37b6ea5BA775f2736C3726B56d98FF2F6445e6)
            .getPalletes();

        sm.setPalette(0, hp);
        sm.setPalette(1, sp);
    }

    function setRles1() external onlyOwner {
        (uint256[] memory ids, bytes[] memory rles) = IRlesGetter(0x57f32f9c0E2Eb094759Ad76a4101714bae97c379).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0x96D8ED546E5374ED69A03D17d72A799A7A9b29e4).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0xC8011c0158BeA25e1C40Ff84189E494717eF8558).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0x836eEbbA45DCabCFE5108b006A0cEC72A14dB61C).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0xdddF32Ec4f8e1acC3dcd3FBce7869776ba32067e).getRles();
        sm.batchSetRle(ids, rles);
    }

    function setRles2() external onlyOwner {
        (uint256[] memory ids, bytes[] memory rles) = IRlesGetter(0x219f75d739a48701462f2795F6a69770710B0c9d).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0x35c234Ee2E15062324f1232EF9B4c41EA5E85B5c).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0x24c4d2705F6F0D6B6cE37b066a3D74C53B649c20).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0x8F29231Cc91BeA2BFAfd3C6B3CdBAE2f54Cc58f5).getRles();
        sm.batchSetRle(ids, rles);
    }

    function setRles3() external onlyOwner {
        (uint256[] memory ids, bytes[] memory rles) = IRlesGetter(0x7aa8e897d712CFB9C7cb6B37634A1C4d21181c8B).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0x8685bDE610cf4136B7E40A7DA16950C3046e2f32).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0xd2eAB485e9F0199ba2119Aba4dB2937d1459574F).getRles();
        sm.batchSetRle(ids, rles);
    }

    function setRles4() external onlyOwner {
        (uint256[] memory ids, bytes[] memory rles) = IRlesGetter(0x6A99c2696E13b2a2a7f37D2F76F7c024EFC414D2).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0x622f0715DcBf3eaa2F56c25c0603E66F082A3e74).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0x6E49d90806Af9B541DD517B2aCBCb362B25F2Fec).getRles();
        sm.batchSetRle(ids, rles);
    }

    function setMaleBodyRles() external onlyOwner {
        (uint256 id, bytes[] memory rles) = IRlesBodyGetter(0xA92C2ae3E1CAa57B254f5675E77DC38f4e336E60).getRles();
        h.addRles(uint8(id), rles);
    }

    function setFemaleBodyRles() external onlyOwner {
        (uint256 id, bytes[] memory rles) = IRlesBodyGetter(0x275C0c779ccd4D5D3A9d507d8529c943C4d59bCF).getRles();
        h.addRles(uint8(id), rles);
    }

    function setMaleHairRles() external onlyOwner {
        (uint256 id, bytes[] memory rles) = IRlesBodyGetter(0x1F58541635B9dA02Cbe073451046ecAC29b1f582).getRles();
        h.addRles(uint8(id), rles);
    }

    function setFemaleHairRles() external onlyOwner {
        (uint256 id, bytes[] memory rles) = IRlesBodyGetter(0x0Be4Cd601fA9b21dD1cAda6a3893Fd998Bf5970D).getRles();
        h.addRles(uint8(id), rles);
    }

    function setMaleBeardRles() external onlyOwner {
        (uint256 id, bytes[] memory rles) = IRlesBodyGetter(0x3A2077B3de49d58c7eB1C93f8c37A0A524330C4b).getRles();
        h.addRles(uint8(id), rles);
    }

    function setSwapMeetOwner(address newOwner) external onlyOwner {
        Ownable(address(sm)).transferOwnership(newOwner);
    }

    function setHustlerOwner(address newOwner) external onlyOwner {
        Ownable(address(h)).transferOwnership(newOwner);
    }
}