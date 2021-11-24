from matplotlib import image
import numpy as np
import json
from eth_utils import to_hex
import glob
import os
import sys

typ = sys.argv[1]
palette_idx = int(sys.argv[2])

f = open("../outputs/"+typ+"/output.json", "r")
meta = json.load(f)

colors = {0: 0}
for i, c in enumerate(meta["partcolors"]):
    colors[c] = i

meta["parts"] = []
for file in glob.glob("../imgs/"+typ+"/**/*.png"):
    img = image.imread(file)

    a = np.where(img[:, :, 3] != 0)

    if len(a[0]) > 0:
        bbox = np.min(a[0]), np.max(a[0]), np.min(a[1]), np.max(a[1])
        cropped = img[bbox[0]:bbox[1]+1, bbox[2]:bbox[3]+1]
        encoded = [palette_idx, bbox[0], bbox[3]+1, bbox[1]+1, bbox[2]]

        for y in cropped:
            n = 0
            prev, cur = -1, -1
            out = ""
            for x in y:
                prev = cur

                if x[3] == 0:
                    cur = 0
                else:
                    cur = '0x%02x%02x%02x%02x' % (
                        int(x[0]*255), int(x[1]*255), int(x[2]*255), int(x[3]*255))

                out += str(colors[cur])

                if cur != prev and prev != -1:
                    encoded.append(n)
                    encoded.append(colors[prev])
                    n = 0

                n += 1

            encoded.append(n)
            encoded.append(colors[cur])
            print(out)
            out = ""
    else:
        encoded = []

    print("\n")

    pth = os.path.splitext(file)[0]
    dir = os.path.split(os.path.split(pth)[0])[1]
    split = dir.split("_")
    print(split)
    meta["parts"].append([{
        "name": os.path.basename(pth),
        "gender": split[0].lower(),
        "category": split[1].lower(),
        "data": to_hex(bytes(encoded))
    }])

f = open("../outputs/"+typ+"/output.json", "w")
json.dump(meta, f, indent=4)
