import React from "react";
import "./styles.css";
import initSqlJs from "sql.js";


export default class App extends React.Component {
  constructor() {
    super();
    this.state = { db: null, err: null, result: null }
  }
  componentDidMount() {
    initSqlJs()
      .then(SQL => this.setState({ db: new SQL.Database() }))
      .catch(err => this.setState({ err }));
  }
  exec(sql) {
    let result = null, err = null;
    try {
      result = this.state.db.exec(sql);
    } catch (e) {
      err = e
    }
    this.setState({ result, err })
  }
  renderResult({ columns, values }) {

    return <table>
      <thead>
        <tr>
          {columns.map(c => <td>{c}</td>)}
        </tr>
      </thead>
      <tbody>
        {values.map(row =>
          <tr>{row.map(v => <td>{v}</td>)}</tr>
        )}
      </tbody>
    </table>
  }
  render() {
    let { db, err, result } = this.state;
    if (!db) return <pre>Loading...</pre>;
    return (
      <div className="App">
        <h1>React SQL interpreter</h1>
        <textarea
          onChange={e => this.exec(e.target.value)}
          placeholder="Enter some SQL. No inpiration ? Try “select sqlite_version()”"></textarea>
        <pre className="error">{(err || "").toString()}</pre>
        <pre>{result ? result.map(this.renderResult) : ""}</pre>
      </div>
    );
  }
}
