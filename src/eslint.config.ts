import globals from 'globals';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import vue from 'eslint-plugin-vue';

export default [
    js.configs.recommended,
    ...ts.configs.recommended,
    ...vue.configs['flat/essential'],
    {
        files: ['src/**/*.{vue,ts,js}'],
        languageOptions: {
            globals: globals.browser,
            parserOptions: { parser: ts.parser }
        },
        rules: {
            'block-scoped-var': 'error',
            curly: 'error',
            'default-case': 'error',
            'default-case-last': 'error',
            'default-param-last': 'error',
            'init-declarations': ['error', 'always'],
            'max-classes-per-file': ['error', 1],
            'max-depth': ['error', 2],
            'no-alert': 'error',
            'no-console': 'error',
            'no-multi-str': 'off',
            'no-else-return': 'error',
            'no-empty': 'error',
            'no-invalid-this': 'error',
            'no-constructor-return': 'error',
            'no-duplicate-imports': 'error',
            'no-self-compare': 'error',
            'no-template-curly-in-string': 'error',
            'no-unreachable-loop': 'error',
            'no-unmodified-loop-condition': 'error',
            'no-var': 'error',
            'prefer-const': 'error',
            'vue/multi-word-component-names': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true
                }
            ]
        }
    }
];
