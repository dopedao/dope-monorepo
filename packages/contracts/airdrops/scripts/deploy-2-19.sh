#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

pushd $(dirname "$0")/..

ARGS=${@:1}

# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 9 "Helmet" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 9 "Flower" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 9 "Smoke" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 9 "Headphones" $ARGS

# 0x6dbd6a32627b7165ed97f54d80016dcdd76a67ab
GetPalettes7Address=$(deploy src/2-19/GetPalettes7.sol:GetPalettes "$ARGS")
echo "GetPalettes7 deployed to: $GetPalettes7Address"

# 0xc15617ca2bd59bf949ad3e7122dc7461d86549bd
GetAccessoriesPart0Address=$(deploy src/2-19/GetAccessoriesPart0.sol:GetAccessoriesPart0 "$ARGS")
echo "GetAccessoriesPart0 deployed to: $GetAccessoriesPart0Address"