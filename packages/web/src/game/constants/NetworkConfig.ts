const defaultNetworkConfig = {
    wsUri: "wss://involvement-terror-cowboy-specializing.trycloudflare.com/game/ws",
    reconnectInterval: 1000,
    maxReconnectAttempts: 10,

    // Authentication
    authUri: "https://involvement-terror-cowboy-specializing.trycloudflare.com/authentication",
    authNoncePath: "/nonce",
    authLoginPath: "/login",
    authLogoutPath: "/logout",
};

export default defaultNetworkConfig;