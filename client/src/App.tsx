// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import DeepResearchView from "./DeepResearchView";
import PlaceToStartView from "./PlaceToStartView";

const NavTabs: React.FC = () => {
  const location = useLocation();
  const activeTabStyle = {
    color: "white",
    backgroundColor: "#2563eb",
    padding: "8px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
  };

  const defaultTabStyle = {
    color: "#2563eb",
    padding: "8px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
    backgroundColor: "transparent",
    border: "1px solid #2563eb",
  };

  return (
    <nav style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
      <Link to="/" style={location.pathname === "/" ? activeTabStyle : defaultTabStyle}>
        Prospect Insight Sheets 🔎
      </Link>
      <Link to="/place-to-start" style={location.pathname === "/place-to-start" ? activeTabStyle : defaultTabStyle}>
        Past Win Intelligence 🏆
      </Link>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ padding: "24px", fontFamily: "Arial, sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
        <header style={{ display: "flex", alignItems: 'center', justifyContent: 'flex-end', marginBottom: "32px" }}>
          <img src="/header.svg" alt="Company Logo" style={{ height: "50px"}} />
        </header>

        <NavTabs />

        <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "24px", backgroundColor: "#ffffff" }}>
          <Routes>
            <Route path="/" element={<DeepResearchView />} />
            <Route path="/place-to-start" element={<PlaceToStartView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
