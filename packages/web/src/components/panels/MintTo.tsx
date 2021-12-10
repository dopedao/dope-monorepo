import { useEffect, useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { useIsContract } from 'hooks/web3';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBar from 'components/PanelTitleBar';

const MintTo = ({
  mintTo,
  setMintTo,
  mintAddress,
  setMintAddress,
}: {
  mintTo: boolean;
  setMintTo: (shouldMintTo: boolean) => void;
  mintAddress: string | undefined;
  setMintAddress: (value: string) => void;
}) => {
  const { account } = useWeb3React();
  const isContract = useIsContract(account);

  useEffect(() => {
    if (isContract) {
      setMintTo(true);
    }
  }, [isContract, setMintTo]);

  if (!mintTo && !isContract) {
    return (
      <Button variant="linkBlack" onClick={() => setMintTo(true)}>
        Send Hustler to a friend?
      </Button>
    );
  }

  if (isContract) {
    return (
      <PanelContainer>
        <PanelTitleBar>Mint to Different Address</PanelTitleBar>
        <PanelBody>
          <p>
            It looks like you are using a contract wallet. Please set the optimism address you want
            your hustler minted to.
          </p>
          <Input
            placeholder="0x…"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMintAddress(e.target.value)}
            value={mintAddress}
          />
        </PanelBody>
      </PanelContainer>
    );
  }

  return (
    <PanelContainer>
      <PanelTitleBar onClick={() => setMintTo(false)}>Mint to Different Address</PanelTitleBar>
      <PanelBody>
        <p>Send this Hustler to a friend, or another wallet?</p>
        <Input
          placeholder="0x…"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMintAddress(e.target.value)}
          value={mintAddress}
        />
      </PanelBody>
    </PanelContainer>
  );
};

export default MintTo;
