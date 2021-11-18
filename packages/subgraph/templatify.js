const Handlebars = require("handlebars");
const fs = require("fs-extra");
const path = require("path");
const yaml = require("js-yaml");

const { t } = require("typy");

(async () => {
  const networksFilePath = path.join(__dirname, "networks.yaml");
  const networks = yaml.load(
    await fs.readFile(networksFilePath, { encoding: "utf-8" })
  );

  const networkName = process.env.NETWORK_NAME;
  const network = t(networks, networkName).safeObject;
  if (t(network).isFalsy) {
    throw new Error('Please set a "NETWORK_NAME" environment variable');
  }

  if (!process.env.DIR_NAME) {
    throw new Error('Please set a "DIR_NAME" environment variable');
  }

  const subgraphTemplateFilePath = path.join(
    __dirname,
    `${process.env.DIR_NAME}/subgraph.yaml.tmpl`
  );
  const source = await fs.readFile(subgraphTemplateFilePath, "utf-8");
  const template = Handlebars.compile(source);
  const result = template(network);
  await fs.writeFile(
    path.join(__dirname, `${process.env.DIR_NAME}/subgraph.yaml`),
    result
  );

  console.log("🎉 subgraph.yaml successfully generated");
})();
