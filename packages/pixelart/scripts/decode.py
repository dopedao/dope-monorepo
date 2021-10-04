from eth_utils import to_bytes
import json
from matplotlib import pyplot as plt, image
import numpy as np
from colormap import hex2rgb
import itertools
from random import randrange

f = open("../outputs/output.json", "r")
meta = json.load(f)

granularity = 64
resolution = 320

lookup = range(0, resolution, int(resolution/granularity))

female_order = {
    "bodies": 0,
    "heads": 1,
    "rings": 2,
    "hands": 3,
    "clothes": 4,
    "waist": 5,
    "shoes": 6,
    "neck": 7,
    "weapons": 8,
}

men_order = {
    "bodies": 0,
    "heads": 1,
    "beards": 2,
    "rings": 3,
    "hands": 4,
    "clothes": 5,
    "waist": 6,
    "shoes": 7,
    "neck": 8,
    "weapons": 9,
    "accessories": 10
}

bg = np.array([210/255, 173/255, 172/255, 0.0])


def gallery(array, ncols=27):
    nindex, height, width, intensity = array.shape
    nrows = nindex//ncols
    assert nindex == nrows*ncols
    result = (array.reshape(nrows, ncols, height, width, intensity)
              .swapaxes(1, 2)
              .reshape(height*nrows, width*ncols, intensity))
    return result


components = {}

for parts in meta["parts"]:
    part = parts[0]
    gender = part["gender"]
    category = part["category"]

    if gender not in components:
        components[gender] = {}

    if category not in components[gender]:
        components[gender][category] = []

    components[gender][category].append(part)

for gender, categories in components.items():
    if gender == "men":
        parts = [None] * 11
        for category, components in categories.items():
            if category == "silhouette":
                continue
            parts[men_order[category]] = components
    else:
        parts = [None] * 9
        for category, components in categories.items():
            if category == "silhouette":
                continue
            parts[female_order[category]] = components

    renders = []
    for i in range(729):
        if gender == "men":
            permutation = [
                parts[0][randrange(0, len(parts[0]))],
                parts[1][randrange(0, len(parts[1]))],
                parts[2][randrange(0, len(parts[2]))],
                parts[3][randrange(0, len(parts[3]))],
                parts[4][randrange(0, len(parts[4]))],
                parts[5][randrange(0, len(parts[5]))],
                parts[6][randrange(0, len(parts[6]))],
                parts[7][randrange(0, len(parts[7]))],
                parts[8][randrange(0, len(parts[8]))],
                parts[9][randrange(0, len(parts[9]))],
                parts[10][randrange(0, len(parts[10]))],
            ]
        else:
            permutation = [
                parts[0][randrange(0, len(parts[0]))],
                parts[1][randrange(0, len(parts[1]))],
                parts[2][randrange(0, len(parts[2]))],
                parts[3][randrange(0, len(parts[3]))],
                parts[4][randrange(0, len(parts[4]))],
                parts[5][randrange(0, len(parts[5]))],
                parts[6][randrange(0, len(parts[6]))],
                parts[7][randrange(0, len(parts[7]))],
                parts[8][randrange(0, len(parts[8]))],
            ]

        img = np.full((350, 350, 4), bg)
        print(gender, i)
        for part in permutation:
            print(part)
            if part["data"] == "0x000000000000":
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
                c = meta["partcolors"][subimg[j+1]]
                if c != "":
                    rgb = hex2rgb("#" + c)
                    img[lookup[y]: lookup[y+1], lookup[x]: lookup[x] +
                        lookup[length], :3] = np.array(rgb) / 255
                    img[lookup[y]: lookup[y+1], lookup[x]                        : lookup[x] + lookup[length], 3] = 1.0

                x += length
                if x == right:
                    x = left
                    y += 1

        renders.append(img)
        # image.imsave("../outputs/permutations/men/" +
                    #  str(i) + ".png", img)

        # plt.imshow(img)
        # plt.show()

    image.imsave("../outputs/permutations/" +
                 gender + ".png", gallery(np.array(renders)))
