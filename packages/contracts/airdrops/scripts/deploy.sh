#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

pushd $(dirname "$0")/..

ARGS=${@:1}

HongbaoAddress=$(deploy src/Hongbao.sol:Hongbao "$ARGS" --constructor-args "$MERKLE_ROOT")
echo "Hongbao deployed to: $HongbaoAddress"
