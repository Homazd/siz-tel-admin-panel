import React, { useState } from "react";
// Mantine Components
import { Button, Divider, Select, TextInput } from "@mantine/core";

interface InputChildProps {
  imsi: string;
  handleImsi: (data: React.ChangeEvent<HTMLInputElement>) => void;
  subK: string;
  handleSubk: (data: React.ChangeEvent<HTMLInputElement>) => void;
  // op: string | null;
  // handleOp: (data: React.ChangeEvent<HTMLInputElement>) => void;
  opKey: string;
  handleOpKey: (data: React.ChangeEvent<HTMLInputElement>) => void;
  amf: string;
  handleAmf: (data: React.ChangeEvent<HTMLInputElement>) => void;
  downValue: string;
  upValue: string;
  downUnit: string | null;
  upUnit: string | null;
  handleDownValue: (data: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpValue: (data: React.ChangeEvent<HTMLInputElement>) => void;
  handleDownUnit: (data: any) => void;
  handleUpUnit: (data: any) => void;
}

// interface ConfigProps {

//   selectDL: string | null;
//   selectUL: string | null;
//   setSelectDL: (data: string) => void;
//   setSelectUL: (data: string) => void;
// }

const SubscriberConfig: React.FC<InputChildProps> = ({
  imsi,
  handleImsi,
  subK,
  handleSubk,
  opKey,
  handleOpKey,
  amf,
  handleAmf,
  downValue,
  handleDownValue,
  downUnit,
  handleDownUnit,
  upValue,
  handleUpValue,
  upUnit,
  handleUpUnit,
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
          placeholder="Enter IMSI"
          classNames={{
            label: "static",
          }}
          className="mt-3"
          value={imsi}
          onChange={handleImsi}
          // onKeyDown={handleKey}
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
                      // onKeyDown={handleKey}
                      classNames={{
                        label: "static",
                      }}
                      className="w-[300px]"
                      value={formData.msisdn}
                      // onChange={handleForm}
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
          // onKeyDown={handleKey}
          className="w-[400px] mr-6"
          name="subK"
          value={subK}
          onChange={handleSubk}
        />
        <TextInput
          label="Authentication Management Field (AMF)"
          name="amf"
          value={amf}
          onChange={handleAmf}
          // onKeyDown={handleKey}
          classNames={{
            label: "static",
          }}
          className="w-[300px]"
        />
      </div>
      <div className="flex  mt-3">
        <TextInput
          label="USIM Type"
          name="usimType"
          classNames={{
            label: "static",
          }}
          // onKeyDown={handleKey}
          className="w-[300px] mr-6"
          // value={formData.usimType}
          // onChange={handleForm}
        />
        <TextInput
          label="Operator Key (OPc/OP)"
          name="opKey"
          classNames={{
            label: "static",
          }}
          value={opKey}
          onChange={handleOpKey}
          // onKeyDown={handleKey}
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
          value={downValue}
          onChange={handleDownValue}
          // onKeyDown={handleKey}
          className="w-[250px]"
        />
        <Select
          label="Unit"
          name="ueDownUnit"
          classNames={{
            label: "static",
          }}
          placeholder="Gbps"
          data={[
            { value: "bps", label: "bps" },
            { value: "kbps", label: "Kbps" },
            { value: "mbps", label: "Mbps" },
            { value: "gbps", label: "Gbps" },
            { value: "tbps", label: "Tbps" },
          ]}
          defaultValue={"Gbps"}
          className="ml-3 w-[100px]"
          value={downUnit}
          onChange={handleDownUnit}
          // onKeyDown={handleKey}
        />
        <TextInput
          label="UE-AMBR Uplink"
          value={upValue}
          onChange={handleUpValue}
          name="ueUplink"
          classNames={{
            label: "static",
          }}
          placeholder="1"
          className="w-[250px] ml-2"
          // onKeyDown={handleKey}
        />
        <Select
          label="Unit"
          classNames={{
            label: "static",
          }}
          value={upUnit}
          onChange={handleUpUnit}
          data={[
            { value: "bps", label: "bps" },
            { value: "kbps", label: "Kbps" },
            { value: "mbps", label: "Mbps" },
            { value: "gbps", label: "Gbps" },
            { value: "tbps", label: "Tbps" },
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
