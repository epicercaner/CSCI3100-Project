import apiClient from "./apiClient";

export async function registerUser({ name, email, password, hostel = '' }) {
  const res = await apiClient.post("/users/register", {
    user: { name, email, password, hostel },
  });
  return res.data;
}

export async function verifyToken(email, otp) {
  const res = await apiClient.post("/users/verify", {
    email: email,
    otp: otp,
  });
  return res.data;
}