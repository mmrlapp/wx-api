import { writeFileSync, readFileSync } from "fs";
import { execSync } from "child_process";

// Get Git commit count
const count = parseInt(execSync("git rev-list --count HEAD").toString().trim(), 10);

// Compute MAJOR.MINOR.PATCH
const MAJOR = Math.floor(count / 10000);
const MINOR = Math.floor((count / 100) % 100);
const PATCH = count % 100;
const version = `${MAJOR}.${MINOR}.${PATCH}`;

// Update package.json
const pkgPath = "./package.json";
const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
pkg.version = version;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

// Run Bun build
Bun.build({
  entrypoints: ["./src/index.ts", "./src/wrappers/index.ts"],
  outdir: "./dist",
  minify: false,
  target: "browser",
  format: "cjs",
  splitting: true,
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
