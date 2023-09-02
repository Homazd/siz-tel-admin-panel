import React, { useState } from "react";
// Components
import ReusableInput from "../../../../../components/Input";
// Mantine Components
import { Select, Divider, Button, TextInput } from "@mantine/core";

interface ConfigProps {
  value: string;
  onChange: (value: string) => void;
}
const SubscriberConfig: React.FC<ConfigProps> = ({value, onChange}) => {
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
      <div>
        <h3>Subscriber Configuration</h3>
        <Divider />
        <TextInput
          required
          placeholder="Enter IMSI"
          label="IMSI"
          value={value}
          onChange={(event) => onChange(event.currentTarget.value)}
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
                  <ReusableInput
                    label="MSISDN"
                    required
                    className="w-[300px]"
                  />
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
        <ReusableInput
          label="Subscriber Key (K)"
          required
          className="w-[400px] mr-6"
        />
        <ReusableInput
          label="Authentication Management Field (AMF)"
          required
          className="w-[300px]"
        />
      </div>
      <div className="flex  mt-3">
        <ReusableInput label="USIM Type" required className="w-[300px] mr-6" />
        <ReusableInput
          label="Operator Key (OPc/OP)"
          required
          className="w-[500px]"
        />
      </div>
      <div className="flex mt-3">
        <ReusableInput
          label="UE-AMBR Downlink"
          placeholder="1"
          required
          className="w-[250px]"
        />
        <Select
          label="Unit"
          placeholder="Gbps"
          data={[
            { value: "bps", label: "bps" },
            { value: "kbps", label: "Kbps" },
            { value: "mbps", label: "Mbps" },
            { value: "gbps", label: "Gbps" },
            { value: "tbps", label: "Tbps" },
          ]}
          className="ml-3 w-[100px]"
          clearable
        />
        <ReusableInput
          label="UE-AMBR Uplink"
          placeholder="1"
          required
          className="w-[250px] ml-2"
        />
        <Select
          label="Unit"
          placeholder="Gbps"
          data={[
            { value: "bps", label: "bps" },
            { value: "kbps", label: "Kbps" },
            { value: "mbps", label: "Mbps" },
            { value: "gbps", label: "Gbps" },
            { value: "tbps", label: "Tbps" },
          ]}
          className="ml-3 w-[100px]"
          clearable
        />
      </div>
    </>
  );
};
export default SubscriberConfig;
