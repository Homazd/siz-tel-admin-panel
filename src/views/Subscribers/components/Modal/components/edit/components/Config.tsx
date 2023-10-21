// Hooks
import React, { useEffect, useState } from "react";
// Mantine Components
import { Button, Divider, Select, TextInput } from "@mantine/core";
// Types
import { DataType } from "@/redux/Types/subscriberTypes";
import Msisdn from "../../Msisdn";

interface InputChildProps {
  searchedSubscriber: DataType;
  imsi: string;
  opKey: string | null;
  setOpKey: (data: string | null) => void;
  msisdn1: string[];
  msisdn: string[];
  msisdnArray: string[];
  setMsisdnArray: (data: string[]) => void;
  setMsisdn1: (data: string[]) => void;
  msisdn2: string[];
  setMsisdn2: (data: string[]) => void;
  amf: string;
  setAmf: (data: string) => void;
  opType: string;
  setOpType: (data: string) => void;
  subK: string;
  setSubK: (data: string) => void;
  downValue: string;
  setDownValue: (data: string) => void;
  upValue: string;
  setUpValue: (data: string) => void;
  downUnit: string;
  setDownUnit: (data: string) => void;
  upUnit: string;
  setUpUnit: (data: string) => void;
}

const EditConfig: React.FC<InputChildProps> = ({
  searchedSubscriber,
  msisdn,
  setMsisdn1,
  msisdn2,
  setMsisdn2,
  subK,
  msisdn1,
  msisdnArray,
  setMsisdnArray,
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
}) => {
  const [secondMsisdn, setSecondMsisdn] = useState(false);
  const [firstMsisdn, setFirstMsisdn] = useState(false);
  const [isMSIVisible, setIsMSIVisible] = useState(true);

  useEffect(() => {
    if (msisdn.length === 2) {
      setSecondMsisdn(true);
    }
    if (msisdn.length === 1) {
      setIsMSIVisible(false);
      setFirstMsisdn(true);
    }
  }, [msisdn]);

  const handleOnAdd = () => {
    setFirstMsisdn(true);
    setIsMSIVisible(false);
  };

  const handleOnDeleteMsisdn = () => {
    setFirstMsisdn(false);
    setIsMSIVisible(true);
    setMsisdn1([]);
    setMsisdn2([]);
    setMsisdnArray([])
  };

  const handleOnAddSecondMSisdn = () => {
    setSecondMsisdn(true);
    setFirstMsisdn(false);
    setMsisdnArray([]);
  };

  // Function to change state related to Msisdn component
  const handleChildStateChange = () => {
    setSecondMsisdn(false);
    setFirstMsisdn(true);
    setIsMSIVisible(false);
    console.log(msisdn1);
    console.log(msisdn2);
    console.log("msisdn", msisdn)
    if (msisdn1.length == 0) {
      setMsisdnArray([...msisdn2]);
    } else {
      setMsisdnArray([...msisdn1]);
    }
    console.log("msisdnArray", msisdnArray);
  };

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
        />
        {msisdn.length === 0 && (
          <>
            {secondMsisdn ? (
              <div>
                <Msisdn
                  msisdn={msisdn1}
                  setmsisdn={setMsisdn1}
                  onStateChange={handleChildStateChange}
                />
                <Msisdn
                  msisdn={msisdn2}
                  setmsisdn={setMsisdn2}
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
                      {firstMsisdn ? (
                        <>
                          <TextInput
                            label="MSISDN"
                            name="msisdn"
                            placeholder="MSISDN"
                            classNames={{
                              label: "static",
                            }}
                            className="w-[300px]"
                            value={msisdnArray[0]}
                            onChange={(e) => {
                              setMsisdnArray([e.target.value]);
                            }}
                            // error={msisdn1.length == 0 ? "is required" : null}f
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
          </>
        )}

        {msisdn.length === 2 && (
          <>
            {!secondMsisdn ? (
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
                      {firstMsisdn ? (
                        <>
                          <TextInput
                            label="MSISDN"
                            name="msisdn"
                            placeholder="MSISDN"
                            classNames={{
                              label: "static",
                            }}
                            className="w-[300px]"
                            value={msisdnArray[0]}
                            onChange={(e) => setMsisdnArray([e.target.value])}
                            error={msisdn1.length == 0 ? "is required" : null}
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
            ) : (
              <div>
                <Msisdn
                  msisdn={msisdn1}
                  setmsisdn={setMsisdn1}
                  onStateChange={handleChildStateChange}
                />
                <Msisdn
                  msisdn={msisdn2}
                  setmsisdn={setMsisdn2}
                  onStateChange={handleChildStateChange}
                />
              </div>
            )}
          </>
        )}
        {msisdn.length === 1 && (
          <div>
          {isMSIVisible && (
              <div className="grid place-content-center">
              <Button
                className="font-bold bg-sky-500 w-28 m-12"
                onClick={handleOnAdd}
              >
                +
              </Button>
              </div>
            )}
            {!isMSIVisible && (
              <>
                {!secondMsisdn ? (
                  <div className="grid grid-cols-2 gap-10 mt-6">
                    <div className="col-span-1">
                      {firstMsisdn ? (
                        <>
                          <TextInput
                            label="MSISDN"
                            name="msisdn"
                            placeholder="MSISDN"
                            classNames={{
                              label: "static",
                            }}
                            className="w-[300px]"
                            value={msisdnArray[0]}
                            onChange={(e) => setMsisdnArray([e.target.value])}
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
                ) : (
                  <div>
                    <Msisdn
                      msisdn={msisdn1}
                      setmsisdn={setMsisdn1}
                      onStateChange={handleChildStateChange}
                    />
                    <Msisdn
                      msisdn={msisdn2}
                      setmsisdn={setMsisdn2}
                      onStateChange={handleChildStateChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* {msisdn.length === 2 && (
          <div>
          <Msisdn
            msisdn={msisdn1}
            handleMsisdnChange={handleMsisdnChange}
            onStateChange={handleChildStateChange}
          />
          <Msisdn
            msisdn={msisdn2}
            handleMsisdnChange={handleMsisdnChange}
            onStateChange={handleChildStateChange}
          />
        </div>
        ) ? msisdn[0] != '' ? (
          <></>
        ) : null} */}
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
          value={subK}
          onChange={(e) => setSubK(e.target.value)}
          error={subK === "" ? "is required" : null}
        />
        <TextInput
          label="Authentication Management Field (AMF)"
          name="amf"
          classNames={{
            label: "static",
          }}
          className="w-[300px]"
          value={amf}
          onChange={(e) => setAmf(e.target.value)}
          required
          error={amf === "" ? "is required" : null}
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
          required
          defaultValue="OP"
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
          value={opKey ? opKey : ""}
          onChange={(e) => setOpKey(e.target.value)}
          className="w-[500px]"
          required
          error={opKey === "" ? "is required" : null}
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
          className="w-[250px]"
          required
          error={downValue === "" ? "is required" : null}
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
          required
          error={upValue === "" ? "is required" : null}
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
