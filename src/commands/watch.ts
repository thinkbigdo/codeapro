import { readFileSync, existsSync, watch } from "node:fs";
import { join, dirname } from "node:path";
import { spawn } from "node:child_process";
import md5 from "md5";

const challengesDir = join(".", "challenges");

function run() {
  require("log-timestamp");

  console.log(`Watching for file changes on ${challengesDir}`);

  let md5Files = {};
  let fsWait: NodeJS.Timeout | boolean = false;
  let runningTests = false;
  watch(challengesDir, { recursive: true }, (event, filename) => {
    if (filename) {
      if (fsWait || runningTests) {
        return;
      }
      fsWait = setTimeout(() => {
        fsWait = false;
      }, 100);
      const md5Current = md5(readFileSync(join(challengesDir, filename)));
      if (filename in md5Files && md5Current === md5Files[filename]) {
        return;
      }

      let testFile = "";
      let solutionFile = "";
      if (/test\.(ts|tsx|js)$/.test(filename)) {
        testFile = filename;
        solutionFile = testFile.replace(/test\.(ts|tsx|js)$/, "");
      } else {
        const files = ["test.ts", "test.tsx", "test.js"];
        for (let i = 0; i < files.length; i++) {
          if (existsSync(join("challenges", dirname(filename), files[i]))) {
            testFile = join(dirname(filename), files[i]);
          }
        }
        solutionFile = filename;
      }
      runningTests = true;
      const runner = spawn(
        join(".", "node_modules", ".bin", "jest"),
        [testFile],
        {
          stdio: "inherit",
          shell: true,
          env: {
            ...process.env,
            SOLUTION_FILE: solutionFile,
          },
        },
      );
      runner.on("exit", () => {
        runningTests = false;
      });

      md5Files[filename] = md5Current;
      console.log(`${filename} file changed, running tests...`);
    }
  });
}

export default run;
