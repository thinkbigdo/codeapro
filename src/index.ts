#!/usr/bin/env node
import emoji from "node-emoji";
import isFolderEmpty from "./helpers/is-folder-empty";
import downloadAndExtractRepo from "./helpers/download-and-extract-repo";
import initPackages from "./helpers/init-packages";

const root = ".";

const username = "deckerlabs";
const name = "challenges-base";
const branch = "main";
const filePath = "";

async function run() {
  console.log(
    emoji.emojify(":honeybee: :rocket: Let's code. Code Like a Pro!")
  );
  console.log(emoji.emojify(":blue_heart: Checking folder."));
  if (!isFolderEmpty(root, name)) {
    process.exit(1);
  }

  console.log(emoji.emojify(":blue_heart: Downloading challenges base."));
  await downloadAndExtractRepo(root, { username, name, branch, filePath });

  console.log(emoji.emojify(":blue_heart: Initializing NPM packages."));
  initPackages();
}

run();
