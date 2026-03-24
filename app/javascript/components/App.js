import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import AccountPage from "./pages/AccountPage";
import ProductInfoPage from "./pages/ProductInfoPage";
import SellPage from "./pages/SellPage";
import NotificationPage from "./pages/NotificationPage";
import MarketplaceFilters from "./common/MarketplaceFilters";

const MailIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ marginRight: "8px" }}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

export default function App() {
  const [isSellHovered, setIsSellHovered] = React.useState(false);
  const [isNotiHovered, setIsNotiHovered] = React.useState(false);

  return (
    <BrowserRouter>
      <div style={{ padding: "1rem", fontFamily: "system-ui, sans-serif" }}>
        <header style={{ marginBottom: "1rem" }}>
          <h1 style={{ color: "#0066cc" }}>Rails + React (Router) 🚀</h1>
          <nav style={{ display: "flex", gap: "1rem" }}>
            <Link to="/" style={{ color: "#0066cc", textDecoration: "none" }}>Home</Link>
            <Link to="/about" style={{ color: "#0066cc", textDecoration: "none" }}>About</Link>
            <Link to="/index" style={{ color: "#0066cc", textDecoration: "none" }}>Index</Link>
            <Link to="/Account" style={{ color: "#0066cc", textDecoration: "none" }}>Account</Link>
          </nav>

          <nav>
            <h2>CUHK Second-hand Marketplace</h2>
            <p>Welcome to the centralized trading platform for students.</p>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Link 
                to="/notifications" 
                onMouseEnter={() => setIsNotiHovered(true)} 
                onMouseLeave={() => setIsNotiHovered(false)}
                style={{ 
                  marginLeft: "auto", 
                  backgroundColor: isNotiHovered ? "#f0f0f0" : "#ffffff", 
                  color: "#333",
                  border: "1px solid #ddd",
                  display: "inline-flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  padding: "8px 18px",
                  borderRadius: "20px", 
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  transition: "all 0.2s ease",
                  position: "relative"
                }}
              >
                <MailIcon /> Noti
                <span style={{
                  position: "absolute",
                  top: "6px",
                  right: "12px",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#ff4d4f",
                  borderRadius: "50%",
                  border: "2px solid white"
                }}></span>
              </Link>
              <Link 
                to="/sell" 
                onMouseEnter={() => setIsSellHovered(true)} 
                onMouseLeave={() => setIsSellHovered(false)}
                style={{ 
                  backgroundColor: isSellHovered ? "#cc0000" : "#e60000", 
                  color: "white",
                  display: "inline-flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  padding: "8px 22px",
                  borderRadius: "20px", 
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  boxShadow: isSellHovered 
                    ? "0 4px 12px rgba(230, 0, 0, 0.3)" 
                    : "0 2px 6px rgba(230, 0, 0, 0.2)",
                  transition: "all 0.2s ease"
                }}
              >
                Sell
              </Link>
              <Link to="/Account" style={{ color: "#0066cc", textDecoration: "none" }}>Account</Link>
            </div>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/index" element={<IndexPage />} />
            <Route path="/Account" element={<AccountPage />} />
            <Route path="/product/:id" element={<ProductInfoPage />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/notifications" element={<NotificationPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}