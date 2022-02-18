import { BigNumber } from 'ethers';
import { Button } from '@chakra-ui/button';
import { useEffect, useState } from 'react';
import { useInitiator } from 'hooks/contracts';
import { useRouter } from 'next/router';
import AppWindowEthereum from 'components/AppWindowEthereum';
import Dialog from 'components/Dialog';
import HustlerProvider from 'features/hustlers/HustlerProvider';
import Steps from 'features/hustlers/modules/Steps';

const InitiatePage = () => {
  const init = useInitiator();
  const router = useRouter();
  const { id: dopeId } = router.query;
  const [isOpened, setIsOpened] = useState();

  useEffect(() => {
    let isMounted = true;
    if(!dopeId) return;
    init.isOpened(BigNumber.from(dopeId)).then(value => {
      if (isMounted) setIsOpened(value);
    });
    return () => {
      isMounted = false;
    };
  }, [init, dopeId]);

  return (
    <AppWindowEthereum
      requiresWalletConnection={true}
      scrollable={true}
      title="Initiate Your Hustler"
      padBody={false}
    >
      {isOpened === true &&
        <Dialog
          title="Hustler already initiated"
          icon="dope-smiley-sad"
        >
          <p>
            DOPE #{dopeId} has already been Claimed.
          </p>
          <Button onClick={() => router.back() }>
            Go Back
          </Button>
        </Dialog>
      }
      {isOpened === false &&
        <HustlerProvider>
          <Steps />
        </HustlerProvider>
      }

    </AppWindowEthereum>
  );
}

export default InitiatePage;
