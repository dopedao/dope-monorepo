import json
from web3 import Web3

swapmeetABI = [
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
    }
]

hustlersABI = [
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "part",
                "type": "uint8"
            },
            {
                "internalType": "bytes[]",
                "name": "_rles",
                "type": "bytes[]"
            }
        ],
        "name": "addRles",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

w3 = Web3(Web3.HTTPProvider(
    'https://eth-rinkeby.alchemyapi.io/v2/_UcVUJUlskxh3u6aDOeeUgAWkVk4FwZ4'))

with open('/Users/tarrence/Library/Ethereum/keystore/UTC--2021-10-27T23-02-33.257981000Z--35754fd45136f2a9996a75cf2955315c9cd35054') as keyfile:
    encrypted_key = keyfile.read()
    private_key = w3.eth.account.decrypt(encrypted_key, "")

f = open("../outputs/BODY_PARTS/output.json", "r")
meta = json.load(f)

Hustler = w3.eth.contract(
    "0x216ABeBe4014cfea66EFE885dbE888f1d9170dAB", abi=hustlersABI)

SwapMeet = w3.eth.contract(
    "0xD34F4f54F9c47A3394E204e116Bdc6534d4D8c8B", abi=swapmeetABI)

nonce = w3.eth.get_transaction_count(
    '0x35754FD45136F2a9996a75Cf2955315C9Cd35054')
txn = SwapMeet.functions.setPalette(0, meta['partcolors']).buildTransaction({
    'chainId': 4,
    'gas': 7000000,
    'maxFeePerGas': w3.toWei('25', 'gwei'),
    'maxPriorityFeePerGas': w3.toWei('2', 'gwei'),
    'nonce': nonce,
})
signed_txn = w3.eth.account.sign_transaction(txn, private_key=private_key)
txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
print("sending set palette", txn_hash)
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
txn = Hustler.functions.addRles(0, components["bodies"]["men"]).buildTransaction({
    'chainId': 4,
    'gas': 10000000,
    'maxFeePerGas': w3.toWei('25', 'gwei'),
    'maxPriorityFeePerGas': w3.toWei('2', 'gwei'),
    'nonce': nonce,
})
signed_txn = w3.eth.account.sign_transaction(txn, private_key=private_key)
txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
print("sending men bodies", txn_hash)
txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hash)

nonce = w3.eth.get_transaction_count(
    '0x35754FD45136F2a9996a75Cf2955315C9Cd35054')
txn = Hustler.functions.addRles(1, components["bodies"]["girls"]).buildTransaction({
    'chainId': 4,
    'gas': 10000000,
    'maxFeePerGas': w3.toWei('25', 'gwei'),
    'maxPriorityFeePerGas': w3.toWei('2', 'gwei'),
    'nonce': nonce,
})
signed_txn = w3.eth.account.sign_transaction(txn, private_key=private_key)
txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
print("sending set women bodies", txn_hash)
txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hash)

nonce = w3.eth.get_transaction_count(
    '0x35754FD45136F2a9996a75Cf2955315C9Cd35054')
txn = Hustler.functions.addRles(2, components["hair"]["men"]).buildTransaction({
    'chainId': 4,
    'gas': 10000000,
    'maxFeePerGas': w3.toWei('25', 'gwei'),
    'maxPriorityFeePerGas': w3.toWei('2', 'gwei'),
    'nonce': nonce,
})
signed_txn = w3.eth.account.sign_transaction(txn, private_key=private_key)
txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
print("sending set men hair", txn_hash)
txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hash)

nonce = w3.eth.get_transaction_count(
    '0x35754FD45136F2a9996a75Cf2955315C9Cd35054')
txn = Hustler.functions.addRles(3, components["hair"]["girls"]).buildTransaction({
    'chainId': 4,
    'gas': 10000000,
    'maxFeePerGas': w3.toWei('25', 'gwei'),
    'maxPriorityFeePerGas': w3.toWei('2', 'gwei'),
    'nonce': nonce,
})
signed_txn = w3.eth.account.sign_transaction(txn, private_key=private_key)
txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
print("sending set women hair", txn_hash)
txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hash)

nonce = w3.eth.get_transaction_count(
    '0x35754FD45136F2a9996a75Cf2955315C9Cd35054')
txn = Hustler.functions.addRles(4, ["0x"] + components["beards"]["men"]).buildTransaction({
    'chainId': 4,
    'gas': 10000000,
    'maxFeePerGas': w3.toWei('25', 'gwei'),
    'maxPriorityFeePerGas': w3.toWei('2', 'gwei'),
    'nonce': nonce,
})
signed_txn = w3.eth.account.sign_transaction(txn, private_key=private_key)
txn_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
print("sending set beards", txn_hash)
txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hash)
