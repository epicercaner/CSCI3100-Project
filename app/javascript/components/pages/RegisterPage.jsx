import React, { useState } from "react";
import { registerUser, verifyToken } from "../../common/register";

const RegisterPage = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    hostel: "",
  });
  const [status, setStatus] = useState({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const inputStyle = {
    width: "100%",
    padding: "0.9rem",
    marginBottom: "0.9rem",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "0.95rem",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.9rem",
    borderRadius: "14px",
    border: "none",
    backgroundColor: "#e60000",
    color: "#ffffff",
    fontWeight: 600,
    cursor: isSubmitting || isVerifying ? "not-allowed" : "pointer",
    fontSize: "1rem",
    transition: "transform 0.2s ease",
  };

  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

    //   Handle input changes for all form fields
    //  (...prev: is a placeholder for the previous state,
    //  [field]: event.target.value updates the specific field that changed)
  const handleChange = (field) => (event) => {
    setFormFields((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formFields.password !== formFields.confirmPassword) {
      setStatus({ message: "Passwords do not match!", type: "error" });
      return;
    }

    if (
      !formFields.email.endsWith("@link.cuhk.edu.hk") &&
      !formFields.email.endsWith("@cuhk.edu.hk")
    ) {
      setStatus({ message: "Please use a valid CUHK Email address.", type: "error" });
      return;
    }

    setIsSubmitting(true);
    setStatus({ message: "", type: "" });

    try {
      const response = await registerUser(formFields);
      setStatus({
        message: response?.email
          ? `Registered ${response.email}. Please verify with the OTP.`
          : "Registered successfully. Please verify with the OTP.",
        type: "success",
      });
      setShowOtpPopup(true);
    } catch (error) {
      console.error("Register failed", error);
      const errorText =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed. Please try again.";
      setStatus({ message: errorText, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setIsVerifying(true);
    setStatus({ message: "", type: "" });

    try {
      // The backend expects { email, otp } in a POST request
      await verifyToken({ email: formFields.email, otp });
      alert("Registration Successful! Welcome to CUHK Marketplace.");
      setShowOtpPopup(false);
      window.location.href = "/login";
    } catch (error) {
      console.error("Verification failed", error);
      const errorText =
        error?.response?.data?.message ||
        error?.message ||
        "Verification failed. Please check your OTP.";
      setStatus({ message: errorText, type: "error" });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "460px",
        margin: "40px auto",
        padding: "2rem",
        borderRadius: "20px",
        boxShadow: "0 25px 40px rgba(15, 23, 42, 0.12)",
        background: "#ffffff",
      }}
    >
      <h2 style={{ marginBottom: "0.4rem" }}>Create an Account</h2>
      <p style={{ marginTop: 0, color: "#475569", fontSize: "0.95rem" }}>
        Register with your CUHK email and we will send you an OTP to finish the verification.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          type="text"
          placeholder="Your full name"
          value={formFields.name}
          onChange={handleChange("name")}
          required
        />
        <input
          style={inputStyle}
          type="email"
          placeholder="CUHK email"
          value={formFields.email}
          onChange={handleChange("email")}
          required
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Password (min 6 characters)"
          value={formFields.password}
          onChange={handleChange("password")}
          minLength={6}
          required
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Confirm Password"
          value={formFields.confirmPassword}
          onChange={handleChange("confirmPassword")}
          minLength={6}
          required
        />
        <input
          style={inputStyle}
          type="text"
          placeholder="Hostel (optional)"
          value={formFields.hostel}
          onChange={handleChange("hostel")}
        />
        <button type="submit" style={buttonStyle} disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
      {status.message && !showOtpPopup && (
        <div
          style={{
            marginTop: "1.1rem",
            color: status.type === "error" ? "#b91c1c" : "#047857",
            fontWeight: 600,
            fontSize: "0.95rem",
          }}
        >
          {status.message}
        </div>
      )}

      {/* Verification Pop-up */}
      {showOtpPopup && (
        <div style={modalOverlayStyle}>
          <div
            style={{
              backgroundColor: "white",
              padding: "2.5rem",
              borderRadius: "15px",
              width: "360px",
              textAlign: "center",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Verify Your Email</h3>
            <p style={{ fontSize: "0.85rem", color: "#555" }}>
              We've sent a code to <strong>{formFields.email}</strong>. Please enter the OTP to finish registration.
            </p>

            <form onSubmit={handleVerifyOtp}>
              <input
                style={{
                  ...inputStyle,
                  textAlign: "center",
                  fontSize: "1.5rem",
                  letterSpacing: "4px",
                }}
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button type="submit" style={buttonStyle} disabled={isVerifying}>
                {isVerifying ? "Verifying..." : "Confirm & Finish"}
              </button>
              {status.message && status.type === "error" && (
                <div style={{ color: "#b91c1c", marginTop: "10px", fontSize: "0.85rem" }}>
                  {status.message}
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  setShowOtpPopup(false);
                  setStatus({ message: "", type: "" });
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#666",
                  marginTop: "15px",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "0.9rem",
                }}
              >
                Back to Edit
              </button>
            </form>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;