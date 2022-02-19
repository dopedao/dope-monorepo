import json
from web3 import Web3
import sys

types = {
    # "weapons": 0,
    # "clothes": 1,
    "vehicles": 2,
    # "waist": 3,
    # "shoes": 4,
    # "hands": 5,
    # "drugs": 6,
    # "neck": 7,
    # "rings": 8,
    "accessories": 9,
    # "cny": 10,
}

abi = [
    {
        "inputs": [
            {
                "internalType": "uint8[5]",
                "name": "components",
                "type": "uint8[5]"
            },
            {
                "internalType": "uint8",
                "name": "componentType",
                "type": "uint8"
            }
        ],
        "name": "toId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
]

palleteidx = sys.argv[1]
fmeta = sys.argv[2]

f = open("../outputs/"+fmeta, "r")
meta1 = json.load(f)

meta1_palette = "[bytes4(hex'')"
for i, color in enumerate(meta1['partcolors']):
    if i == 0:
        continue
    meta1_palette += (",hex'" + color[2:] + "'")
meta1_palette += "]"

set_palette = """
pragma solidity ^0.8.0;

contract GetPalettes {{
    function getPalletes() external returns (bytes4[] memory) {{
        bytes4[] memory palette = new bytes4[]({n});
        bytes4[{n}] memory _palette = {palette};
        for (uint256 i = 0; i < palette.length; i++) {{
            palette[i] = _palette[i];
        }}

        return palette;
    }}
}}
"""

p = set_palette.format(palette=meta1_palette, n=len(meta1['partcolors']))
f = open("../../contracts/hustlers/src/GetPalettes"+palleteidx+".sol", "w")
f.write(p)

components = {}
for parts in meta1["parts"]:
    part = parts[0]
    gender = part["gender"]
    category = part["category"]
    name = part["name"]

    idx = name.split("-")[0]

    if category not in components:
        components[category] = {}

    if idx not in components[category]:
        components[category][idx] = {}

    components[category][idx][gender] = part["data"]

item_setter = """
pragma solidity ^0.8.0;

contract Get{name} {{
    function getRles() external returns (uint256[] memory, bytes[] memory) {{
        uint256[] memory ids = new uint256[]({ids_len});
        uint256[{ids_len}] memory _ids = [{ids}];
        for (uint256 i = 0; i < ids.length; i++) {{
            ids[i] = _ids[i];
        }}

        bytes[] memory rles = new bytes[]({rles_len});
        bytes[{rles_len}] memory _rles = [{rles}];
        for (uint256 i = 0; i < rles.length; i++) {{
            rles[i] = _rles[i];
        }}

        return (ids, rles);
    }}
}}
"""


def write_contract(name, ids, rles, ids_len, rles_len):
    c = item_setter.format(
        name=name, ids=ids, rles=rles, ids_len=ids_len, rles_len=rles_len)
    f = open("../../contracts/hustlers/src/Get"+name+".sol", "w")
    f.write(c)


for category, idxs in components.items():
    print(category)
    ids = ""
    ids_len = 0
    rles = ""
    rles_len = 0
    weight = 0

    contract_idx = 0
    for idx, genders in idxs.items():
        print(category)
        if category in types:
            id = idx

            if len(ids) > 0:
                ids += ","
                rles += ","
            ids += "uint256(%s)" % id

            if category == "vehicles":
                weight += len(genders["none"])
                weight += len(genders["none"])
                rles += "bytes(hex'" + genders["none"][2:] + \
                    "'),hex'" + genders["none"][2:] + "'"
            else:
                weight += len(genders["men"])
                weight += len(genders["girls"])
                rles += "bytes(hex'" + genders["men"][2:] + \
                    "'),hex'" + genders["girls"][2:] + "'"

            ids_len += 1
            rles_len += 2

        if weight > 10000:
            write_contract("%sPart%d" %
                           (category.capitalize(), contract_idx), ids, rles, ids_len, rles_len)
            contract_idx += 1
            weight = 0
            ids = ""
            rles = ""
            ids_len = 0
            rles_len = 0

    write_contract("%sPart%d" % (category.capitalize(), contract_idx),
                   ids, rles, ids_len, rles_len)
