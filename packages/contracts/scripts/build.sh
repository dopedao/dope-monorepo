#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

dapp build
extractABI Stockpile
extractABI Character

yarn build