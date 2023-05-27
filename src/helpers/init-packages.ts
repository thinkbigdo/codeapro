import { spawn } from "node:child_process";

export default function initPackages() {
  spawn(`npm`, ["install"], {
    stdio: "inherit",
    shell: true,
  });
}
