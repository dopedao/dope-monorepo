import { ethers } from "ethers";
import defaultNetworkConfig from "game/constants/NetworkConfig";
import { SiweMessage } from "siwe";

export default class Authenticator {
    private _loggedIn: boolean;
    private _sid?: string;

    get loggedIn() { return this._loggedIn; }
    get sid() { return this._sid; }

    constructor() {
        this._loggedIn = false;
        // async!!
        this._intrinsicUpdateState();
    }

    private async _intrinsicUpdateState() {
        const sidRes = await fetch(defaultNetworkConfig.authUri + defaultNetworkConfig.authSidPath, { credentials: 'include' });

        if (sidRes.status !== 200)
        {
            this._loggedIn = false;
            this._sid = undefined;
            return;
        }

        const sid = await sidRes.text();
        if (sid.length > 0)
        {
            this._sid = sid;
            this._loggedIn = true;
        }
    }

    async login() {
        if (!window.ethereum)
        {
          Promise.reject('No ethereum provider found');
          return;
        }
    
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const latestBlock = (await provider.getBlockNumber()).toString();
    
        const message = new SiweMessage({
          address: await provider.getSigner().getAddress(),
          domain: window.location.host,
          statement: `Signature of this message will only be used for authentication. You have 5 minutes to sign this message.`,
          uri: window.location.origin,
          version: '1',
          chainId: await provider.getSigner().getChainId(),
          nonce: latestBlock
        }).prepareMessage();
    
        const signature = await provider.getSigner().signMessage(message);
        const login = await fetch(defaultNetworkConfig.authUri + defaultNetworkConfig.authLoginPath, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ signature, message })
        });
    
        if (login.status !== 200)
        {
          Promise.reject(await login.text());
          return;
        }
        
        this._loggedIn = true;
        this._sid = await login.text();
        Promise.resolve();
    }
    
    async logout() {
        this._loggedIn = false;
        this._sid = undefined;

        await fetch(defaultNetworkConfig.authUri + defaultNetworkConfig.authLogoutPath, {
            credentials: 'include'
        });
    }
}