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
# Optimism Kovan
# ComponentsAddr="0xA9d6Ef18457c4d87Ba77d5c22569c93a41b8f326"
# Optimism
ComponentsAddr="0xe03C4eb2a0a797766a5DB708172e04f6A970DC7f"
# ComponentsAddr=$(deploy Components)
# log "Components deployed at:" $ComponentsAddr

# Optimism Kovan
# SwapMeetAddr="0x781A6002A4221c0E52fC283D285b703890024C97"
# Optimism
SwapMeetAddr="0x0E55e1913C50e015e0F60386ff56A4Bfb00D7110"
# SwapMeetAddr=$(deploy SwapMeet $ComponentsAddr)
# log "SwapMeet deployed at:" $SwapMeetAddr

# Optimism Kovan
# HustlerAddr="0x577d9c7FF9B506d7305194698b4103a3fE3532f0"
# Optimism
HustlerAddr="0xDbfEaAe58B6dA8901a8a40ba0712bEB2EE18368E"
# HustlerAddr=$(deploy Hustler $ComponentsAddr $SwapMeetAddr)
# log "Hustler deployed at:" $HustlerAddr

# Optimism Kovan
# 0xe7e8f3b0502Fc1357B5504C8262541Da1472f6De
# Optimism
# 0xd48055cbd433d93F1Aa000dfCd6EC36F39C0FDB6
ControllerAddr=$(deploy Controller $ComponentsAddr $SwapMeetAddr $HustlerAddr)
log "Controller deployed at:" $ControllerAddr

# GetPalettesAddr=$(deploy GetPalettes)
# log "GetPalettes deployed at:" $GetPalettesAddr

# GetAccessories0Addr=$(deploy GetAccessories0)
# log "GetAccessories0 deployed at:" $GetAccessories0Addr

# GetClothes0Addr=$(deploy GetClothes0)
# log "GetClothes0 deployed at:" $GetClothes0Addr

# GetClothes1Addr=$(deploy GetClothes1)
# log "GetClothes1 deployed at:" $GetClothes1Addr

# GetClothes2Addr=$(deploy GetClothes2)
# log "GetClothes2 deployed at:" $GetClothes2Addr

# GetDrugs0Addr=$(deploy GetDrugs0)
# log "GetDrugs0 deployed at:" $GetDrugs0Addr

# GetHands0Addr=$(deploy GetHands0)
# log "GetHands0 deployed at:" $GetHands0Addr

# GetNeck0Addr=$(deploy GetNeck0)
# log "GetNeck0 deployed at:" $GetNeck0Addr

# GetRings0Addr=$(deploy GetRings0)
# log "GetRings0 deployed at:" $GetRings0Addr

# GetShoes0Addr=$(deploy GetShoes0)
# log "GetShoes0 deployed at:" $GetShoes0Addr

# GetVehicles0Addr=$(deploy GetVehicles0)
# log "GetVehicles0 deployed at:" $GetVehicles0Addr

# GetVehicles1Addr=$(deploy GetVehicles1)
# log "GetVehicles1 deployed at:" $GetVehicles1Addr

# GetVehicles2Addr=$(deploy GetVehicles2)
# log "GetVehicles2 deployed at:" $GetVehicles2Addr

# GetVehicles3Addr=$(deploy GetVehicles3)
# log "GetVehicles3 deployed at:" $GetVehicles3Addr

# GetVehicles4Addr=$(deploy GetVehicles4)
# log "GetVehicles4 deployed at:" $GetVehicles4Addr

# GetWaist0Addr=$(deploy GetWaist0)
# log "GetWaist0 deployed at:" $GetWaist0Addr

# GetWeapons0Addr=$(deploy GetWeapons0)
# log "GetWeapons0 deployed at:" $GetWeapons0Addr

# GetWomenBodiesAddr=$(deploy GetWomenBodies)
# log "GetWomenBodies deployed at:" $GetWomenBodiesAddr

# GetWomenHairAddr=$(deploy GetWomenHair)
# log "GetWomenHair deployed at:" $GetWomenHairAddr

# GetMenBodiesAddr=$(deploy GetMenBodies)
# log "GetMenBodies deployed at:" $GetMenBodiesAddr

# GetMenHairAddr=$(deploy GetMenHair)
# log "GetMenHair deployed at:" $GetMenHairAddr

# GetMenBeardsAddr=$(deploy GetMenBeards)
# log "GetMenBeards deployed at:" $GetMenBeardsAddr

SetAllAddr=$(deploy SetAll $HustlerAddr $SwapMeetAddr)
log "SetAll deployed at:" $SetAllAddr
