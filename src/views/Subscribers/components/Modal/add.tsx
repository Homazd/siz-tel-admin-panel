// Hooks
import { useState } from "react";
// Mantine Hooks
import { useDisclosure } from "@mantine/hooks";
// Mantine Form
import { useForm } from "@mantine/form";
// Services
import { useAddSubscriberMutation } from "@/services/subscribers";
// Mantine Components
import { Modal, Button, Group, ModalProps, Box } from "@mantine/core";
// Components
import SubscriberConfig from "./components/SubscriberConfig";
import Slice from "./components/Slice";
import Session from "./components/Session";
import PccRules from "./components/PccRules";
// Types
import { pccRules } from "@/redux/Types/subscriberTypes";

function AddSubscriber() {
  const [opened, { open, close }] = useDisclosure(false);
  const [hiddenSession, setHiddenSession] = useState(true);
  const [hiddenSlice, setHiddenSlice] = useState(false);
  const [imsi, setImsi] = useState("");
  const [msisdn, setMsisdn] = useState("");
  const [imeisv, setImeisv] = useState("");
  const [subK, setSubk] = useState("465B5CE8 B199B49F AA5F0A2E E238A6BC");
  const [opType, setOpType] = useState("OPc");
  const [opKey, setOpKey] = useState("E8ED289D EBA952E4 283B54E8 8E6183CA");
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
  // PCC Rules
  const [inputs, setInputs] = useState<pccRules[]>([
    {
      flow: [],
      qos: {
        index: 1,
        arp: {
          priority_level: 0,
          pre_emption_capability: 1,
          pre_emption_vulnerability: 1,
        },
        gbr: {
          downlink: { value: 1, unit: 3 },
          uplink: { value: 1, unit: 3 },
        },
        mbr: {
          downlink: { value: 1, unit: 3 },
          uplink: { value: 1, unit: 3 },
        },
      },
    },
  ]);

  const handleInputChange = (index: number, inputData: pccRules) => {
    setInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index] = inputData;
      return updatedInputs;
    });
  };

  const handleAddInput = () => {
    setInputs((prevInputs) => [
      ...prevInputs,
      {
        flow: [],
        qos: {
          index: 1,
          arp: {
            priority_level: 0,
            pre_emption_capability: 1,
            pre_emption_vulnerability: 1,
          },
          gbr: {
            downlink: { value: 1, unit: 3 },
            uplink: { value: 1, unit: 3 },
          },
          mbr: {
            downlink: { value: 1, unit: 3 },
            uplink: { value: 1, unit: 3 },
          },
        },
      },
    ]);
  };
  const handleRemoveInput = (index: number) => {
    setInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs.splice(index, 1);
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

  const handleSubmit = () => {
    console.log("imsi is:", imsi);
    console.log("downUnit", downUnit);
    addSubscriber({
      imsi: imsi,
      msisdn: [msisdn],
      imeisv: [imeisv],
      security: {
        k: subK,
        op: opType === "OP" ? opKey : null,
        opc: opType === "OPc" ? opKey : null,
        amf: amf,
      },
      mme_host: [],
      mme_realm: [],
      purge_flag: [],
      ambr: {
        downlink: { value: Number(downValue), unit: Number(downUnit) },
        uplink: { value: Number(upValue), unit: Number(upUnit) },
      },
      slice: [
        {
          sst: sst,
          sd: sd,
          session: [
            {
              name: "internet",
              type: +type,
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
              qos: {
                index: +qci,
                arp: {
                  priority_level: +arp,
                  pre_emption_capability: +capability,
                  pre_emption_vulnerability: +vulnerability,
                },
              },
              ue: {
                addr: ueIpv4,
                addr6: ueIpv6,
              },
              smf: {
                addr: smfIpv4,
                addr6: smfIpv6,
              },
            },
          ],
        },
      ],
    });
    close();
  };
  const form = useForm({
    initialValues: {
      imsi: "55",
      msisdn: "",
      subK: "",
    },
  });

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
            onSubmit={form.onSubmit(handleSubmit)}
            className="block relative"
          >
            <SubscriberConfig
              imsi={imsi}
              setImsi={setImsi}
              msisdn={msisdn}
              setMsisdn={setMsisdn}
              subK={subK}
              setSubk={setSubk}
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

            <Slice
              hiddenSlice={hiddenSlice}
              onClickDelete={handleOnDelete}
              onClickAdd={handleOnAdd}
              sst={sst}
              handleSST={setSst}
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
            <PccRules inputs={inputs} onInputChange={handleInputChange} />

            <Button className="font-bold bg-blue-500 mt-3" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>

      <Group position="center">
        <Button className="bg-blue-400 rounded-full mt-7" onClick={open}>
          Add Subscriber
        </Button>
      </Group>
    </>
  );
}

export default AddSubscriber;
