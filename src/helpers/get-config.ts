import { readFileSync } from "node:fs";

async function getConfig() {
  try {
    const config = await readFileSync(".codeapro.json", "utf-8");
    const configObject = JSON.parse(config);
    return configObject;
  } catch (e) {
    console.error(e.message);
    console.log();
    console.error("Unable to load .codeapro config.");
    process.exit(1);
  }
}

export default getConfig;
