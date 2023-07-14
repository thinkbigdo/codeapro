import emoji from "node-emoji";
import chalk from "chalk";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import getPkgManager from "../helpers/get-pkg-manager";
import getConfig from "../helpers/get-config";

const HOST = "https://www.codeapro.com/";

function convertDescriptionToComment(challenge, description) {
  const lines = description.split("\n");
  const wrappedLines: Array<string> = ["/*"];
  const maxLineLen = 64;
  lines.forEach((line) => {
    const words = line.split(/\s+/g);
    let charCount = 0;
    let l = 0;
    for (let i = 0; i < words.length; i++) {
      if (charCount + words[i].length > maxLineLen) {
        wrappedLines.push(words.slice(l, i).join(" "));
        l = i;
        charCount = 0;
      }
      charCount += words[i].length;
    }
    wrappedLines.push(words.slice(l).join(" "));
  });
  const challengePath = challenge.replace(
    /([A-Z])/g,
    (_, char) => "-" + char.toLowerCase(),
  );
  wrappedLines.push("");
  wrappedLines.push(`Solution: ${HOST}algos/${challengePath}?tab=solution`);
  return wrappedLines.join("\n * ") + "\n */\n\n";
}

async function run(challenge) {
  const path = join("challenges", "algo", challenge);

  if (existsSync(path)) {
    console.log(
      `${emoji.emojify(
        ":red_circle:",
      )} Directory already exists for ${chalk.green(path)}.`,
    );
    return;
  }

  const config = await getConfig();
  const fetchOptions = {
    headers: {},
  };
  if (config.clientKey && typeof config.clientKey === "string") {
    fetchOptions.headers = {
      Authorization: `bearer ${config.clientKey}`,
    };
  }

  try {
    const packageManager = getPkgManager({});
    const result = await fetch(
      `${HOST}api/challenges/${challenge}`,
      fetchOptions,
    );
    if (result.status === 404) {
      console.log(
        `${emoji.emojify(":red_circle:")}  Challenge "${chalk.green(
          challenge,
        )}" not found.`,
      );
    } else {
      const data = await result.json();
      if (!data.tests) {
        console.log(
          `${emoji.emojify(
            ":red_circle:",
          )} Algorithm Pro purchase is required to download the challenge ${chalk.green(
            challenge,
          )}.`,
        );
        console.log();
        console.log(
          `   Learn more at ${chalk.green(
            "https://www.codeapro.com/purchase",
          )}.`,
        );
        console.log();
        console.log("   Already purchasedAlgorithms Pro?");
        console.log(
          `   Paste your Client Key from ${chalk.green(
            "https://www.codeapro.com/users/account",
          )} to your local ${chalk.green("codeapro.config.json")}`,
        );
      } else {
        try {
          mkdirSync(path, { recursive: true });
        } catch (e) {
          // do nothing
        }
        try {
          writeFileSync(
            join("challenges", "algo", challenge, "index.ts"),
            convertDescriptionToComment(challenge, data.description) +
              data.userSolution,
          );
          writeFileSync(
            join("challenges", "algo", challenge, "test.ts"),
            data.tests,
          );
          console.log(
            `${emoji.emojify(
              ":honeybee: :rocket:",
            )} Successfully downloaded ${chalk.green(challenge)}.`,
          );
          console.log();
          console.log(
            `  Open ${chalk.green(
              join(path, "index.ts"),
            )} in your favorite editor.`,
          );
          console.log("  Write your solution.");
          console.log();
          console.log("  Validate your solution:");
          console.log(chalk.green(`  ${packageManager} run test ${challenge}`));
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  } catch (e) {
    console.log(e.message);
  }
}

export default run;
