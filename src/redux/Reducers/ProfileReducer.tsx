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
export const fetchSubscribers = createAsyncThunk(
  "subscribers/fetchSubscribers",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  }
);

export const subscribersSlice = createSlice({
  name: "subscribers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscribers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSubscribers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.status = "succeeded";
          state.users = action.payload;
        }
      )
      .addCase(fetchSubscribers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export const selectAllUsers = (state: RootState) => state.subscriber;
export const selectUsersStatus = (state: RootState) => state.subscriber;
export const selectUsersError = (state: RootState) => state.subscriber;

export default subscribersSlice.reducer;
