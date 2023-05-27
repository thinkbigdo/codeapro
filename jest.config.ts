import type { Config } from "jest";

export default async (): Promise<Config> => {
  return {
    transform: {
      "^.+\\.(t|j)sx?$": "@swc/jest",
    },
  };
};
