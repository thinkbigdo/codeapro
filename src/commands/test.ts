import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, sep, join } from "node:path";

function run(challenge: string, solution: string) {
  const types = ["algorithms", "frontend"];
  const files = ["test.ts", "test.tsx", "test.js"];
  let testArg = challenge ? challenge.split(sep) : [];
  let solutionArg = `${solution ? solution : "index"}`;
  let testFile: string = "";
  let solutionFile;

  if (testArg.length > 3) {
    console.log("Test name too long. Path can only have up to three parts.");
    process.exit(1);
  } else if (testArg.length === 3) {
    if (existsSync(join("challenges", testArg.join(sep)))) {
      testFile = join("challenges", testArg.join(sep));
      solutionFile = join(`${dirname(testArg.join(sep))}`, solutionArg);
    } else {
      console.log("The challenge you specified does not exist.");
      process.exit(1);
    }
  } else if (testArg.length === 2) {
    if (/\.(ts|js|tsx)$/.test(testArg[1])) {
      for (let i = 0; i < types.length; i++) {
        if (existsSync(join("challenges", types[i], testArg[0], testArg[1]))) {
          solutionFile = join(types[i], testArg[0], solutionArg);
          testFile = join("challenges", types[i], testArg[0], testArg[1]);
        }
      }
    } else {
      for (let i = 0; i < files.length; i++) {
        if (existsSync(join("challenges", testArg[0], testArg[1], files[i]))) {
          solutionFile = join(testArg[0], testArg[1], solutionArg);
          testFile = join("challenges", testArg[0], testArg[1], files[i]);
        }
      }
    }
    if (!testFile) {
      console.log("The challenge you specified does not exist.");
      process.exit(1);
    }
  } else if (testArg.length === 1) {
    let hasMatch = false;
    for (let i = 0; i < types.length; i++) {
      for (let j = 0; j < files.length; j++) {
        if (existsSync(join("challenges", types[i], testArg[0], files[j]))) {
          solutionFile = join(types[i], testArg[0], solutionArg);
          testFile = join("challenges", types[i], testArg[0], files[j]);
          hasMatch = true;
          break;
        }
      }
    }
    if (!hasMatch) {
      console.log("The challenge you specified does not exist.");
      return process.exit(1);
    }
  } else if (testArg.length === 0) {
    console.log("Test name missing.");
    return process.exit(1);
  }

  console.log(testFile);
  console.log(solutionFile);

  const testProcess = spawn(
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

  testProcess.on("exit", (code) => {
    if (code !== null) {
      process.exit(code);
    }
  });
}

export default run;
