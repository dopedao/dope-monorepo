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

MERKLE_ROOT=0x9e2ed0dc390ce7f5dd5ab6e3de690a616723a2266bbeb7744bf13a1958f084b6
HongbaoAddress=$(deploy src/Hongbao.sol:Hongbao "$ARGS" --constructor-args "$MERKLE_ROOT")
echo "Hongbao deployed to: $HongbaoAddress"
