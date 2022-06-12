import { useWeb3React } from "@web3-react/core";
import AppWindow from "components/AppWindow";
import { BigNumber, ethers } from "ethers";
import { HustlerType, useInfiniteProfileDopesQuery, useInfiniteProfileHustlersQuery } from "generated/graphql";
import { usePaper } from "hooks/contracts";
import { useEffect, useMemo, useState } from "react";
import { formatLargeNumber } from "utils/utils";

const discordAuthLink = "https://discord.com/api/oauth2/authorize?client_id=973336825223598090&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fverify&response_type=code&scope=identify%20email%20guilds"

interface IDisordUser {
    discriminator: string,
    email: string,
    id: string,
    username: string
}

interface IGuild {
    id: string,
    name: string
}

// send to own api
type DiscordUser = {
    username: string,
    discriminator: string,
    id: string,
    // Email?
    email: string,
    paperCount: number,
    dopeCount: number,
    hustlerCount: number,
    isOg: boolean
}

// state string
const generateRandomString = () => {
    let randString = "";
    const randNum = Math.floor(Math.random() * 10);

    for (let i = 0; i < 20 + randNum; i++) {
        randString += String.fromCharCode(33 + Math.floor(Math.random() * 94));
    }

    return randString;
}

const Verify = () => {
    const [discordUser, setDiscordUser] = useState<IDisordUser>();
    const [hasGuild, setGuild] = useState(false);
    const [hasOgHustler, setOgHustler] = useState(false);
    const [paperBalance, setPaperBalance] = useState<BigNumber>();
    const [isFetching, setFetching] = useState(true);

    const { account } = useWeb3React();
    const paper = usePaper();

    const ogHustler = useInfiniteProfileHustlersQuery(
        {
            where: {
                hasWalletWith: [
                    {
                        id: account,
                        hasHustlersWith: [
                            { type: HustlerType.OriginalGangsta }
                        ]
                    }
                ]
            }
        });

    useMemo(() => {
        if (!ogHustler.data?.pages) return;
        setOgHustler(ogHustler.data.pages.some(hustler => hustler.hustlers.totalCount > 0));
    }, [ogHustler.data]);

    const hustler = useInfiniteProfileHustlersQuery(
        {
            where: {
                hasWalletWith: [
                    {
                        id: account
                    },
                ],
            }
        });

    const hustlerData = useMemo(() => {
        const defaultValue = { totalCount: 0 };

        if (!hustler.data?.pages) return defaultValue;

        return hustler.data.pages.reduce((result, page) => {
            if (!page.hustlers.edges) return result;

            const { totalCount } = page.hustlers;

            return {
                totalCount,
            };
        }, defaultValue);
    }, [hustler.data]);

    const dope = useInfiniteProfileDopesQuery(
        {
            where: {
                hasWalletWith: [
                    {
                        id: account
                    },
                ]
            }
        });

    const dopeData = useMemo(() => {
        const defaultCount = { totalCount: 0 };

        if (!dope.data?.pages) return defaultCount;

        return dope.data.pages.reduce((result, page) => {
            if (!page.dopes.edges) return result;

            const { totalCount } = page.dopes;

            return {
                totalCount
            }
        }, defaultCount)
    }, [dope.data]);

    useEffect(() => {
        let isMounted = true;
        if (account) {
            paper.balanceOf(account).then(value => {
                if (isMounted) setPaperBalance(value);
            });
        }
        return () => {
            isMounted = false;
        } 
    }, [paper, account]);

    const discordAuthRedirect = () => {
        const state = generateRandomString();
        const base64EncodedState = Buffer.from(state).toString("base64");
        localStorage.setItem("oauth-state", state);
        window.open(`${discordAuthLink}&state=${base64EncodedState}`, '_self');
    };


    useEffect(() => {
        const fragment = new URLSearchParams(window.location.search.slice(1));
        const [codeToken, urlState] = [fragment.get("code"), fragment.get("state")];

        if (!codeToken) {
            console.log("No access token.");
            return;
        }
        const decodedUrlState = decodeURIComponent(urlState!);
        const state = Buffer.from(decodedUrlState, "base64").toString();

        if (localStorage.getItem("oauth-state") != state) {
            console.log("Invalid state.");
            return;
        }
        console.log("Valid state.");

        const payload = new URLSearchParams();
        payload.append("client_id", process.env.NEXT_PUBLIC_DBOT_CLIENT_ID!);
        payload.append("client_secret", process.env.NEXT_PUBLIC_DBOT_CLIENT_AUTH_TOKEN!);
        payload.append("grant_type", "authorization_code");
        payload.append("code", codeToken);
        payload.append("scope", "identify guilds email");
        payload.append("redirect_uri", "http://localhost:3000/verify");

        // Token to make request on behalf of user
        const fetchAccessToken = async () => {
            const { access_token } = await fetch("https://discord.com/api/oauth2/token", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: payload
            }).then(result => result.json());
            
            return access_token;
        }

        // request user data
        fetchAccessToken().then(async resp => {
            const user: IDisordUser = await fetch("https://discord.com/api/users/@me", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${resp}`
                }
            }).then(res => res.json());
            if (user) {
                console.log(user);
                setDiscordUser(user);
            }


            const guilds: IGuild[] = await fetch("https://discord.com/api/users/@me/guilds", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${resp}`
                }
            }).then(res => res.json());
            console.log(guilds);
            if (guilds.length > 0) setGuild(guilds.some(guild => guild.id == process.env.NEXT_PUBLIC_DBOT_GUILD_ID!));
        }).then(() => setFetching(false));
    }, [])

    return (
        <>
            {!discordUser && !hasGuild && isFetching &&
                <AppWindow padBody={false} scrollable requiresWalletConnection>
                    <div>
                        <div style={{ display: "table", margin: "0 auto", paddingTop: "20px" }}>Wassup mane! Click the button below to get dope roles on discord</div>
                        <button style={{ color: "whitesmoke", background: "black", display: "table", margin: "0 auto", marginTop: "30px", paddingLeft: "4px", paddingRight: "4px" }} onClick={() => discordAuthRedirect()}>Lets go</button>
                    </div>
                </AppWindow>
                || discordUser && hasGuild && !isFetching &&
                <AppWindow padBody={false} scrollable requiresWalletConnection>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "40px", paddingTop: "10px", paddingBottom: "20px" }}>
                            Welcome to the fam!
                        </div>
                        <div>
                            { `Is in guild: ${hasGuild}`}
                        </div>
                        <div>
                            {`${discordUser.username}#${discordUser.discriminator}`}
                        </div>
                        <div>
                            {`Paper: ${paperBalance ? formatLargeNumber(Number(ethers.utils.formatEther(paperBalance))) : 0}`}
                        </div>
                        <div>
                            {`Hustlers: ${hustlerData.totalCount}`}
                        </div>
                        <div>
                            {`OG Hustlers: ${hasOgHustler}`}
                        </div>
                        <div>
                            {`Dope: ${dopeData.totalCount}`}
                        </div>
                    </div>
                </AppWindow>
                || discordUser && !hasGuild && !isFetching &&
                <AppWindow padBody={false} scrollable requiresWalletConnection>
                    <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "40px", paddingTop: "10px", paddingBottom: "20px" }}>
                                Damn mane
                            </div>
                            <div>
                                Looks like you are not in the discord server!
                            </div>
                            <button
                                style={{ color: "whitesmoke", background: "black", display: "table", margin: "0 auto", marginTop: "30px", paddingLeft: "4px", paddingRight: "4px" }}
                                onClick={() => window.open("https://discord.gg/8exMVHMe26", "_blank")}>
                                Join
                            </button>
                    </div>
                </AppWindow>
            }
        </>
    )
}

export default Verify;