module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parser: "@typescript-eslint/parser",
    extends: [
        "plugin:@typescript-eslint/recommended",
        "eslint:recommended",
        "prettier",
        "plugin:react/recommended",
        "plugin:tailwindcss/recommended",
        "plugin:cypress/recommended",
    ],
    plugins: [
        "@typescript-eslint",
        "react",
        "prettier",
        "tailwindcss",
        "cypress",
    ],
    rules: {
        "prettier/prettier": ["error", { endOfLine: "auto" }],
        "react/react-in-jsx-scope": "off",
    },
}
