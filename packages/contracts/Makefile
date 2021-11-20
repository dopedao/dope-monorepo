# include .env file and export its env vars
# (-include to ignore error if it does not exist)
-include .env

install: update npm solc

# dapp deps
update:; dapp update

# npm deps for linting etc.
npm:; yarn install

# install solc version
# example to install other versions: `make solc 0_8_2`
SOLC_VERSION := 0_8_6
solc:; nix-env -f https://github.com/dapphub/dapptools/archive/master.tar.gz -iA solc-static-versions.solc_${SOLC_VERSION}

# Build & test
# build  : export DAPP_LIBRARIES=" src/MetadataBuilder.sol:MetadataBuilder:0xd2761Ee62d8772343070A5dE02C436F788EdF60a"
build  :; ./scripts/build.sh
test   :; dapp test --ffi # enable if you need the `ffi` cheat code on HEVM
clean  :; dapp clean
lint   :; yarn run lint
estimate :; ./scripts/estimate-gas.sh ${contract}
size   :; ./scripts/contract-size.sh ${contract}

# Deployment helpers
deploy-l1 :; @./scripts/deploy-l1.sh
deploy-l2 :; @./scripts/deploy-l2.sh

# mainnet
deploy-mainnet: export ETH_RPC_URL = https://ancient-morning-wave.quiknode.pro/0d888ce1d2caa53e7004a067641c905934ef0efa/
# $(call network,mainnet)
deploy-mainnet: export CONTROLLER=0x6942B1b6965EF771743AF4Ea2A3244A4310BEC8f
deploy-mainnet: export LOOT=0x8707276df042e89669d69a177d3da7dc78bd8723
deploy-mainnet: export PAPER=0x7aE1D57b58fA6411F32948314BadD83583eE0e8C
deploy-mainnet: check-api-key deploy-l1

# optimism
# deploy-optimism: export DAPP_LIBRARIES=" src/MetadataBuilder.sol:MetadataBuilder:0xd2761Ee62d8772343070A5dE02C436F788EdF60a"
deploy-optimism: export ETH_RPC_URL = https://opt-mainnet.g.alchemy.com/v2/k8J6YaoTtJVIs4ZxTo26zIPfBiCveX2m
deploy-optimism: check-api-key deploy-l2

# rinkeby
deploy-rinkeby: export ETH_RPC_URL = $(call network,rinkeby)
deploy-rinkeby: export LOOT=0xEf879818335a10Db667810a9B668A8F537389194
deploy-rinkeby: export PAPER=0x7988fCA891B30cF8E23459B09b851F9d79B17215
deploy-rinkeby: check-api-key deploy-l1

# kovan
deploy-kovan: export ETH_RPC_URL = $(call network,kovan)
deploy-kovan: export CONTROLLER=0x560ac3bB6b0bCF669a2a18e33c7538394EA35fF2
deploy-kovan: export LOOT=0xd2761Ee62d8772343070A5dE02C436F788EdF60a
deploy-kovan: export PAPER=0x781B575CA559263eb232B854195D6dC0AB720105
deploy-kovan: check-api-key deploy-l1

# opt-kovan
deploy-opt-kovan: export DAPP_LIBRARIES=" src/MetadataBuilder.sol:MetadataBuilder:0xd2761Ee62d8772343070A5dE02C436F788EdF60a"
deploy-opt-kovan: export ETH_RPC_URL = https://opt-kovan.g.alchemy.com/v2/GAJJKOHOzfVI1jmgOf2OcL--sj4Yyedg
deploy-opt-kovan: check-api-key deploy-l2

# testnet
deploy-testnet:; @./scripts/test-deploy.sh

check-api-key:
ifndef ALCHEMY_API_KEY
	$(error ALCHEMY_API_KEY is undefined)
endif

# Returns the URL to deploy to a hosted node.
# Requires the ALCHEMY_API_KEY env var to be set.
# The first argument determines the network (mainnet / rinkeby / ropsten / kovan / goerli)
define network
https://eth-$1.alchemyapi.io/v2/${ALCHEMY_API_KEY}
endef