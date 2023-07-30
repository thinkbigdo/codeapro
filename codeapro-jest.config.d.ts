import type { Config } from "jest";

export default function codeaproJest(
  customJestConfig: Config | (() => Promise<Config>),
): Promise<Config>;
