import React, { useEffect, useRef, useState } from "react";
// Mantine Components
import { Button, Divider, Select, TextInput } from "@mantine/core";
// Static data
import qciItems from "@/data/qci.json";
// Components
import FlowContent from "./Flow";
import { pccRules } from "@/redux/Types/subscriberTypes";

const apr = Array.from({ length: 15 }, (_, index) => index + 1);

interface PccProps {
  id: number;
  inputs: {
    index: string;
    priority_level: string;
    pre_emption_capability: string;
    pre_emption_vulnerability: string;
    gbrDownValue: string;
    gbrDownUnit: string;
    gbrUpValue: string;
    gbrUpUnit: string;
    mbrDownValue: string;
    mbrDownUnit: string;
    mbrUpValue: string;
    mbrUpUnit: string;
  };
  pccVisible: boolean;
  handleOnDelete: (id: number) => void;
  updatePccInput: (field: string, value: string | string[]) => void;
  handlePccRuleData: (data: pccRules) => void;
}

const PccRules: React.FC<PccProps> = ({
  inputs,
  updatePccInput,
  pccVisible,
  handleOnDelete,
  id,
  handlePccRuleData,
}) => {
  const [flowVisible, setFlowVisible] = useState(false);
  const [flowComponent, setFlowComponent] = useState([<div>Homa</div>]);

  const handleOnAddFlow = () => {
    setFlowVisible(true);
  };
  const handleOnDeleteFlow = () => {
    setFlowVisible(false);
  };
  const addComponent = () => {
    setFlowComponent([...flowComponent, <FlowContent />]);
  };
  const handleUnitChange = (field: string) => (value: string) => {
    updatePccInput(field, value);
  };

  function usePrevious(inputs : any) {
    const ref = useRef();
    useEffect(() => {
      ref.current = inputs;
    });
    return ref.current;
  }
  const prevPccData = usePrevious(inputs)

  useEffect(() => {
    console.log("inputs in pcc rule is:", inputs);
    // if (inputs !== prevPccData) {
    //   handlePccRuleData({
    //     qos: {
    //       index: +inputs.index,
    //       arp: {
    //         priority_level: +inputs.priority_level,
    //         pre_emption_capability: +inputs.pre_emption_capability,
    //         pre_emption_vulnerability: +inputs.pre_emption_vulnerability,
    //       },
    //       gbr: {
    //         downlink: {
    //           value: +inputs.gbrDownValue,
    //           unit: +inputs.gbrDownUnit,
    //         },
    //         uplink: { value: +inputs.gbrUpValue, unit: +inputs.gbrDownUnit },
    //       },
    //       mbr: {
    //         downlink: {
    //           value: +inputs.mbrDownValue,
    //           unit: +inputs.mbrDownUnit,
    //         },
    //         uplink: { value: +inputs.mbrUpValue, unit: +inputs.mbrUpUnit },
    //       },
    //     },
    //   });
    // }
  }, [inputs]);

  return (
    <div className="mt-10">
      <h3>PCC Rules</h3>
      <Divider />
      {pccVisible ? (
        <div>
          <div key={id}>
            {flowVisible ? (
              <>
                <div className="grid grid-cols-2 mt-3">
                  <div className="col-span-1">
                    <Select
                      className="w-[250px]"
                      classNames={{
                        label: "static",
                      }}
                      label="Flow Direction"
                      required
                      placeholder="Downlink"
                      data={[
                        { value: "Downlink", label: "Downlink" },
                        { value: "Uplink", label: "Uplink" },
                      ]}
                    />
                    <TextInput
                      label="Descreption"
                      required
                      classNames={{
                        label: "static",
                      }}
                      placeholder="permit out udp from any 1-65535 to 45.45.45.45"
                      className="w-[350px] mt-6"
                    />
                  </div>
                  <div className="col-span-1 mt-3">
                    <Button
                      className="bg-red-500 text-white font-bold w-10"
                      onClick={handleOnDeleteFlow}
                    >
                      ×
                    </Button>
                    <Button className="bg-red-500 text-white font-bold w-16 ml-6">
                      ×
                    </Button>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Button
                    className="bg-sky-500 text-white font-bold"
                    onClick={addComponent}
                  >
                    +
                  </Button>
                </div>
                <div className="mt-6">
                  <Select
                    label="5QI/QCI"
                    className="mt-3 w-[425px]"
                    classNames={{
                      label: "static",
                    }}
                    required
                    clearable
                    data={qciItems.map((option) => ({
                      value: option.title,
                      label: option.title,
                    }))}
                    placeholder="1"
                    value={inputs.index}
                    onChange={handleUnitChange("index")}
                  />
                  <Select
                    label="ARP Priority Level (1-15)"
                    className="mt-3 w-[425px]"
                    classNames={{
                      label: "static",
                    }}
                    required
                    clearable
                    placeholder="2"
                    data={apr.map((num) => ({
                      value: num.toString(),
                      label: num.toString(),
                    }))}
                    value={inputs.priority_level}
                    onChange={handleUnitChange("priority_level")}
                  />

                  <div className="flex">
                    <Select
                      label="Capability"
                      className="mt-3 w-[200px]"
                      classNames={{
                        label: "static",
                      }}
                      required
                      defaultValue={"Enabeled"}
                      clearable
                      data={[
                        { value: "Disabled", label: "Disabled" },
                        { value: "Enabeled", label: "Enabled" },
                      ]}
                      value={inputs.pre_emption_capability}
                      onChange={handleUnitChange("pre_emption_capability")}
                    />
                    <Select
                      label="Vulnerability"
                      className="mt-3 w-[200px] ml-6"
                      classNames={{
                        label: "static",
                      }}
                      required
                      defaultValue={"Enabeled"}
                      clearable
                      data={[
                        { value: "Disabled", label: "Disabled" },
                        { value: "Enabeled", label: "Enabled" },
                      ]}
                      value={inputs.pre_emption_vulnerability}
                      onChange={handleUnitChange("pre_emption_vulnerability")}
                    />
                  </div>

                  <div className="flex mt-6">
                    <TextInput
                      label="MBR Downlink"
                      classNames={{
                        label: "static",
                      }}
                      className="w-[250px]"
                    />
                    <Select
                      label="unit"
                      className="ml-6 w-[150px]"
                      clearable
                      placeholder="Gbps"
                      classNames={{
                        label: "static",
                      }}
                      data={[
                        { value: "bps", label: "bps" },
                        { value: "kbps", label: "Kbps" },
                        { value: "mbps", label: "Mbps" },
                        { value: "gbps", label: "Gbps" },
                        { value: "tbps", label: "Tbps" },
                      ]}
                      value={inputs.mbrDownUnit}
                      onChange={handleUnitChange("mbrDownUnit")}
                    />
                  </div>
                  <div className="flex mt-6">
                    <TextInput
                      label="MBR UpLink"
                      classNames={{
                        label: "static",
                      }}
                      className="w-[250px]"
                    />
                    <Select
                      label="unit"
                      className="ml-6 w-[150px]"
                      classNames={{
                        label: "static",
                      }}
                      clearable
                      placeholder="Gbps"
                      data={[
                        { value: "bps", label: "bps" },
                        { value: "kbps", label: "Kbps" },
                        { value: "mbps", label: "Mbps" },
                        { value: "gbps", label: "Gbps" },
                        { value: "tbps", label: "Tbps" },
                      ]}
                      value={inputs.mbrUpUnit}
                      onChange={handleUnitChange("mbrUpUnit")}
                    />
                  </div>
                  <div className="flex mt-6">
                    <TextInput
                      label="GBR Downlink"
                      classNames={{
                        label: "static",
                      }}
                      className="w-[250px]"
                    />
                    <Select
                      label="unit"
                      className="ml-6 w-[150px]"
                      classNames={{
                        label: "static",
                      }}
                      clearable
                      placeholder="Gbps"
                      data={[
                        { value: "bps", label: "bps" },
                        { value: "kbps", label: "Kbps" },
                        { value: "mbps", label: "Mbps" },
                        { value: "gbps", label: "Gbps" },
                        { value: "tbps", label: "Tbps" },
                      ]}
                      value={inputs.gbrDownUnit}
                      onChange={handleUnitChange("gbrDownUnit")}
                    />
                  </div>
                  <div className="flex mt-6">
                    <TextInput
                      label="GBR UpLink"
                      classNames={{
                        label: "static",
                      }}
                      className="w-[250px]"
                    />
                    <Select
                      label="unit"
                      className="ml-6 w-[150px]"
                      classNames={{
                        label: "static",
                      }}
                      clearable
                      placeholder="Gbps"
                      data={[
                        { value: "bps", label: "bps" },
                        { value: "kbps", label: "Kbps" },
                        { value: "mbps", label: "Mbps" },
                        { value: "gbps", label: "Gbps" },
                        { value: "tbps", label: "Tbps" },
                      ]}
                      value={inputs.gbrUpUnit}
                      onChange={handleUnitChange("gbrUpUnit")}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <div className="flex justify-center mt-6">
                  <Button
                    className="bg-sky-500 w-14 mr-4 text-white font-bold"
                    onClick={handleOnAddFlow}
                  >
                    +
                  </Button>
                  <Button
                    className="w-14 bg-red-500 text-white font-bold"
                    onClick={() => handleOnDelete(id)}
                  >
                    ×
                  </Button>
                </div>
                <div className="mt-6">
                  <Select
                    label="5QI/QCI"
                    classNames={{
                      label: "static",
                    }}
                    className="w-[425px]"
                    required
                    clearable
                    data={qciItems.map((option) => ({
                      value: option.title,
                      label: option.title,
                    }))}
                    placeholder="1"
                    value={inputs.index}
                    onChange={handleUnitChange("index")}
                  />
                  <Select
                    label="ARP Priority Level (1-15)"
                    className="mt-3 w-[425px]"
                    classNames={{
                      label: "static",
                    }}
                    required
                    clearable
                    placeholder="2"
                    data={apr.map((num) => ({
                      value: num.toString(),
                      label: num.toString(),
                    }))}
                    value={inputs.priority_level}
                    onChange={handleUnitChange("priority_level")}
                  />

                  <div className="flex">
                    <Select
                      label="Capability"
                      classNames={{
                        label: "static",
                      }}
                      className="mt-3 w-[200px]"
                      required
                      clearable
                      data={[
                        { value: "1", label: "Disabled" },
                        { value: "2", label: "Enabled" },
                      ]}
                    />
                    <Select
                      label="Vulnerability"
                      className="mt-3 w-[200px] ml-6"
                      required
                      classNames={{
                        label: "static",
                      }}
                      clearable
                      data={[
                        { value: "Disabled", label: "Disabled" },
                        { value: "Enabeled", label: "Enabled" },
                      ]}
                    />
                  </div>

                  <div className="flex mt-6">
                    <TextInput
                      label="MBR Downlink"
                      classNames={{
                        label: "static",
                      }}
                      className="w-[250px]"
                    />
                    <Select
                      label="unit"
                      classNames={{
                        label: "static",
                      }}
                      className="ml-6 w-[150px]"
                      clearable
                      placeholder="Gbps"
                      data={[
                        { value: "bps", label: "bps" },
                        { value: "kbps", label: "Kbps" },
                        { value: "mbps", label: "Mbps" },
                        { value: "gbps", label: "Gbps" },
                        { value: "tbps", label: "Tbps" },
                      ]}
                    />
                  </div>
                  <div className="flex mt-6">
                    <TextInput
                      label="MBR Uplink"
                      classNames={{
                        label: "static",
                      }}
                      className="w-[250px]"
                    />
                    <Select
                      label="unit"
                      classNames={{
                        label: "static",
                      }}
                      className="ml-6 w-[150px]"
                      clearable
                      placeholder="Gbps"
                      data={[
                        { value: "bps", label: "bps" },
                        { value: "kbps", label: "Kbps" },
                        { value: "mbps", label: "Mbps" },
                        { value: "gbps", label: "Gbps" },
                        { value: "tbps", label: "Tbps" },
                      ]}
                    />
                  </div>
                  <div className="flex mt-6">
                    <TextInput
                      label="GBR Downlink"
                      classNames={{
                        label: "static",
                      }}
                      className="w-[250px]"
                    />
                    <Select
                      label="unit"
                      className="ml-6 w-[150px]"
                      classNames={{
                        label: "static",
                      }}
                      clearable
                      placeholder="Gbps"
                      data={[
                        { value: "bps", label: "bps" },
                        { value: "kbps", label: "Kbps" },
                        { value: "mbps", label: "Mbps" },
                        { value: "gbps", label: "Gbps" },
                        { value: "tbps", label: "Tbps" },
                      ]}
                    />
                  </div>
                  <div className="flex mt-6">
                    <TextInput
                      label="GBR Uplink"
                      classNames={{
                        label: "static",
                      }}
                      className="w-[250px]"
                    />
                    <Select
                      label="unit"
                      classNames={{
                        label: "static",
                      }}
                      className="ml-6 w-[150px]"
                      clearable
                      placeholder="Gbps"
                      data={[
                        { value: "bps", label: "bps" },
                        { value: "kbps", label: "Kbps" },
                        { value: "mbps", label: "Mbps" },
                        { value: "gbps", label: "Gbps" },
                        { value: "tbps", label: "Tbps" },
                      ]}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PccRules;
