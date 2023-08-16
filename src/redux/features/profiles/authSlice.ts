import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  profile?: IProfile | null;
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
    logout: () => initialState,
    profileInfo: (state, action: PayloadAction) => {
      state.profile = action.payload.profile;
    },
  },
});

export const { login, logout, profileInfo } = authSlice.actions;
export default authSlice.reducer;

export interface IProfile {
  username: string;
  password: string;
}
