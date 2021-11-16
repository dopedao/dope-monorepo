import json
from web3 import Web3

types = {
    "weapons": 0,
    "clothes": 1,
    "vehicles": 2,
    "waist": 3,
    "shoes": 4,
    "hands": 5,
    "drugs": 6,
    "neck": 7,
    "rings": 8,
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
    'https://billowing-still-silence.rinkeby.quiknode.pro/fb30368520858753f903e38877e948f8a400e7dd/'))

with open('/Users/tarrence/Library/Ethereum/keystore/UTC--2021-10-27T23-02-33.257981000Z--35754fd45136f2a9996a75cf2955315c9cd35054') as keyfile:
    encrypted_key = keyfile.read()
    private_key = w3.eth.account.decrypt(encrypted_key, "")

swapmeet_addr = "0x52aA7619E1eCEEbCBFF7d26C749488d6AD888516"
SwapMeet = w3.eth.contract(
    swapmeet_addr, abi=abi)

f = open("../outputs/ITEMS/output.json", "r")
meta = json.load(f)

f = open("../outputs/BODY_PARTS/output.json", "r")
bodymeta = json.load(f)

hustler_palette = "[bytes4(hex'')"
for i, color in enumerate(bodymeta['partcolors']):
    if i == 0:
        continue
    hustler_palette += (",hex'" + color[2:] + "'")
hustler_palette += "]"

swapmeet_palette = "[bytes4(hex'')"
for i, color in enumerate(meta['partcolors']):
    if i == 0:
        continue
    swapmeet_palette += (",hex'" + color[2:] + "'")
swapmeet_palette += "]"

set_palette = """
pragma solidity ^0.8.0;

contract GetPalettes {{
    function getPalletes() external returns (bytes4[] memory, bytes4[] memory) {{
        bytes4[] memory hPalette = new bytes4[](83);
        bytes4[83] memory _hPalette = {hustler_palette};
        for (uint256 i = 0; i < hPalette.length; i++) {{
            hPalette[i] = _hPalette[i];
        }}

        bytes4[] memory smPalette = new bytes4[](207);
        bytes4[207] memory _smPalette = {swapmeet_palette};
        for (uint256 i = 0; i < smPalette.length; i++) {{
            smPalette[i] = _smPalette[i];
        }}

        return (hPalette, smPalette);
    }}
}}
""".format(hustler_palette=hustler_palette, swapmeet_palette=swapmeet_palette)

f = open("../../contracts/src/GetPalettes.sol", "w")
f.write(set_palette)

components = {}
for parts in meta["parts"]:
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
    f = open("../../contracts/src/Get"+name+".sol", "w")
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

        if weight > 10000:
            write_contract("%s%d" %
                           (category.capitalize(), contract_idx), ids, rles, ids_len, rles_len)
            contract_idx += 1
            weight = 0
            ids = ""
            rles = ""
            ids_len = 0
            rles_len = 0

    write_contract("%s%d" % (category.capitalize(), contract_idx),
                   ids, rles, ids_len, rles_len)
