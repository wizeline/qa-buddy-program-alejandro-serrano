module.exports = {
    'env': {
        'browser': true,
        'node': true
    },
    'plugins': ['testcafe'],
    'extends': ['eslint:recommended', 'plugin:testcafe/recommended'],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'rules': {
        'eqeqeq': 'off',
        'curly': 'error',
        'quotes': ['error', 'single']
    },
    'overrides': [
        {
            'files': ['reports/*.*', 'allure-report/*.*'],
            'rules': {
            }
        }
    ]
};