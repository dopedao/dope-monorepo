#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

# MetadataBuilderAddr=$(deploy MetadataBuilder)
# verify MetadataBuilder $MetadataBuilderAddr
# extractABI MetadataBuilder
# log "MetadataBuilder deployed at:" $MetadataBuilderAddr

# Deploy.
# ComponentsAddr="0x6Ea0B51252c34d5fc8CB65F69a58CA5639Cd3835"
# ComponentsAddr=$(deploy Components $ETH_FROM)
# verify Components $ComponentsAddr $ETH_FROM
# extractABI Components
# log "Components deployed at:" $ComponentsAddr

echo "deploy Stockpile $ComponentsAddr $LOOT $ETH_FROM"
StockpileAddr=$(deploy Stockpile $ComponentsAddr $LOOT $ETH_FROM)
verify Stockpile $StockpileAddr $ComponentsAddr $LOOT $ETH_FROM
extractABI Stockpile
log "Stockpile deployed at:" $StockpileAddr

# CharacterAddr=$(deploy Character $StockpileAddr)
# # verify Character $CharacterAddr $StockpileAddr
# extractABI Character
# log "Character deployed at:" $CharacterAddr
