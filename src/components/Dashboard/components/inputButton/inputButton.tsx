import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, Divider, ModalProps } from "@mantine/core";

function InputButton() {
  const [opened, { open, close }] = useDisclosure(false);

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
        <div>
          <h3>Subscriber Configuration</h3>
          <Divider />
          <Button className="font-bold">Submit</Button>
        </div>
      </Modal>

      <Group position="center">
        <Button onClick={open}>Add Subscriber</Button>
      </Group>
    </>
  );
}

export default InputButton;
