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
                "internalType": "bytes[]",
                "name": "_bodies",
                "type": "bytes[]"
            }
        ],
        "name": "addBodies",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes[]",
                "name": "_beards",
                "type": "bytes[]"
            }
        ],
        "name": "addBeards",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes[]",
                "name": "_heads",
                "type": "bytes[]"
            }
        ],
        "name": "addHeads",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

w3 = Web3(Web3.HTTPProvider(
    'https://eth-rinkeby.alchemyapi.io/v2/_UcVUJUlskxh3u6aDOeeUgAWkVk4FwZ4'))

with open('/Users/tarrence/Library/Ethereum/keystore/UTC--2021-09-11T21-49-48.512480000Z--35754fd45136f2a9996a75cf2955315c9cd35054') as keyfile:
    encrypted_key = keyfile.read()
    private_key = w3.eth.account.decrypt(encrypted_key, "")

f = open("../outputs/output.json", "r")
meta = json.load(f)

Hustler = w3.eth.contract(
    "0xe8025eA903Fd83DB7577990BE0202E088ABd5432", abi=abi)

nonce = w3.eth.get_transaction_count(
    '0x35754FD45136F2a9996a75Cf2955315C9Cd35054')
txn = Hustler.functions.setPalette(0, meta['partcolors']).buildTransaction({
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

    if category not in components:
        components[category] = {}

    if gender not in components[category]:
        components[category][gender] = []

    components[category][gender].append(part["data"])

nonce = w3.eth.get_transaction_count(
    '0x35754FD45136F2a9996a75Cf2955315C9Cd35054')
txn = Hustler.functions.addBodies(components["bodies"]["men"] + components["bodies"]["girls"]).buildTransaction({
    'chainId': 4,
    'gas': 10000000,
    'maxFeePerGas': w3.toWei('2', 'gwei'),
    'maxPriorityFeePerGas': w3.toWei('1', 'gwei'),
    'nonce': nonce,
})
signed_txn = w3.eth.account.sign_transaction(txn, private_key=private_key)
txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hash)

nonce = w3.eth.get_transaction_count(
    '0x35754FD45136F2a9996a75Cf2955315C9Cd35054')
txn = Hustler.functions.addHeads(components["hair"]["men"] + components["hair"]["girls"]).buildTransaction({
    'chainId': 4,
    'gas': 10000000,
    'maxFeePerGas': w3.toWei('2', 'gwei'),
    'maxPriorityFeePerGas': w3.toWei('1', 'gwei'),
    'nonce': nonce,
})
signed_txn = w3.eth.account.sign_transaction(txn, private_key=private_key)
txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hash)

print(["0x"] + components["beards"]["men"])

nonce = w3.eth.get_transaction_count(
    '0x35754FD45136F2a9996a75Cf2955315C9Cd35054')
txn = Hustler.functions.addBeards(["0x"] + components["beards"]["men"]).buildTransaction({
    'chainId': 4,
    'gas': 10000000,
    'maxFeePerGas': w3.toWei('2', 'gwei'),
    'maxPriorityFeePerGas': w3.toWei('1', 'gwei'),
    'nonce': nonce,
})
signed_txn = w3.eth.account.sign_transaction(txn, private_key=private_key)
txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hash)
