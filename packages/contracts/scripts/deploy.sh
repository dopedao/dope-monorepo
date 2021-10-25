#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

# MetadataBuilderAddr=$(deploy MetadataBuilder)
# # verify MetadataBuilder $MetadataBuilderAddr
# extractABI MetadataBuilder
# log "MetadataBuilder deployed at:" $MetadataBuilderAddr

# Deploy.
# ComponentsAddr="0xF481855Dd1bC48F95dA1F6dbB0114f20c2fCd0c2"
ComponentsAddr=$(deploy Components $ETH_FROM)
# verify Components $ComponentsAddr $ETH_FROM
extractABI Components
log "Components deployed at:" $ComponentsAddr

# SwapMeetAddr="0x37366C3ba457acB86ef67DBB3d94E21487f23074"
echo "deploy SwapMeet $ComponentsAddr $LOOT $PAPER"
SwapMeetAddr=$(deploy SwapMeet $ComponentsAddr $LOOT $PAPER)
# verify SwapMeet $SwapMeetAddr $ComponentsAddr $LOOT $PAPER
extractABI SwapMeet
log "SwapMeet deployed at:" $SwapMeetAddr

HustlerAddr=$(deploy Hustler $ComponentsAddr $SwapMeetAddr $PAPER)
# verify Hustler $HustlerAddr $SwapMeetAddr
extractABI Hustler
log "Hustler deployed at:" $HustlerAddr
