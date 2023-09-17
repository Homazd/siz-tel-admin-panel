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
import { opType } from "../../Types/subscriberTypes";

function SubscriberModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const [hiddenSession, setHiddenSession] = useState(true);
  const [hiddenSlice, setHiddenSlice] = useState(false);
  const [imsi, setImsi] = useState("");
  const [subK, setSubk] = useState("");
  const [opType, setOpType] = useState<opType | null>(0);
  const [opKey, setOpKey] = useState("");
  const [amf, setAmf] = useState("");
  const [downValue, setDownValue] = useState(1);
  const [downUnit, setDownUnit] = useState<number>(3);
  const [upValue, setUpValue] = useState(1);
  const [upUnit, setUpUnit] = useState<number>(3);
  const [usimType, setUsimType] = useState(0);

  // Slice States
  const [sst, setSst] = useState("1");
  const [sd, setSd] = useState("");
  // Session States

  // Validation
  const [error, setError] = useState("");

  const [addSubscriber] = useAddSubscriberMutation();

  const handleImsi = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImsi(e.currentTarget.value);

    if (imsi.length > 15 || !/^\d+$/.test(imsi)) {
      setError(
        "Only digits are allowed and lenght must be less than 15 numbers."
      );
      console.log(error);
      error;
    } else {
      setError("");
    }
  };

  const handleSubk = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSubk(e.currentTarget.value);
    // if (!/^\[0-9a-fA-F\\s]+$/.test(subK)) {
    //   setError("Only hexadecimal digits are allowed");
    //   console.log(error);
    //   error;
    // } else {
    //   setError("");
    // }
  };
  const handleOpType = (e: opType) => {
    console.log("opKey is:", e);

    (e: opType) => setOpType(e);
  };
  const handleOpKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setOpKey(e.currentTarget.value);
  };
  const handleAmf = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setAmf(e.currentTarget.value);
  };

  const handleDownValue = (e: any) => {
    e.preventDefault();
    console.log("DownValue", e.currentTarget.value);

    setDownValue(Number(e.currentTarget.value));
  };

  const handleUpValue = (e: any) => {
    e.preventDefault();
    setUpValue(e.currentTarget.value);
  };

  const handleSD = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSd(e.currentTarget.value);
  };

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
        imsi: imsi,
        msisdn: [""],
        imeisv: "",
        security: {
          k: subK,
          op_type: usimType,
          op_value: opKey,
          amf: amf,
        },
        mme_host: [],
        mme_realm: [],
        purge_flag: [],
        ambr: {
          downlink: { value: downValue, unit: 3 },
          uplink: { value: upValue, unit: 3 },
        },
        slice: [
          {
            sst: sst,
            sd: sd,
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
              },
            ],
          },
        ],
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
              handleImsi={handleImsi}
              subK={subK}
              handleSubk={handleSubk}
              opType={opType}
              handleOpType={handleOpType}
              opKey={opKey}
              handleOpKey={handleOpKey}
              amf={amf}
              handleAmf={handleAmf}
              downValue={downValue}
              handleDownValue={handleDownValue}
              downUnit={downUnit}
              handleDownUnit={setDownUnit}
              upValue={upValue}
              handleUpValue={handleUpValue}
              upUnit={upUnit}
              handleUpUnit={setUpUnit}
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
