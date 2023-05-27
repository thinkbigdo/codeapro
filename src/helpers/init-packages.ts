import emoji from "node-emoji";
import chalk from "chalk";
import { spawnSync } from "node:child_process";

type PackageManager = "npm" | "pnpm" | "yarn";

function getPkgManager(): PackageManager {
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) {
    if (userAgent.startsWith("yarn")) {
      return "yarn";
    } else if (userAgent.startsWith("pnpm")) {
      return "pnpm";
    } else {
      return "npm";
    }
  } else {
    return "npm";
  }
}

export default function initPackages(packageManager) {
  const installProcess = spawnSync(packageManager, ["install"], {
    stdio: "inherit",
    shell: true,
  });

  if (installProcess.status !== 0) {
    console.log(
      `${emoji.emojify(":red_circle:")} There was an error with ${chalk.green(
        packageManager
      )}.`
    );
    return false;
  }
  return true;
}
