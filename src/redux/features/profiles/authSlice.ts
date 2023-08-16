import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  profile: IProfile | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  profile: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.profile = action.payload;
    },
    logout: (state) => {
        state.isAuthenticated = false;
        state.profile = null;
    },
    profileInfo: (state, action: PayloadAction<IProfile>) => {
      state.profile = action.payload;
    },
  },
});

export const { login, logout, profileInfo } = authSlice.actions;
export default authSlice.reducer;

export interface IProfile {
  username: string;
  password: string;
}
