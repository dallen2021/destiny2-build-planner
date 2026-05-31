import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "legacy/**",
      "scripts/**/*.js",
      "docs/bungie-api-reference.md",
      "docs/bungie-api-reference.firecrawl.md",
      "docs/bungie-openapi-2.json",
    ],
  },
];

export default eslintConfig;
