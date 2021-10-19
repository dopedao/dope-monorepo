import * as dotenv from 'dotenv';
import faunadb from 'faunadb';

dotenv.config({ path: __dirname + '/../../../.env' });
export const FAUNA_KEY = process.env.FAUNA_KEY ?? '';

// https://docs.fauna.com/fauna/current/drivers/javascript
// https://fauna.github.io/faunadb-js/
export const client = new faunadb.Client({
  secret: FAUNA_KEY,
  domain: 'db.us.fauna.com',
  port: 443,
  scheme: 'https',
});

export const q = faunadb.query;
