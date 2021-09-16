import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://api.studio.thegraph.com/query/7708/dope-wars/v0.0.7",
    cache: new InMemoryCache(),
});

export default client;