#!/bin/bash
set -eux

ARGS=${@:1}

CONTROLLER=0x99A89AF659d5AF027b3d94BB0B169873b46d6351
export ETH_RPC_URL=https://opt-kovan.g.alchemy.com/v2/xk92V0tX0bnpMmUp7e6tetGWYgYxhHE9

# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 10 "Celebratory" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Ox" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Pig" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Tiger" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Dragon" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Rat" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Dog" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Horse" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Monkey" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Goat" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Rabbit" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Snake" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 11 "Chicken" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 12 "from Chinatown" $ARGS

# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 9 "Glasses" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 9 "Hat" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 9 "Headband" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 9 "Bracelet" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 9 "Flag" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 9 "Hand Prop" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 9 "Lantern" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 9 "Mask" $ARGS
# cast send "$CONTROLLER" "addItemComponent(uint8,string)" 9 "Wig" $ARGS

# accessories:
#   Glasses 0
#   Hat 1
#   Headband 2
#   Bracelet 3
#   Flag 4
#   Hand Prop 5
#   Lantern 6
#   Mask 7
#   Wig 8
# name prefix:
#   Big 6
#   Notorious 20
#   Celebratory 65
# name suffix:
#   Ox 19
#   Pig 20
#   Tiger 21
#   Dragon 22
#   Rat 23
#   Dog 24
#   Horse 25
#   Monkey 26
#   Goat 27
#   Rabbit 28
#   Snake 29
#   Chicken 30
# suffix:
#   from Chinatown 20

# Glasses from Chinatown                        [0,20,0,0,0]    85899345929
# Hat from Chinatown                            [1,20,0,0,0]    85899411465
# Headband from Chinatown                       [2,20,0,0,0]    85899477001
# Celebratory Tiger Headband from Chinatown     [2,20,65,21,0]  387399921507286253577
# Bracelet from Chinatown                       [3,20,0,0,0]    85899542537
# Flag from Chinatown                           [4,20,0,0,0]    85899608073
# Hand Prop from Chinatown                      [5,20,0,0,0]    85899673609
# Lantern from Chinatown                        [6,20,0,0,0]    85899739145
# Wig from Chinatown                            [8,20,0,0,0]    85899870217
# Celebratory Ox Mask from Chinatown            [7,20,65,19,0]  350506433359867478025
# Celebratory Pig Mask from Chinatown           [7,20,65,20,0]  368953177433577029641
# Celebratory Tiger Mask from Chinatown         [7,20,65,21,0]  387399921507286581257
# Celebratory Dragon Mask from Chinatown        [7,20,65,22,0]  405846665580996132873
# Celebratory Rat Mask from Chinatown           [7,20,65,23,0]  424293409654705684489
# Celebratory Dog Mask from Chinatown           [7,20,65,24,0]  442740153728415236105
# Celebratory Horse Mask from Chinatown         [7,20,65,25,0]  461186897802124787721
# Celebratory Monkey Mask from Chinatown        [7,20,65,26,0]  479633641875834339337
# Celebratory Goat Mask from Chinatown          [7,20,65,27,0]  498080385949543890953
# Celebratory Rabbit Mask from Chinatown        [7,20,65,28,0]  516527130023253442569
# Celebratory Snake Mask from Chinatown         [7,20,65,29,0]  534973874096962994185
# Celebratory Chicken Mask from Chinatown       [7,20,65,30,0]  553420618170672545801
# Big Tiger Mask from Chinatown                 [7,20,6,21,0]   387383314483660652553
# Notorious Tiger Mask from Chinatown           [7,20,20,21,1]  1209313206869762509307913

# Faces:        Father of the Game Hitman Mask from Oakland       [7,20,20,21,1]
# MrFax:        King of the Street Baron Mask from Murdertown     [7,20,20,21,1]
# Sausage:      Gang Leader Outlaw Mask from Big Smoke            [7,20,20,21,1]

# Accessories:
# Cop Glasses:  Crooked Cop Feared Glasses
# Eye Patch:    Glasses from the Backwoods
# 