import type { Config } from "jest";
import { join } from "node:path";

export default async (): Promise<Config> => {
  return {
    transform: {
      "^.+\\.(t|j)sx?$": "@swc/jest",
    },
    setupFilesAfterEnv: [join(__dirname, "codeapro-jest.setup.js")],
  };
};
