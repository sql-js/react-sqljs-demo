# demonstration of [react](https://reactjs.org/) + [sql.js](https://github.com/sql-js/sql.js)

This is a template repository demonstrating the use of sql.js with create-react-app.

The only differences with a traditional create-react-app application are :
 - The usage of [react-app-rewired](https://www.npmjs.com/package/react-app-rewired) to allow providing a custom [webpack](https://webpack.js.org/) configuration
 - a custom [`config-overrides.js`](./config-overrides.js) to copy the wasm module from sql.js to the distributed assets
 
 See [`src/App.js`](./src/App.js) for the code.
 
