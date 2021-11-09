#!/usr/bin/env bash

set -eo pipefail

# import the deployment helpers
. $(dirname $0)/common.sh

InitiatorAddr=$(deploy Initiator $LOOT $PAPER)
# verify Initiator $InitiatorAddr $LOOT $PAPER
extractABI Initiator
log "Initiator deployed at:" $InitiatorAddr
