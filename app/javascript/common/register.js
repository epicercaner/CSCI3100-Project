import axios from 'axios'

export async function registerUser({ name, email, password, hostel = '' }) {
  const res = await axios.post('/users/register', { 
    user: { name, email, password, hostel } 
  })
  return res.data
}

export async function verifyToken(email, otp) {
  const res = await axios.post('/users/verify', { 
    email: email, 
    otp: otp 
  })
  return res.data
}