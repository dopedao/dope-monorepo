
pragma solidity ^0.8.0;
// Accessory + Custom Item Palettes Feb 18th 2020
// Baron Davis, etc
contract GetPalettes {
    function getPalletes() external returns (bytes4[] memory) {
        bytes4[] memory palette = new bytes4[](111);
        bytes4[111] memory _palette = [bytes4(hex''),hex'5a90d1ff',hex'4670a3ff',hex'112c4dff',hex'f3ebeeff',hex'183d6bff',hex'223136ff',hex'415d66ff',hex'628b99ff',hex'555555ff',hex'666666ff',hex'111111ff',hex'060606ff',hex'282828ff',hex'090303da',hex'8c837fda',hex'0c0c0cff',hex'78716bda',hex'8d837fda',hex'433735da',hex'060202da',hex'89837cda',hex'88827bda',hex'040202da',hex'959595ff',hex'767676ff',hex'76716bda',hex'131313ff',hex'646464ff',hex'4f4f4fff',hex'ccccccff',hex'161616ff',hex'870101ff',hex'f0f0f0ff',hex'878787ff',hex'ad0202ff',hex'c20303ff',hex'a7a7a7ff',hex'717171ff',hex'a30202ff',hex'a50202ff',hex'720101ff',hex'9ea7afff',hex'000000ff',hex'010302ff',hex'8e92a1ff',hex'a10202ff',hex'700101ff',hex'5c5e69ff',hex'42464fff',hex'95a0a8ff',hex'6b7076ff',hex'282a31ff',hex'666a70ff',hex'020202ff',hex'00000047',hex'c9e1e9ff',hex'a6a19db0',hex'291f1cb0',hex'726866b0',hex'a8a19eb0',hex'2d211fb0',hex'55555fff',hex'3e657fff',hex'93bfceff',hex'5494b0ff',hex'e0e7e9ff',hex'c6cbcdff',hex'989591b0',hex'64c0dcff',hex'd1d8daff',hex'427089ff',hex'85959bff',hex'919da4ff',hex'6b767dff',hex'39444cff',hex'3c464dff',hex'bcd7d5ff',hex'666769ff',hex'5e8096ff',hex'b3b5b5ff',hex'8e8e8fff',hex'606061ff',hex'487e96ff',hex'fff0edff',hex'9fa8a9ff',hex'a8aeacff',hex'ffffffff',hex'575158ff',hex'6e6364ff',hex'b0bbbcff',hex'909798ff',hex'2b4b55ff',hex'a3b1b3ff',hex'8d9ea0ff',hex'b5d3dfff',hex'878e90ff',hex'767d80ff',hex'616266ff',hex'bbc6d3ff',hex'929499ff',hex'2b3f53ff',hex'72757cff',hex'000302ff',hex'243027ff',hex'000601ff',hex'ccd6dfff',hex'a3abb2ff',hex'000902ff',hex'1d2320ff',hex'000300ff'];
        for (uint256 i = 0; i < palette.length; i++) {
            palette[i] = _palette[i];
        }

        return palette;
    }
}
