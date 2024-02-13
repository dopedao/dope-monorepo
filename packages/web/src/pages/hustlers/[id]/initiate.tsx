import { Button } from '@chakra-ui/button';
import { useEffect, useState } from 'react';
import { useInitiator, useDope } from 'hooks/contracts';
import { useRouter } from 'next/router';
import AppWindowEthereum from 'components/AppWindowEthereum';
import Dialog from 'components/Dialog';
import HustlerProvider from 'features/hustlers/HustlerProvider';
import Steps from 'features/hustlers/modules/Steps';
import Link from 'next/link';
import { INITIAL_STATE } from 'features/hustlers/hustlerReducer';
import { useAccount } from 'wagmi';

const InitiatePage = () => {
  const router = useRouter();
  const { id: dopeId } = router.query;

  // Check if DOPE already opened and prevent usage
  const init = useInitiator();
  const [isOpened, setIsOpened] = useState(false);
  useEffect(() => {
    let isMounted = true;
    if (!dopeId) return;
    init.isOpened(BigInt(dopeId as string)).then(value => {
      if (isMounted) setIsOpened(value);
    });
    return () => {
      isMounted = false;
    };
  }, [init, dopeId]);

  // Check if connected wallet is owner of DOPE
  const { address } = useAccount();
  const dopeContract = useDope();
  const [isOwnedByConnectedAccount, setIsOwnedByConnectedAccount] = useState(false);
  useEffect(() => {
    if (address && dopeId) {
      dopeContract.ownerOf(BigInt(dopeId as string)).then((owner: string) => {
        if (owner.toLowerCase() === address?.toLowerCase()) {
          setIsOwnedByConnectedAccount(true);
        }
      });
    }
  }, [address, dopeId, dopeContract]);

  return (
    <AppWindowEthereum
      requiresWalletConnection={true}
      scrollable={true}
      title="Initiate Your Hustler"
      padBody={false}
      fullScreen
    >
      {isOwnedByConnectedAccount &&
        (isOpened ? (
          <Dialog title="Hustler already initiated" icon="dope-smiley-sad">
            <p>Gear has already been claimed from DOPE #{dopeId}. Please try another DOPE NFT.</p>
            <Link href="/">
              <Button>Quit</Button>
            </Link>
          </Dialog>
        ) : (
          <HustlerProvider>
            <Steps />
          </HustlerProvider>
        ))}
      {!isOwnedByConnectedAccount && (
        <Dialog title="Not your DOPE" icon="dope-smiley-sad">
          <p>
            This DOPE is owned by another wallet. Please make sure you&apos;re connected to the
            proper account to continue.
          </p>
          <Link href="/">
            <Button>Quit</Button>
          </Link>
        </Dialog>
      )}
    </AppWindowEthereum>
  );
};

export default InitiatePage;
