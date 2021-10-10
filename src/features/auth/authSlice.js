import { createSlice } from '@reduxjs/toolkit';
import { AUTH_STATUS } from '../../constants/auth';

export const initialState = {
  user: {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  },
  status: AUTH_STATUS.UNAUTHENTICATED,
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { firstName, lastName, phone, email } = action.payload;
      state.user = {
        firstName,
        lastName,
        phone,
        email,
      };
      state.status = AUTH_STATUS.AUTHENTICATED;
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { updateUser, updateStatus } = slice.actions;

export const selectAuthStatus = (state) => state.auth.status;

export default slice.reducer;
