import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserState  } from '../../types/user'

const initialState: UserState = {
  user: null,
  role: null,
  token: null,
  isLoggedIn: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{user: string, token: string, role: string}>) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.isLoggedIn = false;

    },
    // refresh: (state, action: PayloadAction<Token>) => {
    //     state.token = action.payload
    // }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;