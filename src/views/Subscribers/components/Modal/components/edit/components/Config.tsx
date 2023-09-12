import React, { useState } from "react";
// Mantine Components
import { DataType } from "@/redux/features/subscribers/subscriberSlice";
import { Button, Divider, Select, TextInput } from "@mantine/core";

interface InputChildProps {
  Subscriber: DataType;
  imsi: string;
  handleImsi: (data: React.ChangeEvent<HTMLInputElement>) => void;
  usimType: string;
  handleUsimType: (data: string) => void;
  msisdn: string;
  handleMsisdn: (data: React.ChangeEvent<HTMLInputElement>) => void;
  // imeisv: [string];
  subK: string;
  handleSubK: (data: React.ChangeEvent<HTMLInputElement>) => void;
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
  handleDownUnit: (data: string) => void;
  handleUpUnit: (data: string) => void;
}

const EditConfig: React.FC<InputChildProps> = ({
  Subscriber,
  imsi,
  msisdn,
  handleMsisdn,
  subK,
  amf,
  downUnit,
  downValue,
  opKey,
  upUnit,
  upValue,
  usimType,
  handleUsimType,
  handleImsi,
  handleSubK,
  handleOpKey,
  handleAmf,
  handleDownUnit,
  handleDownValue,
  handleUpUnit,
  handleUpValue,
}) => {
  const [isMSIVisible, setIsMSIVisible] = useState(true);
  const [msisdnClicked, setMsisdnClicked] = useState(false);

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
          //   placeholder={Subscriber.imsi}
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
                      value={msisdn}
                      onChange={handleMsisdn}
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
          //   placeholder={Subscriber.security.k}
          value={subK}
          onChange={handleSubK}
        />
        <TextInput
          label="Authentication Management Field (AMF)"
          name="amf"
          value={amf}
          onChange={handleAmf}
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
            { value: "OP", unit: "OP" },
            { value: "OPC", unit: "OPC" },
          ]}
          defaultValue={"Gbps"}
          className="mr-6 w-[300px]"
          value={usimType}
          onChange={handleUsimType}
        />

        <TextInput
          label="Operator Key (OPc/OP)"
          name="opKey"
          classNames={{
            label: "static",
          }}
          value={opKey}
          placeholder={Subscriber.security.opc}
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
export default EditConfig;
