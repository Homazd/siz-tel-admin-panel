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

function SubscriberModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const [hiddenSession, setHiddenSession] = useState(true);
  const [hiddenSlice, setHiddenSlice] = useState(false);
  const [imsi, setImsi] = useState("");
  const [msisdn, setMsisdn] = useState("");
  const [imeisv, setImeisv] = useState("");
  const [subK, setSubk] = useState("");
  const [opType, setOpType] = useState("");
  const [opKey, setOpKey] = useState("");
  const [amf, setAmf] = useState("");
  const [downValue, setDownValue] = useState("1");
  const [downUnit, setDownUnit] = useState("3");
  const [upValue, setUpValue] = useState("1");
  const [upUnit, setUpUnit] = useState("3");

  // Slice States
  const [sst, setSst] = useState("1");
  const [sd, setSd] = useState("");
  // Session States
  const [type, setType] = useState("3");
  const [qci, setQci] = useState("");
  const [arp, setArp] = useState("");
  const [capability, setCapability] = useState("");
  const [vulnerability, setVulnerability] = useState("");
  const [ambrDownlink, setAmbrDownlink] = useState("");
  const [ambrUplink, setAmbrUplink] = useState("");
  const [ambrDownUnit, setAmbrDownUnit] = useState("");
  const [ambrUpUnit, setAmbrUpUnit] = useState("");
  

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
            />
            <PccRules />

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

export default SubscriberModal;
