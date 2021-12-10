import { Button, Spinner } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Select } from '@chakra-ui/react';
import { ReactiveVar } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import Link from 'next/link';
import { useWalletQuery, WalletQuery } from 'generated/graphql';
import {
  HustlerCustomization,
  isHustlerRandom,
  randomizeHustlerAttributes,
} from 'utils/HustlerConfig';
import { PickedBag } from 'utils/DopeDatabase';
import PanelFooter from 'components/PanelFooter';
import useDispatchHustler from 'features/hustlers/hooks/useDispatchHustler';

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
      <div
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
      </div>
    </PanelFooter>
  );
};

const SubPanelForm = styled.div`
  border-top: 1px solid black;
  background-color: #ffffff;
  select {
    border-bottom: 1px solid #dededd;
  }
`;

const SpinnerContainer = styled.div`
  border: 0px;
  .chakra-spinner {
    margin: 0 0.5em;
  }
`;

type InitiationFooterDopeContentProps = {
  hustlerConfig: HustlerCustomization;
  makeVarConfig?: ReactiveVar<HustlerCustomization>;
};

const InitiationFooterDopeContent = ({
  hustlerConfig,
  makeVarConfig,
}: InitiationFooterDopeContentProps) => {
  const { account } = useWeb3React();
  const dispatchHustler = useDispatchHustler();

  const handleDopeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (makeVarConfig) {
      makeVarConfig({ ...hustlerConfig, dopeId: value });
    }
  };

  const getBundledDopeFromData = (data: WalletQuery) => {
    let bundledDope = [] as PickedBag[];
    if (data?.wallet?.bags && data.wallet.bags.length > 0) {
      bundledDope = data.wallet.bags.filter((dopeNft: PickedBag) => !dopeNft.opened);
    }
    return bundledDope;
  };

  const { data, loading } = useWalletQuery({
    variables: { id: account?.toLowerCase() || '' },
    skip: !account,
    // Set first item as selected when it comes back from
    // the contract query.
    onCompleted: data => {
      const bundledDope = getBundledDopeFromData(data);
      if (bundledDope.length > 0 && isHustlerRandom()) {
        const firstDopeId = bundledDope[0].id;
        console.log(`Setting hustler ID from dope returned: ${firstDopeId}`);
        if (makeVarConfig) {
          makeVarConfig({ ...hustlerConfig, dopeId: firstDopeId });
        }
      }
    },
  });

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
        <SpinnerContainer>
          <Spinner size="xs" />
          Finding unbundled DOPE in your wallet
        </SpinnerContainer>
      </PanelFooter>
    );
  } else if (!data?.wallet?.bags || data.wallet.bags.length === 0) {
    return <NoDopeMessage />;
  } else {
    // Prevent controls from showing if no qualified DOPE
    const bundledDope = getBundledDopeFromData(data);
    if (bundledDope.length == 0) return <NoDopeMessage />;
    return (
      <div>
        <SubPanelForm>
          <Select
            size="sm"
            variant="filterBar"
            onChange={handleDopeChange}
            value={hustlerConfig.dopeId}
          >
            <option disabled>YOUR DOPE</option>
            {bundledDope.map(dopeNft => (
              <option key={dopeNft.id} value={dopeNft.id}>
                DOPE NFT #{dopeNft.id}
              </option>
            ))}
          </Select>
        </SubPanelForm>
        <PanelFooter>
          <div>
            <Button onClick={goToConfigureStep}>Configure</Button>
            <Button onClick={() => randomizeHustlerAttributes(hustlerConfig.dopeId, makeVarConfig)}>
              Randomize
            </Button>
          </div>
          <Button variant="primary" onClick={goToNextStep}>
            👉 Next
          </Button>
        </PanelFooter>
      </div>
    );
  }
};

export default InitiationFooterDopeContent;
