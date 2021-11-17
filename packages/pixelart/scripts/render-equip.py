from eth_utils import to_bytes
import json
from matplotlib import pyplot as plt, image
import numpy as np
from colormap import hex2rgb
import itertools
from random import randrange

f = open("../outputs/BODY_PARTS/output.json", "r")
body_parts = json.load(f)

f = open("../outputs/ITEMS/output.json", "r")
meta = json.load(f)

granularity = 64
resolution = 1280

lookup = range(0, resolution, int(resolution/granularity))

female_order = {
    "rings": 0,
    "hands": 1,
    "clothes": 2,
    "waist": 3,
    "shoes": 4,
    "neck": 5,
    "weapons": 6,
    "drugs": 7,
}

item_categories = ["rings", "hands", "clothes", "waist",
                   "shoes", "neck", "weapons", "accessories", "drugs"]
body_categories = ["bodies", "hair", "beards"]

men_order = {
    "rings": 0,
    "hands": 1,
    "clothes": 2,
    "waist": 3,
    "shoes": 4,
    "neck": 5,
    "weapons": 6,
    "accessories": 7,
    "drugs": 8
}

bg = np.array([210/255, 173/255, 172/255, 0.0])

bgs = [
    hex2rgb("#dfafae"),
    # hex2rgb("#FFFFFF"),
    # hex2rgb("#434345"),
    # hex2rgb("#7393AA"),
    # hex2rgb("#8DC1B8"),
    # hex2rgb("#C18DBC"),
    # hex2rgb("#FFFFC8"),
    # hex2rgb("#B60A06"),
    # hex2rgb("#3523FE"),
    # hex2rgb("#F79F65")
]

components = {}
body_components = {}

