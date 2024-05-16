import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    updateStart: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    updateFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    userDeleteStart: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    userDeleteSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.isLoading = false;
    },
    userDeleteFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    signOutStart: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.isLoading = false;
    },
    signOutFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  userDeleteStart,
  userDeleteSuccess,
  userDeleteFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} = userSlice.actions;

export default userSlice.reducer;
