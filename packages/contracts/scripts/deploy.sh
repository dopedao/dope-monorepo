#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

# Deploy.
ComponentsAddr=$(deploy DopeComponents $ETH_FROM)
# verify DopeComponents $ComponentsAddr $LOOT
extractABI DopeComponents
log "DopeComponents deployed at:" $ComponentsAddr

StockpileAddr=$(deploy Stockpile $ComponentsAddr $LOOT $ETH_FROM)
# verify Stockpile $StockpileAddr $LOOT
extractABI Stockpile
log "Stockpile deployed at:" $StockpileAddr

# CharacterAddr=$(deploy Character $StockpileAddr)
# # verify Character $CharacterAddr $StockpileAddr
# extractABI Character
# log "Character deployed at:" $CharacterAddr
