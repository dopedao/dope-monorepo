#!/usr/bin/env bash

# import the deployment helpers
. $(dirname $0)/common.sh

# Mainnet loot address
MAINNET_LOOT=0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7
# Default to it if nothing is provided
LOOT="${LOOT:-$MAINNET_LOOT}"

# Deploy.
LootLooseAddr=$(deploy LootLoose $LOOT)
log "LootLoose deployed at:" $LootLooseAddr
