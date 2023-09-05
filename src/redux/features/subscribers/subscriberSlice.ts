import { createSlice } from "@reduxjs/toolkit";

export interface DataType {
  imsi: string;
  msisdn: string;
  subK: string;
  amf: string;
  usimType: string;
  opKey: string;
  ueDownlink: string;
  ueDownUnit: string | null;
  ueUplink: string;
  ueUplinkUnit: string;

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
    ueDownlink:"1",
    ueDownUnit:"Gbps",
    ueUplink:"1",
    ueUplinkUnit:"Gbps"
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
