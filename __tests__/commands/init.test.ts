import runInit from "@/commands/init";
import { existsSync, mkdirSync } from "node:fs";

const TEST_DIR = "cap-test";

it("init: npm: new", async () => {
  mkdirSync(TEST_DIR);
  process.chdir(TEST_DIR);

  await runInit({});
  expect(existsSync("codeapro.config.json")).toEqual(true);

  process.chdir("..");
});

it("init: npm: exists", async () => {
  const mockExit = jest.spyOn(process, "exit").mockImplementation();

  process.chdir(TEST_DIR);
  expect(existsSync("codeapro.config.json")).toEqual(true);

  await runInit({});
  expect(mockExit).toHaveBeenCalledWith(1);

  mockExit.mockRestore();
  process.chdir("..");
});
