// Hooks
import React, { useState } from "react";
// Mantine Components
import { Button, Divider, Select, TextInput } from "@mantine/core";
import Msisdn from "./Msisdn";

interface InputChildProps {
  subscriberData: {
    imsi: string;
    msisdnArray: string[];
    msisdn1: string[];
    msisdn2: string[];
    subK: string;
    opType: string;
    opKey: string | null;
    amf: string;
    downValue: string;
    downUnit: string;
    upValue: string;
    upUnit: string;
  };
  updateSubscriberData: (data: string, value: string | string[]) => void;
}

const SubscriberConfig: React.FC<InputChildProps> = ({
  subscriberData,
  updateSubscriberData,
}) => {
  const [isMSIVisible, setIsMSIVisible] = useState(true);
  const [msisdnClicked, setMsisdnClicked] = useState(false);
  const [secondMsisdn, setSecondMsisdn] = useState(false);
  // States related to Msisdn

  const handleOnAdd = () => {
    setMsisdnClicked(true);
    setIsMSIVisible(false);
  };

  const handleOnDeleteMsisdn = () => {
    setIsMSIVisible(true);
    setMsisdnClicked(false);
    updateSubscriberData("msisdn1", []);
  };

  const handleOnAddSecondMSisdn = () => {
    setSecondMsisdn(true);
  };
  const handleUnitChange = (field: string) => (value: string) => {
    updateSubscriberData(field, value);
  };
  // Function to change state related to Msisdn component
  const handleChildStateChange = () => {
    setSecondMsisdn(false);
    updateSubscriberData("msisdn1", []);
    updateSubscriberData("msisdn2", []);
  };
  const handleMsisdnChange = (field: string) => (value: string[]) => {
    updateSubscriberData(field, value);
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
          error={subscriberData.imsi === "" ? "This field is required" : null}
          placeholder="Enter IMSI"
          classNames={{
            label: "static",
          }}
          className="mt-3"
          value={subscriberData.imsi}
          onChange={(e) => updateSubscriberData("imsi", e.target.value)}
        />
        {secondMsisdn ? (
          <div>
            <Msisdn
              msisdn={subscriberData.msisdn1}
              setmsisdn={handleMsisdnChange("msisdn1")}
              onStateChange={handleChildStateChange}
            />
            <Msisdn
              msisdn={subscriberData.msisdn2}
              setmsisdn={handleMsisdnChange("msisdn2")}
              onStateChange={handleChildStateChange}
            />
          </div>
        ) : (
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
                        required
                        type="text"
                        value={subscriberData.msisdnArray[0]}
                        onChange={(e) => {
                          updateSubscriberData("msisdnArray", [e.target.value]);
                        }}
                      />
                    </>
                  ) : null}
                </div>
                <div className="col-span-1">
                  <Button
                    className="font-bold bg-red-500 w-28 mb-2 block"
                    onClick={handleOnDeleteMsisdn}
                  >
                    ×
                  </Button>
                  <Button
                    className="font-bold bg-sky-500 w-28 justify-items-center "
                    onClick={handleOnAddSecondMSisdn}
                  >
                    +
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
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
          value={subscriberData.subK}
          onChange={(e) => updateSubscriberData('subK',e.target.value)}
          error={subscriberData.subK === "" ? "is required" : null}
        />
        <TextInput
          label="Authentication Management Field (AMF)"
          name="amf"
          value={subscriberData.amf}
          required
          onChange={(e) => updateSubscriberData('amf',e.target.value)}
          classNames={{
            label: "static",
          }}
          className="w-[300px]"
          error={subscriberData.amf === "" ? "is required" : null}
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
          value={subscriberData.opType}
          onChange={handleUnitChange(`opType`)}
        />
        <TextInput
          label="Operator Key (OPc/OP)"
          name="opKey"
          classNames={{
            label: "static",
          }}
          required
          value={subscriberData.opKey ? subscriberData.opKey : ""}
          onChange={(e) => updateSubscriberData('opKey',e.target.value)}
          className="w-[500px]"
          error={subscriberData.opKey === "" ? "is required" : null}
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
          value={subscriberData.downValue}
          onChange={(e) => updateSubscriberData('downValue',e.target.value)}
          className="w-[250px]"
          error={subscriberData.downValue === "" ? "is required" : null}
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
          value={subscriberData.downUnit}
          onChange={handleUnitChange('downUnit')}
        />
        <TextInput
          label="UE-AMBR Uplink"
          value={subscriberData.upValue}
          onChange={(e) => updateSubscriberData('upValue',e.target.value)}
          name="ueUplink"
          classNames={{
            label: "static",
          }}
          placeholder="1"
          required
          className="w-[250px] ml-2"
          error={subscriberData.upValue === "" ? "is required" : null}
        />
        <Select
          label="Unit"
          classNames={{
            label: "static",
          }}
          value={subscriberData.upUnit}
          onChange={handleUnitChange('upUnit')}
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
