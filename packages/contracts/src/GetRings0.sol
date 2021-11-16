
pragma solidity ^0.8.0;

contract GetRings0 {
    function getRles() external returns (uint256[] memory, bytes[] memory) {
        uint256[] memory ids = new uint256[](7);
        uint256[7] memory _ids = [uint256(65544),uint256(196616),uint256(8),uint256(393224),uint256(262152),uint256(327688),uint256(131080)];
        for (uint256 i = 0; i < ids.length; i++) {
            ids[i] = _ids[i];
        }

        bytes[] memory rles = new bytes[](14);
        bytes[14] memory _rles = [bytes(hex'01222723260101'),hex'01222623250101',bytes(hex'01222723260102'),hex'01222623250102',bytes(hex'01222723260103'),hex'01222623250103',bytes(hex'01202621250104'),hex'01202521240104',bytes(hex'01222723260105'),hex'01222623250105',bytes(hex'01222723260106'),hex'01222623250106',bytes(hex'01222723260107'),hex'01222623250107'];
        for (uint256 i = 0; i < rles.length; i++) {
            rles[i] = _rles[i];
        }

        return (ids, rles);
    }
}
