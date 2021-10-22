// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import 'ds-test/test.sol';

import { Transform } from '../MetadataBuilder.sol';

contract MetadataBuilder is DSTest {
    bytes private constant drugShadow = hex'00362f37290622';

    function testTransform() public {
        bytes memory a = hex'00362f37290622';
        a[1] = bytes1(uint8(uint16(int16(uint16(uint8(a[1]))) + int16(51))));
        a[2] = bytes1(uint8(uint16(int16(uint16(uint8(a[2]))) + int16(29))));
        a[3] = bytes1(uint8(uint16(int16(uint16(uint8(a[3]))) + int16(51))));
        a[4] = bytes1(uint8(uint16(int16(uint16(uint8(a[4]))) + int16(29))));

        bytes memory b = hex'00362f37290622';
        assertEq(string(Transform.translate(1, b, hex'00331D331D')), string(a));

        bytes memory c = hex'00362f37290622';
        c[2] = bytes1(uint8(uint16(int16(uint16(uint8(c[2]))) + int16(-12))));
        c[4] = bytes1(uint8(uint16(int16(uint16(uint8(c[4]))) + int16(-12))));

        bytes memory d = hex'00362f37290622';
        assertEq(string(Transform.translate(-1, d, hex'00000C000C')), string(c));

        bytes memory e = drugShadow;
        e[2] = bytes1(uint8(uint16(int16(uint16(uint8(e[2]))) + int16(-12))));
        e[4] = bytes1(uint8(uint16(int16(uint16(uint8(e[4]))) + int16(-12))));

        bytes memory f = drugShadow;
        assertEq(string(Transform.translate(-1, f, hex'00000C000C')), string(e));
    }
}
