export const FETCH_SUBSCRIBER_BEGIN = "FETCH_SUBSCRIBER_BEGIN";
export const FETCH_SUBSCRIBER_SUCCESS = "FETCH_SUBSCRIBER_SUCCESS";
export const FETCH_SUBSCRIBER_FAILURE = "FETCH_SUBSCRIBER_FAILURE";

export interface SliceType {
  sst: number;
  sd?: string | null;
  default_indicator: boolean;
  session: SessionType[];
}

export interface SessionType {
  name: string;
  type: number;
  qos: Qos;
  ambr: Ambr;
  pcc_rule?: pccRules;
}

interface Qos {
  index: number;
  arp: {
    priority_level: number;
    pre_emption_capability: number;
    pre_emption_vulnerability: number;
  };
}

interface Ambr {
  downlink: {
    value: number;
    unit: number;
  };
  uplink: {
    value: number;
    unit: number;
  };
}
export interface pccRules {
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
  imsi: string;
  msisdn: string[];
  imeisv: string[];
  schema_version: number;
  security: {
    op?: string | null;
    opc?: string | null;
    amf: string;
    k: string;
  };
  ambr: {
    downlink: { value: number; unit: number };
    uplink: { value: number; unit: number };
  };
  mme_host: string[];
  mme_realm: string[];
  purge_flag: boolean[];
  slice: Slice[];
  access_restriction_data: number;
  subscriber_status: number;
  network_access_mode: number;
  subscribed_rau_tau_timer: number;
  __v: number;
}
