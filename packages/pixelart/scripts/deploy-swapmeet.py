import json
from web3 import Web3

abi = [
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "id",
                "type": "uint8"
            },
            {
                "internalType": "bytes4[]",
                "name": "palette",
                "type": "bytes4[]"
            }
        ],
        "name": "setPalette",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "ids",
                "type": "uint256[]"
            },
            {
                "internalType": "bytes[]",
                "name": "rles",
                "type": "bytes[]"
            }
        ],
        "name": "batchSetRle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
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

w3 = Web3(Web3.HTTPProvider(
    'https://eth-rinkeby.alchemyapi.io/v2/_UcVUJUlskxh3u6aDOeeUgAWkVk4FwZ4'))

with open('/Users/tarrence/Library/Ethereum/keystore/UTC--2021-09-11T21-49-48.512480000Z--35754fd45136f2a9996a75cf2955315c9cd35054') as keyfile:
    encrypted_key = keyfile.read()
    private_key = w3.eth.account.decrypt(encrypted_key, "")

f = open("../outputs/ITEMS/output.json", "r")
meta = json.load(f)

SwapMeet = w3.eth.contract(
    "0x87d22eDaa26F9098A26A15e80A36c73345e0E18E", abi=abi)

print(SwapMeet.functions.name().call())

nonce = w3.eth.get_transaction_count(
    '0x35754FD45136F2a9996a75Cf2955315C9Cd35054')
txn = SwapMeet.functions.setPalette(1, meta['partcolors']).buildTransaction({
    'chainId': 4,
    'gas': 7000000,
    'maxFeePerGas': w3.toWei('2', 'gwei'),
    'maxPriorityFeePerGas': w3.toWei('1', 'gwei'),
    'nonce': nonce,
})
signed_txn = w3.eth.account.sign_transaction(txn, private_key=private_key)
txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hash)

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


def batchSetRle(ids, rles):
    if len(ids) == 0:
        return

    nonce = w3.eth.get_transaction_count(
        '0x35754FD45136F2a9996a75Cf2955315C9Cd35054')
    txn = SwapMeet.functions.batchSetRle(ids, rles).buildTransaction({
        'chainId': 4,
        'gas': 10000000,
        'maxFeePerGas': w3.toWei('2', 'gwei'),
        'maxPriorityFeePerGas': w3.toWei('1', 'gwei'),
        'nonce': nonce,
    })
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=private_key)
    txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hash)


for category, idxs in components.items():
    print(category)
    ids = []
    rles = []
    weight = 0

    for idx, genders in idxs.items():
        if category in types:
            id = SwapMeet.functions.toId(
                [int(idx), 0, 0, 0, 0], types[category]).call()
            ids.append(id)

            if category == "vehicles":
                weight += len(genders["none"])
                weight += len(genders["none"])
                rles.append(genders["none"])
                rles.append(genders["none"])
            else:
                weight += len(genders["men"])
                weight += len(genders["girls"])
                rles.append(genders["men"])
                rles.append(genders["girls"])

        if weight > 10000:
            batchSetRle(ids, rles)
            weight = 0
            ids = []
            rles = []

    batchSetRle(ids, rles)
