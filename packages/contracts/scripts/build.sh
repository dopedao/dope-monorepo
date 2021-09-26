#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

dapp build

extractABI DopeComponents
extractABI Stockpile
extractABI Character
extractABI Paper