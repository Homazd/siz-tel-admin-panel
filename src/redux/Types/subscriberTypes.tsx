export const FETCH_SUBSCRIBER_BEGIN = "FETCH_SUBSCRIBER_BEGIN";
export const FETCH_SUBSCRIBER_SUCCESS = "FETCH_SUBSCRIBER_SUCCESS";
export const FETCH_SUBSCRIBER_FAILURE = "FETCH_SUBSCRIBER_FAILURE";

export interface pccRules {
  flow: [];
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
  imsi: string;
  msisdn: string[];
  imeisv: string[];

  security: {
    op: string | null;
    opc: string | null;
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
          ue: {
            addr: string;
            addr6: string;
          };
          smf: {
            addr: string;
            addr6: string;
          };
          pcc_rule?: [
            pccRules?,
            pccRules?,
            pccRules?,
            pccRules?,
            pccRules?,
            pccRules?,
            pccRules?,
            pccRules?
          ];
        }
      ];
    }
  ];
}
