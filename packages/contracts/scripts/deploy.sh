#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

# MultiPartRLEToSVGAddr=$(deploy MultiPartRLEToSVG)
# verify MultiPartRLEToSVG $MultiPartRLEToSVGAddr
# extractABI MultiPartRLEToSVG
# log "MultiPartRLEToSVG deployed at:" $MultiPartRLEToSVGAddr

# export DAPP_LIBRARIES="src/MultiPartRLEToSVG.sol:MultiPartRLEToSVG:0xb073d5395d2ef1649c4f60dafd2301f54ad648ec"

# Deploy.
ComponentsAddr="0xBf0fef342E3b43649fB5C8D61A9BC1e8061DF89A"
# $(deploy DopeComponents $ETH_FROM)
# # verify DopeComponents $ComponentsAddr $LOOT
# extractABI DopeComponents
# log "DopeComponents deployed at:" $ComponentsAddr

echo "deploy Stockpile $ComponentsAddr $LOOT $ETH_FROM"
StockpileAddr=$(deploy Stockpile $ComponentsAddr $LOOT $ETH_FROM)
verify Stockpile $StockpileAddr $ComponentsAddr $LOOT $ETH_FROM
extractABI Stockpile
log "Stockpile deployed at:" $StockpileAddr

# CharacterAddr=$(deploy Character $StockpileAddr)
# # verify Character $CharacterAddr $StockpileAddr
# extractABI Character
# log "Character deployed at:" $CharacterAddr
