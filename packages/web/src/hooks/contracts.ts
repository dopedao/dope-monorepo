import { useMemo } from 'react';
import {
  CrossDomainMessenger__factory,
  Controller__factory,
  Paper__factory,
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

export const usePaper = () => {
  const { chainId, provider } = useEthereum();
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
    () => Hongbao__factory.connect(NETWORK[chainId].contracts.hustlers, provider),
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
