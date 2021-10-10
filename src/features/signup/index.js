import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TailSpin from 'react-loading-icons/dist/components/tail-spin';

import { AUTH_STATUS } from '../../constants/auth';
import { updateUser, selectAuthStatus } from '../auth/authSlice';
import styles from './Signup.module.css';
import Heading from '../../components/Heading';
import Paragraph from '../../components/Paragraph';
import { signupUser } from '../../api';
import SignUpForm from '../../components/SignUpForm';

export function Signup() {
  const dispatch = useDispatch();
  const authStatus = useSelector(selectAuthStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values, isValid) => {
    setIsLoading(true);
    const response = await signupUser(values, isValid);
    if (response.status === 'success') {
      dispatch(updateUser(values));
    }
    setIsLoading(false);
    return response;
  };

  if (isLoading) {
    return (
      <div className={styles.Welcome_Container}>
        <TailSpin stroke="#000000" strokeOpacity={0.5} speed={0.75} />
      </div>
    );
  }

  return (
    <>
      {authStatus === AUTH_STATUS.UNAUTHENTICATED ? (
        <div className={styles.Signup_Container}>
          <Heading type="h1">Create an Account</Heading>

          <Paragraph>
            Registering makes checkout fast and easy and saves your order
            information in your account.
          </Paragraph>

          <Paragraph>We never save credit card information.</Paragraph>

          <SignUpForm onSubmit={handleSubmit} />
        </div>
      ) : (
        <div className={styles.Welcome_Container}>
          <div>
            <Heading type="h1">Welcome</Heading>
            <Paragraph>Thank you for registering!</Paragraph>
          </div>
        </div>
      )}
    </>
  );
}
