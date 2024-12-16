import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {rules: {semi: ["error", "always"]}},
  {rules: {quotes: ["error", "double"]}},
  {rules: {"no-unused-vars": "warn"}},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {rules: {"@typescript-eslint/no-explicit-any": "warn"}},
  {rules: {"@typescript-eslint/no-empty-object-type": "warn"}},
  {rules: {"@typescript-eslint/no-unused-vars": "warn"}}
];