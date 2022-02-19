import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import {
  CrossDomainMessenger__factory,
  Controller__factory,
  Paper__factory,
  DopeInitiator__factory,
  Initiator__factory,
  Hustler__factory,
  SwapMeet__factory,
  Components__factory,
  Hongbao__factory,
} from '@dopewars/contracts/dist';
import { ethers, BigNumber } from 'ethers';
import { NETWORK } from 'utils/constants';
import { useEthereum, useOptimism } from 'hooks/web3';

export const useInitiator = () => {
  const { chainId, provider } = useEthereum();

  return useMemo(
    () => Initiator__factory.connect(NETWORK[chainId].contracts.initiator, provider),
    [chainId, provider],
  );
};

export const useDopeInitiator = () => {
  const { chainId, provider } = useEthereum();

  return useMemo(
    () => DopeInitiator__factory.connect(NETWORK[chainId].contracts.initiator, provider),
    [chainId, provider],
  );
};

export const usePaper = () => {
  let chainId: 1 | 10 | 42 | 69;
  let provider: ethers.providers.JsonRpcProvider;
  let { chainId: curChainId, library } = useWeb3React();
  const { chainId: ethChainId, provider: ethProvider } = useEthereum();

  if (curChainId && [1, 10, 42, 69].includes(curChainId)) {
    chainId = curChainId as 1 | 10 | 42 | 69;
    provider = library.getSigner();
  } else {
    chainId = ethChainId;
    provider = ethProvider;
  }

  return useMemo(
    () => Paper__factory.connect(NETWORK[chainId].contracts.paper, provider),
    [chainId, provider],
  );
};

export const useController = () => {
  const { chainId, provider } = useOptimism();

  return useMemo(
    () => Controller__factory.connect(NETWORK[chainId].contracts.controller, provider),
    [chainId, provider],
  );
};

export const useSwapMeet = () => {
  const { chainId, provider } = useOptimism();

  return useMemo(
    () => SwapMeet__factory.connect(NETWORK[chainId].contracts.swapmeet, provider),
    [chainId, provider],
  );
};

export const useCrossDomainMessenger = () => {
  const { chainId, provider } = useOptimism();

  return useMemo(
    () =>
      CrossDomainMessenger__factory.connect('0x4200000000000000000000000000000000000007', provider),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chainId, provider],
  );
};

export const useHustler = () => {
  const { chainId, provider } = useOptimism();

  return useMemo(
    () => Hustler__factory.connect(NETWORK[chainId].contracts.hustlers, provider),
    [chainId, provider],
  );
};

export const useHustlerComponents = () => {
  const { chainId, provider } = useOptimism();

  return useMemo(
    () => Components__factory.connect(NETWORK[chainId].contracts.components, provider),
    [chainId, provider],
  );
};

export const useHongbao = () => {
  const { chainId, provider } = useOptimism();

  return useMemo(
    () => Hongbao__factory.connect(NETWORK[chainId].contracts.hongbao, provider),
    [chainId, provider],
  );
};

export const useFetchMetadata = () => {
  const hustlerComponents = useHustlerComponents();
  const hustler = useHustler();
  const { provider } = useOptimism();

  return async function fetchMetadata(id: BigNumber) {
    const ogTitle = await hustlerComponents.title(id);
    const metadata = await hustler.metadata(id);
    const name = metadata['name'];
    const color = metadata['color'];
    const background = metadata['background'];

    const METADATA_KEY = ethers.utils.solidityKeccak256(['uint256', 'uint256'], [id, 19]);
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
          .getStorageAt(
            hustler.address,
            BigNumber.from(METADATA_KEY).add(VIEWBOX_SLOT).toHexString(),
          )
          .then(value => [
            BigNumber.from(ethers.utils.hexDataSlice(value, 31)),
            BigNumber.from(ethers.utils.hexDataSlice(value, 30, 31)),
            BigNumber.from(ethers.utils.hexDataSlice(value, 29, 30)),
            BigNumber.from(ethers.utils.hexDataSlice(value, 28, 29)),
          ]) as any,
        provider
          .getStorageAt(hustler.address, BigNumber.from(METADATA_KEY).add(BODY_SLOT).toHexString())
          .then(value => [
            BigNumber.from(ethers.utils.hexDataSlice(value, 31)),
            BigNumber.from(ethers.utils.hexDataSlice(value, 30, 31)),
            BigNumber.from(ethers.utils.hexDataSlice(value, 29, 30)),
            BigNumber.from(ethers.utils.hexDataSlice(value, 28, 29)),
          ]) as any,
        provider
          .getStorageAt(hustler.address, BigNumber.from(METADATA_KEY).add(ORDER_SLOT).toHexString())
          .then(BigNumber.from),
        provider
          .getStorageAt(
            hustler.address,
            BigNumber.from(METADATA_KEY).add(WEAPON_SLOT).toHexString(),
          )
          .then(BigNumber.from),
        provider
          .getStorageAt(
            hustler.address,
            BigNumber.from(METADATA_KEY).add(CLOTHES_SLOT).toHexString(),
          )
          .then(BigNumber.from),
        provider
          .getStorageAt(
            hustler.address,
            BigNumber.from(METADATA_KEY).add(VEHICLE_SLOT).toHexString(),
          )
          .then(BigNumber.from),
        provider
          .getStorageAt(hustler.address, BigNumber.from(METADATA_KEY).add(WAIST_SLOT).toHexString())
          .then(BigNumber.from),
        provider
          .getStorageAt(hustler.address, BigNumber.from(METADATA_KEY).add(FOOT_SLOT).toHexString())
          .then(BigNumber.from),
        provider
          .getStorageAt(hustler.address, BigNumber.from(METADATA_KEY).add(HAND_SLOT).toHexString())
          .then(BigNumber.from),
        provider
          .getStorageAt(hustler.address, BigNumber.from(METADATA_KEY).add(DRUGS_SLOT).toHexString())
          .then(BigNumber.from),
        provider
          .getStorageAt(hustler.address, BigNumber.from(METADATA_KEY).add(NECK_SLOT).toHexString())
          .then(BigNumber.from),
        provider
          .getStorageAt(hustler.address, BigNumber.from(METADATA_KEY).add(RING_SLOT).toHexString())
          .then(BigNumber.from),
        provider
          .getStorageAt(
            hustler.address,
            BigNumber.from(METADATA_KEY).add(ACCESSORY_SLOT).toHexString(),
          )
          .then(BigNumber.from),
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
