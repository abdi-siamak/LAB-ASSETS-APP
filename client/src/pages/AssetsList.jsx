import { useState, useEffect } from 'react';
import { listAssets, deleteAsset } from '../api.js';
import { Link } from "react-router-dom";

export default function AssetsList() {
    const [q, setQ] = useState("");
    const [data, setData] = useState({ items: [], total: 0 });
    const [loading, setLoading] = useState(true);

    async function load() {
        setLoading(true);
        try {
            const res = await listAssets({ q });
            setData(res);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => { load(); }, []); // load on mount

    async function onDelete(id) {
        if (!confirm("Delete this asset?")) return;
        await deleteAsset(id);
        load();
    }

return (
  <div>
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search by name..."
      />
      <button onClick={load}>Search</button>
      <Link to="/new">
        <button>+ New</button>
      </Link>
    </div>

    {loading ? (
      <p>Loading…</p>
    ) : (
      <table
        width="100%"
        cellPadding={8}
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th align="left">Name</th>
            <th align="left">Type</th>
            <th align="left">Location</th>
            <th align="left">Status</th>
            <th align="left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.items?.map(a => (
            <tr key={a._id} style={{ borderTop: "1px solid #ddd" }}>
              <td>{a.name}</td>
              <td>{a.type}</td>
              <td>{a.location}</td>
              <td>{a.status}</td>
              <td>
                <Link to={`/edit/${a._id}`}>
                  <button>Edit</button>
                </Link>
                <button
                  onClick={() => onDelete(a._id)}
                  style={{ marginLeft: 8 }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {data?.items?.length === 0 && (
            <tr>
              <td colSpan={5}>No assets yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    )}
  </div>
);
}