script = [{
    "gender": "men",
    "body": [
        0,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
    ],
}, {
    "gender": "men",
    "body": [
        1,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
    ],
}, {
    "gender": "men",
    "body": [
        2,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0,  # rings
        0,  # hands
        0,  # clothes
        0,  # waist
        0,  # shoes
        0,  # neck
        0,  # weapons
        0,  # accessories
        0,  # drugs
    ],
}, {
    "gender": "men",
    "body": [
        3,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0,  # rings
        0,  # hands
        0,  # clothes
        0,  # waist
        0,  # shoes
        0,  # neck
        0,  # weapons
        0,  # accessories
        0,  # drugs
    ],
}, {
    "gender": "men",
    "body": [
        4,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0,  # rings
        0,  # hands
        0,  # clothes
        0,  # waist
        0,  # shoes
        0,  # neck
        0,  # weapons
        0,  # accessories
        0,  # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        3,  # head
        2,  # beard
    ],
    "parts": [
        0,  # rings
        0,  # hands
        0,  # clothes
        0,  # waist
        0,  # shoes
        0,  # neck
        0,  # weapons
        0,  # accessories
        0,  # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        4,  # head
        2,  # beard
    ],
    "parts": [
        0,  # rings
        0,  # hands
        0,  # clothes
        0,  # waist
        0,  # shoes
        0,  # neck
        0,  # weapons
        0,  # accessories
        0,  # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        5,  # head
        2,  # beard
    ],
    "parts": [
        0,  # rings
        0,  # hands
        0,  # clothes
        0,  # waist
        0,  # shoes
        0,  # neck
        0,  # weapons
        0,  # accessories
        0,  # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0,  # rings
        0,  # hands
        1,  # clothes
        0,  # waist
        0,  # shoes
        0,  # neck
        0,  # weapons
        0,  # accessories
        0,  # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0,  # rings
        0,  # hands
        2,  # clothes
        0,  # waist
        0,  # shoes
        0,  # neck
        0,  # weapons
        0,  # accessories
        0,  # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0,  # rings
        0,  # hands
        3,  # clothes
        0,  # waist
        0,  # shoes
        0,  # neck
        0,  # weapons
        0,  # accessories
        0,  # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0,  # rings
        0,  # hands
        3,  # clothes
        0,  # waist
        0,  # shoes
        0,  # neck
        1,  # weapons
        0,  # accessories
        0,  # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0,  # rings
        0,  # hands
        3,  # clothes
        0,  # waist
        0,  # shoes
        0,  # neck
        2,  # weapons
        0,  # accessories
        0,  # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0,  # rings
        0,  # hands
        3,  # clothes
        0,  # waist
        0,  # shoes
        0,  # neck
        4,  # weapons
        0,  # accessories
        0,  # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0,  # rings
        0,  # hands
        3,  # clothes
        0,  # waist
        0,  # shoes
        0,  # neck
        5,  # weapons
        0,  # accessories
        0,  # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0, # rings
        0, # hands
        3, # clothes
        0, # waist
        0, # shoes
        0, # neck
        6, # weapons
        0, # accessories
        0, # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0, # rings
        0, # hands
        3, # clothes
        0, # waist
        0, # shoes
        0, # neck
        7, # weapons
        0, # accessories
        0, # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0, # rings
        0, # hands
        3, # clothes
        0, # waist
        0, # shoes
        0, # neck
        8, # weapons
        0, # accessories
        0, # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0, # rings
        0, # hands
        3, # clothes
        0, # waist
        0, # shoes
        0, # neck
        9, # weapons
        0, # accessories
        0, # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0, # rings
        0, # hands
        3, # clothes
        0, # waist
        0, # shoes
        0, # neck
        10, # weapons
        0, # accessories
        0, # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0, # rings
        0, # hands
        3, # clothes
        0, # waist
        0, # shoes
        0, # neck
        11, # weapons
        0, # accessories
        0, # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0, # rings
        0, # hands
        3, # clothes
        0, # waist
        0, # shoes
        0, # neck
        12, # weapons
        0, # accessories
        0, # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0, # rings
        0, # hands
        3, # clothes
        0, # waist
        0, # shoes
        0, # neck
        13, # weapons
        0, # accessories
        0, # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0, # rings
        0, # hands
        3, # clothes
        0, # waist
        0, # shoes
        0, # neck
        14, # weapons
        0, # accessories
        0, # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0, # rings
        0, # hands
        3, # clothes
        0, # waist
        0, # shoes
        0, # neck
        15, # weapons
        0, # accessories
        0, # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0, # rings
        0, # hands
        3, # clothes
        0, # waist
        0, # shoes
        0, # neck
        16, # weapons
        0, # accessories
        0, # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0, # rings
        0, # hands
        3, # clothes
        0, # waist
        0, # shoes
        0, # neck
        17, # weapons
        0, # accessories
        0, # drugs
    ],
}, {
    "gender": "men",
    "body": [
        5,  # body
        2,  # head
        2,  # beard
    ],
    "parts": [
        0, # rings
        0, # hands
        3, # clothes
        0, # waist
        0, # shoes
        0, # neck
        3, # weapons
        0, # accessories
        0, # drugs
    ],
}, {
    "gender": "girls",
    "body": [
        4,  # body
        0,  # head
    ],
    "parts": [
        0, # rings
        3, # hands
        14, # clothes
        9, # waist
        13, # shoes
        1, # neck
        3, # weapons
        1, # accessories
        0, # drugs
    ],
}, {
    "gender": "girls",
    "body": [
        4,  # body
        0,  # head
    ],
    "parts": [
        0, # rings
        3, # hands
        14, # clothes
        9, # waist
        2, # shoes
        1, # neck
        3, # weapons
        1, # accessories
        0, # drugs
    ],
}, {
    "gender": "girls",
    "body": [
        4,  # body
        0,  # head
    ],
    "parts": [
        0, # rings
        3, # hands
        14, # clothes
        9, # waist
        3, # shoes
        1, # neck
        3, # weapons
        1, # accessories
        0, # drugs
    ],
}, {
    "gender": "girls",
    "body": [
        4,  # body
        0,  # head
    ],
    "parts": [
        0, # rings
        3, # hands
        14, # clothes
        9, # waist
        5, # shoes
        1, # neck
        3, # weapons
        1, # accessories
        0, # drugs
    ],
}, {
    "gender": "girls",
    "body": [
        4,  # body
        0,  # head
    ],
    "parts": [
        0, # rings
        3, # hands
        14, # clothes
        9, # waist
        7, # shoes
        1, # neck
        3, # weapons
        1, # accessories
        0, # drugs
    ],
}, {
    "gender": "girls",
    "body": [
        4,  # body
        0,  # head
    ],
    "parts": [
        0, # rings
        3, # hands
        14, # clothes
        9, # waist
        9, # shoes
        1, # neck
        3, # weapons
        1, # accessories
        0, # drugs
    ],
}, {
    "gender": "girls",
    "body": [
        4,  # body
        0,  # head
    ],
    "parts": [
        0, # rings
        3, # hands
        10, # clothes
        -1, # waist
        9, # shoes
        1, # neck
        3, # weapons
        1, # accessories
        0, # drugs
    ],
}, {
    "gender": "girls",
    "body": [
        4,  # body
        0,  # head
    ],
    "parts": [
        1, # rings
        3, # hands
        10, # clothes
        -1, # waist
        9, # shoes
        2, # neck
        3, # weapons
        1, # accessories
        0, # drugs
    ],
}, {
    "gender": "girls",
    "body": [
        4,  # body
        0,  # head
    ],
    "parts": [
        0, # rings
        3, # hands
        10, # clothes
        -1, # waist
        9, # shoes
        2, # neck
        3, # weapons
        1, # accessories
        0, # drugs
    ],
}]

