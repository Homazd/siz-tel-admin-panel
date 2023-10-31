import React, { useState } from "react";
// Mantine Components
import { Button, Divider, Select, TextInput } from "@mantine/core";
// Static data
import qciItems from "@/data/qci.json";
// Components
import FlowContent from "../components/Flow";
import { inputsType } from "@/redux/Types/subscriberTypes";

const apr = Array.from({ length: 15 }, (_, index) => index + 1);

interface PccProps {
  id: number;
  handleOnDelete: (id: number) => void;
  pccState: inputsType;
  updateState: (newState: inputsType) => void;
}

const PccRules: React.FC<PccProps> = ({
  handleOnDelete,
  id,
  pccState,
  updateState,
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

  // const handleTextInputChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   updateState({
  //     ...pccState,
  //     [event.target.name]: event.target.value,
  //   });
  // };
  const handleTextInputChange = (name: string, value: string | string[]) => {
    updateState({ ...pccState, [name]: value });
  };
  const handleSelectChange = (name: string) => (value: string) => {
    updateState({
      ...pccState,
      [name]: value,
    });
  };

  return (
    <div className="mt-10">
      <h3>PCC Rules</h3>
      <Divider />
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
                  value={pccState.index}
                  onChange={handleSelectChange(`index`)}
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
                  value={pccState.priority_level}
                  onChange={handleSelectChange(`priority_level`)}
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
                      { value: "1", label: "Disabled" },
                      { value: "2", label: "Enabled" },
                    ]}
                    value={pccState.pre_emption_capability}
                    onChange={handleSelectChange(`pre_emption_capability`)}
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
                      { value: "1", label: "Disabled" },
                      { value: "2", label: "Enabled" },
                    ]}
                    value={pccState.pre_emption_vulnerability}
                    onChange={handleSelectChange(`pre_emption_vulnerability`)}
                  />
                </div>

                <div className="flex mt-6">
                  <TextInput
                    label="MBR Downlink"
                    classNames={{
                      label: "static",
                    }}
                    className="w-[250px]"
                    value={pccState.mbrDownlink}
                    onChange={(e) => handleTextInputChange(`mbrDownlink`, e.target.value)}
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
                      { value: "0", label: "bps" },
                      { value: "1", label: "Kbps" },
                      { value: "2", label: "Mbps" },
                      { value: "3", label: "Gbps" },
                      { value: "4", label: "Tbps" },
                    ]}
                    value={pccState.mbrDownUnit}
                    onChange={handleSelectChange(`mbrDownUnit`)}
                  />
                </div>
                <div className="flex mt-6">
                  <TextInput
                    label="MBR UpLink"
                    classNames={{
                      label: "static",
                    }}
                    className="w-[250px]"
                    value={pccState.mbrUplink}
                    onChange={(e) => handleTextInputChange(`mbrUplink`, e.target.value)}
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
                      { value: "1", label: "bps" },
                      { value: "2", label: "Kbps" },
                      { value: "3", label: "Mbps" },
                      { value: "4", label: "Gbps" },
                      { value: "5", label: "Tbps" },
                    ]}
                    value={pccState.mbrUpUnit}
                    onChange={handleSelectChange(`mbrUpUnit`)}
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
                      { value: "1", label: "bps" },
                      { value: "2", label: "Kbps" },
                      { value: "3", label: "Mbps" },
                      { value: "4", label: "Gbps" },
                      { value: "5", label: "Tbps" },
                    ]}
                    value={pccState.gbrDownUnit}
                    onChange={handleSelectChange(`gbrDownUnit`)}
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
                    value={pccState.gbrUpUnit}
                    onChange={handleSelectChange(`gbrUpUnit`)}
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
                  value={pccState.index}
                  onChange={handleSelectChange(`index`)}
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
                  value={pccState.priority_level}
                  onChange={handleSelectChange(`priority_level`)}
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
                    value={pccState.pre_emption_capability}
                    onChange={handleSelectChange(`pre_emption_capability`)}
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
                      { value: "1", label: "Disabled" },
                      { value: "2", label: "Enabled" },
                    ]}
                    value={pccState.pre_emption_vulnerability}
                    onChange={handleSelectChange(`pre_emption_vulnerability`)}
                  />
                </div>

                <div className="flex mt-6">
                  <TextInput
                    label="MBR Downlink"
                    classNames={{
                      label: "static",
                    }}
                    className="w-[250px]"
                    value={pccState.mbrDownlink}
                    onChange={(e) => handleTextInputChange(`mbrDownlink`, e.target.value)}
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
                      { value: "0", label: "bps" },
                      { value: "1", label: "Kbps" },
                      { value: "2", label: "Mbps" },
                      { value: "3", label: "Gbps" },
                      { value: "4", label: "Tbps" },
                    ]}
                    value={pccState.mbrDownUnit}
                    onChange={handleSelectChange(`mbrDownUnit`)}
                  />
                </div>
                <div className="flex mt-6">
                  <TextInput
                    label="MBR Uplink"
                    classNames={{
                      label: "static",
                    }}
                    className="w-[250px]"
                    value={pccState.mbrUplink}
                    onChange={(e) => handleTextInputChange(`mbrUplink`, e.target.value)}
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
                      { value: "0", label: "bps" },
                      { value: "1", label: "Kbps" },
                      { value: "2", label: "Mbps" },
                      { value: "3", label: "Gbps" },
                      { value: "4", label: "Tbps" },
                    ]}
                    value={pccState.mbrUpUnit}
                    onChange={handleSelectChange(`mbrUpUnit`)}
                  />
                </div>
                <div className="flex mt-6">
                  <TextInput
                    label="GBR Downlink"
                    classNames={{
                      label: "static",
                    }}
                    className="w-[250px]"
                    value={pccState.gbrDownlink}
                    onChange={(e) => handleTextInputChange(`gbrDownlink`, e.target.value)}
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
                      { value: "0", label: "bps" },
                      { value: "1", label: "Kbps" },
                      { value: "2", label: "Mbps" },
                      { value: "3", label: "Gbps" },
                      { value: "4", label: "Tbps" },
                    ]}
                    value={pccState.gbrDownUnit}
                    onChange={handleSelectChange(`gbrDownUnit`)}
                  />
                </div>
                <div className="flex mt-6">
                  <TextInput
                    label="GBR Uplink"
                    classNames={{
                      label: "static",
                    }}
                    className="w-[250px]"
                    value={pccState.gbrUplink}
                    onChange={(e) => handleTextInputChange(`gbrUplink`, e.target.value)}
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
                      { value: "0", label: "bps" },
                      { value: "1", label: "Kbps" },
                      { value: "2", label: "Mbps" },
                      { value: "3", label: "Gbps" },
                      { value: "4", label: "Tbps" },
                    ]}
                    value={pccState.gbrUpUnit}
                    onChange={handleSelectChange(`gbrUpUnit`)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PccRules;
