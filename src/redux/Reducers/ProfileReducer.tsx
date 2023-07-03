import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface User {
  id: number;
  name: string;
  email: string;
}
export interface UserState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  users: User[];
}
const initialState: UserState = {
  status: "idle",
  users: [],
  error: null,
};
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export const selectAllUsers = (state: RootState) => state.users;
export const selectUsersStatus = (state: RootState) => state.users;
export const selectUsersError = (state: RootState) => state.users;

export default userSlice.reducer;
