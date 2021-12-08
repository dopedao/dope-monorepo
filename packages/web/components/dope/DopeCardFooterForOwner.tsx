/* eslint-disable @next/next/no-img-element */
import { useWeb3React } from '@web3-react/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Bag } from 'src/generated/graphql';
import { Button } from '@chakra-ui/button';
import { css } from '@emotion/react';
import { useInitiator, usePaper } from 'hooks/contracts';

interface Props {
  bag: Pick<Bag, 'id' | 'claimed'>;
  toggleVisibility(): void;
}

const DopeCardFooterForOwner = ({ bag, toggleVisibility }: Props) => {
  const { chainId, account } = useWeb3React();

  const paper = usePaper();
  const initiator = useInitiator();

  const router = useRouter();

  return (
    <div>
      <Link href={`/hustlers/${bag.id}/initiate`} passHref>
        <Button variant="primary">Initiate Hustler</Button>
      </Link>
      {initiator && paper && account && chainId === 42 && (
        <Button onClick={() => router.push(`/dope/${bag.id}/unbundle`)}>Unbundle</Button>
      )}
      {paper && (
        <Button
          disabled={bag.claimed}
          onClick={async () => {
            await paper.claimById(bag.id);
          }}
        >
          Claim Paper
        </Button>
      )}
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
    </div>
  );
};
export default DopeCardFooterForOwner;
