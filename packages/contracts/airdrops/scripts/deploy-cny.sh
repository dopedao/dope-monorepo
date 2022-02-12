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

MERKLE_ROOT=0x9030d52768b363bc813840303521ad0d681b949c302cc51842c3463adf32bb63
HongbaoAddress=$(deploy src/Hongbao.sol:Hongbao "$ARGS" --constructor-args "$MERKLE_ROOT")
echo "Hongbao deployed to: $HongbaoAddress"
