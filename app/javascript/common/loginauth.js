import apiClient from "./apiClient";

// 登入
export async function loginUser(email, password) {
  const res = await apiClient.post("/sessions", {
    email: email,
    password: password,
  });
  return res.data;
}

// 登出
export async function logoutUser() {
  const res = await apiClient.delete("/sessions");
  return res.data;
}
