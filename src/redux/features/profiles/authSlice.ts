import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  profile?: IProfile | null;
}

const initialState: AuthState = {
  profile: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: () => initialState,
    profileInfo: (state, action: PayloadAction) => {
      state.profile = action.payload.profile;
    },
  },
});

export const { logout, profileInfo } = authSlice.actions;
export default authSlice.reducer;

export interface IProfile {
  username: string;
  password: string;
}
