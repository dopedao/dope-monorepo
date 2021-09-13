#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

# Deploy.
StockpileAddr=$(deploy Stockpile $LOOT)
verify Stockpile $StockpileAddr $LOOT
log "Stockpile deployed at:" $StockpileAddr

CharacterAddr=$(deploy Character $StockpileAddr)
verify Character $CharacterAddr $StockpileAddr
log "Character deployed at:" $CharacterAddr
