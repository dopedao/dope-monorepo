
pragma solidity ^0.8.0;

contract GetPalettes2 {
    function getPalletes() external returns (bytes4[] memory) {
        bytes4[] memory palette = new bytes4[](140);
        bytes4[140] memory _palette = [bytes4(hex''),hex'f1f6ffff',hex'e5ebf3ff',hex'87858eff',hex'372b2b94',hex'c3b9b694',hex'b2aca794',hex'c2b9b694',hex'85777694',hex'31212094',hex'c2b8b594',hex'c1b7b494',hex'30242494',hex'c2bcc6ff',hex'a3a0a9ff',hex'a1b3cdff',hex'7f8da3ff',hex'dee8faff',hex'6badcbff',hex'5891adff',hex'51829bff',hex'7f8cbeff',hex'426c82ff',hex'd7b8bbff',hex'f2d0d2ff',hex'398198ff',hex'000601ff',hex'243027ff',hex'20281fff',hex'd1dbecff',hex'dbdaebff',hex'c2cadbff',hex'000902ff',hex'8c9eafff',hex'b7beceff',hex'b3c9dfff',hex'bab7c5ff',hex'000300ff',hex'2b2e2bff',hex'00000047',hex'484e67ff',hex'35394cff',hex'1e212dff',hex'131a21ff',hex'382b2b9e',hex'c3b8b59e',hex'3222209e',hex'b3aba69e',hex'c4b9b69e',hex'8677769e',hex'3223239e',hex'c2b7b49e',hex'c1b6b39e',hex'0f1113ff',hex'5e6584ff',hex'6f7bb0ff',hex'617cadff',hex'a0c8f2ff',hex'b2aebaff',hex'a292a5ff',hex'4b7088ff',hex'a7bfd2ff',hex'454a51ff',hex'76322eff',hex'd8edf1ff',hex'fc544aff',hex'004464ff',hex'ccd6dfff',hex'be4d50ff',hex'8d949bff',hex'98423fff',hex'cc7421ff',hex'000000ff',hex'5a6c82ff',hex'29333eff',hex'4721219e',hex'd3b5ab9e',hex'4821219e',hex'd3b6ab9e',hex'1a2129ff',hex'3a4554ff',hex'c0ab9d9e',hex'd3b4ab9e',hex'9b6a689e',hex'9b6b699e',hex'd2b4aa9e',hex'40191a9e',hex'c1a99d9e',hex'9b69689e',hex'4720209e',hex'4621219e',hex'd3b5ac9e',hex'c0a99d9e',hex'9b6a699e',hex'd4b6ab9e',hex'9c6b699e',hex'3f19199e',hex'4722229e',hex'd4b5ac9e',hex'd4b5ab9e',hex'c2ab9d9e',hex'd4b6ac9e',hex'9a69679e',hex'd2b4ab9e',hex'd6b7ac9e',hex'c1aa9d9e',hex'9b6b689e',hex'cdd5dfff',hex'b1b3b1ff',hex'c2ab9e9e',hex'9b69679e',hex'9fa5adff',hex'bdc4ceff',hex'939595ff',hex'c1aa9c9e',hex'8e939bff',hex'3a4654ff',hex'0e1319ff',hex'394758ff',hex'e6dbddff',hex'29313eff',hex'141921ff',hex'242c38ff',hex'252a26ff',hex'596266ff',hex'9fc1d4ff',hex'4a5a6bff',hex'd0eef2ff',hex'2a343fff',hex'2f3b48ff',hex'9dc1d4ff',hex'475364ff',hex'000301ff',hex'762222ff',hex'585d61ff',hex'44474cff',hex'5e6166ff',hex'777b81ff',hex'2a2d30ff',hex'a5adb5ff'];
        for (uint256 i = 0; i < palette.length; i++) {
            palette[i] = _palette[i];
        }

        return palette;
    }
}
