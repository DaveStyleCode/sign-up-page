import React from 'react';
import Input from '../Input';
import Button from '../Button';
import FormLabelValidation from '../FormLabelValidation';
import styles from '../../features/signup/Signup.module.css';
import Paragraph from '../Paragraph';
import { initialState } from '../../features/auth/authSlice';

import {
  emailValidation,
  nameValidation,
  passwordValidation,
  passwordConfirmationValidation,
  phoneValidation,
} from '../../utils/validation';

import useFormValidation from '../../hooks/useFormValidation';

const validate = {
  firstName: (name) => nameValidation('First Name', name),
  lastName: (name) => nameValidation('Last Name', name),
  email: emailValidation,
  password: passwordValidation,
  passwordConfirmation: (confirmation, { password = '' }) =>
    passwordConfirmationValidation(confirmation, password),
  phone: phoneValidation,
};

const SignUpForm = (props) => {
  const { onSubmit } = props;

  const {
    handleFormStateChange,
    handleBlurOrFucusInput,
    formValues,
    errors,
    checkIsFormValid,
  } = useFormValidation(initialState.user, validate);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = checkIsFormValid();
    if (isValid && Object.keys(errors).length === 0) {
      return await onSubmit(formValues, isValid);
    }
    return isValid;
  };

  return (
    <form
      className={styles.Signup_Form}
      onSubmit={handleSubmit}
      acceptCharset="UTF-8"
      noValidate="novalidate"
    >
      <FormLabelValidation
        labelTarget="firstName"
        labelText="First Name"
        errorTarget={errors.firstName}
      />

      <Input
        name="firstName"
        inputType="text"
        value={formValues.firstName}
        ariaLabel="first name"
        isValid={!errors.firstName}
        errorText={errors.firstName}
        autoCapitalize="words"
        maxLength={64}
        onChange={handleFormStateChange}
        onBlur={handleBlurOrFucusInput}
        onFocus={handleBlurOrFucusInput}
      />

      <FormLabelValidation
        labelTarget="lastName"
        labelText="Last Name"
        errorTarget={errors.lastName}
      />

      <Input
        name="lastName"
        inputType="text"
        value={formValues.lastName}
        ariaLabel="last name"
        isValid={!errors.lastName}
        errorText={errors.lastName}
        autoCapitalize="words"
        maxLength={64}
        onChange={handleFormStateChange}
        onBlur={handleBlurOrFucusInput}
        onFocus={handleBlurOrFucusInput}
      />

      <FormLabelValidation
        labelTarget="phone"
        labelText="Phone *"
        errorTarget={errors.phone}
      />

      <Input
        name="phone"
        inputType="tel"
        value={formValues.phone}
        ariaLabel="phone number"
        errorText={errors.phone}
        isValid={!errors.phone}
        onChange={handleFormStateChange}
        onBlur={handleBlurOrFucusInput}
        onFocus={handleBlurOrFucusInput}
      />

      <FormLabelValidation
        labelTarget="email"
        labelText="Email *"
        errorTarget={errors.email}
      />

      <Input
        name="email"
        inputType="email"
        value={formValues.email}
        ariaLabel="email"
        errorText={errors.email}
        isValid={!errors.email}
        onChange={handleFormStateChange}
        onBlur={handleBlurOrFucusInput}
        onFocus={handleBlurOrFucusInput}
      />
      <FormLabelValidation
        labelTarget="password"
        infoText="At least 6 characters"
        labelText="Password *"
        errorTarget={errors.password}
      />

      <Input
        name="password"
        inputType="password"
        value={formValues.password}
        ariaLabel="password"
        errorText={errors.password}
        isValid={!errors.password}
        maxLength={64}
        onChange={handleFormStateChange}
        onBlur={handleBlurOrFucusInput}
        onFocus={handleBlurOrFucusInput}
      />
      <FormLabelValidation
        labelTarget="passwordConfirmation"
        labelText="Confirm Password *"
        errorTarget={errors.passwordConfirmation}
      />

      <Input
        name="passwordConfirmation"
        inputType="password"
        value={formValues.passwordConfirmation}
        ariaLabel="password confirmation"
        errorText={errors.passwordConfirmation}
        isValid={!errors.passwordConfirmation}
        maxLength={64}
        onChange={handleFormStateChange}
        onBlur={handleBlurOrFucusInput}
        onFocus={handleBlurOrFucusInput}
      />

      <Button
        aria-label="signup-submit-button"
        type="submit"
        role="button"
        value="Sign up"
      />

      <Paragraph className={['_Center']}>* REQUIRED FIELDS</Paragraph>
    </form>
  );
};

export default SignUpForm;
