// Validators.ts

interface ValidationResult {
  isValid: boolean;
  message?: string;
}

// Email validator
export const isEmailValid = (email: string, isRequired: boolean = true): ValidationResult => {
  if (!email.trim()) {
    return isRequired ? { isValid: false, message: 'Email is required' } : { isValid: true };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email)) {
    return { isValid: true };
  } else {
    return { isValid: false, message: 'Invalid email address' };
  }
};

// Phone number validator (with optional country code)
export const isPhoneNumberValid = (phoneNumber: string, isRequired: boolean = true): ValidationResult => {
  if (!phoneNumber.trim()) {
    return isRequired ? { isValid: false, message: 'Phone number is required' } : { isValid: true };
  }
  const phoneNumberRegex = /^(\+\d{1,3})?\d{10}$/;
  if (phoneNumberRegex.test(phoneNumber)) {
    return { isValid: true };
  } else {
    return { isValid: false, message: 'Invalid phone number' };
  }
};

// Password validator (requires at least 8 characters)
export const isPasswordValid = (password: string, isRequired: boolean = true): ValidationResult => {
  if (!password.trim()) {
    return isRequired ? { isValid: false, message: 'Password is required' } : { isValid: true };
  }
  if (password.length >= 8) {
    return { isValid: true };
  } else {
    return { isValid: false, message: 'Password must be at least 8 characters' };
  }
};

// Username validator (alphanumeric characters, underscores, and dashes allowed)
export const isUsernameValid = (username: string, isRequired: boolean = true): ValidationResult => {
  if (!username.trim()) {
    return isRequired ? { isValid: false, message: 'Username is required' } : { isValid: true };
  }
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  if (usernameRegex.test(username)) {
    return { isValid: true };
  } else {
    return { isValid: false, message: 'Invalid username' };
  }
};

// Date validator (YYYY-MM-DD format)
export const isDateValid = (date: string, isRequired: boolean = true): ValidationResult => {
  if (!date.trim()) {
    return isRequired ? { isValid: false, message: 'Date is required' } : { isValid: true };
  }
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateRegex.test(date)) {
    return { isValid: true };
  } else {
    return { isValid: false, message: 'Invalid date format (YYYY-MM-DD)' };
  }
};

// Positive integer validator
export const isPositiveInteger = (value: string, isRequired: boolean = true): ValidationResult => {
  if (!value.trim()) {
    return isRequired ? { isValid: false, message: 'Value is required' } : { isValid: true };
  }
  const positiveIntegerRegex = /^\d+$/;
  if (positiveIntegerRegex.test(value)) {
    return { isValid: true };
  } else {
    return { isValid: false, message: 'Value must be a positive integer' };
  }
};  