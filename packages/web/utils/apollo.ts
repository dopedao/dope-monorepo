import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_SUBGRAPH_URL as string,
    cache: new InMemoryCache(),
});

export default client;