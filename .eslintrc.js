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
        "@typescript-eslint/indent": "off",
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", "first"],
        "quotes": ["error", "double"],
        "@typescript-eslint/quotes": ["error", "double"],
        "max-len": ["warn", { comments: 120, code: 90 }],
        "react/prefer-stateless-function": "warn",
        "react/jsx-max-props-per-line": ["warn", { maximum: 2, when: "multiline" }],
        "no-trailing-spaces": ["error", { skipBlankLines: true }],
        "react/prop-types": "off",
        "prefer-const": ["error", { destructuring: "all" }],
        "no-multiple-empty-lines": ["error", { max: 5, maxEOF: 1}],
        "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true, varsIgnorePattern: "^_" }],
        "@typescript-eslint/naming-convention": [
            "error",
            {
                selector: "variable",
                format: ["camelCase", "PascalCase", "UPPER_CASE"],
                leadingUnderscore: "allow",
            },
            {
                selector: "function",
                format: ["camelCase", "PascalCase"],
            },
            {
                selector: "typeLike",
                format: ["PascalCase"],
            },
        ],
    },
    overrides: [
        {
            files: ["src/app/core/logger.ts"],
            rules: {
                "no-console": "off",
            }
        }
    ]
};
