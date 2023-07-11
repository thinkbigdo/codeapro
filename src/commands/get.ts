import emoji from "node-emoji";
import chalk from "chalk";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import getPkgManager from "../helpers/get-pkg-manager";

const HOST = "https://www.codeapro.com/";

const typeMap = {
  algo: "algo",
  algorithm: "algo",
  algorithms: "algo",
  "front-end": "front-end",
  frontend: "frontend",
};

function convertDescriptionToComment(description) {
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
  return wrappedLines.join("\n * ") + "\n */\n\n";
}

async function run(type, challenge) {
  if (!(type in typeMap)) {
    console.log(
      `${emoji.emojify(":red_circle:")}  Type "${chalk.green(
        type
      )}" is invalid.`
    );
    return;
  }

  const path = join("challenges", typeMap[type], challenge);

  if (existsSync(path)) {
    console.log(
      `${emoji.emojify(
        ":red_circle:"
      )} Directory already exists for ${chalk.green(path)}.`
    );
    return;
  }

  try {
    const packageManager = getPkgManager({});
    const result = await fetch(`${HOST}api/challenges/${challenge}`);
    if (result.status === 404) {
      console.log(
        `${emoji.emojify(":red_circle:")}  Challenge "${chalk.green(
          challenge
        )}" not found.`
      );
    } else {
      const data = await result.json();
      if (!data.tests) {
        console.log(
          `${emoji.emojify(
            ":red_circle:"
          )} Algorithm Pro purchase is required to download the challenge ${chalk.green(
            challenge
          )}.`
        );
        console.log();
        console.log(
          `   Learn more at ${chalk.green(
            "https://www.codeapro.com/purchase"
          )}.`
        );
      } else {
        try {
          mkdirSync(path, { recursive: true });
        } catch (e) {
          // do nothing
        }
        try {
          writeFileSync(
            join("challenges", typeMap[type], challenge, "index.ts"),
            convertDescriptionToComment(data.description) + data.userSolution
          );
          writeFileSync(
            join("challenges", typeMap[type], challenge, "test.ts"),
            data.tests
          );
          console.log(
            `${emoji.emojify(
              ":honeybee: :rocket:"
            )} Successfully downloaded ${chalk.green(challenge)}.`
          );
          console.log();
          console.log(
            `  Open ${chalk.green(
              join(path, "index.ts")
            )} in your favorite editor. Modify and check your code:`
          );
          console.log(emoji.emojify(`  ${packageManager} test ${challenge}`));
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
