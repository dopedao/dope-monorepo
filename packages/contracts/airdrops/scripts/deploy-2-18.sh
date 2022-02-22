#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

pushd $(dirname "$0")/..

ARGS=${@:1}

# # 0xbef1426930852516c61a48f276fc42ee30ba5ae4
# GetPalettes6Address=$(deploy src/2-18/GetPalettes6.sol:GetPalettes "$ARGS")
# echo "GetPalettes6 deployed to: $GetPalettes6Address"

# # 0x33477767e15885a9fee815b398d756c52196af34
# GetAccessoriesPart0Address=$(deploy src/2-18/GetAccessoriesPart0.sol:GetAccessoriesPart0 "$ARGS")
# echo "GetAccessoriesPart0 deployed to: $GetAccessoriesPart0Address"

# 0x431287C37F31d86f86A99741200BDdF1A9652eDD
# GetVehiclesPart0Address=$(deploy src/2-18/GetVehiclesPart0.sol:GetVehiclesPart0 "$ARGS")
# echo "GetVehiclesPart0 deployed to: $GetVehiclesPart0Address"

# 0x83efe5c5de92b02155de8ea6d0474a99ea0be96a
# GetVehiclesPart1Address=$(deploy src/2-18/GetVehiclesPart1.sol:GetVehiclesPart1 "$ARGS")
# echo "GetVehiclesPart1 deployed to: $GetVehiclesPart1Address"
