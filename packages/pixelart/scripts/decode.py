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

order = {
    "silhouette": 0,
    "rings": 1,
    "hands": 2,
    "clothes": 3,
    "waist": 4,
    "shoes": 5,
    "neck": 6,
    "weapons": 7,
}

bg = np.array([210/255, 173/255, 172/255, 1.0])


def gallery(array, ncols=25):
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
    if gender == "girls":
        continue

    parts = [None] * 8
    for category, components in categories.items():
        parts[order[category]] = components

    permutations = list(itertools.product(*parts))

    renders = []
    # for i, permutation in enumerate(permutations):
    for i in range(625):
        parts = permutations[randrange(0, len(permutations))]
        img = np.full((350, 350, 4), bg)
        print(gender, i)
        for part in parts:
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
