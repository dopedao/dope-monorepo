import json
from web3 import Web3

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

w3 = Web3(Web3.HTTPProvider(
    'https://opt-mainnet.g.alchemy.com/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG'))

swapmeet_addr = "0x0E55e1913C50e015e0F60386ff56A4Bfb00D7110"
SwapMeet = w3.eth.contract(
    swapmeet_addr, abi=abi)

f = open("../outputs/ITEMS/output-vehicles-part1.json", "r")
meta1 = json.load(f)

f = open("../outputs/ITEMS/output-vehicles-part2.json", "r")
meta2 = json.load(f)

f = open("../outputs/ITEMS/output-vehicles-part3.json", "r")
meta3 = json.load(f)

meta1_palette = "[bytes4(hex'')"
for i, color in enumerate(meta1['partcolors']):
    if i == 0:
        continue
    meta1_palette += (",hex'" + color[2:] + "'")
meta1_palette += "]"

meta2_palette = "[bytes4(hex'')"
for i, color in enumerate(meta2['partcolors']):
    if i == 0:
        continue
    meta2_palette += (",hex'" + color[2:] + "'")
meta2_palette += "]"

meta3_palette = "[bytes4(hex'')"
for i, color in enumerate(meta3['partcolors']):
    if i == 0:
        continue
    meta3_palette += (",hex'" + color[2:] + "'")
meta3_palette += "]"

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
f = open("../../contracts/hustlers/src/GetPalettes1.sol", "w")
f.write(p)

p = set_palette.format(palette=meta2_palette, n=len(meta2['partcolors']))
f = open("../../contracts/hustlers/src/GetPalettes2.sol", "w")
f.write(p)

p = set_palette.format(palette=meta3_palette, n=len(meta3['partcolors']))
f = open("../../contracts/hustlers/src/GetPalettes3.sol", "w")
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
            id = SwapMeet.functions.toId(
                [int(idx), 0, 0, 0, 0], types[category]).call()

            if len(ids) > 0:
                ids += ","
                rles += ","
            ids += "uint256(%d)" % id

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

    #     if weight > 10000:
    #         write_contract("%sPart1x%d" %
    #                        (category.capitalize(), contract_idx), ids, rles, ids_len, rles_len)
    #         contract_idx += 1
    #         weight = 0
    #         ids = ""
    #         rles = ""
    #         ids_len = 0
    #         rles_len = 0

    # write_contract("%sPart1x%d" % (category.capitalize(), contract_idx),
    #                ids, rles, ids_len, rles_len)
