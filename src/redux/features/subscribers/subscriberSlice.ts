import { subscribersSlice } from "@/redux/Reducers/ProfileReducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Subscriber {
  imsi: number;
}
interface SubsriberState {
  subscribers: Subscriber[];
}
const initialState: SubsriberState = {
  subscribers: [],
};
const SubscriberSlice = createSlice({
  name: "subscriber",
  initialState,
  reducers: {
    fetchSubscriberSuccess: (state, action: PayloadAction<Subscriber[]>) => {
      state.subscribers = action.payload;
    },
    // updateProfileSuccess: (state, action: PayloadAction<Subscriber>) => {},
  },
});
export const { fetchSubscriberSuccess } = SubscriberSlice.actions;
export default subscribersSlice.reducer;