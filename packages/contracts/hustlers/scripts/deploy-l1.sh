#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

# DopeAddr=$(deploy DopeWarsLoot)
# log "Dope deployed at:" $DopeAddr
# PaperAddr=$(deploy Paper $LOOT)
# log "Paper deployed at:" $PaperAddr

# 0x39f5042303b671fE1252e80e483e9eeB13b083A3
InitiatorAddr=$(deploy Initiator $LOOT $PAPER $CONTROLLER)
# verify Initiator $InitiatorAddr $LOOT $PAPER $CONTROLLER
extractABI Initiator
log "Initiator deployed at:" $InitiatorAddr
