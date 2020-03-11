const CopyPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
    config.plugins.push(new CopyPlugin([
        { from: 'node_modules/sql.js/dist/sql-wasm.wasm', to: 'static/js/'},
    ]));
    return config;
}