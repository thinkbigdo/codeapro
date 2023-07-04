#!/usr/bin/env node
import { Command } from "commander";
import runInit from "./commands/init";

const program = new Command();

program.name("codeapro").description("Code Like a Pro CLI.").version("0.0.5");

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

program.parse();
