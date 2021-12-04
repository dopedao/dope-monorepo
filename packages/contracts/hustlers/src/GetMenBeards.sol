
pragma solidity ^0.8.0;

contract GetMenBeards {
    function getRles() external returns (uint256, bytes[] memory) {
        bytes[] memory rles = new bytes[](13);
        bytes[13] memory _rles = [bytes(hex''),bytes(hex'000e241020010b0200010b0100020b0100'),bytes(hex'000e241020010802000108010002080100'),bytes(hex'000e241020010302000103010002030100'),bytes(hex'000e24102001090200010a0100020a0100'),bytes(hex'000d24111f01050400020502000106010001050306020002060100'),bytes(hex'000d24111f01010400020102000102010001010302020002020100'),bytes(hex'000e230f210204'),bytes(hex'000e230f210203'),bytes(hex'000e230f210207'),bytes(hex'000e241020010002040100010402000104'),bytes(hex'000e241020010002030100010302000103'),bytes(hex'000e241020010002070100010702000107')];
        for (uint256 i = 0; i < rles.length; i++) {
            rles[i] = _rles[i];
        }

        return (4, rles);
    }
}
