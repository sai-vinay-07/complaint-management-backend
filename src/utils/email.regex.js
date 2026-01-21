const emailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;

  return emailRegex.test(email.trim().toLowerCase());
};

module.exports = { isValidEmail };
