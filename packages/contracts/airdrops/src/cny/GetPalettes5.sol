
pragma solidity ^0.8.0;

contract GetPalettes {
    function getPalletes() external returns (bytes4[] memory) {
        bytes4[] memory palette = new bytes4[](97);
        bytes4[97] memory _palette = [bytes4(hex''),hex'000000ff',hex'c72112ff',hex'e02514ff',hex'4a2f22ff',hex'64402eff',hex'c7967fff',hex'e1aa90ff',hex'ad7a65ff',hex'c88d74ff',hex'a87999ff',hex'f2aeddff',hex'c48db3ff',hex'd79ac4ff',hex'f62578ff',hex'a2828dff',hex'f5e1ebff',hex'000100ff',hex'8a5000ff',hex'f2a54aff',hex'b16600ff',hex'f5e8d7ff',hex'f08a01ff',hex'de3680ff',hex'f1c092ff',hex'f5f5f5ff',hex'0d1114ff',hex'f6c95dff',hex'bf9980ff',hex'773332ff',hex'944548ff',hex'947f83ff',hex'ad9498ff',hex'c72112eb',hex'e02514eb',hex'c77e71ff',hex'a6695eff',hex'e39082ff',hex'b37166ff',hex'f19888ff',hex'e5e4daff',hex'b54f33ff',hex'3e8039ff',hex'a92223ff',hex'db2c2cff',hex'32662eff',hex'254d22ff',hex'766352ff',hex'967c65ff',hex'db7783ff',hex'806955ff',hex'8c745eff',hex'ff6b4bff',hex'ebebebff',hex'd4474fff',hex'992e35ff',hex'bb3941ff',hex'dbd8d3ff',hex'e8e2dcff',hex'f5efe9ff',hex'5b2b41ff',hex'd5943aff',hex'e9a52aff',hex'ccc1b4ff',hex'a62424ff',hex'd5891aff',hex'c5c5c5ff',hex'f0f0f0ff',hex'ab6f15ff',hex'edededff',hex'de5f5fff',hex'e4a673ff',hex'8b9bb4ff',hex'a9b4c2ff',hex'ecf0f1ff',hex'c0ccdcff',hex'5a6988ff',hex'590f08ff',hex'cc9d25ff',hex'fcc02eff',hex'ef6711ff',hex'e3640fff',hex'e45c0cff',hex'ca8b5bff',hex'5f5b7aff',hex'996242ff',hex'3a374aff',hex'a96c48ff',hex'dbd6d0ff',hex'8a6a19ff',hex'b08720ff',hex'a37d1dff',hex'141414ff',hex'262626ff',hex'99190eff',hex'c4c4c4ff',hex'ffffffff'];
        for (uint256 i = 0; i < palette.length; i++) {
            palette[i] = _palette[i];
        }

        return palette;
    }
}
