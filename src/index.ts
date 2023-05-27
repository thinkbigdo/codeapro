#!/usr/bin/env node
import isFolderEmpty from "./helpers/is-folder-empty";
import downloadAndExtractRepo from "./helpers/download-and-extract-repo";
import initPackages from "./helpers/init-packages";

const root = ".";

const username = "deckerlabs";
const name = "challenges-base";
const branch = "main";
const filePath = "";

console.log("Checking folder.");
if (!isFolderEmpty(root, name)) {
  process.exit(1);
}

console.log("Downloading.");
downloadAndExtractRepo(root, { username, name, branch, filePath }).then(() => {
  console.log("done!");
});

console.log("Initializing packages.");
initPackages();
