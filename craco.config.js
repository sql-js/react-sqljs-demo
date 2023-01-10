module.exports = {
    webpack: {
        configure: {
            module: {
                rules: [{
                    test: /\.wasm$/,
                    type: 'javascript/auto',
                    use: [{ loader: 'file-loader' }]
                }],
            },
            resolve: {
                fallback: {
                    'path': require.resolve('path-browserify'),
                    'crypto': require.resolve('crypto-browserify'),
                    'stream': require.resolve('stream-browserify')
                }
            },
        },
    },
};