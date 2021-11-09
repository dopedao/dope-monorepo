#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

# MetadataBuilderAddr=$(deploy MetadataBuilder)
# # verify MetadataBuilder $MetadataBuilderAddr
# extractABI MetadataBuilder
# log "MetadataBuilder deployed at:" $MetadataBuilderAddr

# Deploy.
ComponentsAddr="0x781B575CA559263eb232B854195D6dC0AB720105"
# ComponentsAddr=$(deploy Components)
# verify Components $ComponentsAddr
# extractABI Components
# log "Components deployed at:" $ComponentsAddr

# SwapMeetAddr="0x39f5042303b671fE1252e80e483e9eeB13b083A3"
echo "deploy SwapMeet $ComponentsAddr $INITIATOR"
SwapMeetAddr=$(deploy SwapMeet $ComponentsAddr $INITIATOR)
# verify SwapMeet $SwapMeetAddr $ComponentsAddr $INITIATOR
extractABI SwapMeet
log "SwapMeet deployed at:" $SwapMeetAddr

# 0x75C64a5C58cE22F382e2324a1ac71b5fB861d703
HustlerAddr=$(deploy Hustler $ComponentsAddr $SwapMeetAddr $INITIATOR)
# verify Hustler $HustlerAddr $SwapMeetAddr
extractABI Hustler
log "Hustler deployed at:" $HustlerAddr
