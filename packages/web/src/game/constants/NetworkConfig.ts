const defaultNetworkConfig = {
    wsUri: "wss://involvement-terror-cowboy-specializing.trycloudflare.com/game/ws",
    // authUri: "wss://localhost:8080/game/ws",
    reconnectInterval: 1000,
    maxReconnectAttempts: 10,

    // Authentication
    authUri: "https://involvement-terror-cowboy-specializing.trycloudflare.com/authentication",
    // authUri: "http://localhost:8080/authentication",
    authNoncePath: "/nonce",
    authLoginPath: "/login",
    authAuthenticatedPath: "/authenticated",
    authLogoutPath: "/logout",
};

export default defaultNetworkConfig;