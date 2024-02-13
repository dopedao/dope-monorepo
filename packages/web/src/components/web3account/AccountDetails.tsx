import { Heading, Button, Img } from '@chakra-ui/react';
import ConnectWalletSVG from '../../ui/svg/ConnectWallet';
import { useAccount, useDisconnect, useEnsName, useEnsAvatar } from 'wagmi';
import React from 'react';

const AccountDetails = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const shortAddress = `${address?.slice(0, 8)}...${address?.slice(-8)}`;

  return (
    <>
      <Heading as="h4" textAlign="center">
        {ensName ? ensName : shortAddress}
      </Heading>
      {ensAvatar && (
        <Img alt="ENS Avatar" src={ensAvatar} borderRadius={9999} border="10px solid black" />
      )}
      {!ensAvatar && <ConnectWalletSVG />}

      <Button onClick={() => disconnect()}>Disconnect</Button>
    </>
  );
};

export default AccountDetails;
