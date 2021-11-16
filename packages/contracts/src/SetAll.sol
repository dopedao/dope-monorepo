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
    IHustler h = IHustler(0x577d9c7FF9B506d7305194698b4103a3fE3532f0);
    ISwapMeet sm = ISwapMeet(0x781A6002A4221c0E52fC283D285b703890024C97);

    function setPalletes() external onlyOwner {
        (bytes4[] memory hp, bytes4[] memory sp) = IPaletteGetter(0x8855262C25E52A718b705a4F12C7D07d81De45F4)
            .getPalletes();

        sm.setPalette(0, hp);
        sm.setPalette(1, sp);
    }

    function setRles1() external onlyOwner {
        (uint256[] memory ids, bytes[] memory rles) = IRlesGetter(0xFC76625c44Ed19dE5D30b80d80F0804a7f27CF04).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0x1dB3760593Fe0F4343770b05FD265066A5200F42).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0x6459C3D043b169219Ef0a3459FF38497f0761274).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0x94403d345577936324b5631423bdC2e022f6f2a4).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0x9a9c457e76a66eDd992beD7C8F8d768fFd4f062f).getRles();
        sm.batchSetRle(ids, rles);
    }

    function setRles2() external onlyOwner {
        (uint256[] memory ids, bytes[] memory rles) = IRlesGetter(0xFC5f8ec50dd016e50c3adEF302471744286f634f).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0x9F7338554a9EA465735f9d59d2fDc13fdDff1C77).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0x5A13B6f74F7b049cB93e19038FF71938183D0F17).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0x3389d5543a931904B987108C33c9fFFdadBB4200).getRles();
        sm.batchSetRle(ids, rles);
    }

    function setRles3() external onlyOwner {
        (uint256[] memory ids, bytes[] memory rles) = IRlesGetter(0x985e193663884E1368B56006B70A0C1E8471384a).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0x2Ac1EE3A5a3d587D11717Dd8848608f07E4e1b5B).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0x6c766C4b9e251A58F751EcA039d21b407934e2a6).getRles();
        sm.batchSetRle(ids, rles);
    }

    function setRles4() external onlyOwner {
        (uint256[] memory ids, bytes[] memory rles) = IRlesGetter(0xd2f0A91764e04815f910d0a4B1b77F5E8485aDB1).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0x4954dca38907ce7DCC25153f8c56a297B83F7D1A).getRles();
        sm.batchSetRle(ids, rles);

        (ids, rles) = IRlesGetter(0x8eC7EFeB566a4f0f83A2AC17856378761f9546fB).getRles();
        sm.batchSetRle(ids, rles);
    }

    function setMaleBodyRles() external onlyOwner {
        (uint256 id, bytes[] memory rles) = IRlesBodyGetter(0xA7851a40f6B3FeE29EC04A4C38b381c47EDf3bdD).getRles();
        h.addRles(uint8(id), rles);
    }

    function setFemaleBodyRles() external onlyOwner {
        (uint256 id, bytes[] memory rles) = IRlesBodyGetter(0x5eFe3Ffb56CE36F1e67C36e85Dfa532d1F3B865f).getRles();
        h.addRles(uint8(id), rles);
    }

    function setMaleHairRles() external onlyOwner {
        (uint256 id, bytes[] memory rles) = IRlesBodyGetter(0x8F4099E5E7AeBb455DA286e1f2300834F3f5B59E).getRles();
        h.addRles(uint8(id), rles);
    }

    function setFemaleHairRles() external onlyOwner {
        (uint256 id, bytes[] memory rles) = IRlesBodyGetter(0xeE6Ba2715e49983351F4F871613Bce5E173c137d).getRles();
        h.addRles(uint8(id), rles);
    }

    function setMaleBeardRles() external onlyOwner {
        (uint256 id, bytes[] memory rles) = IRlesBodyGetter(0x47Df09c7a80b6a357F99cDd9a0Af4339fED27faA).getRles();
        h.addRles(uint8(id), rles);
    }

    function setSwapMeetOwner(address newOwner) external onlyOwner {
        Ownable(address(sm)).transferOwnership(newOwner);
    }

    function setHustlerOwner(address newOwner) external onlyOwner {
        Ownable(address(h)).transferOwnership(newOwner);
    }
}
