export function validateLoginFields(email, password) {
  if (!email || !password) {
    return "Email and password are required.";
  }

  return null;
}

export function validateRegisterFields({ name, email, password, confirmPassword }) {
  if (!name || !email || !password || !confirmPassword) {
    return "All fields are required.";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }

  return null;
}
