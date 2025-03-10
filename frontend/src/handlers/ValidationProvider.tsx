// ValidationContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { isEmailValid, isPhoneNumberValid, isPasswordValid, isUsernameValid, isDateValid, isPositiveInteger } from '../utils/Validators';

interface ValidationContextProps {
  formErrors: Record<string, string>;
  validateField: (fieldName: string, value: string, req: boolean) => void;
}

const ValidationContext = createContext<ValidationContextProps | undefined>(undefined);

export const useValidation = (): ValidationContextProps => {
  const context = useContext(ValidationContext);
  if (!context) {
    throw new Error('useValidation must be used within a ValidationProvider');
  }
  return context;
};

interface ValidationProviderProps {
  children: ReactNode;
}

export const ValidationProvider: React.FC<ValidationProviderProps> = ({ children }) => {
  const [formErrors, setFormErrors] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    username: '',
    date: '',
    positiveInteger: '',
  });

  const validateField = (fieldName: string, value: string, req: boolean) => {
    let validationFn;
    let validationMessage = '';

    switch (fieldName) {
      case 'email':
        validationFn = isEmailValid;
        break;
      case 'phoneNumber':
        validationFn = isPhoneNumberValid;
        break;
      case 'password':
        validationFn = isPasswordValid;
        break;
      case 'username':
        validationFn = isUsernameValid;
        break;
      case 'date':
        validationFn = isDateValid;
        break;
      case 'positiveInteger':
        validationFn = isPositiveInteger;
        break;
      default:
        break;
    }

    if (validationFn) {
      const validationResult = validationFn(value, req);
      if (!validationResult.isValid) {
        validationMessage = validationResult.message || '';
      }
    }

    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [fieldName]: validationMessage,
    }));
  };

  const contextValue: ValidationContextProps = {
    formErrors,
    validateField,
  };

  return (
    <ValidationContext.Provider value={contextValue}>
      {children}
    </ValidationContext.Provider>
  );
};
