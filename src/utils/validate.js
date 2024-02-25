export const validate = (name, value, size, type) => {
  if (name === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = emailRegex.test(value);
    if (validEmail) {
      return "";
    } else {
      return "Please enter a valid email address ";
    }
  }
  if (name === "password") {
    const errorMsg =
      value.length < 5 ? "password length must be greater than 5" : "";
    return errorMsg;
  }

  if (name === "gender" || name === "hobbies" || name === "country") {
    return !value ? `please select ${name}` : "";
  }

  if (name === "address") {
    return !value ? "please enter address" : "";
  }

  if (name === "image") {
    if (!value) {
      return "please select image";
    }
    if (!type?.startsWith("image/") && !value) {
      return "please select image only";
    } else {
      if (size > 100000) {
        return "size exceeded 100000";
      } else {
        return "";
      }
    }
  }
};
