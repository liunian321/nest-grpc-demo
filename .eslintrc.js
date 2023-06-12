module.exports = {
  env: {
    node: true,
    jest: true,
  },
  root: true,
  extends: ["@nest-boot/eslint-config"],
  plugins: ["simple-import-sort"],
  parserOptions: {
    project: "./tsconfig.json",
  },
};
