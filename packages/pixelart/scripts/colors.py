from matplotlib import image
from colormap import rgb2hex
import numpy as np
import glob
import json
from collections import OrderedDict
import sys

typ = sys.argv[1]
fmeta = sys.argv[2]

meta = {}

colors = OrderedDict()
if 'partcolors' in meta:
    for c in meta["partcolors"]:
        colors[c] = True
else:
    colors[""] = True

for file in glob.glob("../imgs/"+typ+"/**/*.png"):
    img = image.imread(file)
    a = np.where(img[:, :, 3] != 0)

    if len(a[0]) == 0:
        print("empty", file)
        continue

    bbox = np.min(a[0]), np.max(a[0]), np.min(a[1]), np.max(a[1])
    cropped = img[bbox[0]:bbox[1]+1, bbox[2]:bbox[3]+1]

    for y in cropped:
        for x in y:
            if x[3] != 0:
                c = '0x%02x%02x%02x%02x' % (
                    int(x[0]*255), int(x[1]*255), int(x[2]*255), int(x[3]*255))
                colors[c] = True

meta["partcolors"] = list(colors.keys())
f = open("../outputs/"+fmeta, "w")
json.dump(meta, f, indent=4)
