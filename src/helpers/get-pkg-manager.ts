type PackageManager = "npm" | "pnpm" | "yarn";

export default function getPkgManager(): PackageManager {
  const packageManager =
    process.argv.indexOf("--useNpm") !== -1
      ? "npm"
      : process.argv.indexOf("--usePnpm") !== -1
      ? "pnpm"
      : process.argv.indexOf("--useYarn") !== -1
      ? "yarn"
      : "";

  if (packageManager) {
    return packageManager;
  }

  const userAgent = process.env.npm_config_user_agent;
  if (userAgent) {
    if (userAgent.startsWith("yarn")) {
      return "yarn";
    } else if (userAgent.startsWith("pnpm")) {
      return "pnpm";
    } else {
      return "npm";
    }
  } else {
    return "npm";
  }
}
