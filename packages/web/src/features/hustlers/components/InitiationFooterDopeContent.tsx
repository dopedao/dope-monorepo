import { Button } from '@chakra-ui/react';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Select } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { Dope, useWalletQuery, WalletQuery } from 'generated/graphql';
import {
  HustlerCustomization,
  isHustlerRandom,
  randomizeHustlerAttributes,
} from 'utils/HustlerConfig';
import PanelFooter from 'components/PanelFooter';
import useDispatchHustler from 'features/hustlers/hooks/useDispatchHustler';
import SpinnerMessage from 'components/SpinnerMessage';

const NoDopeMessage = () => {
  const caution = (
    <span
      css={css`
        color: #767674;
      `}
    >
      ***
    </span>
  );
  return (
    <PanelFooter
      css={css`
        height: auto;
      `}
    >
      <Box
        css={css`
          text-align: center;
          padding: 16px;
        `}
      >
        <p>
          {caution} NO BUNDLED DOPE IN WALLET {caution}
        </p>
        <Link href="/swap-meet?status=For+Sale&sort_by=Most+Affordable" passHref>
          <Button variant="primary">Shop for DOPE NFTs</Button>
        </Link>
      </Box>
    </PanelFooter>
  );
};

type InitiationFooterDopeContentProps = {
  hustlerConfig: HustlerCustomization;
  setHustlerConfig: Dispatch<SetStateAction<HustlerCustomization>>;
};

const InitiationFooterDopeContent = ({
  hustlerConfig,
  setHustlerConfig,
}: InitiationFooterDopeContentProps) => {
  const { address: account } = useAccount();
  const dispatchHustler = useDispatchHustler();

  const handleDopeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setHustlerConfig({ ...hustlerConfig, dopeId: value });
  };

  const getBundledDopeFromData = (data: WalletQuery) => {
    let bundledDope: Dope[] | [] = [];

    if (data.wallets.edges?.[0]?.node?.dopes && data.wallets.edges[0].node.dopes.length > 0) {
      bundledDope = data.wallets.edges[0].node.dopes.filter(dopeNft => !dopeNft.opened) as Dope[];
    }
    return bundledDope;
  };

  const { data, isFetching: loading } = useWalletQuery(
    {
      where: {
        id: account,
      },
    },
    {
      enabled: !account,
    },
  );

  // const bundledDope = getBundledDopeFromData(data);
  // if (bundledDope.length > 0 && isHustlerRandom()) {
  //   const firstDopeId = bundledDope[0].id;
  //   console.log(`Setting hustler ID from dope returned: ${firstDopeId}`);
  //   setHustlerConfig({ ...hustlerConfig, dopeId: firstDopeId });
  // }

  const goToNextStep = () => {
    dispatchHustler({
      type: 'GO_TO_APPROVE_STEP',
    });
  };

  const goToConfigureStep = () => {
    dispatchHustler({
      type: 'GO_TO_CONFIGURE_STEP',
    });
  };

  if (!account) return <NoDopeMessage />;

  if (loading) {
    return (
      <PanelFooter>
        <SpinnerMessage text="Finding DOPE in your wallet with Gear" />
      </PanelFooter>
    );
  }
  if (!loading && !data?.wallets.edges![0]?.node?.dopes) {
    return <NoDopeMessage />;
  }

  // Prevent controls from showing if no qualified DOPE
  const bundledDope = data && getBundledDopeFromData(data);
  if (bundledDope && bundledDope.length > 0 && isHustlerRandom()) {
    const firstDopeId = bundledDope[0].id;
    console.log(`Setting hustler ID from dope returned: ${firstDopeId}`);
    setHustlerConfig({ ...hustlerConfig, dopeId: firstDopeId });
  }

  if (bundledDope && bundledDope.length === 0) return <NoDopeMessage />;
  return (
    <Box>
      <SubPanelForm>
        <Select size="sm" onChange={handleDopeChange} value={hustlerConfig.dopeId}>
          <option disabled>YOUR DOPE</option>
          {bundledDope?.map(dopeNft => (
            <option key={dopeNft.id} value={dopeNft.id}>
              DOPE NFT #{dopeNft.id}
            </option>
          ))}
        </Select>
      </SubPanelForm>
      <PanelFooter>
        <Box>
          <Button onClick={goToConfigureStep}>Configure</Button>
          <Button
            onClick={() => randomizeHustlerAttributes(hustlerConfig.dopeId, setHustlerConfig)}
          >
            Randomize
          </Button>
        </Box>
        <Button variant="primary" onClick={goToNextStep}>
          👉 Next
        </Button>
      </PanelFooter>
    </Box>
  );
};

const SubPanelForm = styled.div`
  border-top: 1px solid black;
  background-color: #ffffff;
  select {
    border-bottom: 1px solid #dededd;
  }
`;

export default InitiationFooterDopeContent;
