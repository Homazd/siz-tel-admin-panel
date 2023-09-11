import { createSlice } from "@reduxjs/toolkit";

export interface DataType {
  imsi: string;
  msisdn: string;
  imeisv: string;
  // mme_host: [string];
  // mme_realm: [string];
  // purge_flag: [boolean];
  
  security: {
    opc: string;
    amf: string;
    k: string;
  }
 ambr: {
  downlink: {value: string, unit: string}
  uplink: {value: string, unit: string}
 }
 mme_host: [];
 mme_realm: [];
 purge_flag: [];
slice:[{
  sst: string;
  sd: string;
  session: [{
    name: string;
    type: number;
    ambr: {
      downlink: {value: string, unit: string},
      uplink: {value: string, unit: string}
    },
    qos: {
index: number;
arp: {
  priority_level: number,
  pre_emption_capability: number,
  pre_emption_vulnerability: number,
}
    }
  }]
}]

//  slice: [{
//   sst: number,
//   sd: string,

//  }]
  // usimType: string;
  // ueDownlink: string;
  // ueDownUnit: string | null;
  // ueUplink: string;
  // ueUplinkUnit: string | undefined | null;

}
export interface FormState {
  data: DataType;
  isLoading: boolean;
  isError: boolean;
}

export const initialState: FormState = {
  data: {
    imsi: "",
    msisdn: "",
    imeisv: "",
    security: {
      opc: "",
      amf: "string",
      k: "string",
    },
    ambr: {
      downlink: {value: "1", unit: "3"},
      uplink: {value: "1", unit: "1"}
     }

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
