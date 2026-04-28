import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [duplicates, setDuplicates] = useState([]);

  const findDuplicates = () => {
    const terms = text
      .split("\n")
      .map((term) => term.trim())
      .filter((term) => term !== "");

    const countMap = {};

    terms.forEach((term) => {
      const cleaned = term.toLowerCase();

      if (!countMap[cleaned]) {
        countMap[cleaned] = {
          original: term,
          count: 0,
        };
      }

      countMap[cleaned].count++;
    });

    const result = Object.values(countMap)
      .filter((item) => item.count > 1)
      .sort((a, b) => b.count - a.count);

    setDuplicates(result);
  };

  const clearAll = () => {
    setText("");
    setDuplicates([]);
  };

  const totalTerms = text
    .split("\n")
    .map((term) => term.trim())
    .filter((term) => term !== "").length;

  return (
    <div className="page">
      <div className="card">
        <div className="header">
          <span className="badge">Knowledge Base Tool</span>
          <h1>Duplicate Term Checker</h1>
          <p>
            Paste your English terms line by line and identify repeated terms
            easily.
          </p>
        </div>

        <div className="stats">
          <div>
            <h3>{totalTerms}</h3>
            <p>Total Terms</p>
          </div>
          <div>
            <h3>{duplicates.length}</h3>
            <p>Duplicate Terms</p>
          </div>
        </div>

        <textarea
          placeholder={`Paste terms here...

Example:
Right of access
Data protection officer
Right of access
data protection officer`}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="actions">
          <button className="primary-btn" onClick={findDuplicates}>
            Find Duplicates
          </button>
          <button className="secondary-btn" onClick={clearAll}>
            Clear
          </button>
        </div>

        <div className="result-section">
          <h2>Results</h2>

          {duplicates.length === 0 ? (
            <div className="empty-box">
              <p>No duplicate terms found yet.</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Term</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {duplicates.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.original}</td>
                      <td>
                        <span className="count-badge">{item.count}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;