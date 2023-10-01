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
  const [msisdn, setMsisdn] = useState([]);
  const [subK, setSubK] = useState("");
  const [opType, setOpType] = useState("OP");
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

  // Validation
  const [error, setError] = useState("");

  const [addSubscriber] = useAddSubscriberMutation();



  const handleOnDelete = () => {
    setHiddenSlice(true);
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
    if (error) {
      console.log(error);
    } else {
      addSubscriber({
        schema_version: 1,
        imsi: imsi,
        msisdn: msisdn,
        imeisv: [],

        security: {
          k: subK,
          // op: usimType,
          opc: opKey,
          amf: amf,
        },
        mme_host: [],
        mme_realm: [],
        purge_flag: [],
        ambr: {
          downlink: { value: +downValue, unit: 3 },
          uplink: { value: +upValue, unit: 3 },
        },
        slice: [
          {
            sst: +sst,
            default_indicator: true,
            // sd: sd,
            session: [
              {
                name: "internet",
                type: 3,
                ambr: {
                  downlink: {
                    value: 1,
                    unit: 3,
                  },
                  uplink: {
                    value: 1,
                    unit: 3,
                  },
                },
                qos: {
                  index: 9,
                  arp: {
                    priority_level: 8,
                    pre_emption_capability: 1,
                    pre_emption_vulnerability: 1,
                  },
                },
                pcc_rule: []
              },
            ],
          },
        ],
        access_restriction_data: 32,
        subscriber_status: 0,
        network_access_mode: 0,
        subscribed_rau_tau_timer: 12,
        __v: 0
      });
    }
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
            <Slice
              hiddenSlice={hiddenSlice}
              onClickDelete={handleOnDelete}
              onClickAdd={handleOnAdd}
              sst={sst}
              setSst={setSst}
              sd={sd}
              setSd={setSd}
            />
            <Session
              hiddenSession={hiddenSession}
              onClickDeleteSession={onClickDeleteSession}
              onClickAddSession={onClickAddSession}
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
