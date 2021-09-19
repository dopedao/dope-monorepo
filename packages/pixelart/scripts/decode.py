from eth_utils import to_bytes
import json
from matplotlib import pyplot as plt
import numpy as np
from colormap import hex2rgb

f = open("../outputs/output.json", "r")
meta = json.load(f)

granularity = 64
resolution = 320

lookup = range(0, resolution, int(resolution/granularity))

img = np.zeros((350, 350, 4))
for parts in meta["parts"]:
    part = parts[0]
    subimg = to_bytes(hexstr=part["data"])
    top = subimg[1]
    right = subimg[2]
    bottom = subimg[3]
    left = subimg[4]

    print(top, right, bottom, left)

    x = left
    y = top

    for i in range(5, len(subimg), 2):
        length = subimg[i]
        c = meta["partcolors"][subimg[i+1]]
        if c != "":
            rgb = hex2rgb("#" + c)
            img[lookup[y] : lookup[y+1], lookup[x]: lookup[x] + lookup[length], :3] = np.array(rgb) / 255
            img[lookup[y] : lookup[y+1], lookup[x]: lookup[x] + lookup[length], 3] = 1.0

        print(x, length, right)
        x += length
        if x == right:
            x = left
            y += 1

plt.imshow(img)
plt.show()
