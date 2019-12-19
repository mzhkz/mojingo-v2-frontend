module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {

                "targets": [">0.25% in JP","not ie <= 10", "not op_mini all"],
                // 必要なpolyfillプラグインを自動的に使う
                "useBuiltIns": "usage",
                "corejs": 3,
            },
            "@babel/preset-react",
        ],
    ],
    plugins: [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-transform-react-jsx",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-optional-chaining",
    ]
};