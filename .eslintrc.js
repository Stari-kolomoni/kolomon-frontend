module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json"
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "airbnb-typescript"
    ],
    plugins: [
        "@typescript-eslint"
    ],
    rules: {
        "indent": "off",
        "@typescript-eslint/indent": ["error", 4],
        "react/jsx-indent": ["error", 4],
        "quotes": ["error", "double"],
        "@typescript-eslint/quotes": ["error", "double"],
        "max-len": ["warn", { comments: 120, code: 90 }],
        "react/prefer-stateless-function": "warn"
    },
};
