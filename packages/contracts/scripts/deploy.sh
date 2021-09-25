#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

# Deploy.
StockpileAddr=$(deploy Stockpile $LOOT $ETH_FROM)
# verify Stockpile $StockpileAddr $LOOT
extractABI Stockpile
log "Stockpile deployed at:" $StockpileAddr

# CharacterAddr=$(deploy Character $StockpileAddr)
# # verify Character $CharacterAddr $StockpileAddr
# extractABI Character
# log "Character deployed at:" $CharacterAddr
