const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export async function listAssets({q = '', page=1, limit=10} = {}) {
    const r = await fetch(`${API}/assets?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}`);//q=${encodeURIComponent(q)} → encodes the search query safely for URLs
    if (!r.ok) throw new Error('Failed to fetch assets');
    return r.json()
}

export async function getAsset(id) {
    const r = await fetch(`${API}/assets/${id}`);
    if (!r) throw new Error('Asset not found');
    return r.json();
}

export async function createAsset(data) {
  const r = await fetch(`${API}/assets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!r.ok) throw new Error('Create failed');
  return r.json();
}

export async function updateAsset(id, data) {
  const r = await fetch(`${API}/assets/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!r.ok) throw new Error('Update failed');
  return r.json();
}

export async function deleteAsset(id) {
  const r = await fetch(`${API}/assets/${id}`, { 
    method: 'DELETE' 
  });
  if (!r.ok) throw new Error('Delete failed');
  return r.json();
}


