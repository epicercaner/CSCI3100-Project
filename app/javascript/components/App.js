import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import AccountPage from "./pages/AccountPage";
import ProductInfoPage from "./pages/ProductInfoPage";
import SellPage from "./pages/SellPage";
import NotificationPage from "./pages/NotificationPage";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";

const logo = "/logo.png";

const MailIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: "6px" }}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const ChatIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: "6px" }}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

export default function App() {
  const [isSellHovered, setIsSellHovered] = React.useState(false);
  const [isNotiHovered, setIsNotiHovered] = React.useState(false);
  const [isChatHovered, setIsChatHovered] = React.useState(false);
  const [isLoginHovered, setIsLoginHovered] = React.useState(false);
  const secondaryBtnStyle = (isHovered) => ({
    backgroundColor: isHovered ? "#f0f0f0" : "#ffffff",
    color: "#333",
    border: "1px solid #ddd",
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 16px",
    borderRadius: "20px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "0.9rem",
    transition: "all 0.2s ease",
  });

  return (
    <BrowserRouter>
      <div style={{ padding: "1rem", fontFamily: "system-ui, sans-serif" }}>
        <header>
          <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <div style={{ cursor: "pointer", color: "#530662", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.8rem" }}>
                <img src={logo} alt="logo" style={{ height: "3.8em", width: "auto", display: "block" }}/>
                <h2 style={{ fontWeight: "900", margin: 0, lineHeight: "1" }}>CUHK Second-hand Marketplace</h2>
              </div>
              {/* <p style={{ marginBottom: "0", fontWeight: "bold", cursor: "pointer", color: "#530662" }}>Welcome to the centralized trading platform for students.</p> */}
            </Link>

            <div
              style={{
                display: "flex",
                gap: "0.8rem",
                alignItems: "center",
              }}
            >
              <Link
                to="/notifications"
                onMouseEnter={() => setIsNotiHovered(true)}
                onMouseLeave={() => setIsNotiHovered(false)}
                style={{
                  ...secondaryBtnStyle(isNotiHovered),
                  marginLeft: "auto",
                }}
              >
                <MailIcon /> Noti
              </Link>
              <Link
                to="/chat"
                onMouseEnter={() => setIsChatHovered(true)}
                onMouseLeave={() => setIsChatHovered(false)}
                style={secondaryBtnStyle(isChatHovered)}
              >
                <ChatIcon /> Chat
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
                  transition: "all 0.2s ease",
                }}
              >
                Sell
              </Link>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Link
                  to="/login"
                  onMouseEnter={() => setIsLoginHovered(true)}
                  onMouseLeave={() => setIsLoginHovered(false)}
                  style={{
                    color: isLoginHovered ? "#004499" : "#0066cc",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    marginBottom: "4px"
                  }}
                >
                  Log in
                </Link>
                <Link
                  to="/Account"
                  style={{
                    color: "#0066cc",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                >
                  Account
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/Account" element={<AccountPage />} />
            <Route path="/product/:id" element={<ProductInfoPage />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
