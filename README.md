# demonstration of [react](https://reactjs.org/) + [sql.js](https://github.com/sql-js/sql.js)

This is a template repository demonstrating the use of sql.js with create-react-app.

The only differences with a traditional create-react-app application are :
 - The usage of [craco](https://github.com/gsoft-inc/craco) to allow providing a custom [webpack](https://webpack.js.org/) configuration
 - a small custom webpack configuration in [`craco.config.js`](./craco.config.js) to copy the wasm module from sql.js to the distributed assets

 Note that you should make sure your server serves `.wasm` files with the right mimetype, that is: `application/wasm`. Otherwise, you'll see the following error: `TypeError: Response has unsupported MIME type`
 
 See [`src/App.js`](./src/App.js) for the code.
 
 ### [view the live demo](https://react-sqljs-demo.ophir.dev/)

## Using with Webpack 5
Webpack 5 do not include nodejs polyfills by default, and you'll have to explicitely specify the file-loader for `wasm` file. So you'll need to update `craco.config.js` as below
```js
module.exports = {
    webpack: {
        configure: {
            module: {
                rules: [
                    {
                        test: /\.wasm$/,
                        type: 'javascript/auto',
                        use: [
                            { loader: 'file-loader' }
                        ]
                    },
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
```
And add the required module to your project
```
npm install -D path-browserify crypto-browserify stream-browserify
```
or
```
yarn add -D path-browserify crypto-browserify stream-browserify
```
