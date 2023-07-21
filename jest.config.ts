import type { Config } from "jest";

export default async (): Promise<Config> => {
  return {
    globalSetup: "<rootDir>/jest.setup.ts",
    transform: {
      "^.+\\.(t|j)sx?$": "@swc/jest",
    },
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
    },
    testPathIgnorePatterns: [
      "<rootDir>/src",
      "<rootDir>/dist",
      "<rootDir>/cap-test",
    ],
  };
};
