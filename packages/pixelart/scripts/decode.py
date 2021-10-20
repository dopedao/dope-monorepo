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
resolution = 1280

lookup = range(0, resolution, int(resolution/granularity))

female_order = {
    "shadow": 0,
    "drugsshadow": 1,
    "bodies": 2,
    "hair": 3,
    "rings": 4,
    "hands": 5,
    "clothes": 6,
    "waist": 7,
    "shoes": 8,
    "neck": 9,
    "weapons": 10,
    "drugs": 11,
}

men_order = {
    "shadow": 0,
    "drugsshadow": 1,
    "bodies": 2,
    "hair": 3,
    "beards": 4,
    "rings": 5,
    "hands": 6,
    "clothes": 7,
    "waist": 8,
    "shoes": 9,
    "neck": 10,
    "weapons": 11,
    "accessories": 12,
    "drugs": 13
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

def gallery(array, ncols=29):
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
    print(gender)
    if gender == "men":
        parts = [None] * 14
        for category, components in categories.items():
            if category == "silhouette":
                continue
            parts[men_order[category]] = sorted(components, key = lambda i: int(i['name'].split("-")[0]))
    else:
        parts = [None] * 12
        for category, components in categories.items():
            if category == "silhouette":
                continue
            parts[female_order[category]] = sorted(components, key = lambda i: int(i['name'].split("-")[0]))

    renders = []
    for i in range(5):
        if gender == "men":
            body = randrange(0, 2)
            beard = 0
            
            give_beard = randrange(0, 100)
            if give_beard > 70:
                if body == 0:
                    beard = randrange(1, 5)
                else:
                    beard = randrange(5, 11)
            
            if body == 0:
                head = randrange(0, 9)
            else:
                head = randrange(9, 17)

            permutation = [
                parts[0][randrange(0, len(parts[0]))],
                parts[1][randrange(0, len(parts[1]))],
                parts[2][body],
                parts[3][head],
                parts[4][beard],
                parts[5][randrange(0, len(parts[5]))],
                parts[6][randrange(0, len(parts[6]))],
                parts[7][randrange(0, len(parts[7]))],
                parts[8][randrange(0, len(parts[8]))],
                parts[9][randrange(0, len(parts[9]))],
                parts[10][randrange(0, len(parts[10]))],
                parts[11][randrange(0, len(parts[11]))],
                parts[12][randrange(0, len(parts[12]))],
                parts[13][randrange(0, len(parts[13]))],
            ]
        else:
            body = randrange(0, 2)

            if body == 0:
                head = randrange(0, 7)
            else:
                head = randrange(7, 12)

            permutation = [
                parts[0][randrange(0, len(parts[0]))],
                parts[1][randrange(0, len(parts[1]))],
                parts[2][body],
                parts[3][head],
                parts[4][randrange(0, len(parts[4]))],
                parts[5][randrange(0, len(parts[5]))],
                parts[6][randrange(0, len(parts[6]))],
                parts[7][randrange(0, len(parts[7]))],
                parts[8][randrange(0, len(parts[8]))],
                parts[9][randrange(0, len(parts[9]))],
                parts[10][randrange(0, len(parts[10]))],
                parts[11][randrange(0, len(parts[11]))],
            ]

        bg = np.array([1.0, 1.0, 1.0, 1.0])
        bg[:3] = np.array(bgs[randrange(0, len(bgs))]) / 255

        img = np.full((resolution, resolution, 4), bg)
        for part in permutation:
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
                c = meta["partcolors"][subimg[j+1]]
                if c != "":
                    # if len(c) > 8:
                    #     continue
                    #     print(int(c[7:8], 16))
                    #     rgb = hex2rgb("#" + c[:6])
                    #     img[lookup[y]: lookup[y+1], lookup[x]: lookup[x] +
                    #         lookup[length], :3] += np.array(rgb) * (int(c[7:8], 16) / 255) / 255
                    #     img[lookup[y]: lookup[y+1], lookup[x]: lookup[x] + lookup[length], 3] = 1.0
                    # else:
                    img[lookup[y]: lookup[y+1], lookup[x]: lookup[x] + lookup[length], 3] = 1.0
                    rgb = hex2rgb("#" + c[2:8])
                    img[lookup[y]: lookup[y+1], lookup[x]: lookup[x] +
                        lookup[length], :3] = np.array(rgb) / 255

                x += length
                if x == right:
                    x = left
                    y += 1

        # img += drug_shadow
        # img += shadow

        # renders.append(img)
        image.imsave("../outputs/permutations/" + gender + "/" +
                     str(i) + ".png", img)

        # plt.imshow(img)
        # plt.show()

    # image.imsave("../outputs/permutations/" +
    #              gender + ".png", gallery(np.array(renders)))
