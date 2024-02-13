import { useMemo } from 'react';
import { useState, useEffect } from 'react';
import {
  CrossDomainMessenger__factory,
  Controller__factory,
  Paper__factory,
  DopeInitiator__factory,
  Loot__factory,
  Initiator__factory,
  Hustler__factory,
  SwapMeet__factory,
  Components__factory,
  Hongbao__factory,
  OneClickInitiator__factory,
  SwapMeet,
} from '@dopewars/contracts/dist';
import { JsonRpcSigner, ethers } from 'ethers';
import { NETWORK, ETH_CHAIN_ID, OPT_CHAIN_ID } from 'utils/constants';
import { Web3Provider, getEthersProvider, getEthersSigner } from './ethersProvider';

const ethChainId = parseInt(ETH_CHAIN_ID);
const opChainId = parseInt(OPT_CHAIN_ID);

/**
 *
 * The following are convenience methods to use contracts
 * created by Typechain with the useEthersProvider and
 * useEthersSigner hooks.
 *
 * By default a provider is use unless a signer is passed in.
 * We are using WAGMI/VIEM most other places and these
 * should be potentially swapped out at some point, instead
 * of using an adapter for ethers.
 *
 * @param signer should be a signer
 * @returns A typechain contract instance
 */

export const useDope = (signer?: JsonRpcSigner | null) => {
  const sp = signer ? signer : getEthersProvider({ chainId: ethChainId });
  //@ts-ignore
  const c = NETWORK[ethChainId].contracts.dope;
  return useMemo(() => Loot__factory.connect(c, sp), [c, sp]);
};

export const useInitiator = (signer?: JsonRpcSigner | null) => {
  const sp = signer ? signer : getEthersProvider({ chainId: ethChainId });
  //@ts-ignore
  const c = NETWORK[ethChainId].contracts.initiator;
  return useMemo(() => Initiator__factory.connect(c, sp), [c, sp]);
};

export const usePaper = (signer?: JsonRpcSigner | null) => {
  const sp = signer ? signer : getEthersProvider({ chainId: ethChainId });
  //@ts-ignore
  const pp = NETWORK[ethChainId].contracts.paper;
  return useMemo(() => Paper__factory.connect(pp, sp), [pp, sp]);
};

export const useController = () => {
  const provider = getEthersProvider({ chainId: opChainId });
  //@ts-ignore
  const c = NETWORK[opChainId].contracts.controller;
  return useMemo(() => Controller__factory.connect(c, provider), [c, provider]);
};

export const useSwapMeet = (signer?: JsonRpcSigner | null) => {
  const sp = signer ? signer : getEthersProvider({ chainId: opChainId });
  //@ts-ignore
  const c = NETWORK[opChainId].contracts.swapmeet;
  return useMemo(() => SwapMeet__factory.connect(c, sp), [c, sp]);
};

export const useCrossDomainMessenger = () => {
  const provider = getEthersProvider({ chainId: opChainId });

  return useMemo(
    () =>
      CrossDomainMessenger__factory.connect('0x4200000000000000000000000000000000000007', provider),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [provider],
  );
};

export const useHustler = (signer?: JsonRpcSigner | null) => {
  const sp = signer ? signer : getEthersProvider({ chainId: opChainId });
  //@ts-ignore
  const h = NETWORK[opChainId].contracts.hustlers;
  return useMemo(() => Hustler__factory.connect(h, sp), [h, sp]);
};

export const useHustlerComponents = () => {
  const provider = getEthersProvider({ chainId: opChainId });
  //@ts-ignore
  const c = NETWORK[opChainId].contracts.components;
  return useMemo(() => Components__factory.connect(c, provider), [c, provider]);
};

export const useHongbao = (signer?: JsonRpcSigner | null) => {
  const sp = signer ? signer : getEthersProvider({ chainId: ethChainId });
  //@ts-ignore
  const c = NETWORK[opChainId].contracts.hongbao;
  return useMemo(() => Hongbao__factory.connect(c, sp), [c, sp]);
};

