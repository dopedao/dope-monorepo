
pragma solidity ^0.8.0;

contract GetNeck0 {
    function getRles() external returns (uint256[] memory, bytes[] memory) {
        uint256[] memory ids = new uint256[](3);
        uint256[3] memory _ids = [uint256(7),uint256(65543),uint256(131079)];
        for (uint256 i = 0; i < ids.length; i++) {
            ids[i] = _ids[i];
        }

        bytes[] memory rles = new bytes[](6);
        bytes[6] memory _rles = [bytes(hex'011124141f010804000100010802000108020002080100'),hex'011424171f010804000100010802000108020002080100',bytes(hex'011124141f010104000100010102000101020002010100'),hex'011424171f010104000100010102000101020002010100',bytes(hex'011124141f010304000100010302000103020002030100'),hex'011424171f010304000100010302000103020002030100'];
        for (uint256 i = 0; i < rles.length; i++) {
            rles[i] = _rles[i];
        }

        return (ids, rles);
    }
}
