import { existsSync, rmdirSync } from "node:fs";

const TEST_DIR = "cap-test";

export default function globalSetup() {
  if (existsSync(TEST_DIR)) {
    rmdirSync(TEST_DIR, { recursive: true });
  }
}
