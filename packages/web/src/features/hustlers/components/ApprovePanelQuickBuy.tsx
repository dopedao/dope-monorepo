import { Button, Stack, Table, Tr, Td } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useWeb3React } from '@web3-react/core';
import { StepsProps } from 'features/hustlers/modules/Steps';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import PanelTitleHeader from 'components/PanelTitleHeader';
import { useOneClickInitiator } from 'hooks/contracts';
import { createConfig } from 'utils/HustlerConfig';
import { OrderStruct, SetMetadataStruct } from '@dopewars/contracts/dist/OneClickInitiator';
import { useDopeListingQuery } from 'generated/graphql';

const ApprovePanelQuickBuy = ({ hustlerConfig, setHustlerConfig }: StepsProps) => {
  const { account } = useWeb3React();
  const { data, isFetching } = useDopeListingQuery(
    {
      where: {
        id: hustlerConfig.dopeId,
      },
    },
    {
      enabled: !!account,
    },
  );

  const canMint = false;
  const oneclick = useOneClickInitiator();
  const mintHustler = () => {
    if (!account) {
      return;
    }

    const config = createConfig(hustlerConfig);

    const { dopeId, mintAddress } = hustlerConfig;
    let order: OrderStruct = {
      maker,
    };

    oneclick.initiate(
      order,
      dopeId,
      config as unknown as SetMetadataStruct,
      mintAddress ? mintAddress : account,
      0,
      0,
      0,
      0,
    );
  };
  return (
    <PanelContainer justifyContent="flex-start">
      <PanelTitleHeader>Quick Buy Hustler</PanelTitleHeader>
      <PanelBody>
        <Table>
          <Tr>
            <Td></Td>
            <Td textAlign="right">1</Td>
            <Td>DOPE NFT #{hustlerConfig.dopeId}</Td>
          </Tr>
          <Tr>
            <Td></Td>
            <Td textAlign="right">12,500</Td>
            <Td>$PAPER</Td>
          </Tr>
        </Table>
      </PanelBody>
      <PanelFooter
        css={css`
          padding: 1em;
          position: relative;
        `}
      >
        <div></div>
        <Button variant="primary" onClick={mintHustler} disabled={!canMint}>
          ✨ Mint Hustler ✨
        </Button>
      </PanelFooter>
    </PanelContainer>
  );
};

export default ApprovePanelQuickBuy;
