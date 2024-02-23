export const emailValidation = (email: string) => {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const passwordValidation = (password1: string, password2: string = 'none') => {
  let isValid: boolean | null = null;
  const defaultError = 'The passwords do not match. Please ensure both entered passwords are identical.';
  let error: string | null = defaultError;

  if (!password1 || !password2) {
    error = 'Both passwords must be provided.';
    isValid = false;
    return {isValid, error};
  }

  if (password1.length < 8 || password2.length < 8) {
    error = 'The password must be at least 8 characters long.';
  } else if (password1 !== password2 && password2 !== 'none') {
    error = defaultError;
    isValid = false;
  } else {
    isValid = true;
    error = null;
  }

  return {isValid, error};
}