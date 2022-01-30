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
# ControllerAddr="0x99A89AF659d5AF027b3d94BB0B169873b46d6351"
# Optimism
ControllerAddr="0x124760902088dDBFEb8F27210D3B0C645a5c0A8B"
# ControllerAddr=$(deploy Controller $ComponentsAddr $SwapMeetAddr $HustlerAddr)
# log "Controller deployed at:" $ControllerAddr

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

# SetAllAddr=$(deploy SetAll $HustlerAddr $SwapMeetAddr)
# log "SetAll deployed at:" $SetAllAddr

# Kovan: 0xC1Ee03237699f94483002058B041882992473533
# Optimism: 0xb949A2648cf9209AAa1EeA5DBc65B7AAAEdC78dc
# MaintainerAddr=$(deploy Maintainer $ControllerAddr)
# log "Maintainer deployed at:" $MaintainerAddr

# # # Kovan: 0x7649e4fA685cfc1643c7D483bE68D3aCa15453Dc
# Optimism: 0x498d99dffd9be5b55490335f6f9df8801fdc094e
# GetPalettes1Addr=$(deploy GetPalettes1)
# log "GetPalettes1 deployed at:" $GetPalettes1Addr

# # Kovan: 0xeB781c5a2a7e94f4b99F458E9De7341Fa4A34715
# # Optimism: 0xB67D6f71F0d148C2d21740Df961a5c004E36BbC8
# GetPalettes2Addr=$(deploy GetPalettes2)
# log "GetPalettes2 deployed at:" $GetPalettes2Addr

# # Kovan: 0x359681DAC5277525a7cCFf4aF8c51593B65461aF
# # Optimism: 0x178De365229DdC479793a43ff2EBf2127f8c73CB
# GetPalettes3Addr=$(deploy GetPalettes3)
# log "GetPalettes3 deployed at:" $GetPalettes3Addr

# Kovan: 0x7Ffb6aDBbeC07f35dcCCCFbaE80D1298640eC8DD
# Optimism: 0x7cdEcE74c6B8413072CF65a21EE57bEeF3063E4C
# GetVehiclesPart1x0Addr=$(deploy GetVehiclesPart1x0)
# log "GetVehiclesPart1x0 deployed at:" $GetVehiclesPart1x0Addr

# # Kovan: 0xeD8a255773B0Ef376a1Ad62828c7E2709c3A4010
# # Optimism: 0x59761A4Daf81B00ff06fa1Bab3c01Eb294AA55Bc
# GetVehiclesPart1x1Addr=$(deploy GetVehiclesPart1x1)
# log "GetVehiclesPart1x1 deployed at:" $GetVehiclesPart1x1Addr

# # Kovan: 0x02eB4064B5c83A4Dd4F69e19150adD9780743554
# # Optimism: 0x7902598f78FC912A6f2880AB692E6CC28805c39C
# GetVehiclesPart1x2Addr=$(deploy GetVehiclesPart1x2)
# log "GetVehiclesPart1x2 deployed at:" $GetVehiclesPart1x2Addr

# # Kovan: 0x991607f2f44062C95362ce131D2Cc76801adA7Cf
# # Optimism: 0x8CDc5fcc9162f05551c728283630Ac27d0b5482f
# GetVehiclesPart1x3Addr=$(deploy GetVehiclesPart1x3)
# log "GetVehiclesPart1x3 deployed at:" $GetVehiclesPart1x3Addr

# # Kovan: 0x2c5B60848cA55e59802d6E65A85970Bf14BEaeC8
# # Optimism: 0xEabE087e69045992212972FF3c9E14499152D983
# GetVehiclesPart2x0Addr=$(deploy GetVehiclesPart2x0)
# log "GetVehiclesPart2x0 deployed at:" $GetVehiclesPart2x0Addr

# # Kovan: 0xaF0CE7557Cd9350aDC40EB94D8b1533d7861FfD8
# # Optimism: 0x83c3926E4288bA4F5139a75F9eB1bbAe036e61d2
# GetVehiclesPart2x1Addr=$(deploy GetVehiclesPart2x1)
# log "GetVehiclesPart2x1 deployed at:" $GetVehiclesPart2x1Addr

# # Kovan: 0xDeb567dCaB95376EfE325f8B66eD95A24dFE2924
# # Optimsim: 0xFbc6AfB26Ee9Cec6337FDb595d76812b74986cB7
# GetVehiclesPart3x0Addr=$(deploy GetVehiclesPart3x0)
# log "GetVehiclesPart3x0 deployed at:" $GetVehiclesPart3x0Addr

# # Kovan: 0xB12f4aa9d0391EC03E7784D74A5f86dEA3f4dD2b
# # Optimism: 0xE079521E2fdD7f7225c228DbFEf8cC0430897149
# GetVehiclesPart3x1Addr=$(deploy GetVehiclesPart3x1)
# log "GetVehiclesPart3x1 deployed at:" $GetVehiclesPart3x1Addr

# # Kovan: 
# # Optimism: 
GetPalettes5Addr=$(deploy GetPalettes5)
log "GetPalettes5 deployed at:" $GetPalettes5Addr

# Kovan: 
# Optimism: 
GetCnyPart0Addr=$(deploy GetCnyPart0)
log "GetCnyPart0 deployed at:" $GetCnyPart0Addr
