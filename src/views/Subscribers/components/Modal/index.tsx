// Hooks
import { useState } from "react";
// Mantine Hooks
import { useDisclosure } from "@mantine/hooks";
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

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Create Subscriber"
        styles={contentStyles}
        className="bg-gray-300 rounded-lg shadow-lg w-[800px]"
      >
        <SubscriberConfig />
        <Slice
          hiddenSession={hiddenSession}
          onClickDelete={handleOnDelete}
          onClickAdd={handleOnAdd}
        />
        <Session hiddenSession={hiddenSession} />
        <PccRules />

        <Button className="font-bold bg-blue-500 mt-3">Submit</Button>
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
