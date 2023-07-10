import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const HOST = "https://www.codeapro.com/";

const typeMap = {
  algo: "algorithm",
  algorithm: "alglorithm",
  algorithms: "algorithm",
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
    console.log(`Type "${type}" is invalid.`);
    return;
  }

  const path = join("challenges", typeMap[type], challenge);

  if (existsSync(path)) {
    console.log(`Directory already exists for ${path}`);
    return;
  }

  try {
    const result = await fetch(`${HOST}api/challenges/${challenge}`);
    const data = await result.json();
    if (result.status === 404) {
      console.log("Challenge not found.");
    } else {
      if (!data.tests) {
        console.log(
          "Algorithm Pro purchase is required to download the challenge requested."
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
