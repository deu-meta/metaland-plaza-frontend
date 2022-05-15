module.exports = {
	root: true,
	plugins: [
		'react',
		'@typescript-eslint',
		'import', // https://www.npmjs.com/package/eslint-plugin-import
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	extends: [
		'eslint:recommended', // eslint built-in recommended rules
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/typescript',
		'plugin:import/recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
	],
	env: {
		browser: true,
		es2021: true,
	},
	settings: {
		react: {
			version: 'detect',
		},
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts'],
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
				paths: ['./src'],
			},
		},
	},
	ignorePatterns: ['craco.config.js'],
	rules: {
		'prettier/prettier': 'warn',
		'react/prop-types': 'off',
		'import/order': [
			'error',
			{
				groups: ['builtin', 'external', ['parent', 'sibling'], 'index'],
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
				'newlines-between': 'always',
			},
		],
		'import/named': 'warn',
	},
};
