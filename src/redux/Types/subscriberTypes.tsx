export const FETCH_SUBSCRIBER_BEGIN = "FETCH_SUBSCRIBER_BEGIN";
export const FETCH_SUBSCRIBER_SUCCESS = "FETCH_SUBSCRIBER_SUCCESS";
export const FETCH_SUBSCRIBER_FAILURE = "FETCH_SUBSCRIBER_FAILURE";


export interface PccRulesType {
  flow?: [direction: number, description: string];
  qos: {
    index: number;
    arp: {
      priority_level: number;
      pre_emption_capability: number;
      pre_emption_vulnerability: number;
    };
    gbr: {
      downlink: { value: number; unit: number };
      uplink: { value: number; unit: number };
    };
    mbr: {
      downlink: { value: number; unit: number };
      uplink: { value: number; unit: number };
    };
  };
}

export interface DataType {
  schema_version: number;
  imsi: string;
  msisdn: string[];
  imeisv: string[];
  security: {
    op: string | null;
    opc: string | null;
    k: string;
    amf: string
  };
  ambr: {
    downlink: { value: number; unit: number };
    uplink: { value: number; unit: number }
  };
  mme_host: string[];
  mme_realm: string[];
  purge_flag: boolean[];
  slice: [
    {
      sst: number;
      sd: string | undefined;
      default_indicator: boolean;
      session: [
        {
          name: string;
          type: number;
          qos: {
            index: number;
            arp: {
              priority_level: number;
              pre_emption_capability: number;
              pre_emption_vulnerability: number
            }
          };
          ambr: {
            downlink: {
              value: number;
              unit: number
            };
            uplink: {
              value: number;
              unit: number
            }
          };
          ue?: {
            addr: string | undefined;
            addr6: string | undefined
          } | undefined;
          smf?: {
            addr: string | undefined;
            addr6: string | undefined
          } | undefined;
          pcc_rule: pccRules[]
        }
      ];
    }
  ];
  access_restriction_data: number;
  subscriber_status: number;
  network_access_mode: number;
  subscribed_rau_tau_timer: number;
  __v: number
}
