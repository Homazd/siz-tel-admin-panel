import { createSlice } from "@reduxjs/toolkit";

export interface DataType {
  imsi: string;
  msisdn: string;
  subK: string;
  amf: string;
  usimType: string;
  opKey: string;
}
export interface FormState {
  data: DataType;
  isLoading: boolean;
  isError: boolean;
}

export const initialState: FormState = {
  data: {
    imsi: "321",
    msisdn: "",
    subK: "",
    amf: "",
    usimType: "",
    opKey: "",
  },
  isLoading: false,
  isError: false,
};

const SubscriberSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    updateField: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { updateField } = SubscriberSlice.actions;
export default SubscriberSlice.reducer;
