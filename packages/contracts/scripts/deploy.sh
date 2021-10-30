#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

# MetadataBuilderAddr=$(deploy MetadataBuilder)
# # verify MetadataBuilder $MetadataBuilderAddr
# extractABI MetadataBuilder
# log "MetadataBuilder deployed at:" $MetadataBuilderAddr

# Deploy.
ComponentsAddr="0x3f69057d320b5b0d58f6b15d440c1f5b9bb6ee08"
# ComponentsAddr=$(deploy Components $ETH_FROM)
# # verify Components $ComponentsAddr $ETH_FROM
# extractABI Components
# log "Components deployed at:" $ComponentsAddr

# SwapMeetAddr="0x52aA7619E1eCEEbCBFF7d26C749488d6AD888516"
echo "deploy SwapMeet $ComponentsAddr $LOOT $PAPER"
SwapMeetAddr=$(deploy SwapMeet $ComponentsAddr $LOOT $PAPER)
# verify SwapMeet $SwapMeetAddr $ComponentsAddr $LOOT $PAPER
extractABI SwapMeet
log "SwapMeet deployed at:" $SwapMeetAddr

HustlerAddr=$(deploy Hustler $ComponentsAddr $SwapMeetAddr $PAPER)
# verify Hustler $HustlerAddr $SwapMeetAddr
extractABI Hustler
log "Hustler deployed at:" $HustlerAddr
