import React, { useState } from "react";

export default function SummaryTable({ data }) {
  const [search, setSearch] = useState("");

  const filtered = data.filter((item) =>
    item.url.toLowerCase().includes(search.toLowerCase()) ||
    item.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search summaries"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item, idx) => (
            <tr key={idx}>
              <td>{item.url}</td>
              <td style={{ whiteSpace: "pre-wrap" }}>{item.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
