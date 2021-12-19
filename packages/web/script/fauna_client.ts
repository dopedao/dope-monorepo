import * as dotenv from 'dotenv';
import faunadb from 'faunadb';

dotenv.config({ path: __dirname + '/../../../.env' });
export const FAUNA_WRITE_KEY = process.env.FAUNA_WRITE_KEY ?? '';
export const FAUNA_API_URL = 'https://graphql.us.fauna.com/graphql';

// https://docs.fauna.com/fauna/current/drivers/javascript
// https://fauna.github.io/faunadb-js/
export const client = new faunadb.Client({
  secret: FAUNA_WRITE_KEY,
  domain: 'db.us.fauna.com',
  port: 443,
  scheme: 'https',
});

export const q = faunadb.query;