export const useFetchMetadata = () => {
  const hustlerComponents = useHustlerComponents();
  const hustler = useHustler();
  const provider = getEthersProvider({ chainId: opChainId });

  return async function fetchMetadata(id: bigint) {
    const ogTitle = await hustlerComponents.title(id);
    const metadata = await hustler.metadata(id);
    const name = metadata.name;
    const color = metadata.color;
    const background = metadata.background;

    const METADATA_KEY = ethers.solidityPackedKeccak256(['uint256', 'uint256'], [id, 19]);
    const VIEWBOX_SLOT = 1;
    const BODY_SLOT = 2;
    const ORDER_SLOT = 3;
    const WEAPON_SLOT = 5;
    const CLOTHES_SLOT = 6;
    const VEHICLE_SLOT = 7;
    const WAIST_SLOT = 8;
    const FOOT_SLOT = 9;
    const HAND_SLOT = 10;
    const DRUGS_SLOT = 11;
    const NECK_SLOT = 12;
    const RING_SLOT = 13;
    const ACCESSORY_SLOT = 14;

    const hustlerAddr = hustler.getAddress();

    try {
      const [
        viewbox,
        body,
        order,
        weapon,
        clothes,
        vehicle,
        waist,
        foot,
        hand,
        drugs,
        neck,
        ring,
        accessory,
      ] = await Promise.all([
        provider
          .getStorage(hustlerAddr, BigInt(METADATA_KEY) + BigInt(VIEWBOX_SLOT))
          .then(value => [
            BigInt(ethers.dataSlice(value, 31)),
            BigInt(ethers.dataSlice(value, 30, 31)),
            BigInt(ethers.dataSlice(value, 29, 30)),
            BigInt(ethers.dataSlice(value, 28, 29)),
          ]) as any,
        provider
          .getStorage(hustlerAddr, BigInt(METADATA_KEY) + BigInt(BODY_SLOT))
          .then(value => [
            BigInt(ethers.dataSlice(value, 31)),
            BigInt(ethers.dataSlice(value, 30, 31)),
            BigInt(ethers.dataSlice(value, 29, 30)),
            BigInt(ethers.dataSlice(value, 28, 29)),
          ]) as any,
        provider.getStorage(hustlerAddr, BigInt(METADATA_KEY) + BigInt(ORDER_SLOT)),
        provider.getStorage(hustlerAddr, BigInt(METADATA_KEY) + BigInt(WEAPON_SLOT)),
        provider.getStorage(hustlerAddr, BigInt(METADATA_KEY) + BigInt(CLOTHES_SLOT)),
        provider.getStorage(hustlerAddr, BigInt(METADATA_KEY) + BigInt(VEHICLE_SLOT)),
        provider.getStorage(hustlerAddr, BigInt(METADATA_KEY) + BigInt(WAIST_SLOT)),
        provider.getStorage(hustlerAddr, BigInt(METADATA_KEY) + BigInt(FOOT_SLOT)),
        provider.getStorage(hustlerAddr, BigInt(METADATA_KEY) + BigInt(HAND_SLOT)),
        provider.getStorage(hustlerAddr, BigInt(METADATA_KEY) + BigInt(DRUGS_SLOT)),
        provider.getStorage(hustlerAddr, BigInt(METADATA_KEY) + BigInt(NECK_SLOT)),
        provider.getStorage(hustlerAddr, BigInt(METADATA_KEY) + BigInt(RING_SLOT)),
        provider.getStorage(hustlerAddr, BigInt(METADATA_KEY) + BigInt(ACCESSORY_SLOT)),
      ]);

      return {
        ogTitle,
        name,
        color,
        background,
        viewbox,
        body,
        order,
        weapon,
        clothes,
        vehicle,
        waist,
        foot,
        hand,
        drugs,
        neck,
        ring,
        accessory,
      };
    } catch (e) {
      console.error(e);
    }
  };
};

export const useAddressFromContract = (contract: any) => {
  const [contractAddress, setContractAddress] = useState('');
  useEffect(() => {
    async function effect() {
      const address = await contract.getAddress();
      setContractAddress(address);
    }
    effect();
  }, [contract]);

  return contractAddress;
};
