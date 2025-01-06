import {FlatCompat} from "@eslint/eslintrc";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.config({
        extends: ["next/core-web-vitals", "next/typescript", 'prettier'],
        "plugins": ["simple-import-sort"],
        rules: {
            "no-console": ["error", {allow: ["warn", "error"]}],
            "simple-import-sort/imports": "error",
        }
    }),
];

export default eslintConfig;
