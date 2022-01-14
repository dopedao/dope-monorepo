/* eslint-disable @next/next/no-img-element */
import { useWeb3React } from '@web3-react/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/button';
import { css } from '@emotion/react';
import { Dope } from 'generated/graphql';
import { useInitiator, usePaper } from 'hooks/contracts';
import styled from '@emotion/styled';

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  @media (max-width: 768px) {
    gap: 6px;
  }
`;

type DopeCardFooterForOwnerProps = {
  dope: Pick<Dope, 'id' | 'claimed'>;
  toggleVisibility(): void;
};

const DopeCardFooterForOwner = ({ dope, toggleVisibility }: DopeCardFooterForOwnerProps) => {
  const { chainId, account } = useWeb3React();

  const paper = usePaper();
  const initiator = useInitiator();

  const router = useRouter();

  return (
    <>
      <ButtonsWrapper>
        <Link href={`/hustlers/${dope.id}/initiate`} passHref>
          <Button variant="primary">Initiate Hustler</Button>
        </Link>
        {initiator && paper && account && chainId === 42 && (
          <Button onClick={() => router.push(`/dope/${dope.id}/unbundle`)}>Unbundle</Button>
        )}
        {paper && (
          <Button
            disabled={dope.claimed}
            onClick={async () => {
              await paper.claimById(dope.id);
            }}
          >
            Claim Paper
          </Button>
        )}
      </ButtonsWrapper>
      <div
        css={css`
          float: right;
          cursor: pointer;
          padding: 4px;
        `}
        onClick={() => toggleVisibility()}
      >
        <img
          src="/images/icon/info.svg"
          width="24"
          height="24"
          css={css`
            display: inline-block;
          `}
          alt="info"
        />
      </div>
    </>
  );
};
export default DopeCardFooterForOwner;
