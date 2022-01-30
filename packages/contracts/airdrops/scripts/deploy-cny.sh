#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

pushd $(dirname "$0")/..

ARGS=${@:1}

# GetPalettes5Address=$(deploy src/cny/GetPalettes5.sol:GetPalettes "$ARGS")
# echo "GetPalettes deployed to: $GetPalettes5Address"

# GetCnyPart0Address=$(deploy src/cny/GetCnyPart0.sol:GetCnyPart0 "$ARGS")
# echo "GetCnyPart0 deployed to: $GetCnyPart0Address"

MERKLE_ROOT=0x4bd639ce9ef44ec0b0719484203109cf1f2a4a5b1dbd6aec2d6ef478ee088b67
HongbaoAddress=$(deploy src/Hongbao.sol:Hongbao "$ARGS" --constructor-args "$MERKLE_ROOT")
echo "Hongbao deployed to: $HongbaoAddress"
