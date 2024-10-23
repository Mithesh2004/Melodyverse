export const validateEmail = (email) => {
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return { error: true, message: "Please enter a valid email address." };
  }
  return { error: false, message: "" };
};

export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return {
      error: true,
      message: "Password must be at least 6 characters long.",
    };
  }
  return { error: false, message: "" };
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return { error: true, message: "Passwords do not match." };
  }
  return { error: false, message: "" };
};

export const validateName = (name) => {
  if (!name || name.length < 1) {
    return { error: true, message: "Name is required." };
  }
  return { error: false, message: "" };
};
