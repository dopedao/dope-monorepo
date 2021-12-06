pragma solidity ^0.8.6;

library BitMask {
    uint16 internal constant one = 1;

    function set(bytes2 mask, uint8 n) internal pure returns (bytes2) {
        return mask | bytes2(one << n);
    }

    function unset(bytes2 mask, uint8 n) internal pure returns (bytes2) {
        return mask & (bytes2((one << n)) ^ bytes2(type(uint16).max));
    }

    function get(bytes2 mask, uint8 n) internal pure returns (bool) {
        return mask & bytes2(one << n) != 0;
    }
}
