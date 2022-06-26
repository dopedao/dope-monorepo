import { BigNumber, ethers } from 'ethers';
import { Button } from '@chakra-ui/react';
import { formatLargeNumber } from 'utils/utils';
import { useEffect, useMemo, useState } from 'react';
import { usePaper } from 'hooks/contracts';
import { useWalletCheckQuery } from 'generated/graphql';
import { useWeb3React } from '@web3-react/core';
import DesktopWindow from 'components/DesktopWindow';
import Dialog from 'components/Dialog';
import styled from '@emotion/styled';

const discordAuthLink =
  'https://discord.com/api/oauth2/authorize?client_id=973336825223598090&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fverify&response_type=code&scope=identify%20email%20guilds';

interface IDiscordUser {
  discriminator: string;
  // Email?
  email: string;
  id: string;
  username: string;
}

interface IGuild {
  id: string;
  name: string;
}

// send to own api
type DiscordUser = {
  username: string;
  discriminator: string;
  id: string;
  // Email?
  email: string;
  paperCount: number;
  dopeCount: number;
  hustlerCount: number;
  isOg: boolean;
};

const Container = styled.div`
  margin: 32px;
`;


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
  const [isFetchingDiscord, setIsFetchingDiscord] = useState(true);
  const [discordUser, setDiscordUser] = useState<IDiscordUser>();
  const [hasGuild, setGuild] = useState(false);
  const [hasOgHustler, setHasOgHustler] = useState(false);
  const [hustlerCount, setHustlerCount] = useState(0);
  const [dopeCount, setDopeCount] = useState(0);
  const [paperBalance, setPaperBalance] = useState<BigNumber>(0);

  const { account } = useWeb3React();
  const paper = usePaper();

  // Fetch Wallet ownership info from our API
  const { data, isFetching: isFetchingWalletInfo } = useWalletCheckQuery(
    {
      where: {
        id: account,
      },
    },
  );

  useMemo(() => {
    console.log(data);
    if (data?.wallets?.edges![0]?.node?.dopes) {
      const dn = data.wallets.edges[0].node;
      let hasOg = (
        dn.hustlers.find(h => parseInt(h.id, 10) <= 500) !== undefined
      );
      let dopeCount = dn.dopes.length;
      let hustlerCount = dn.hustlers.length;
      console.log(hasOg);
      console.log(dopeCount);
      console.log(hustlerCount);
      setHasOgHustler(hasOg);
      setDopeCount(dopeCount);
      setHustlerCount(hustlerCount);
    }
  }, [data]);

  useEffect(() => {
    let isMounted = true;
    if (account) {
      paper.balanceOf(account).then(value => {
        if (isMounted) setPaperBalance(value);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [paper, account]);

  const discordAuthRedirect = () => {
    const state = generateRandomString();
    const base64EncodedState = Buffer.from(state).toString('base64');
    localStorage.setItem('oauth-state', state);
    window.open(`${discordAuthLink}&state=${base64EncodedState}`, '_self');
  };

  useEffect(() => {
    const fragment = new URLSearchParams(window.location.search.slice(1));
    const [apiToken, urlState] = [fragment.get('code'), fragment.get('state')];

    if (!apiToken) {
      console.log('No api token.');
      return;
    }
    const decodedUrlState = decodeURIComponent(urlState!);
    const state = Buffer.from(decodedUrlState, 'base64').toString();

    if (localStorage.getItem('oauth-state') != state) {
      console.log('Invalid state.');
      return;
    }
    console.log('Valid state.');

    const payload = new URLSearchParams();
    payload.append('client_id', process.env.NEXT_PUBLIC_DBOT_CLIENT_ID!);
    payload.append('client_secret', process.env.NEXT_PUBLIC_DBOT_CLIENT_AUTH_TOKEN!);
    payload.append('grant_type', 'authorization_code');
    payload.append('code', apiToken);
    payload.append('scope', 'identify guilds email');
    payload.append('redirect_uri', 'http://localhost:3000/verify');

    // Token to make request on behalf of user
    const fetchUserToken = async () => {
      const { access_token } = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload,
      }).then(result => result.json());

      return access_token;
    };

    // request user data
    fetchUserToken()
      .then(async resp => {
        const user: IDiscordUser = await fetch('https://discord.com/api/users/@me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${resp}`,
          },
        }).then(res => res.json());
        console.log(user);
        if (user) setDiscordUser(user);

        const guilds: IGuild[] = await fetch('https://discord.com/api/users/@me/guilds', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${resp}`,
          },
        }).then(res => res.json());
        console.log(guilds);
        if (guilds.length > 0)
          setGuild(guilds.some(guild => guild.id == process.env.NEXT_PUBLIC_DBOT_GUILD_ID!));
      })
      .then(() => setIsFetchingDiscord(false));
  }, []);

  return (
    <Dialog>
      <Container>
        {(!discordUser && !hasGuild && isFetchingDiscord && (
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
          (discordUser && hasGuild && !isFetchingDiscord && (
            <>
              <h3>Welcome to the fam!</h3>
              <div>{`Is in guild: ${hasGuild}`}</div>
              <div>{`${discordUser.username}#${discordUser.discriminator}`}</div>
              <div>
                {`Paper: ${
                  paperBalance ? formatLargeNumber(Number(ethers.utils.formatEther(paperBalance))) : 0
                }`}
              </div>
              <div>{`Hustlers: ${hustlerCount}`}</div>
              <div>{`OG Hustlers: ${hasOgHustler}`}</div>
              <div>{`Dope: ${dopeCount}`}</div>
            </>
          )) ||
          (discordUser && !hasGuild && !isFetchingDiscord && (
            <>
              <h3>Damn!</h3>
              <div>Looks like you aren&quot;t in the discord server!</div>
              <Button onClick={() => window.open('https://discord.gg/8exMVHMe26', '_blank')}>
                Join
              </Button>
            </>
          ))}
      </Container>
    </Dialog>
  );
};

export default Verify;
