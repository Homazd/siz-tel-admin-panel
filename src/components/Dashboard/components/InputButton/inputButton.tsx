import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, Divider, ModalProps } from "@mantine/core";
import Input from "../../../Global/Input";
import { useState } from "react";

function InputButton() {
  const [opened, { open, close }] = useDisclosure(false);
  const [msisdnClicked, setMsisdnClicked] = useState(false);

  const contentStyles: Partial<ModalProps["styles"]> = {
    content: {
      minWidth: "900px",
      margin: "auto",
    },
  };
  const handleOnAdd = () => setMsisdnClicked(true);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Create Subscriber"
        styles={contentStyles}
        className="bg-gray-300 rounded-lg shadow-lg w-[800px]"
      >
        <div>
          <h3>Subscriber Configuration</h3>
          <Divider />
          <Input
            placeholder="Enter IMSI"
            label="IMSI"
            withAsterisk={true}
            errorMessage="is required"
          />
          <div className="grid">
            <Button
              className="font-bold bg-sky-500 w-28 justify-items-center"
              onClick={handleOnAdd}
            >
              +
            </Button>
          </div>
          {msisdnClicked && (
            <Input label="MSISDN" withAsterisk errorMessage="is required" />
          )}
          <Button className="font-bold">Submit</Button>
        </div>
      </Modal>

      <Group position="center">
        <Button className="bg-blue-400 rounded-full mt-7" onClick={open}>
          Add Subscriber
        </Button>
      </Group>
    </>
  );
}

export default InputButton;
