/* eslint-disable @next/next/no-img-element */
import { Button } from '@chakra-ui/button';
import { usePaper } from 'hooks/contracts';
import { Dope } from 'generated/graphql';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PanelFooter from 'components/PanelFooter';

type DopeCardButtonBarOwnerProps = {
  dope: Pick<Dope, 'id' | 'claimed' | 'opened'>;
};

const DopeCardButtonBarOwner = ({ dope }: DopeCardButtonBarOwnerProps) => {
  const paper = usePaper();
  const router = useRouter();

  return (
    <PanelFooter>
      <div></div>
      {paper && !dope.claimed && (
        <Button
          onClick={async () => {
            await paper.claimById(dope.id);
          }}
        >
          Claim $PAPER
        </Button>
      )}
      {!dope.opened && (
        <>
          <Button onClick={() => router.push(`/dope/${dope.id}/unbundle`)} disabled={dope.opened}>
            Claim Gear
          </Button>
          <Link href={`/hustlers/${dope.id}/initiate`} passHref>
            <Button variant="primary" disabled={dope.opened}>
              Initiate Hustler
            </Button>
          </Link>
        </>
      )}
    </PanelFooter>
  );
};
export default DopeCardButtonBarOwner;