for parts in body_parts["parts"]:
    part = parts[0]
    gender = part["gender"]
    category = part["category"]

    if gender not in body_components:
        body_components[gender] = {}

    if category not in body_components[gender]:
        body_components[gender][category] = []

    body_components[gender][category].append(part)

for parts in meta["parts"]:
    part = parts[0]
    gender = part["gender"]
    category = part["category"]

    if gender not in components:
        components[gender] = {}

    if category not in components[gender]:
        components[gender][category] = []

    components[gender][category].append(part)

renders = []
for i, scene in enumerate(script):
    bg = np.array([1.0, 1.0, 1.0, 1.0])
    bg[:3] = np.array(bgs[randrange(0, len(bgs))]) / 255

    img = np.full((resolution, resolution, 4), bg)

    configuration = []
    for i2, part in enumerate(scene['body']):
        configuration.append(
            body_components[scene["gender"]][body_categories[i2]][part])

    for i3, part in enumerate(scene['parts']):
        if part == -1:
            continue
        configuration.append(
            components[scene["gender"]][item_categories[i3]][part])

    for k, part in enumerate(configuration):
        if part["data"] == "0x":
            continue

        subimg = to_bytes(hexstr=part["data"])
        top = subimg[1]
        right = subimg[2]
        bottom = subimg[3]
        left = subimg[4]

        x = left
        y = top

        for j in range(5, len(subimg), 2):
            length = subimg[j]

            if (gender == "men" and k < 3) or (gender == "girls" and k < 2):
                c = body_parts["partcolors"][subimg[j+1]]
            else:
                c = meta["partcolors"][subimg[j+1]]
            if c != "":
                img[lookup[y]: lookup[y+1], lookup[x]: lookup[x] + lookup[length], 3] = 1.0
                rgb = hex2rgb("#" + c[2:8])
                img[lookup[y]: lookup[y+1], lookup[x]: lookup[x] +
                    lookup[length], :3] = np.array(rgb) / 255

            x += length
            if x == right:
                x = left
                y += 1

    image.imsave("../outputs/customize/" + str(i) + ".png", img)
