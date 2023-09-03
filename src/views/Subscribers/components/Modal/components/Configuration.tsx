import React, { useState } from "react";
// Mantine Components
import { Select, Divider, Button, TextInput } from "@mantine/core";

interface ConfigProps {
  imsi: string;
  onChange: (imsi: string) => void;
  msisdn: string;
  onChangeMsisdn: (msisdn: string) => void;
  subK: string;
  onChangeSubK: (subK: string) => void;
}
const SubscriberConfig: React.FC<ConfigProps> = ({
  imsi,
  onChange,
  msisdn,
  onChangeMsisdn,
  subK,
  onChangeSubK,
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
          required
          placeholder="Enter IMSI"
          classNames={{
            label: "static",
          }}
          className="mt-3"
          value={imsi}
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
                  <>
                    <TextInput
                      label="MSISDN"
                      placeholder="MSISDN"
                      classNames={{
                        label: "static",
                      }}
                      required
                      className="w-[300px]"
                      value={msisdn}
                      onChange={(event) =>
                        onChangeMsisdn(event.currentTarget.value)
                      }
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
          value={subK}
          onChange={(event) => onChangeSubK(event.currentTarget.value)}
        />
        <TextInput
          label="Authentication Management Field (AMF)"
          required
          classNames={{
            label: "static",
          }}
          className="w-[300px]"
        />
      </div>
      <div className="flex  mt-3">
        <TextInput
          label="USIM Type"
          classNames={{
            label: "static",
          }}
          required
          className="w-[300px] mr-6"
        />
        <TextInput
          label="Operator Key (OPc/OP)"
          classNames={{
            label: "static",
          }}
          required
          className="w-[500px]"
        />
      </div>
      <div className="flex mt-3">
        <TextInput
          label="UE-AMBR Downlink"
          classNames={{
            label: "static",
          }}
          placeholder="1"
          required
          className="w-[250px]"
        />
        <Select
          label="Unit"
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
          className="ml-3 w-[100px]"
          clearable
        />
        <TextInput
          label="UE-AMBR Uplink"
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
