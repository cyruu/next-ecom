import { dirname } from "path";
import { fileURLToPath } from "url";

// Required for module resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Export ESLint configuration
export default {
  extends: ["eslint:recommended", "next/core-web-vitals", "next/typescript"],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json", // Link your TypeScript configuration
  },
  plugins: ["react", "@typescript-eslint", "jsx-a11y"],
  rules: {
    "no-unused-vars": "off",
    "react-hooks/rules-of-hooks": "off",
    "react-hooks/exhaustive-deps": "off",
    "prefer-const": "off",
    "react/prop-types": "off",
    "react/jsx-uses-react": "off",
    "react/jsx-uses-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "jsx-a11y/alt-text": "off",
    "react/no-unescaped-entities": "off",
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/anchor-is-valid": "off",
  },
  overrides: [
    {
      files: ["pages/checkout.tsx"], // Specific rules for the /checkout page
      rules: {
        "react-hooks/rules-of-hooks": "off",
        "react-hooks/exhaustive-deps": "off",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
};
