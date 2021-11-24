import json
from web3 import Web3
import re

w3 = Web3(Web3.HTTPProvider(
    'https://eth-rinkeby.alchemyapi.io/v2/_UcVUJUlskxh3u6aDOeeUgAWkVk4FwZ4'))

with open('/Users/tarrence/Library/Ethereum/keystore/UTC--2021-10-27T23-02-33.257981000Z--35754fd45136f2a9996a75cf2955315c9cd35054') as keyfile:
    encrypted_key = keyfile.read()
    private_key = w3.eth.account.decrypt(encrypted_key, "")

f = open("../outputs/BODY_PARTS/output.json", "r")
meta = json.load(f)

item_setter = """
pragma solidity ^0.8.0;

contract Get{name} {{
    function getRles() external returns (uint256, bytes[] memory) {{
        bytes[] memory rles = new bytes[]({rles_len});
        bytes[{rles_len}] memory _rles = [{rles}];
        for (uint256 i = 0; i < rles.length; i++) {{
            rles[i] = _rles[i];
        }}

        return ({id}, rles);
    }}
}}
"""


def write_contract(name, id, rles):
    c = item_setter.format(
        name=name, id=id, rles=rles, rles_len=rles.count(",") + 1)
    f = open("../../contracts/src/Get"+name+".sol", "w")
    f.write(c)


components = {}
for parts in sorted(meta["parts"], key=lambda d: int(d[0]['name'].split("-")[0])):
    part = parts[0]
    gender = part["gender"]
    category = part["category"]

    if category not in components:
        components[category] = {}

    if gender not in components[category]:
        components[category][gender] = ""
    else:
        components[category][gender] += ","
    print(part["name"])
    components[category][gender] += "bytes(hex'" + part["data"][2:] + "')"


write_contract("MenBodies", 0, components["bodies"]["men"])
write_contract("WomenBodies", 1, components["bodies"]["girls"])
write_contract("MenHair", 2, components["hair"]["men"])
write_contract("WomenHair", 3, components["hair"]["girls"])
write_contract("MenBeards", 4, components["beards"]["men"])
