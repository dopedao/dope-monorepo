import { FAUNA_WRITE_KEY } from './fauna_client';
import fetch from 'isomorphic-fetch';
import fs from 'fs';

// Fauna only provides a way to load GraphQL schema through this endpoint
// https://docs.fauna.com/fauna/current/api/graphql/endpoints?lang=javascript
// https://forums.fauna.com/t/importing-graphql-schema-from-js-file/642/3
const initFromGraphQL = async () => {
  console.log('Initializing GraphQL schema Collections & Queries');
  const schema = fs.readFileSync(
    __dirname + '/../src/fauna/dope_token_schema.graphql', 
    'utf8'
  );
  // Override deletes documents and replaces schema in place
  // https://docs.fauna.com/fauna/current/api/graphql/endpoints?lang=javascript
  const url = 'https://graphql.us.fauna.com/import?mode=override';
  await fetch(url, {
    method: 'POST', 
    headers: {
      'Authorization': `Bearer ${FAUNA_WRITE_KEY}`
    },
    body: schema
  });
  console.log('…Sleeping to ensure schema committed to Fauna before doing other stuff');
  await new Promise(resolve => setTimeout(resolve, 5000));
};

(async () => {
  try {
    await initFromGraphQL();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
