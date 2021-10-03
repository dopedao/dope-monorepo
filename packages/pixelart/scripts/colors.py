from matplotlib import image
from colormap import rgb2hex
import numpy as np
import glob
import json
from collections import OrderedDict

f = open("../outputs/partcolors.json", "r")
meta = json.load(f)

colors = OrderedDict()
for c in meta["partcolors"]:
    colors[c] = True

for file in glob.glob("../imgs/**/*.png"):
    img = image.imread(file)
    a = np.where(img[:,:,3] != 0)

    bbox = np.min(a[0]), np.max(a[0]), np.min(a[1]), np.max(a[1])
    cropped = img[bbox[0]:bbox[1]+1, bbox[2]:bbox[3]+1]

    for y in cropped:
        for x in y:
            if x[3] != 0:
                c = rgb2hex(int(x[0]*255), int(x[1]*255), int(x[2]*255))
                colors[c[1:]] = True

meta["partcolors"] = list(colors.keys())

f = open("../outputs/partcolors.json", "w")
json.dump(meta, f, indent=4)