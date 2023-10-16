// Hooks
import React, { ChangeEvent, useEffect, useState } from "react";
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
import { pccRules } from "@/redux/Types/subscriberTypes";

interface addSubscriberProps {
  onNewSub: (data: string) => void;
}
const AddSubscriber: React.FC<addSubscriberProps> = ({ onNewSub }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [hiddenSession, setHiddenSession] = useState(true);
  const [hiddenSlice, setHiddenSlice] = useState(false);
  const [imsi, setImsi] = useState("");
  const [msisdn, setMsisdn] = useState<string[]>([]);
  const [msisdn1, setMsisdn1] = useState<string>("");
  const [msisdn2, setMsisdn2] = useState<string>("");
  const [subK, setSubK] = useState("465B5CE8 B199B49F AA5F0A2E E238A6BC");
  const [opType, setOpType] = useState("OPc");
  const [opKey, setOpKey] = useState<string | null>(
    "E8ED289D EBA952E4 283B54E8 8E6183CA"
  );
  const [amf, setAmf] = useState("8000");
  const [downValue, setDownValue] = useState("1");
  const [downUnit, setDownUnit] = useState("3");
  const [upValue, setUpValue] = useState("1");
  const [upUnit, setUpUnit] = useState("3");
  // Slice States
  const [sst, setSst] = useState("1");
  const [sd, setSd] = useState("");
  // Session States
  const [type, setType] = useState("3");
  const [qci, setQci] = useState("9");
  const [arp, setArp] = useState("8");
  const [capability, setCapability] = useState("1");
  const [vulnerability, setVulnerability] = useState("1");
  const [ambrDownlink, setAmbrDownlink] = useState("1");
  const [ambrUplink, setAmbrUplink] = useState("1");
  const [ambrDownUnit, setAmbrDownUnit] = useState("3");
  const [ambrUpUnit, setAmbrUpUnit] = useState("3");
  const [ueIpv4, setUeIpv4] = useState("");
  const [ueIpv6, setUeIpv6] = useState("");
  const [smfIpv4, setSmfIpv4] = useState("");
  const [smfIpv6, setSmfIpv6] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  // PCC Rules
  const [inputs, setInputs] = useState<pccRules[]>([
    {
      qos: {
        index: 1,
        arp: {
          priority_level: 2,
          pre_emption_capability: 2,
          pre_emption_vulnerability: 2,
        },
        gbr: {
          downlink: { value: 1, unit: 2 },
          uplink: { value: 1, unit: 2 },
        },
        mbr: {
          downlink: { value: 1, unit: 2 },
          uplink: { value: 1, unit: 2 },
        },
      },
    },
  ]);

  const { data: subscriber } = useGetSubscribersQuery(imsi, {
    skip: isFetching,
  });

  const handleInputChange = (index: number, inputData: pccRules) => {
    setInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index] = inputData;
      return updatedInputs;
    });
  };

  const [addSubscriber] = useAddSubscriberMutation();

  const handleSD = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSd(e.currentTarget.value);
  };

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
    setIsFetching(true);
  }, [subscriber, isFetching, imsi]);

  const apn = localStorage.getItem("apn");
  const addingSubscriber = {
    schema_version: 1,
    imsi: imsi,
    msisdn: [],
    imeisv: [],
    mme_host: [],
    mme_realm: [],
    purge_flag: [],
    security: {
      k: subK,
      op: opType === "OP" ? opKey : null,
      opc: opType === "OPc" ? opKey : null,
      amf: amf,
    },
    ambr: {
      downlink: { value: +downValue, unit: +downUnit },
      uplink: { value: +upValue, unit: +upUnit },
    },
    slice: [
      {
        sst: +sst,
        sd: sd || undefined,
        default_indicator: true,
        session: [
          {
            name: apn ? apn : "GAS",
            type: +type,
            qos: {
              index: +qci,
              arp: {
                priority_level: +arp,
                pre_emption_capability: +capability,
                pre_emption_vulnerability: +vulnerability,
              },
            },
            ambr: {
              downlink: {
                value: +ambrDownlink,
                unit: +ambrDownUnit,
              },
              uplink: {
                value: +ambrUplink,
                unit: +ambrUpUnit,
              },
            },
            ue:
              {
                addr: ueIpv4 || undefined,
                addr6: ueIpv6 || undefined,
              } || undefined,
            smf:
              {
                addr: smfIpv4 || undefined,
                addr6: smfIpv6 || undefined,
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
  };

  const handleSubmit = async () => {
    await addSubscriber({
      schema_version: 1,
      imsi: imsi,
      msisdn: msisdn,
      imeisv: [],
      security: {
        k: subK,
        op: opType === "OP" ? opKey : null,
        opc: opType === "OPc" ? opKey : null,
        amf: amf,
      },
      ambr: {
        downlink: { value: +downValue, unit: +downUnit },
        uplink: { value: +upValue, unit: +upUnit },
      },
      mme_host: [],
      mme_realm: [],
      purge_flag: [],
      slice: [
        {
          sst: +sst,
          sd: sd || undefined,
          default_indicator: true,
          session: [
            {
              name: apn ? apn : "GAS",
              type: +type,
              qos: {
                index: +qci,
                arp: {
                  priority_level: +arp,
                  pre_emption_capability: +capability,
                  pre_emption_vulnerability: +vulnerability,
                },
              },
              ambr: {
                downlink: {
                  value: +ambrDownlink,
                  unit: +ambrDownUnit,
                },
                uplink: {
                  value: +ambrUplink,
                  unit: +ambrUpUnit,
                },
              },
              ue:
                {
                  addr: ueIpv4 || undefined,
                  addr6: ueIpv6 || undefined,
                } || undefined,
              smf:
                {
                  addr: smfIpv4 || undefined,
                  addr6: smfIpv6 || undefined,
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
    setMsisdn1("");
    setMsisdn2("");
    setMsisdn([]);
    if (onNewSub) {
      onNewSub(addingSubscriber.imsi);
    }

    close();
  };

  const handleMsisdnChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("msisdn1", event.target.value);
    // setMsisdn1(event.target.value);
    // if (msisdn.length < 3 && msisdn1 != "") {
    setMsisdn((prevState) => {
      if (msisdn.length < 3) {
        return [...prevState, event.target.value];
      } else {
        return [...prevState];
      }
    });
    console.log("msisdn is:", msisdn);
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
              imsi={imsi}
              setImsi={setImsi}
              msisdn1={msisdn1}
              setMsisdn1={setMsisdn1}
              handleMsisdnChange={handleMsisdnChange}
              msisdn2={msisdn2}
              setMsisdn2={setMsisdn2}
              subK={subK}
              setSubK={setSubK}
              opType={opType}
              setOpType={setOpType}
              opKey={opKey}
              setOpKey={setOpKey}
              amf={amf}
              setAmf={setAmf}
              downValue={downValue}
              setDownValue={setDownValue}
              downUnit={downUnit}
              setDownUnit={setDownUnit}
              upValue={upValue}
              setUpValue={setUpValue}
              upUnit={upUnit}
              setUpUnit={setUpUnit}
            />
            <>
              <Slice
                hiddenSlice={hiddenSlice}
                onClickDelete={handleOnDelete}
                onClickAdd={handleOnAdd}
                sst={sst}
                setSst={setSst}
                sd={sd}
                handleSD={handleSD}
              />

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
