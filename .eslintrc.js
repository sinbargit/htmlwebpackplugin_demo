module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "quotes": [
            "error",
            "single"
        ],
        "no-console": 0,
        "react/react-in-jsx-scope": 0,
        "react/prop-types": 0,
        "react/no-deprecated": 0
    }
}