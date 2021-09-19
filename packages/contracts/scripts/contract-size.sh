#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

contract_size=$(contract_size Stockpile 0x7988fCA891B30cF8E23459B09b851F9d79B17215./scripts/cont)
echo "Contract Name: Stockpile"
echo "Contract Size: ${contract_size} bytes"
echo "$(( 24576 - ${contract_size} )) bytes left to reach the smart contract size limit of 24576 bytes."