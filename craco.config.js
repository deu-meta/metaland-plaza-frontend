const webpack = require('webpack');

module.exports = {
	webpack: {
		plugins: {
			add: [
				new webpack.ProvidePlugin({
					Buffer: ['buffer', 'Buffer'],
				}),
			],
		},
		configure: {
			resolve: {
				fallback: {
					buffer: require.resolve('buffer/'),
					crypto: require.resolve('crypto-browserify'),
					stream: require.resolve('stream-browserify'),
				},
			},
		},
	},
};
