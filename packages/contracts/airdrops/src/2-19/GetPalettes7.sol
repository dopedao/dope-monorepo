
pragma solidity ^0.8.0;

contract GetPalettes {
    function getPalletes() external returns (bytes4[] memory) {
        bytes4[] memory palette = new bytes4[](127);
        bytes4[127] memory _palette = [bytes4(hex''),hex'e1e1e121',hex'e1e1e12e',hex'e1e1e146',hex'e1e1e13f',hex'e1e1e139',hex'e1e1e14e',hex'e1e1e157',hex'e1e1e161',hex'e1e1e186',hex'e1e1e178',hex'e1e1e16c',hex'e1e1e1a6',hex'dededeff',hex'8f2f03ff',hex'e1e1e1ce',hex'0d1114ff',hex'262626ff',hex'343434ff',hex'd6b14bff',hex'f8ce58ff',hex'7c672aff',hex'1a1507ff',hex'ccc7bcff',hex'e0dbceff',hex'f7f1e4ff',hex'8a0015ff',hex'b4001bff',hex'000000ff',hex'3d3d3dff',hex'051438ff',hex'012c54ff',hex'ffdb38ff',hex'ad3737ff',hex'cc4141ff',hex'd6b82fff',hex'4e251fff',hex'a35521ff',hex'ba6125ff',hex'd36d2bff',hex'66541eff',hex'c9a599ff',hex'ebc1b3ff',hex'75abd1ff',hex'82bee8ff',hex'808080ff',hex'402c25ff',hex'd0d1d2bf',hex'585651ff',hex'000000cc',hex'252d33ff',hex'495563ff',hex'0d0d0dff',hex'1c1c1cff',hex'990017ff',hex'b3001bff',hex'cc001fff',hex'0000009e',hex'fcc02eff',hex'6e6b65a7',hex'404040ff',hex'616161ff',hex'c81721ff',hex'ff3225ff',hex'fcfcfcff',hex'999999ff',hex'38473eff',hex'678271ff',hex'f3ebee11',hex'f3ebee02',hex'f3ebee21',hex'f3ebee25',hex'f3ebee2c',hex'f3ebee30',hex'f3ebee01',hex'f3ebee1f',hex'f3ebee24',hex'f3ebee28',hex'f3ebee34',hex'f3ebee35',hex'f3ebee39',hex'f3ebee05',hex'f3ebee20',hex'f3ebee0d',hex'f3ebee0c',hex'f3ebee5b',hex'f3ebee54',hex'f3ebee4d',hex'f3ebee44',hex'f3ebee3d',hex'f3ebee70',hex'd9d2d5ff',hex'333333ff',hex'151f26ff',hex'212f3bff',hex'f3ebeeff',hex'c2bcbeff',hex'06090dff',hex'162232ff',hex'757294ff',hex'595670ff',hex'514f66ff',hex'1a1a1aff',hex'121212ff',hex'79808cff',hex'a0aabacc',hex'4670a3ff',hex'5a90d1ff',hex'c7d7d9ff',hex'51a6b0ff',hex'0e3ec2ff',hex'0f46dbff',hex'1251ffff',hex'e4e810ff',hex'e05a5aff',hex'fbff12ff',hex'5ae06eff',hex'595959ff',hex'6b4723ff',hex'8f5f2fff',hex'1a206aff',hex'222c90ff',hex'b38c00ff',hex'91bfb6e6',hex'c41a1aff',hex'f7fa34ff',hex'd41c1cff'];
        for (uint256 i = 0; i < palette.length; i++) {
            palette[i] = _palette[i];
        }

        return palette;
    }
}
