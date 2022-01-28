#!/bin/bash
set -eux

ARGS=${@:1}

CONTROLLER=0x99A89AF659d5AF027b3d94BB0B169873b46d6351
export ETH_RPC_URL=https://opt-kovan.g.alchemy.com/v2/xk92V0tX0bnpMmUp7e6tetGWYgYxhHE9

cast send "$CONTROLLER" "addItemComponent(uint8,string)" 10 "Celebratory" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Ox" "$ARGS"
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Pig" "$ARGS"
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Tiger" "$ARGS"
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Dragon" "$ARGS"
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Rat" "$ARGS"
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Dog" "$ARGS"
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Horse" "$ARGS"
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Monkey" "$ARGS"
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Goat" "$ARGS"
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Rabbit" "$ARGS"
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Snake" "$ARGS"
