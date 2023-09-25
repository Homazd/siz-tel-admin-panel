// Hooks
import React, { useState } from "react";
// Mantine Components
import { Button, Divider, Select, TextInput } from "@mantine/core";

interface InputChildProps {
  imsi: string;
  setImsi: (data: string) => void;
  msisdn: string[];
  setMsisdn: (data: any) => void;
  subK: string;
  setSubK: (data: string) => void;
  opType: string;
  setOpType: (data: string) => void;
  opKey: string;
  setOpKey: (data: string) => void;
  amf: string;
  setAmf: (data: string) => void;
  downValue: string;
  setDownValue: (data: string) => void;
  upValue: string;
  setUpValue: (data: string) => void;
  upUnit: string;
  setUpUnit: (data: string) => void;
  downUnit: string;
  setDownUnit: (data: string) => void;
}

const SubscriberConfig: React.FC<InputChildProps> = ({
  imsi,
  setImsi,
  msisdn,
  setMsisdn,
  subK,
  setSubK,
  opKey,
  setOpKey,
  amf,
  setAmf,
  downValue,
  setDownValue,
  opType,
  setOpType,
  downUnit,
  setDownUnit,
  upValue,
  setUpValue,
  upUnit,
  setUpUnit,
}) => {
  const [isMSIVisible, setIsMSIVisible] = useState(true);
  const [msisdnClicked, setMsisdnClicked] = useState(false);

  const formData = {
    imsi: "",
    msisdn: "",
    security: {
      opc: "",
      amf: "",
      k: "",
    },
    ambr: {
      downlink: { value: 1, unit: 1 },
      uplink: { value: 1, unit: 1 },
    },
  };

  const handleOnAdd = () => {
    setMsisdnClicked(true);
    setIsMSIVisible(false);
  };

  const handleOnMulti = () => {
    setIsMSIVisible(true);
    setMsisdnClicked(false);
  };

  return (
    <>
      <div className="relative">
        <h3>Subscriber Configuration</h3>
        <Divider />
        <TextInput
          label="IMSI"
          name="imsi"
          required
          placeholder="Enter IMSI"
          classNames={{
            label: "static",
          }}
          className="mt-3"
          value={imsi}
          onChange={(e) => setImsi(e.target.value)}
        />
        <div className="grid place-content-center">
          {isMSIVisible && (
            <Button
              className="font-bold bg-sky-500 w-28 m-12"
              onClick={handleOnAdd}
            >
              +
            </Button>
          )}
          {!isMSIVisible && (
            <div className="grid grid-cols-2 gap-10 mt-6">
              <div className="col-span-1">
                {msisdnClicked ? (
                  <>
                    <TextInput
                      label="MSISDN"
                      name="msisdn"
                      placeholder="MSISDN"
                      classNames={{
                        label: "static",
                      }}
                      className="w-[300px]"
                      value={msisdn}
                      onChange={(e) => setMsisdn(e.target.value)}
                    />
                  </>
                ) : null}
              </div>
              <div className="col-span-1">
                <Button
                  className="font-bold bg-red-500 w-28 mb-2 block"
                  onClick={handleOnMulti}
                >
                  ×
                </Button>
                <Button
                  className="font-bold bg-sky-500 w-28 justify-items-center "
                  onClick={handleOnAdd}
                >
                  +
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex mt-6">
        <TextInput
          label="Subscriber Key (K)"
          classNames={{
            label: "static",
          }}
          required
          className="w-[400px] mr-6"
          name="subK"
          value={subK}
          onChange={(e) => setSubK(e.target.value)}
        />
        <TextInput
          label="Authentication Management Field (AMF)"
          name="amf"
          value={amf}
          required
          onChange={(e) => setAmf(e.target.value)}
          classNames={{
            label: "static",
          }}
          className="w-[300px]"
        />
      </div>
      <div className="flex  mt-3">
        <Select
          label="USIM Type"
          classNames={{
            label: "static",
          }}
          placeholder="OP"
          data={[
            { value: "OP", label: "OP" },
            { value: "OPc", label: "OPc" },
          ]}
          className="mr-6 w-[300px]"
          value={opType}
          onChange={setOpType}
        />
        <TextInput
          label="Operator Key (OPc/OP)"
          name="opKey"
          classNames={{
            label: "static",
          }}
          required
          value={opKey}
          onChange={(e) => setOpKey(e.target.value)}
          className="w-[500px]"
        />
      </div>
      <div className="flex mt-3">
        <TextInput
          label="UE-AMBR Downlink"
          name="ueDownlink"
          classNames={{
            label: "static",
          }}
          placeholder="1"
          required
          value={downValue}
          onChange={(e) => setDownValue(e.target.value)}
          className="w-[250px]"
        />
        <Select
          label="Unit"
          classNames={{
            label: "static",
          }}
          placeholder="Gbps"
          data={[
            { value: "0", label: "bps" },
            { value: "1", label: "Kbps" },
            { value: "2", label: "Mbps" },
            { value: "3", label: "Gbps" },
            { value: "4", label: "Tbps" },
          ]}
          className="ml-3 w-[100px]"
          value={downUnit}
          onChange={setDownUnit}
        />
        <TextInput
          label="UE-AMBR Uplink"
          value={upValue}
          onChange={(e) => setUpValue(e.target.value)}
          name="ueUplink"
          classNames={{
            label: "static",
          }}
          placeholder="1"
          required
          className="w-[250px] ml-2"
        />
        <Select
          label="Unit"
          classNames={{
            label: "static",
          }}
          value={upUnit}
          onChange={setUpUnit}
          data={[
            { value: "0", label: "bps" },
            { value: "1", label: "Kbps" },
            { value: "2", label: "Mbps" },
            { value: "3", label: "Gbps" },
            { value: "4", label: "Tbps" },
          ]}
          defaultValue={"Gbps"}
          className="ml-3 w-[100px]"
          clearable
          placeholder="Gbps"
        />
      </div>
    </>
  );
};
export default SubscriberConfig;
