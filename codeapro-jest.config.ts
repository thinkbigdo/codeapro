import type { Config } from "jest";
import { join } from "node:path";

export default async (
  customJestConfig: Config | (() => Promise<Config>) = {},
): Promise<Config> => {
  if (typeof customJestConfig === "function") {
    customJestConfig = await customJestConfig();
  }
  return {
    ...(customJestConfig ?? {}),
    transform: {
      ...customJestConfig.transform,
      "^.+\\.(t|j)sx?$": "@swc/jest",
    },
    setupFilesAfterEnv: [
      ...(customJestConfig.setupFilesAfterEnv ?? []),
      join(__dirname, "codeapro-jest.setup.js"),
    ],
  };
};
