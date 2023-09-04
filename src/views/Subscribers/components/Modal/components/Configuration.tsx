import React, { useState } from "react";
// Mantine Components
import { Select, Divider, Button, TextInput } from "@mantine/core";
import {
  FormState,
  initialState
} from "@/redux/features/subscribers/subscriberSlice";

const SubscriberConfig = () => {
  const [isMSIVisible, setIsMSIVisible] = useState(true);
  const [msisdnClicked, setMsisdnClicked] = useState(false);
  const [formData, setFormData] = useState<FormState>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
          required
          placeholder="Enter IMSI"
          classNames={{
            label: "static",
          }}
          className="mt-3"
          value={formData.data.imsi || ''}
          onChange={handleChange}
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
                      value={formData.data.msisdn}
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
          className="w-[400px] mr-6"
          value={formData.data.subK}
          onChange={handleChange}
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
          value={formData.data.usimType}
          onChange={handleChange}
        />
        <TextInput
          label="Operator Key (OPc/OP)"
          classNames={{
            label: "static",
          }}
          value={formData.data.opKey}
          required
          onChange={handleChange}
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
