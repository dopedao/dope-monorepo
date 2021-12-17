import fs from 'fs';

const sleep = async () => {
  console.log('Sleeping…');
  await new Promise(resolve => setTimeout(resolve, 1000));
}

// Dynamically reads Index creation files in `../fauna/indexes` and creates each one.
const createIndexes = async () => {
  const relativePath = '../fauna/indexes';
  const indexFileNames = fs.readdirSync(`${__dirname}/${relativePath}`);
  for (const fileName of indexFileNames) {
    const importName = fileName.replace('.ts', '');
    console.log(`Creating ${importName}`);
    const index = await import(`${relativePath}/${importName}`);
    await index.create();
    await sleep();
  };
};

(async () => {
  try {
    await createIndexes();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
