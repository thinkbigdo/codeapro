import runTest from "@/commands/test";
import { existsSync } from "node:fs";
import { join } from "node:path";
import childProcess from "node:child_process";

jest.mock("node:child_process");

const TEST_DIR = "cap-test";
const mockExit = jest.spyOn(process, "exit").mockImplementation();
const mockedChildProcess = childProcess.spawn as jest.MockedFunction<
  typeof childProcess.spawn
>;

function waitForFile(file: string) {
  return new Promise((res) => {
    const intervalId = setInterval(() => {
      if (existsSync(file)) {
        clearInterval(intervalId);
        res(true);
      }
    }, 1000);
  });
}

afterEach(() => {
  mockExit.mockRestore();
  process.chdir("..");
  mockedChildProcess.mockClear();
});

it("test: npm: twoSum", async () => {
  let callbackHandler = (code: number) => {};
  const mockSpawnOn = (event: string, callback: () => void) => {
    callbackHandler = callback;
  };
  mockedChildProcess.mockImplementationOnce(
    (
      command: string,
      args: readonly string[],
      options: childProcess.SpawnOptions,
    ) => {
      return { on: mockSpawnOn } as childProcess.ChildProcess;
    },
  );

  expect(
    await waitForFile(
      join(TEST_DIR, "challenges", "algorithms", "twoSum", "index.ts"),
    ),
  ).toEqual(true);
  process.chdir(TEST_DIR);

  expect(existsSync("codeapro.config.json")).toEqual(true);
  expect(await waitForFile(join("node_modules", ".bin", "jest"))).toEqual(true);

  runTest("twoSum", "index");
  expect(childProcess.spawn).toHaveBeenCalledTimes(1);
  expect(mockedChildProcess.mock.calls[0][0]).toEqual("node_modules/.bin/jest");
  expect(mockedChildProcess.mock.calls[0][1]).toEqual([
    "challenges/algorithms/twoSum/test.ts",
  ]);
  expect(mockExit).not.toHaveBeenCalled();

  callbackHandler(1);
  expect(mockExit).toHaveBeenCalledWith(1);
}, 10000);

it("test: npm: <empty>", async () => {
  const mockExit = jest.spyOn(process, "exit").mockImplementation();
  let callbackHandler = (code: number) => {};
  const mockSpawnOn = (event: string, callback: () => void) => {
    callbackHandler = callback;
  };

  expect(
    await waitForFile(
      join(TEST_DIR, "challenges", "algorithms", "twoSum", "index.ts"),
    ),
  ).toEqual(true);
  process.chdir(TEST_DIR);

  expect(existsSync("codeapro.config.json")).toEqual(true);
  expect(await waitForFile(join("node_modules", ".bin", "jest"))).toEqual(true);

  runTest("", "index");
  expect(childProcess.spawn).not.toHaveBeenCalled();
  expect(mockExit).toHaveBeenCalledWith(1);
}, 10000);

it("test: npm: fooSum", async () => {
  const mockExit = jest.spyOn(process, "exit").mockImplementation();
  let callbackHandler = (code: number) => {};
  const mockSpawnOn = (event: string, callback: () => void) => {
    callbackHandler = callback;
  };

  expect(
    await waitForFile(
      join(TEST_DIR, "challenges", "algorithms", "twoSum", "index.ts"),
    ),
  ).toEqual(true);
  process.chdir(TEST_DIR);

  expect(existsSync("codeapro.config.json")).toEqual(true);
  expect(await waitForFile(join("node_modules", ".bin", "jest"))).toEqual(true);

  runTest("fooSum", "index");
  expect(childProcess.spawn).not.toHaveBeenCalled();
  expect(mockExit).toHaveBeenCalledWith(1);
}, 10000);
