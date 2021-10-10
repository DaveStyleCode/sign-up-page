import React from 'react';
import { Provider } from 'react-redux';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VALIDATION } from '../../constants/validation';

import store from '../../app/store';
import SignUpForm from '../../components/SignUpForm';

const handleSubmit = jest.fn();

function renderSignup(props) {
  const utils = render(
    <Provider store={store}>
      <SignUpForm {...props} />
    </Provider>,
  );
  const firstName = utils.getByLabelText('First Name');
  const lastName = utils.getByLabelText('Last Name');
  const phone = utils.getByLabelText('Phone *');
  const email = utils.getByLabelText('Email *');
  const password = utils.getByLabelText('Password *');
  const passwordConfirmation = utils.getByLabelText('Confirm Password *');
  const signupButton = utils.getByRole('button', { type: /submit/i });

  return {
    ...utils,
    firstName,
    lastName,
    phone,
    email,
    password,
    passwordConfirmation,
    signupButton,
  };
}

describe('Sign up page', () => {
  test('submit form successfully', async () => {
    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      passwordConfirmation,
      signupButton,
    } = renderSignup({ onSubmit: handleSubmit });

    userEvent.type(firstName, 'Dave');
    userEvent.type(lastName, 'Ward');
    userEvent.type(email, 'dave.style.code@gmail.com');
    fireEvent.change(phone, { target: { value: '8005551212' } });
    userEvent.type(password, 'iloveallbirds');
    userEvent.type(passwordConfirmation, 'iloveallbirds');
    userEvent.click(signupButton);

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          firstName: 'Dave',
          lastName: 'Ward',
          email: 'dave.style.code@gmail.com',
          phone: '(800) 555-1212',
          password: 'iloveallbirds',
          passwordConfirmation: 'iloveallbirds',
        },
        true,
      ),
    );
  });

  test('submit form without names successfully', async () => {
    const { phone, email, password, passwordConfirmation, signupButton } =
      renderSignup({ onSubmit: handleSubmit });

    userEvent.type(email, 'dave.style.code@gmail.com');
    fireEvent.change(phone, { target: { value: '8005551212' } });
    userEvent.type(password, 'iloveallbirds');
    userEvent.type(passwordConfirmation, 'iloveallbirds');
    userEvent.click(signupButton);

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          firstName: '',
          lastName: '',
          email: 'dave.style.code@gmail.com',
          phone: '(800) 555-1212',
          password: 'iloveallbirds',
          passwordConfirmation: 'iloveallbirds',
        },
        true,
      ),
    );
  });

  test('submit form without email should fail', async () => {
    const { phone, password, passwordConfirmation, signupButton } =
      renderSignup({ onSubmit: handleSubmit });

    fireEvent.change(phone, { target: { value: '8005551212' } });
    userEvent.type(password, 'iloveallbirds');
    userEvent.type(passwordConfirmation, 'iloveallbirds');
    userEvent.click(signupButton);
    expect(screen.getByText(VALIDATION.EMAIL_EMPTY)).toBeInTheDocument();
  });

  test('Submit form with empty state should fail', async () => {
    const { signupButton } = renderSignup({
      onSubmit: handleSubmit,
    });

    userEvent.click(signupButton);
    expect(screen.getByText(VALIDATION.PHONE_EMPTY)).toBeInTheDocument();
    expect(screen.getByText(VALIDATION.EMAIL_EMPTY)).toBeInTheDocument();
    expect(screen.getByText(VALIDATION.PASSWORD_EMPTY)).toBeInTheDocument();
    expect(screen.getByText(VALIDATION.CONFIRMATION_EMPTY)).toBeInTheDocument();
  });
});
