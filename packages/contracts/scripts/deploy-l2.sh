#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

# 0xd2761Ee62d8772343070A5dE02C436F788EdF60a
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

SwapMeetAddr="0x781A6002A4221c0E52fC283D285b703890024C97"
# echo "deploy SwapMeet $ComponentsAddr"
# SwapMeetAddr=$(deploy SwapMeet $ComponentsAddr)
# # verify SwapMeet $SwapMeetAddr $ComponentsAddr
# extractABI SwapMeet
# log "SwapMeet deployed at:" $SwapMeetAddr

HustlerAddr="0x577d9c7FF9B506d7305194698b4103a3fE3532f0"
# HustlerAddr=$(deploy Hustler $ComponentsAddr $SwapMeetAddr)
# # verify Hustler $HustlerAddr $SwapMeetAddr
# extractABI Hustler
# log "Hustler deployed at:" $HustlerAddr

# 0xe7e8f3b0502Fc1357B5504C8262541Da1472f6De
ControllerAddr=$(deploy Controller $ComponentsAddr $SwapMeetAddr $HustlerAddr)
# verify Controller $ControllerAddr $SwapMeetAddr
extractABI Controller
log "Controller deployed at:" $ControllerAddr