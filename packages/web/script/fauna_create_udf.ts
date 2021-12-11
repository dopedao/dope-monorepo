import fs from 'fs';

// Dynamically reads Index creation files in `../fauna/indexes` and creates each one.
const createUdfs = async () => {
  const relativePath = '../fauna/user_defined_functions';
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
    await createUdfs();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
