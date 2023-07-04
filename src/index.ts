#!/usr/bin/env node
import { Command } from "commander";
import runInit from "./commands/init";
import runTest from "./commands/test";
import runWatch from "./commands/watch";

const program = new Command();

program.name("codeapro").description("Code Like a Pro CLI.").version("0.0.9");

program
  .command("init", { isDefault: true })
  .description("Initialize the base in the current directory.")
  .argument("[name]")
  .option("--useNpm", "Use npm as the package manager.")
  .option("--useYarn", "Use yarn as the package manager.")
  .option("--usePnpm", "Use pnpm as the package manager.")
  .action(async (str, opts) => {
    await runInit(opts);
  });

program
  .command("test")
  .description("Run the tests for a specific challenge.")
  .argument("<challenge name>")
  .argument("[solution file]")
  .action(async (challenge, solution) => {
    await runTest(challenge, solution);
  });

program
  .command("watch")
  .description("Run the tests on a challenge when a file is changed.")
  .argument("<name>")
  .action(async () => {
    await runWatch();
  });

program.parse();
