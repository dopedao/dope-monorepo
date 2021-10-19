#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

# MetadataBuilderAddr=$(deploy MetadataBuilder)
# verify MetadataBuilder $MetadataBuilderAddr
# extractABI MetadataBuilder
# log "MetadataBuilder deployed at:" $MetadataBuilderAddr

# Deploy.
ComponentsAddr="0x1AED242cC9b94Dd2D69fbEE709c343242DA46F3b"
# ComponentsAddr=$(deploy Components $ETH_FROM)
# verify Components $ComponentsAddr $ETH_FROM
# extractABI Components
# log "Components deployed at:" $ComponentsAddr

# SwapMeetAddr="0x51BCEbD85872dF31e4204bcA4e02Daddf0f0Bc40"
# echo "deploy SwapMeet $ComponentsAddr $LOOT $PAPER"
# SwapMeetAddr=$(deploy SwapMeet $ComponentsAddr $LOOT $PAPER)
# # verify SwapMeet $SwapMeetAddr $ComponentsAddr $LOOT $PAPER
# extractABI SwapMeet
# log "SwapMeet deployed at:" $SwapMeetAddr

HustlerAddr=$(deploy Hustler $SwapMeetAddr $PAPER)
# verify Hustler $HustlerAddr $SwapMeetAddr
extractABI Hustler
log "Hustler deployed at:" $HustlerAddr
