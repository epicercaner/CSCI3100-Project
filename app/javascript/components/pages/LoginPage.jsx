import React, { useState } from "react";
import { loginUser } from "../../common/loginauth";
import { useNavigate } from "react-router-dom";
import { authButtonStyle, authCardStyle, authInputStyle } from "../../common/authUi";
import { validateLoginFields } from "../../common/authValidation";

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const normalizedEmail = email.trim();
    const normalizedPassword = password.trim();
    const validationError = validateLoginFields(normalizedEmail, normalizedPassword);
    if (validationError) {
      alert(validationError);
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser(normalizedEmail, normalizedPassword);
      
      if (data.message === 'logged_in') {
        alert("Login Success!");
        
        if (setUser) setUser(data.user);
        
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        
        navigate("/account"); 
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data);
      const errorMsg = error.response?.data?.error || "Invalid email or password";
      
      if (errorMsg === 'email_not_verified') {
        alert("Your email is not verified. Please check your inbox for the OTP.");
      } else {
        alert("Login Failed: " + errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  // 樣式設定 (與 RegisterPage 保持一致)
  const labelStyle = { textAlign: "left", fontSize: "0.85rem", fontWeight: "bold" };

  return (
    <div style={{ ...authCardStyle, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ color: "#702082" }}>CUHK Marketplace</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>Sign in to continue</p>
      
      <form onSubmit={handleLogin}>
        <div style={labelStyle}>CUHK Email</div>
        <input
          style={authInputStyle}
          type="email"
          placeholder="1155xxxxxx@link.cuhk.edu.hk"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div style={{ ...labelStyle, marginTop: "10px" }}>Password</div>
        <input
          style={authInputStyle}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" style={authButtonStyle} disabled={loading}>
          {loading ? "Authenticating..." : "Login"}
        </button>
      </form>

      <div style={{ marginTop: "20px", fontSize: "0.9rem" }}>
        <span>New student? </span>
        <a href="/register" style={{ color: "#e60000", textDecoration: "none", fontWeight: "bold" }}>Create an account</a>
      </div>
    </div>
  );
};

export default LoginPage;