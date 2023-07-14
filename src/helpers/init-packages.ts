import emoji from "node-emoji";
import chalk from "chalk";
import { spawnSync } from "node:child_process";

export default function initPackages(packageManager) {
  const installProcess = spawnSync(packageManager, ["install"], {
    stdio: "inherit",
    shell: true,
  });

  if (installProcess.status !== 0) {
    console.log(
      `${emoji.emojify(":red_circle:")} There was an error with ${chalk.green(
        packageManager,
      )}.`,
    );
    return false;
  }
  return true;
}
