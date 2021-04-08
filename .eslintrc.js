module.exports = {
    root: true,
    extends: '@react-native-community',
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    "env": {
        "node": 1
    },
    rules: {
        'prettier/prettier': 0,
        'no-undef': 0,
        "quotes": [2, "single", {"avoidEscape": true}],
        'jsx-quotes': [2, 'prefer-single'],
    },
};
