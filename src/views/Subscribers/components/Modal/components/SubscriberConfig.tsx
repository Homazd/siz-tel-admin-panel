import React, { useState } from "react";
// Mantine Components
import { Select, Divider, Button, TextInput } from "@mantine/core";
// import {
//   DataType,
//   initialState,
// } from "@/redux/features/subscribers/subscriberSlice";

interface ConfigType {
  imsi: string;
  msisdn: string;
  subK: string;
  amf: string;
  usimType: string;
  opKey: string;
  ueDownlink: string;
  ueDownUnit: string | null;
  ueUplink: string;
  ueUplinkUnit: string | undefined | null;
}

const ConfigInitialState: ConfigType = {
  imsi: "",
  msisdn: "",
  subK: "",
  amf: "",
  usimType: "",
  opKey: "",
  ueDownlink: "1",
  ueDownUnit: "Gbps",
  ueUplink: "1",
  ueUplinkUnit: "Gbps",
};
const SubscriberConfig = () => {
  const [isMSIVisible, setIsMSIVisible] = useState(true);
  const [msisdnClicked, setMsisdnClicked] = useState(false);
  const [selectDL, setSelectDL] = useState<string | null>("Gbps");
  const [selectUL, setSelectUL] = useState<string | null>("Gbps");
  const [formData, setFormData] = useState<ConfigType>(ConfigInitialState);

  const handleChange = (event: any) => {
    if (typeof event === "string") {
      const name = "Unit";
      const value = event;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else {
      event.preventDefault();

      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("form is:", formData);
      formData.ueDownUnit = selectDL;
      formData.ueUplinkUnit = selectUL;
    }
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
          value={formData.imsi || ""}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
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
                      onKeyDown={handleKeyPress}
                      classNames={{
                        label: "static",
                      }}
                      required
                      className="w-[300px]"
                      value={formData.msisdn}
                      onChange={handleChange}
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
          onKeyDown={handleKeyPress}
          className="w-[400px] mr-6"
          name="subK"
          value={formData.subK}
          onChange={handleChange}
        />
        <TextInput
          label="Authentication Management Field (AMF)"
          name="amf"
          required
          value={formData.amf}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
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
          required
          onKeyDown={handleKeyPress}
          className="w-[300px] mr-6"
          value={formData.usimType}
          onChange={handleChange}
        />
        <TextInput
          label="Operator Key (OPc/OP)"
          name="opKey"
          classNames={{
            label: "static",
          }}
          value={formData.opKey}
          required
          onChange={handleChange}
          onKeyDown={handleKeyPress}
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
          value={formData.ueDownlink}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
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
          value={selectDL}
          onChange={setSelectDL}
          onKeyDown={handleKeyPress}
        />
        <TextInput
          label="UE-AMBR Uplink"
          value={formData.ueUplink}
          onChange={handleChange}
          name="ueUplink"
          classNames={{
            label: "static",
          }}
          placeholder="1"
          required
          className="w-[250px] ml-2"
          onKeyDown={handleKeyPress}
        />
        <Select
          label="Unit"
          classNames={{
            label: "static",
          }}
          value={selectUL}
          onChange={setSelectUL}
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
