const defaultNetworkConfig = {
    wsUri: "wss://api.dopewars.gg/game/ws",
    // authUri: "wss://localhost:8080/game/ws",
    reconnectInterval: 1000,
    maxReconnectAttempts: 10,

    // Authentication
    authUri: "https://api.dopewars.gg/authentication",
    // authUri: "http://localhost:8080/authentication",
    authNoncePath: "/nonce",
    authLoginPath: "/login",
    authAuthenticatedPath: "/authenticated",
    authLogoutPath: "/logout",
};

export default defaultNetworkConfig;