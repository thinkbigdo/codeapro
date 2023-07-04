type PackageManager = "npm" | "pnpm" | "yarn";

export default function getPkgManager(opts): PackageManager {
  const packageManager = opts.useNpm
    ? "npm"
    : opts.usePnpm
    ? "pnpm"
    : opts.useYarn
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
