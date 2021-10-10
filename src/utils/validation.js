import { VALIDATION } from '../constants/validation';

export const nameValidation = (fieldName = '', fieldValue = '') => {
  return null;
  // Could be used in the future for name validation

  // if (fieldValue.trim() === '') {
  //   return `${fieldName} is required`;
  // }
  // if (fieldValue.trim().length < 3) {
  //   return `${fieldName} needs to be at least three characters`
  // }
};

export const emailValidation = (email = '') => {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return null;
  }
  if (email.trim() === '') {
    return VALIDATION.EMAIL_EMPTY;
  }
  return VALIDATION.EMAIL_INVALID;
};

export const phoneValidation = (phone = '') => {
  if (phone.trim() === '') {
    return VALIDATION.PHONE_EMPTY;
  }
  const phoneRegex =
    /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;

  if (phoneRegex.test(phone)) {
    return null;
  }
  return VALIDATION.PHONE_INVALID;
};

export const passwordValidation = (password = '') => {
  if (password.trim() === '') {
    return VALIDATION.PASSWORD_EMPTY;
  }
  if (password.trim().length < 6) {
    return VALIDATION.PASSWORD_TOO_SHORT;
  }
  return null;
};

export const passwordConfirmationValidation = (
  password = '',
  passwordConfirmation = '',
) => {
  if (passwordConfirmation.trim() === '') {
    return VALIDATION.CONFIRMATION_EMPTY;
  }
  if (password !== passwordConfirmation) {
    return VALIDATION.CONFIRMATION_MISMATCH;
  }
  if (passwordConfirmation.trim().length < 6) {
    return VALIDATION.CONFIRMATION_TOO_SHORT;
  }
  return null;
};
