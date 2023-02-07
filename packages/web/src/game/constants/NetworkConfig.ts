const defaultNetworkConfig = {
    // local: ws://localhost:6060/game/ws 
    wsUri: process.env.GAME_WS_URL ?? "wss://api.dopewars.gg/game/ws",
    reconnectInterval: 1000,
    maxReconnectAttempts: 10,

    /*
     * Authentication
     * local: http://localhost:6060/authentication 
    */
    authUri: process.env.GAME_AUTH_URL ?? "https://api.dopewars.gg/authentication",
    authNoncePath: "/nonce",
    authLoginPath: "/login",
    authAuthenticatedPath: "/authenticated",
    authLogoutPath: "/logout",
};

export default defaultNetworkConfig;