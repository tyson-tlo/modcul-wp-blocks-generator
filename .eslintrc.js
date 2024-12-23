module.exports = {
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@wordpress/eslint-plugin/recommended",
	],
	parser: "@babel/eslint-parser",
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		requireConfigFile: false,
		ecmaVersion: 2018,
		sourceType: "module",
	},
	settings: {
		react: {
			version: "detect",
		},
	},
	rules: {
		quotes: "off",
		tabWidth: "off",
		"prettier/prettier": "off",
	},
};
