import got from "got";
import tar from "tar";
import { Stream } from "node:stream";
import { promisify } from "node:util";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { createWriteStream, promises as fs } from "fs";

const pipeline = promisify(Stream.pipeline);

export type RepoInfo = {
  username: string;
  name: string;
  branch: string;
  filePath: string;
};

async function downloadTar(url: string) {
  const tempFile = join(tmpdir(), `next.js-cna-example.temp-${Date.now()}`);
  await pipeline(got.stream(url), createWriteStream(tempFile));
  return tempFile;
}

async function downloadAndExtractRepo(
  root: string,
  { username, name, branch, filePath }: RepoInfo
) {
  const tempFile = await downloadTar(
    `https://codeload.github.com/${username}/${name}/tar.gz/${branch}`
  );

  await tar.x({
    file: tempFile,
    cwd: root,
    strip: filePath ? filePath.split("/").length + 1 : 1,
    filter: (p) =>
      p.startsWith(
        `${name}-${branch.replace(/\//g, "-")}${
          filePath ? `/${filePath}/` : "/"
        }`
      ),
  });

  await fs.unlink(tempFile);
}
export default downloadAndExtractRepo;
