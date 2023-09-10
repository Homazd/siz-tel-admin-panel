// Hooks
import { useEffect, useState } from "react";
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

interface ConfigType {
  imsi: string;
  msisdn: string;
  imeisv: string;
  mme_host: [string];
  mme_realm: [string];
  purge_flag: [boolean];

  security: {
    opc: string;
    amf: string;
    k: string;
  };
  ambr: {
    downlink: { value: string | null; unit: number };
    uplink: { value: string | null; unit: number };
  };
}

const ConfigInitialState: ConfigType = {
  imsi: "",
  imeisv: "",
  msisdn: "",
  security: {
    opc: "",
    amf: "",
    k: "",
  },
  ambr: {
    downlink: { value: "1", unit: 1 },
    uplink: { value: "1", unit: 1 },
  },
};

function SubscriberModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const [hiddenSession, setHiddenSession] = useState(true);
  const [hiddenSlice, setHiddenSlice] = useState(false);
  const [imsi, setImsi] = useState("");
  const [subK, setSubk] = useState("");
  // const [op, setOp] = useState('');
  const [opKey, setOpKey] = useState("");
  const [amf, setAmf] = useState("");
  const [downValue, setDownValue] = useState("1");
  const [downUnit, setDownUnit] = useState<string | null>("Gbps");
  const [upValue, setUpValue] = useState("1");
  const [upUnit, setUpUnit] = useState<string | null>("Gbps");

  const [addSubscriber, { isLoading, isError, isSuccess }] =
    useAddSubscriberMutation();

  const handleImsi = (e: any) => {
    e.preventDefault();
    setImsi(e.currentTarget.value);
  };

  const handleSubk = (e: any) => {
    e.preventDefault();
    setSubk(e.currentTarget.value);
    console.log("subK", subK);
  };
  const handleOpKey = (e: any) => {
    e.preventDefault();
    setOpKey(e.currentTarget.value);
    console.log("Op key", opKey);
  };
  const handleAmf = (e: any) => {
    e.preventDefault();
    setAmf(e.currentTarget.value);
    console.log("amf", amf);
  };

  const handleDownValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDownValue(e.currentTarget.value);
  };

  const handleUpValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUpValue(e.currentTarget.value);
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
  let downType: string;

  function assignUnitType(downUnit: string | null) {
    switch (downUnit) {
      case "bps":
        downType = "0";

        break;
      case "Kbps":
        downType = "1";
        break;
      case "Mbps":
        downType = "2";
        break;
      case "Gbps":
        downType = "3";
        break;

      default:
        break;
    }

    return downType;
  }

  const handleSubmit = () => {
    // const { imsi } = form.values;
    console.log("imsi is:", imsi);
    addSubscriber({
      imsi: imsi,
      security: {
        k: subK,
        opc: opKey,
        amf: amf,
      },
      mme_host: [],
      mme_realm: [],
      purge_flag: [],
      ambr: {
        downlink: { value: downValue, unit: downUnit },
        uplink: { value: upValue, unit: upUnit },
      },
      slice: [
        {
          sst: 1,
          sd: 1,
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
  };
  const form = useForm({
    initialValues: {
      imsi: "55",
      msisdn: "",
      subK: "",
    },
  });

  // const handleChangeForm = (event: React.FormEvent) =>
  //   form.setFieldValue("imsi", event.target.value);

  // const handleChange = (event: any) => {
  //   if (typeof event === "string") {
  //     const name = "Unit";
  //     const value = event;
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       [name]: value,
  //     }));
  //   } else {
  //     event.preventDefault();

  //     const { name, value } = event.target;
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       [name]: value,
  //     }));
  //   }
  // };
  // const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter") {
  //     console.log("form is:", formData);
  //     formData.ambr.downlink.value = selectDL;
  //     formData.ambr.uplink.value = selectUL;
  //   }
  // };
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
              // op={op}
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

              // handleForm={handleChange}
              // handleKey={handleKeyPress}
              // selectDL={selectDL}
              // selectUL={selectUL}
              // setSelectDL={setSelectDL}
              // setSelectUL={setSelectUL}
            />
            {/* <p>IMSI: {form.imsi}</p> */}
            <Slice
              hiddenSlice={hiddenSlice}
              onClickDelete={handleOnDelete}
              onClickAdd={handleOnAdd}
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
