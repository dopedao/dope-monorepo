#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

# MetadataBuilderAddr=$(deploy MetadataBuilder)
# verify MetadataBuilder $MetadataBuilderAddr
# extractABI MetadataBuilder
# log "MetadataBuilder deployed at:" $MetadataBuilderAddr

# Deploy.
ComponentsAddr="0xA8d1BD7242e85Ea3A97E3B300307247DB92De21B"
# ComponentsAddr=$(deploy Components $ETH_FROM)
# verify Components $ComponentsAddr $ETH_FROM
# extractABI Components
# log "Components deployed at:" $ComponentsAddr

SwapMeetAddr="0xD417FebF055fd149BbD7E9A15194C91554E405Db"
# echo "deploy SwapMeet $ComponentsAddr $LOOT $ETH_FROM"
# SwapMeetAddr=$(deploy SwapMeet $ComponentsAddr $LOOT $ETH_FROM)
# verify SwapMeet $SwapMeetAddr $ComponentsAddr $LOOT $ETH_FROM
# extractABI SwapMeet
# log "SwapMeet deployed at:" $SwapMeetAddr

HustlerAddr=$(deploy Hustler $ETH_FROM $SwapMeetAddr)
# verify Hustler $HustlerAddr $SwapMeetAddr
extractABI Hustler
log "Hustler deployed at:" $HustlerAddr
