import emoji from "node-emoji";
import chalk from "chalk";
import { existsSync } from "node:fs";

function isFolderCodeapro(): boolean {
  if (!existsSync("codeapro.config.json.json")) {
    console.log(
      `${emoji.emojify(
        ":red_circle:",
      )} The directory  does not contain a ${chalk.green(
        "codeapro.config.json.json",
      )} file.`,
    );
    return false;
  }
  return true;
}

export default isFolderCodeapro;
