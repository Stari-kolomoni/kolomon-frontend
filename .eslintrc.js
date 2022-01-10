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
        "quotes": ["error", "double"],
        "max-len": ["warn", { comments: 120, code: 90 }],
        "no-trailing-spaces": ["error", { skipBlankLines: true }],
        "no-param-reassign": "off",
        "prefer-const": ["error", { destructuring: "all" }],
        "no-multiple-empty-lines": ["error", { max: 5, maxEOF: 1}],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", "first"],
        "react/prefer-stateless-function": "warn",
        "react/jsx-max-props-per-line": ["warn", { maximum: 2, when: "multiline" }],
        "react/prop-types": "off",
        "react/jsx-one-expression-per-line": "off",
        "react/jsx-props-no-spreading": "off",
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/quotes": ["error", "double"],
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
        "@typescript-eslint/no-empty-interface": "off",
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
