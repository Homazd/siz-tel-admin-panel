// Hooks
import React, { useEffect, useState } from "react";
// Mantine Hooks
import { useDisclosure } from "@mantine/hooks";
// Services
import {
  useAddSubscriberMutation,
  useGetSubscribersQuery,
} from "@/services/subscribers";
// Mantine Components
import { Box, Button, Group, Modal, ModalProps } from "@mantine/core";
// Components
import PccRules from "./components/PccRules";
import Session from "./components/Session";
import Slice from "./components/Slice";
import SubscriberConfig from "./components/SubscriberConfig";
// Types

interface addSubscriberProps {
  onNewSub: (data: string) => void;
}
const AddSubscriber: React.FC<addSubscriberProps> = ({ onNewSub }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [hiddenSession, setHiddenSession] = useState(true);
  const [hiddenSlice, setHiddenSlice] = useState(false);
  const [pccVisible, setPccVisible] = useState(false);
  const [subscriberData, setSubscriberData] = useState({
    imsi: "",
    msisdnArray: [],
    msisdn1: [],
    msisdn2: [],
    subK: "465B5CE8 B199B49F AA5F0A2E E238A6BC",
    opType: "OPc",
    opKey: "E8ED289D EBA952E4 283B54E8 8E6183CA",
    amf: "8000",
    downValue: "1",
    downUnit: "3",
    upValue: "1",
    upUnit: "3",
    sst: "1",
    sd: "",
    type: "3",
    qci: "9",
    arp: "8",
    capability: "1",
    vulnerability: "1",
    ambrDownlink: "1",
    ambrUplink: "1",
    ambrDownUnit: "3",
    ambrUpUnit: "3",
    ueIpv4: "",
    ueIpv6: "",
    smfIpv4: "",
    smfIpv6: "",
    isFetching: false,
  });
  // PCC Rules
  const [pccRules, setPccRules] = useState([{ id: 0, inputs: {} }]);
  const [inputs, setInputs] = useState({
    index: "1",
    priority_level: "2",
    pre_emption_capability: "2",
    pre_emption_vulnerability: "2",
    gbrDownValue: "1",
    gbrDownUnit: "2",
    gbrUpValue: "1",
    gbrUpUnit: "2",
    mbrDownValue: "1",
    mbrDownUnit: "2",
    mbrUpValue: "1",
    mbrUpUnit: "2",
  });
  const { data: subscriber } = useGetSubscribersQuery(subscriberData.imsi, {
    skip: subscriberData.isFetching,
  });
  const [addSubscriber] = useAddSubscriberMutation();

  // const handleInputChange = (index: number, inputData: pccRules) => {
  //   setInputs((prevInputs) => {
  //     const updatedInputs = [...prevInputs];
  //     updatedInputs[index] = inputData;
  //     return updatedInputs;
  //   });
  // };

  const handleOnDelete = () => {
    setHiddenSlice(true);
    setHiddenSession(false);
  };

  const handleOnAdd = () => {
    setHiddenSlice(false);
  };
  const onClickDeleteSession = () => {
    setHiddenSession(false);
  };

  const onClickAddSession = () => {
    setHiddenSession(true);
  };

  const contentStyles: Partial<ModalProps["styles"]> = {
    content: {
      minWidth: "900px",
      margin: "auto",
    },
  };
  useEffect(() => {
    setSubscriberData((prevData) => ({ ...prevData, isFetching: true }));
    if (pccRules[0].inputs !== undefined) {
      console.log("pcc rule", pccRules);
    }
  }, [subscriber, subscriberData.isFetching, subscriberData.imsi, pccRules]);

  const apn = localStorage.getItem("apn");
  const handleOnAddPcc = () => {
    setPccVisible(true);
    // setInputs((preInputs) => [
    //   ...preInputs,
    //   {
    //     qos: {
    //       index: 1,
    //       arp: {
    //         priority_level: 2,
    //         pre_emption_capability: 2,
    //         pre_emption_vulnerability: 2,
    //       },
    //       gbr: {
    //         downlink: { value: 1, unit: 2 },
    //         uplink: { value: 1, unit: 2 },
    //       },
    //       mbr: {
    //         downlink: { value: 1, unit: 2 },
    //         uplink: { value: 1, unit: 2 },
    //       },
    //     },
    //   },
    // ]);
    console.log("pcc rule is", inputs);
    const id = pccRules.length + 1;
    if (id < 9) {
      setPccRules([...pccRules, { id, inputs: {} }]);
    }
  };
  const handleOnDeletePcc = (index: number) => {
    setPccVisible(false);
    setPccRules(pccRules.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    let Msisdn: string[] = [];
    Msisdn = [
      ...Msisdn,
      ...subscriberData.msisdnArray,
      ...subscriberData.msisdn1,
      ...subscriberData.msisdn2,
    ].filter((msisdn) => msisdn !== "");
    await addSubscriber({
      schema_version: 1,
      imsi: subscriberData.imsi,
      msisdn: Msisdn,
      imeisv: [],
      security: {
        k: subscriberData.subK,
        op: subscriberData.opType === "OP" ? subscriberData.opKey : null,
        opc: subscriberData.opType === "OPc" ? subscriberData.opKey : null,
        amf: subscriberData.amf,
      },
      ambr: {
        downlink: {
          value: +subscriberData.downValue,
          unit: +subscriberData.downUnit,
        },
        uplink: {
          value: +subscriberData.upValue,
          unit: +subscriberData.upUnit,
        },
      },
      mme_host: [],
      mme_realm: [],
      purge_flag: [],
      slice: [
        {
          sst: +subscriberData.sst,
          sd: subscriberData.sd || undefined,
          default_indicator: true,
          session: [
            {
              name: apn ? apn : "GAS",
              type: +subscriberData.type,
              qos: {
                index: +subscriberData.qci,
                arp: {
                  priority_level: +subscriberData.arp,
                  pre_emption_capability: +subscriberData.capability,
                  pre_emption_vulnerability: +subscriberData.vulnerability,
                },
              },
              ambr: {
                downlink: {
                  value: +subscriberData.ambrDownlink,
                  unit: +subscriberData.ambrDownUnit,
                },
                uplink: {
                  value: +subscriberData.ambrUplink,
                  unit: +subscriberData.ambrUpUnit,
                },
              },
              ue:
                {
                  addr: subscriberData.ueIpv4 || undefined,
                  addr6: subscriberData.ueIpv6 || undefined,
                } || undefined,
              smf:
                {
                  addr: subscriberData.smfIpv4 || undefined,
                  addr6: subscriberData.smfIpv6 || undefined,
                } || undefined,
              pcc_rule: [],
              //  {
              //   qos: {
              //     index: 1,
              //     arp: {
              //       priority_level: 1,
              //       pre_emption_capability: 1,
              //       pre_emption_vulnerability: 1,
              //     },
              //     gbr: {
              //       downlink: { value: 1, unit: 1 },
              //       uplink: { value: 1, unit: 1 },
              //     },
              //     mbr: {
              //       downlink: { value: 1, unit: 1 },
              //       uplink: { value: 1, unit: 1 },
              //     },
              //   },
              // },
            },
          ],
        },
      ],
      access_restriction_data: 32,
      subscriber_status: 0,
      network_access_mode: 0,
      subscribed_rau_tau_timer: 12,
      __v: 0,
    });
    setSubscriberData((prevData) => ({
      ...prevData,
      msisdn1: [],
      msisdn2: [],
    }));
    if (onNewSub) onNewSub(subscriberData.imsi);
    close();
  };

  const updateSubscriberData = (field: string, value: string | string[]) => {
    setSubscriberData((prevData) => ({ ...prevData, [field]: value }));
  };
  const updatePccInput = (field: string, value: string | string[]) => {
    setInputs((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Create Subscriber"
        styles={contentStyles}
        className="bg-gray-300 rounded-lg shadow-lg w-[800px]"
      >
        <Box maw={900} mx="auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="block relative"
          >
            <SubscriberConfig
              subscriberData={subscriberData}
              updateSubscriberData={updateSubscriberData}
            />
            <>
              <Slice
                hiddenSlice={hiddenSlice}
                onClickDelete={handleOnDelete}
                onClickAdd={handleOnAdd}
                subscriberData={subscriberData}
                updateSubscriberData={updateSubscriberData}
              />

              <Session
                hiddenSession={hiddenSession}
                onClickDeleteSession={onClickDeleteSession}
                onClickAddSession={onClickAddSession}
                subscriberData={subscriberData}
                updateSubscriberData={updateSubscriberData}
              />
              {pccRules.map((pccRule, index) => (
                <PccRules
                  inputs={inputs}
                  pccVisible={pccVisible}
                  updatePccInput={updatePccInput}
                  handleOnDelete={() => handleOnDeletePcc(index)}
                  id={pccRule.id}
                />
              ))}
              {/* {hiddenSession && (
                <PccRules
                  inputs={inputs}
                  onInputChange={handleInputChange}
                  pccVisible={pccVisible}
                  handleOnDelete={handleOnDeletePcc}
                />
              )} */}
            </>
            <p className="text-center">
              <Button
                className="bg-sky-500 text-white font-semibold w-28 mt-6"
                onClick={handleOnAddPcc}
              >
                +
              </Button>
            </p>

            <p className="text-center ml-[300px] mt-6">
              <Button className="bg-sky-500 text-white font-semibold w-28">
                +
              </Button>
            </p>
            <p className="text-center ml-[600px] mt-6">
              <Button className="bg-sky-500 text-white font-semibold w-28">
                +
              </Button>
            </p>
            {/* {addSlice && (
              <>
                <Session
                  hiddenSession={hiddenSession}
                  onClickDeleteSession={onClickDeleteSession}
                  onClickAddSession={onClickAddSession}
                  type={type}
                  setType={setType}
                  qci={qci}
                  setQci={setQci}
                  arp={arp}
                  setArp={setArp}
                  capability={capability}
                  setCapability={setCapability}
                  vulnerability={vulnerability}
                  setVulnerability={setVulnerability}
                  ambrUplink={ambrUplink}
                  setAmbrUplink={setAmbrUplink}
                  ambrDownlink={ambrDownlink}
                  setAmbrDownlink={setAmbrDownlink}
                  ambrDownUnit={ambrDownUnit}
                  setAmbrDownUnit={setAmbrDownUnit}
                  ambrUpUnit={ambrUpUnit}
                  setAmbrUpUnit={setAmbrUpUnit}
                  ueIpv4={ueIpv4}
                  setUeIpv4={setUeIpv4}
                  ueIpv6={ueIpv6}
                  setUeIpv6={setUeIpv6}
                  smfIpv4={smfIpv4}
                  setSmfIpv4={setSmfIpv4}
                  smfIpv6={smfIpv6}
                  setSmfIpv6={setSmfIpv6}
                />
                {hiddenSession && (
                  <PccRules inputs={inputs} onInputChange={handleInputChange} />
                )}
              </>
            )} */}
            {/* <p className="text-center ml-[300px] mt-6">
              <Button className="bg-sky-500 text-white font-semibold w-28">
                +
              </Button>
            </p>

            <p className="text-center ml-[600px] mt-6">
              <Button
                className="bg-sky-500 text-white font-semibold w-28"
                onClick={() => addSliceArray(addingSubscriber, newSlice)}
              >
                add slice
              </Button>
            </p> */}
            <Button className="font-bold bg-blue-500 mt-3" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>

      <Group position="center">
        <Button
          className={`${apn == "GAS" ? "bg-blue-500" : "bg-yellow-500"} ${
            apn === "GAS" ? "text-white" : "text-yellow-950"
          } rounded-full mt-7 w-40 animate__animated animate__swing"`}
          onClick={open}
        >
          Add Subscriber
        </Button>
      </Group>
    </>
  );
};

export default AddSubscriber;
