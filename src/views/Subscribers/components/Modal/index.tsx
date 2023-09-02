// Hooks
import { useState } from "react";
// Mantine Hooks
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useAddSubscriberMutation } from "@/services/subscribers";

// Mantine Components
import { Modal, Button, Group, ModalProps } from "@mantine/core";
// Components
import SubscriberConfig from "./components/Configuration";
import Slice from "./components/Slice";
import Session from "./components/Session";
import PccRules from "./components/PccRules";

function SubscriberModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const [hiddenSession, setHiddenSession] = useState(false);
  const [createSubscriber] = useAddSubscriberMutation();

  const form = useForm({
    initialValues: {
      imsi: "55",
    },
  });
  const handleOnDelete = () => {
    setHiddenSession(true);
  };

  const handleOnAdd = () => {
    setHiddenSession(false);
  };

  const contentStyles: Partial<ModalProps["styles"]> = {
    content: {
      minWidth: "900px",
      margin: "auto",
    },
  };
  const handleSubmit = () => {
    const { imsi } = form.values;
    console.log("imsi is:", imsi);
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
        {/* <form onSubmit={form.onSubmit(handleSubmit)} className="block"> */}
        <SubscriberConfig value={form.values.imsi} onChange={(value) => form.setFieldValue('imsi', value)} />
        {/* </form> */}
        <Slice
          hiddenSession={hiddenSession}
          onClickDelete={handleOnDelete}
          onClickAdd={handleOnAdd}
          />
        <Session hiddenSession={hiddenSession} />
        <PccRules />

        <Button className="font-bold bg-blue-500 mt-3" type="submit">
          Submit
        </Button>
        
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
