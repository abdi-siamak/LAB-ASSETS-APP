import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AssetsList from './pages/AssetsList.jsx';
import NewAsset from './pages/NewAsset.jsx';
import EditAsset from './pages/EditAsset.jsx';

export default function App() {
  return (
       <BrowserRouter>
      <div style={{ maxWidth: 900, width: "100%", margin: "0 auto", padding: 16 }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h1>Lab Assets</h1>
          <nav style={{ display: "flex", gap: 40 }}>
            <Link to="/">Assets</Link>
            <Link to="/new">New</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<AssetsList />} />
          <Route path="/new" element={<NewAsset />} />
          <Route path="/edit/:id" element={<EditAsset />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}