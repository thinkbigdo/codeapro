import emoji from "node-emoji";
import isFolderEmpty from "../helpers/is-folder-empty";
import downloadAndExtractRepo from "../helpers/download-and-extract-repo";
import initPackages from "../helpers/init-packages";
import getPkgManager from "../helpers/get-pkg-manager";

const root = ".";

const username = "thinkbigdo";
const name = "challenges-base-ts";
const branch = "main";
const filePath = "";

async function run(opts) {
  const packageManager = getPkgManager(opts);

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
  if (!initPackages(packageManager)) {
    process.exit(1);
  }

  console.log();
  console.log(
    emoji.emojify(":honeybee: :rocket: Ready for you to complete challenges.")
  );
  console.log();
  console.log("  You are now ready to download challenges. Try:");
  console.log(emoji.emojify(`  ${packageManager} run get twoSum`));
}

export default run;
