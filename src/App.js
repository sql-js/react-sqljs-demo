import React from "react";
import "./styles.css";
import initSqlJs from "sql.js";


export default class App extends React.Component {

  constructor() {
    super();
    this.state = { db: null, err: null, results: null }
  }

  componentDidMount() {
    // sql.js needs to fetch its wasm file, so we cannot immediately instantiate the database
    // without any configuration, initSqlJs will fetch the wasm files directly from the same path as the js
    // see ../config-overrides.js

    const me = this;
    Promise.all([initSqlJs(), fetch('./test.db')]).then(async res => {
      const SQLite = res[0], dbStorage = res[1];
      const db = new SQLite.Database(new Uint8Array(await dbStorage.arrayBuffer()));

      me.setState({db: db});
    }).catch(err => {
      me.setState({err});
    });

  }

  exec(sql) {
    let results = null, err = null;
    try {
      // The sql is executed synchronously on the UI thread. 
      // You may want to use a web worker
      results = this.state.db.exec(sql); // an array of objects is returned
    } catch (e) {
      // exec throws an error when the SQL statement is invalid
      err = e
    }
    this.setState({ results, err })
  }

  /**
   * Renders a single value of the array returned by db.exec(...) as a table
   */
  renderResult({ columns, values }) {
    return (
      <table>
        <thead>
          <tr>
            {columns.map(columnName =>
              <td>{columnName}</td>
            )}
          </tr>
        </thead>

        <tbody>
          {values.map(row => // values is an array of arrays representing the results of the query
            <tr>
              {row.map(value =>
                <td>{value}</td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let { db, err, results } = this.state;
    if (!db) return <pre>Loading...</pre>;
    return (
      <div className="App">

        <h1>React SQL interpreter</h1>

        <textarea
          onChange={e => this.exec(e.target.value)}
          placeholder="Enter some SQL. No inpiration ? Try “select sqlite_version()”"
          defaultValue="SELECT * FROM db_articles"
        />

        <pre className="error">{(err || "").toString()}</pre>

        <pre>{results
          ? results.map(this.renderResult) // results contains one object per select statement in the query
          : ""
        }</pre>

      </div>
    );
  }

}
