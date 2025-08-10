import React, { useState } from "react";
import axios from "axios";
import SummaryTable from "./components/SummaryTable";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    const res = await axios.post("http://localhost:8000/summarize", { url });
    setData((prev) => [...prev, { url, summary: res.data.summary }]);
    setUrl("");
  };

  return (
    <div className="container">
      <h1>AI URL Summarizer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter public URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Summarize</button>
      </form>
      <SummaryTable data={data} />
    </div>
  );
}

export default App;
