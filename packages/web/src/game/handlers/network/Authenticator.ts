import { ethers } from "ethers";
import defaultNetworkConfig from "game/constants/NetworkConfig";
import { SiweMessage } from "siwe";
import NetworkHandler from "./NetworkHandler";

export default class Authenticator {
  private _networkHandler: NetworkHandler;
  private _loggedIn: boolean;

  get networkHandler() { return this._networkHandler; }
  get loggedIn() { return this._loggedIn; }

  constructor(networkHandler: NetworkHandler) {
    this._networkHandler = networkHandler;
    this._loggedIn = false;
    // async!!
    this._intrinsicUpdateState();
  }

  private async _intrinsicUpdateState() {
    const sidRes = await fetch(defaultNetworkConfig.authUri + defaultNetworkConfig.authAuthenticatedPath, { credentials: 'include' });

    if (sidRes.status !== 200)
    {
        this._loggedIn = false;
        return;
    }

    this._loggedIn = true;
  }

  async login() {
    if (!window.ethereum)
    {
      return Promise.reject('No ethereum provider found');
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
      return Promise.reject(await login.text());
    
    this._loggedIn = true;
  }
    
  async logout() {
    const res = await fetch(defaultNetworkConfig.authUri + defaultNetworkConfig.authLogoutPath, {
        credentials: 'include'
    });

    if (res.status !== 200)
      return Promise.reject(await res.text());

    this._loggedIn = false;
    this.networkHandler.disconnect();
  }
}