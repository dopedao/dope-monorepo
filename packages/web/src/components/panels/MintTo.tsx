import { useEffect } from 'react';
import { Button, Input, Image } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { useIsContract } from 'hooks/web3';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBarFlex from 'components/PanelTitleBarFlex';
import { css } from '@emotion/react';

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
  const { address: account } = useAccount();
  const isContract = useIsContract(account);

  useEffect(() => {
    if (isContract) {
      setMintTo(true);
    }
  }, [isContract, setMintTo]);

  if (!mintTo && !isContract) {
    return <Button onClick={() => setMintTo(true)}>Send to a friend?</Button>;
  }

  return (
    <PanelContainer
      justifyContent="flex-start"
      css={css`
        max-height: 180px;
      `}
    >
      <PanelTitleBarFlex onClick={() => setMintTo(false)}>
        <span>Send to Different Address</span>
        <Image
          src="/images/icon/circle-clear-input.svg"
          alt="close"
          width="16px"
          marginRight="8px"
          cursor="pointer"
        />
      </PanelTitleBarFlex>
      <PanelBody>
        {!isContract && <p>Send to a friend, or another wallet?</p>}
        {isContract && (
          <p>
            It looks like you are using a contract wallet. Please set the Optimism address you want
            these items sent to.
          </p>
        )}
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
