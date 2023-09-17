// Hooks
import React, { useEffect, useState } from "react";
// Mantine Components
import { Button, Divider, Select, TextInput } from "@mantine/core";
// Types
import { DataType } from "@/redux/Types/subscriberTypes";

interface InputChildProps {
  searchedSubscriber: DataType;
  // imsi: string;
  // handleImsi: (data: React.ChangeEvent<HTMLInputElement>) => void;
  opKey: string;
  setOpKey: (data: string) => void;
  msisdn: string;
  setMsisdn: (data: string) => void;
  amf: string;
  setAmf: (data: string) => void;
  opType: string;
  setOpType: (data: string) => void;
  // handleMsisdn: (data: React.ChangeEvent<HTMLInputElement>) => void;
  // imeisv: [string];
  subK: string;
  setSubK: (data: string) => void;
  // handleSubK: (data: React.ChangeEvent<HTMLInputElement>) => void;
  // handleOpType: (data: string) => void;
  // handleOpKey: (data: React.ChangeEvent<HTMLInputElement>) => void;
  // handleAmf: (data: React.ChangeEvent<HTMLInputElement>) => void;
  downValue: string;
  setDownValue: (data: string) => void;
  upValue: string;
  setUpValue: (data: string) => void;
  downUnit: string;
  setDownUnit: (data: string) => void;
  upUnit: string;
  setUpUnit: (data: string) => void;
  // handleDownValue: (data: React.ChangeEvent<HTMLInputElement>) => void;
  // handleUpValue: (data: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditConfig: React.FC<InputChildProps> = ({
  searchedSubscriber,
  msisdn,
  setMsisdn,
  subK,
  amf,
  setAmf,
  opType,
  setOpType,
  downUnit,
  setDownUnit,
  downValue,
  setDownValue,
  opKey,
  setOpKey,
  setSubK,
  upUnit,
  setUpUnit,
  upValue,
  setUpValue,
  // handleImsi,
  // handleSubK,
  // handleOpKey,
  // handleAmf,
  // handleDownUnit,
  // handleDownValue,
  // handleUpUnit,
  // handleUpValue,
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
  useEffect(() => {
    console.log("opType:", opType);
  }, [opType]);

  return (
    <>
      <div className="relative">
        <h3>Subscriber Configuration</h3>
        <Divider />
        <TextInput
          label="IMSI"
          name="imsi"
          disabled
          classNames={{
            label: "static",
          }}
          className="mt-3"
          value={searchedSubscriber.imsi}
          pattern="^\\d+$"
          // onChange={handleImsi}
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
                      value={searchedSubscriber.msisdn[0]}
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
          name="subK"
          classNames={{
            label: "static",
          }}
          // onKeyDown={handleKey}
          className="w-[400px] mr-6"
          required
          pattern="^[0-9a-fA-F\\s]+$"
          value={subK}
          onChange={(e) => setSubK(e.target.value)}
        />
        <TextInput
          label="Authentication Management Field (AMF)"
          name="amf"
          pattern="^[0-9a-fA-F\\s]+$"
          classNames={{
            label: "static",
          }}
          className="w-[300px]"
          value={amf}
          onChange={(e) => setAmf(e.target.value)}
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
            { value: "OPc", label: "OPc" },
            { value: "OP", label: "OP" },
          ]}
          defaultValue={"Gbps"}
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
          value={downValue}
          onChange={(e) => setDownValue(e.target.value)}
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
          onChange={setDownUnit}
          // onKeyDown={handleKey}
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
          className="w-[250px] ml-2"
          // onKeyDown={handleKey}
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
export default EditConfig;
