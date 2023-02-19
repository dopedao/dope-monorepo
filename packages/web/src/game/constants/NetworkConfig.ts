const nextEnv = process.env.NODE_ENV;

// These local URLs assume we're running the API using docker-compose
// See packages/api/README.md for more info standing up the API locally
const defaultNetworkConfig = {
    wsUri: nextEnv == "development" ? "ws://localhost:6060/game/ws" : "wss://api.dopewars.gg/game/ws",
    reconnectInterval: 1000,
    maxReconnectAttempts: 10,
    authUri: nextEnv == "development" ? "http://localhost:6060/authentication" : "https://api.dopewars.gg/authentication",
    authNoncePath: "/nonce",
    authLoginPath: "/login",
    authAuthenticatedPath: "/authenticated",
    authLogoutPath: "/logout",
};

export default defaultNetworkConfig;

console.info("Using network config: ", defaultNetworkConfig);