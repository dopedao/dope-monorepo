#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

# MetadataBuilderAddr=$(deploy MetadataBuilder)
# verify MetadataBuilder $MetadataBuilderAddr
# extractABI MetadataBuilder
# log "MetadataBuilder deployed at:" $MetadataBuilderAddr

# export DAPP_LIBRARIES="src/MetadataBuilder.sol:MetadataBuilder:0x407c5d67f08eA7e72a8366e44148f1820CD66F56"

# Deploy.
ComponentsAddr="0xff04FE612D1990fc5756CeE41a3c8439fB7B292d"
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
