import { BigNumber, ethers } from 'ethers';
import { Button } from '@chakra-ui/react';
import { formatLargeNumber } from 'utils/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useWalletCheckQuery } from 'generated/graphql';
import { useWeb3React } from '@web3-react/core';
import Dialog from 'components/Dialog';
import styled from '@emotion/styled';
import useWeb3Provider from 'hooks/web3';

const discordAuthLink =
  'https://discord.com/api/oauth2/authorize?client_id=973336825223598090&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fverify&response_type=code&scope=identify%20guilds';
const verifyApiLink = process.env.REDIRECT_URI ?? "http://localhost:8080/verify";

interface IVerifyResponse {
  message: string,
  success: boolean
}

// send to own api
type VerifyRequest = {
  discordtoken: string;
  walletaddress: string;
  papercount: number;
  dopecount: number;
  hustlercount: number;
  isog: boolean;
};

const Container = styled.div`
  margin: 32px;
`;

const buttonGroupStyle = {
  "display": "flex",
  "flex-direction": "row",
  "justify-content": "space-evenly",
  "padding-top": "32px"
};

// state string
const generateRandomString = () => {
  let randString = '';
  const randNum = Math.floor(Math.random() * 10);

  for (let i = 0; i < 20 + randNum; i++) {
    randString += String.fromCharCode(33 + Math.floor(Math.random() * 94));
  }

  return randString;
};

const Verify = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [respError, setRespError] = useState("")
  const [hasOgHustler, setHasOgHustler] = useState(false);
  const [hustlerCount, setHustlerCount] = useState(0);
  const [dopeCount, setDopeCount] = useState(0);
  const [paperBalance, setPaperBalance] = useState<BigNumber>(BigNumber.from(0));

  const { connect } = useWeb3Provider();
  const { account } = useWeb3React();

  const onClick = useCallback(
    async (w: 'MetaMask' | 'WalletConnect') => {
      try {
        await connect(w);
      } catch (error) {
        console.error(error);
      }
    },
    [connect],
  );

  // Fetch Wallet ownership info from our API
  const { data, isFetching: isFetchingWalletInfo } = useWalletCheckQuery(
    {
      where: {
        id: account,
      },
    },
  );

  useMemo(() => {
    if (data?.wallets?.edges![0]?.node?.dopes) {
      const dn = data.wallets.edges[0].node;
      let hasOg = (
        dn.hustlers.find(h => parseInt(h.id, 10) <= 500) !== undefined
      );
      setHasOgHustler(hasOg);
      setDopeCount(dn.dopes.length);
      setHustlerCount(dn.hustlers.length);
      setPaperBalance(dn.paper);
    }
  }, [data]);

  const discordAuthRedirect = () => {
    const state = generateRandomString();
    const base64EncodedState = Buffer.from(state).toString('base64');
    localStorage.setItem('oauth-state', state);
    window.open(`${discordAuthLink}&state=${base64EncodedState}`, '_self');
  };

  useEffect(() => {
    if (!account) return;
    const fragment = new URLSearchParams(window.location.search.slice(1));
    const [apiToken, urlState] = [fragment.get('code'), fragment.get('state')];

    if (!apiToken) {
      console.error('No api token.');
      return;
    }
    const decodedUrlState = decodeURIComponent(urlState!);
    const state = Buffer.from(decodedUrlState, 'base64').toString();

    if (localStorage.getItem('oauth-state') != state) {
      console.error('Invalid state');
      return;
    }

    if (!account) {
      console.error("Wallet not connected");
      return;
    }

    const verifyReq: VerifyRequest = {
      discordtoken: apiToken,
      walletaddress: account!,
      papercount: parseInt(ethers.utils.formatUnits(paperBalance, 'ether')),
      dopecount: dopeCount,
      hustlercount: hustlerCount,
      isog: hasOgHustler
    }

    fetch(verifyApiLink, {
      method: "POST",
      body: JSON.stringify(verifyReq)
    })
      .then(res => res.json())
      .then(resp => {
        const verifyResp: IVerifyResponse = resp;

        if (!verifyResp.success) {
          setRespError(verifyResp.message);
        } else if (verifyResp.success) {
          setIsVerified(true);
        }
      });
  }, [account, data, dopeCount, hasOgHustler, hustlerCount, paperBalance]);


  return (
    <Dialog>
      <Container>
        {(!account && (
          <>
            <h2>
              Connect Your Ethereum Wallet
            </h2>
            <div style={buttonGroupStyle}>
              <Button onClick={() => onClick('MetaMask')}>MetaMask</Button>
              <Button onClick={() => onClick('WalletConnect')}>WalletConnect</Button>
            </div>
          </>
        )) ||
          (!isVerified && account && respError.length <= 1 && (
            <>
              <h2>
                Welcome to the streets
              </h2>
              <p>
                Click the button below to get verified on Discord.
              </p>
              <Button onClick={() => discordAuthRedirect()}>Lets go</Button>
            </>
          )) ||
          (isVerified && account && (
            <>
              <h3>Welcome to the fam!</h3>
              <div>
                {`Paper: ${paperBalance ? formatLargeNumber(Number(ethers.utils.formatEther(paperBalance))) : 0
                  }`}
              </div>
              <div>{`Hustlers: ${hustlerCount}`}</div>
              <div>{`OG Hustlers: ${hasOgHustler}`}</div>
              <div>{`Dope: ${dopeCount}`}</div>
            </>
          )) ||
          (respError.includes("guild") && (
            <>
              <h3>Damn!</h3>
              <div>Looks like you aren&quot;t in the discord server!</div>
              <Button onClick={() => window.open('https://discord.gg/8exMVHMe26', '_blank')}>
                Join
              </Button>
            </>
          )) ||
          (!respError.includes("guild") && (
            <>
              <h3>Oops...</h3>
              <div>{respError}</div>
            </>
          ))
        }
      </Container>
    </Dialog>
  );
};

export default Verify;
