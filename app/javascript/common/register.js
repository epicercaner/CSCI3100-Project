import axios from 'axios'

// Minimal helper for registering a user and verifying token
export async function registerUser({ name, email, password, hostel = '' }) {
  const res = await axios.post('/users/register', { user: { name, email, password, hostel } })
  return res.data
}

export async function verifyToken({ email, otp }) {
  const res = await axios.post('/users/verify', { email, otp })
  return res.data
}
