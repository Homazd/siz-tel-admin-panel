import { op_value } from "@/views/Subscribers/Types/subscriberTypes";
import { createSlice } from "@reduxjs/toolkit";

export interface DataType {
  imsi: string;
  msisdn: string;
  imeisv: string;

  security: {
    opc: string;
    op: op_value;
    amf: string;
    k: string;
  };
  ambr: {
    downlink: { value: number; unit: number };
    uplink: { value: number; unit: number };
  };
  mme_host: [];
  mme_realm: [];
  purge_flag: [];
  slice: [
    {
      sst: string;
      sd: string;
      session: [
        {
          name: string;
          type: number;
          ambr: {
            downlink: {
              value: number;
              unit: number;
            };
            uplink: {
              value: number;
              unit: number;
            };
          };
          qos: {
            index: number;
            arp: {
              priority_level: number;
              pre_emption_capability: number;
              pre_emption_vulnerability: number;
            };
          };
        }
      ];
    }
  ];
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
      op: 0 ,
      amf: "",
      k: "",
    },
    ambr: {
      downlink: { value: 1, unit: 1 },
      uplink: { value: 1, unit: 1 },
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
