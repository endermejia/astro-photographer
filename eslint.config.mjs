import { defineConfig } from 'eslint/config';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default defineConfig([
	{
		extends: compat.extends('eslint:recommended', 'plugin:compat/recommended'),

		plugins: {
			'@typescript-eslint': typescriptEslint
		},

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.jquery,
				...globals.node
			},

			parser: tsParser,
			ecmaVersion: 2020,
			sourceType: 'module',

			parserOptions: {
				impliedStrict: true,
				parser: '@typescript-eslint/parser'
			}
		},

		rules: {
			strict: ['error', 'safe'],
			'no-cond-assign': ['error', 'except-parens'],

			'no-empty': [
				'error',
				{
					allowEmptyCatch: true
				}
			],

			'no-unsafe-negation': 'error',
			curly: ['error', 'all'],
			'dot-location': ['warn', 'property'],

			'dot-notation': [
				'error',
				{
					allowKeywords: true
				}
			],

			eqeqeq: ['warn', 'smart'],
			'guard-for-in': 'error',
			'no-alert': 'warn',
			'no-caller': 'error',
			'no-eq-null': 'off',
			'no-eval': 'off',
			'no-floating-decimal': 'error',
			'no-loop-func': 'error',

			'no-multi-spaces': [
				'error',
				{
					exceptions: {
						VariableDeclarator: true
					}
				}
			],

			'no-multi-str': 'error',
			'no-param-reassign': 'warn',
			'no-script-url': 'off',
			'no-sequences': 'error',
			'no-unused-expressions': 'warn',
			'no-useless-call': 'error',
			'no-useless-escape': 'error',
			'no-useless-return': 'error',
			'no-void': 'error',
			'require-await': 'warn',
			'vars-on-top': 'error',
			'wrap-iife': ['error', 'inside'],
			yoda: 'error',
			'no-undef': 'error',
			'no-undef-init': 'error',
			'no-undefined': 'off',

			'no-unused-vars': [
				'off',
				{
					vars: 'all',
					args: 'after-used',
					ignoreRestSiblings: false
				}
			],

			'@typescript-eslint/no-unused-vars': ['error'],

			'no-use-before-define': [
				'error',
				{
					functions: false
				}
			],

			'array-bracket-spacing': ['error', 'never', {}],
			'block-spacing': 'error',

			'brace-style': [
				'error',
				'1tbs',
				{
					allowSingleLine: true
				}
			],

			camelcase: [
				'warn',
				{
					properties: 'always'
				}
			],

			'comma-dangle': ['error', 'never'],

			'comma-spacing': [
				'error',
				{
					before: false,
					after: true
				}
			],

			'comma-style': ['error', 'last'],
			'computed-property-spacing': ['error', 'never'],
			'eol-last': 'error',
			'func-call-spacing': ['error', 'never'],

			'key-spacing': [
				'error',
				{
					beforeColon: false,
					afterColon: true
				}
			],

			'keyword-spacing': ['error', {}],
			'linebreak-style': 'off',

			'max-lines': [
				'warn',
				{
					max: 500,
					skipBlankLines: true,
					skipComments: true
				}
			],

			'max-nested-callbacks': ['warn', 10],
			'max-params': ['warn', 5],
			'new-parens': 'error',
			'no-bitwise': 'error',
			'no-lonely-if': 'error',
			'no-multiple-empty-lines': 'error',
			'no-plusplus': 'off',
			'no-trailing-spaces': 'error',
			'no-whitespace-before-property': 'error',
			'one-var': ['error', 'never'],
			'one-var-declaration-per-line': ['error', 'always'],

			quotes: [
				'error',
				'single',
				{
					avoidEscape: true,
					allowTemplateLiterals: true
				}
			],

			semi: ['error', 'always'],

			'semi-spacing': [
				'error',
				{
					before: false,
					after: true
				}
			],

			'space-before-blocks': ['error', 'always'],

			'space-before-function-paren': [
				'warn',
				{
					anonymous: 'always',
					named: 'never'
				}
			],

			'space-in-parens': ['error', 'never'],
			'space-infix-ops': 'error',

			'space-unary-ops': [
				'error',
				{
					words: false,
					nonwords: false
				}
			],

			'spaced-comment': ['error', 'always'],
			'template-tag-spacing': 'error',
			'wrap-regex': 'error',
			'arrow-body-style': ['error', 'always'],
			'arrow-parens': ['error', 'always'],
			'arrow-spacing': 'error',
			'no-duplicate-imports': 'error',
			'no-new': 'error',
			'no-useless-computed-key': 'error',
			'no-useless-constructor': 'error',
			'no-var': 'warn',
			'no-with': 'error',
			'prefer-const': 'error',

			'sort-imports': [
				'error',
				{
					ignoreCase: true
				}
			],

			'template-curly-spacing': 'error'
		}
	}
]);
