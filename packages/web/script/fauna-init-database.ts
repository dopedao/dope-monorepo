import { FAUNA_KEY, client, q } from '../src/fauna-client';
import fetch from 'isomorphic-fetch';
import fs from 'fs';

// Fauna only provides a way to load GraphQL schema through this endpoint
// https://docs.fauna.com/fauna/current/api/graphql/endpoints?lang=javascript
// https://forums.fauna.com/t/importing-graphql-schema-from-js-file/642/3
const initFromGraphQL = async () => {
  console.log('Initializing Collections from GraphQL schema');
  const schema = fs.readFileSync(
    __dirname + '/../fauna/dope_token_schema.graphql', 
    'utf8'
  );
  // Override deletes documents and replaces schema in place
  // https://docs.fauna.com/fauna/current/api/graphql/endpoints?lang=javascript
  const url = 'https://graphql.us.fauna.com/import?mode=override';
  await fetch(url, {
    method: 'POST', 
    headers: {
      'Authorization': `Bearer ${FAUNA_KEY}`
    },
    body: schema
  });
  console.log('…Sleeping to ensure schema committed to Fauna before doing other stuff');
  await new Promise(resolve => setTimeout(resolve, 5000));
};

// Dynamically reads Index creation files in `../fauna/indexes` and creates each one.
const createIndexes = async () => {
  const relativePath = '../fauna/indexes';
  const indexFileNames = fs.readdirSync(`${__dirname}/${relativePath}`);
  for (const fileName of indexFileNames) {
    const importName = fileName.replace('.ts', '');
    console.log(`Creating ${importName}`);
    const index = await import(`${relativePath}/${importName}`);
    await index.create();
  };
};

(async () => {
  try {
    await initFromGraphQL();
    await createIndexes();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
