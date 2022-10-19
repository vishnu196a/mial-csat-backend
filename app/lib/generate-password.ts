function generateRandomPassword() {
  const password = Math.random().toString(36).slice(-6);
  return password;
}

export { generateRandomPassword };
