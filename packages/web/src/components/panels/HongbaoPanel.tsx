import { Button } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { getProof } from 'utils/merkleproof';
import { Image } from '@chakra-ui/react';
import { OpenedEvent } from '@dopewars/contracts/dist/Hongbao';
import { solidityKeccak256 } from 'ethers/lib/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHongbao } from 'hooks/contracts';
import { useWeb3React } from '@web3-react/core';
import config from 'config'; // Airdrop config
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import SpinnerMessage from 'components/SpinnerMessage';
import PanelTitleBar from 'components/PanelTitleBar';

const HongbaoPanel = () => {
  const hongbao = useHongbao();
  const { account } = useWeb3React();

  // if event.args.typ == 0
  //      PAPER reward. event.args.value is the numUnopenedEnvelopes
  // if event.args.typ == 1
  //      Item reward. event.args.value is the item id
  const [opens, setOpens] = useState<OpenedEvent[]>();
  const [claimed, setClaimed] = useState<boolean>();
  const [isClaiming, setIsClaiming] = useState(false);

  const eligibleForAirdrop = Object.keys(config.airdrop).includes(account || '');
  const numUnopenedEnvelopes = useMemo(() => config.airdrop[account!], [account]);

  useEffect(() => {
    if (!eligibleForAirdrop) return;
    hongbao
      .claimed(
        Buffer.from(solidityKeccak256(['address', 'uint256'], [account, numUnopenedEnvelopes]).slice(2), 'hex'),
      )
      .then(setClaimed);
  }, [eligibleForAirdrop, hongbao, account, numUnopenedEnvelopes]);

  const claim = useCallback(async () => {
    try {
      setIsClaiming(true);
      const proof = getProof(account!, numUnopenedEnvelopes.toString());
      const tx = await hongbao.claim(numUnopenedEnvelopes, proof);
      const receipt = await tx.wait(1);
      setOpens(
        receipt.logs.reduce<OpenedEvent[]>((o, log, idx) => {
          if (idx % 2 == 0) return o;
          const event = hongbao.interface.parseLog(log) as unknown as OpenedEvent;
          // Set roll to item id
          return [...o, event];
        }, []),
      );
    } finally {
      setIsClaiming(false);
    }
  }, [hongbao, account, numUnopenedEnvelopes, setOpens]);

  return (
    <PanelContainer>
      { eligibleForAirdrop && <>
        <PanelTitleBar centered>
          { !claimed ? 'A gift for you' : 'Enjoy your gift' }
        </PanelTitleBar>
        <PanelBody>
          <Image 
            src={
              `/images/lunar_new_year_2022/${claimed ? 'hongbao-with-bg.png' : 'hongbao_animated.gif'}` 
            }
            alt="A surprise awaits you" 
          />
        </PanelBody>
        <PanelFooter>
          <Button 
            variant="cny" 
            onClick={claim}
            disabled={claimed || isClaiming}
          >
            { !isClaiming && 
              (claimed ? 'All Envelopes Claimed' : `Open ${numUnopenedEnvelopes} Envelopes`)
            }
            { isClaiming && 
              <SpinnerMessage text="Opening Envelopes…" />
            }
          </Button>
        </PanelFooter>
        </>
      }
      { !eligibleForAirdrop &&
        <div css={css`
          flex: 5;
          height: 100%;
          display:flex;
          flex-direction: column;
          align-items:center;
          justify-content: center;
          padding:32px;
          background-color:#eee;
          text-align: center;
        `}>
          <Image src="/images/icon/dope-smiley-sad.svg" width="72px" alt="Frowney Face" />
          <br/>
          <p>
            The connected wallet is not eligible for this airdrop.
          </p>
          <p>
            Purchase a rare accessory mask below!
          </p>
        </div>
      }
    </PanelContainer>
  );
};

export default HongbaoPanel;
