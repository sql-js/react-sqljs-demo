# demonstration of [react](https://reactjs.org/) + [sql.js](https://github.com/sql-js/sql.js)

This is a template repository demonstrating the use of sql.js with create-react-app.

The only differences with a traditional create-react-app application are :
 - The usage of [craco](https://github.com/gsoft-inc/craco) to allow providing a custom [webpack](https://webpack.js.org/) configuration
 - a small custom webpack configuration in [`craco.config.js`](./craco.config.js) to copy the wasm module from sql.js to the distributed assets

 Note that you should make sure your server serves `.wasm` files with the right mimetype, that is: `application/wasm`. Otherwise, you'll see the following error: `TypeError: Response has unsupported MIME type`
 
Webpack 5 do not include nodejs polyfills by default, so you'll need to include them by adding them as dev dependency
```
npm install -D path-browserify crypto-browserify stream-browserify
```
or
```
yarn add -D path-browserify crypto-browserify stream-browserify
```

See [`src/App.js`](./src/App.js) for the code.
 
### [view the live demo](https://react-sqljs-demo.ophir.dev/)

### Using Webpack 4
See [here](https://github.com/sql-js/react-sqljs-demo/tree/v1) for craco configuration using Webpack 4