import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, Divider, ModalProps } from "@mantine/core";
import ReusableInput from "../../../../components/Input";
import { useState } from "react";
import { useGetSubscribersQuery } from "../../../../services/api";
import SubscriberConfig from "./components/Configuration";
import Slice from "./components/Slice";
import Session from "./components/Session";

function SubscriberModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const [msisdnClicked, setMsisdnClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const {
    data: Subscribers,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubscribersQuery("12345");

  const contentStyles: Partial<ModalProps["styles"]> = {
    content: {
      minWidth: "900px",
      margin: "auto",
    },
  };
  const handleOnAdd = () => {
    setMsisdnClicked(true);
    setIsVisible(false);
  };

  const handleOnMulti = () => {
    setIsVisible(true);
    setMsisdnClicked(false);
  };
  // useEffect(() => {
  //   console.log(Subscribers, isLoading, isSuccess, isError, error);
  // }, []);

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
          <ReusableInput required placeholder="Enter IMSI" label="IMSI" />
          <div className="grid place-content-center">
            {isVisible && (
              <Button
                className="font-bold bg-sky-500 w-28 m-12"
                onClick={handleOnAdd}
              >
                +
              </Button>
            )}
            {!isVisible && (
              <>
                <Button
                  className="font-bold bg-red-500 w-28 mb-2"
                  onClick={handleOnMulti}
                >
                  ×
                </Button>
                <Button
                  className="font-bold bg-sky-500 w-28 justify-items-center "
                  onClick={handleOnAdd}
                >
                  +
                </Button>
              </>
            )}
            {msisdnClicked ? (
              <ReusableInput label="MSISDN" required className="w-[300px]" />
            ) : null}
          </div>
          <SubscriberConfig />
          <Slice />
          <Session />

          <Button className="font-bold bg-blue-500 mt-3">Submit</Button>
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

export default SubscriberModal;
