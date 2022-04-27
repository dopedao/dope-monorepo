const defaultNetworkConfig = {
    // wsUri: "wss://involvement-terror-cowboy-specializing.trycloudflare.com/game/ws",
    wsUri: "wss://game-dot-dopewars-live.uc.r.appspot.com/game/ws",
    reconnectInterval: 1000,
    maxReconnectAttempts: 10,

    // Authentication
    // authUri: "https://involvement-terror-cowboy-specializing.trycloudflare.com/authentication",
    authUri: "https://game-dot-dopewars-live.uc.r.appspot.com/game/authentication",
    authNoncePath: "/nonce",
    authLoginPath: "/login",
    authAuthenticatedPath: "/authenticated",
    authLogoutPath: "/logout",
};

export default defaultNetworkConfig;