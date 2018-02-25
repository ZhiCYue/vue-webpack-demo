module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import",
        "html"
    ],
    "rules": {
        'linebreak-style': ['warn', 'windows'],
        'no-console': "warn",
        "indent": ["error", 4],
        'no-new': 'warn',
        "no-undef": 'warn',
        "func-names": ["error", "never"],
        "no-param-reassign": 0,
        'no-plusplus': 0,
        'no-unused-expressions': 1,
        'no-lonely-if': 1,
        "no-restricted-syntax": 1,
        "max-len": ["error", 120],
        "eol-last": ["error", "always"],
        "comma-dangle": "off",
        "import/no-extraneous-dependencies": ['error', {
            devDependencies: [
                '**/webpack.*.js',
            ],
            optionalDependencies: false,
        }]
    },
    settings: {
        "import/resolver": {
            webpack: {
                config: 'build/webpack.config.development.js'
            }
        }
    }
};