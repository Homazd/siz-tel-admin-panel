import { createSlice } from "@reduxjs/toolkit";
import { DataType } from "@/redux/Types/subscriberTypes";

export interface FormState {
  data: DataType;
  isLoading: boolean;
  isError: boolean;
}

export const initialState: FormState = {
  data: {
    imsi: "",
    msisdn: [],
    imeisv: [],
    security: {
      op: null,
      opc: null,
      amf: "",
      k: "",
    },
    ambr: {
      downlink: { value: 1, unit: 3 },
      uplink: { value: 1, unit: 3 },
    },
    mme_host: [],
    mme_realm: [],
    purge_flag: [],
    slice: [
      {
        sst: "1",
        sd: "",
        session: [
          {
            name: "internet",
            type: 3,
            ambr: {
              downlink: {
                value: 1,
                unit: 3,
              },
              uplink: {
                value: 1,
                unit: 3,
              },
            },
            qos: {
              index: 9,
              arp: {
                priority_level: 8,
                pre_emption_capability: 1,
                pre_emption_vulnerability: 1,
              },
            },
          },
        ],
      },
    ],
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
