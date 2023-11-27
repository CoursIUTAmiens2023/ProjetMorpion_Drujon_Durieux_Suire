module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:react/recommended",
        "plugin:tailwindcss/recommended",
    ],
    plugins: ["@typescript-eslint", "react", "prettier", "tailwindcss"],
    rules: {
        "prettier/prettier": ["error", { endOfLine: "auto" }],
        "react/react-in-jsx-scope": "off",
    },
}
