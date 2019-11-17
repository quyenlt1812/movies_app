module.exports = {
	extends: 'airbnb',
	parser: 'babel-eslint',
	env: {
		jest: true,
	},
	rules: {
		'no-use-before-define': 'off',
		'react/jsx-filename-extension': 'off',
		'react/prop-types': 'off',
		'comma-dangle': 'off',
		indent: [2, 'tab'],
		'no-tabs': 0,
	},
	globals: {
		fetch: false,
	},
};
