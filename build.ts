Bun.build({
  entrypoints: ["./src/index.ts", "./src/wrappers/index.ts"],
  outdir: "./dist",
  minify: false,
  target: "browser",
  format: "cjs",
  splitting: true,
  // naming: {
  //   entry: `[name].bundle.${ext}`,
  //   chunk: `[name]-[hash].${ext}`,
  //   asset: "[name]-[hash][ext]",
  // },
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
