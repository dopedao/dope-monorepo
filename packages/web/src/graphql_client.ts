import * as dotenv from 'dotenv';
import { GraphQLClient } from "graphql-request";

dotenv.config({ path: __dirname + '/../../../.env' });
export const FAUNA_KEY = process.env.FAUNA_KEY ?? '';

function buildGraphqlClient({url = "", additionalHeaders = {}}) {
	return new GraphQLClient(url, {
		headers: {
			"Content-Type": "application/json",
      Accept: "application/json",
			...additionalHeaders,
		},
		cache: "no-cache",
		method: "POST",
	});
}


export const graphQLClient = buildGraphqlClient({
  url: `https://graphql.us.fauna.com/graphql`,
  additionalHeaders: {
    "Authorization": `Bearer ${process.env.FAUNA_KEY}`,
  }
});

export const faunaGqlClient = graphQLClient;