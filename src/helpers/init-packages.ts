import { spawn } from "node:child_process";

export default async function initPackages() {
  await spawn(`npm`, ["install"], {
    stdio: "inherit",
    shell: true,
  });
}
