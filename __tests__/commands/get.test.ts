import runGet from "@/commands/get";
import { existsSync } from "node:fs";
import { join } from "node:path";

const TEST_DIR = "cap-test";

function waitForInit() {
  return new Promise((res) => {
    const intervalId = setInterval(() => {
      if (existsSync(TEST_DIR)) {
        process.chdir(TEST_DIR);
        clearInterval(intervalId);
        res(true);
      }
    }, 1000);
  });
}

it("get: npm: twoSum", async () => {
  expect(await waitForInit()).toEqual(true);

  expect(existsSync("codeapro.config.json")).toEqual(true);
  await runGet("twoSum");
  expect(existsSync(join("challenges", "algorithms", "twoSum")));

  process.chdir("..");
}, 10000);

it("get: npm: twoSum: exists", async () => {
  const mockExit = jest.spyOn(process, "exit").mockImplementation();

  expect(await waitForInit()).toEqual(true);

  expect(existsSync("codeapro.config.json")).toEqual(true);

  await runGet("twoSum");
  expect(mockExit).toHaveBeenCalledWith(1);

  mockExit.mockRestore();
  process.chdir("..");
}, 10000);
