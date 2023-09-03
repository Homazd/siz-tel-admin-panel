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
import SubscriberConfig from "./components/Configuration";
import Slice from "./components/Slice";
import Session from "./components/Session";
import PccRules from "./components/PccRules";

function SubscriberModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const [hiddenSession, setHiddenSession] = useState(true);
  const [hiddenSlice, setHiddenSlice] = useState(false);
  const [createSubscriber] = useAddSubscriberMutation();

  const form = useForm({
    initialValues: {
      imsi: "55",
      msisdn: "",
      subK: "",
    },
  });
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
    const { imsi, msisdn, subK } = form.values;
    console.log("data is:", imsi, msisdn, subK);
    createSubscriber({ imsi });
  };
  // const handleChange = (event: React.FormEvent) =>
  //   form.setFieldValue("imsi", event.target.value);

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
              imsi={form.values.imsi}
              onChange={(value) => form.setFieldValue("imsi", value)}
              msisdn={form.values.msisdn}
              onChangeMsisdn={(value) => form.setFieldValue("msisdn", value)}
              subK={form.values.subK}
              onChangeSubK={(value) => form.setFieldValue("subK", value)}
            />
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
