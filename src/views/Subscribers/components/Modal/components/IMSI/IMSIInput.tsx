import { useEffect, useState } from "react";
import { ChangeEvent, FormEvent } from "react";
// Mantine
import {
  TextInputProps,
  ActionIcon,
  useMantineTheme,
  Box,
  Modal,
  Group,
} from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import { useGetSubscribersQuery } from "../../../../../../services/subscribers";
import { ModalsProvider } from "@mantine/modals";
// Styles
import StyledInput from "./style";

enum sessionTypes {
  IPv4 = 1,
  IPv6,
  IPv4v6
}
export interface SubscriberType {
  imsi: string;
  security: object;
}

function IMSIInput(props: TextInputProps) {
  const [value, setValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  useEffect(() => {
    console.log(value);
  });

  const {
    data: Subscriber,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubscribersQuery(value, {
    skip: isTyping,
  });
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log(Subscriber, isLoading, isSuccess, isError, error);
    }
  };

  const handleOnInput = (event: ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    setValue(event.target.value);

    if (Subscriber !== undefined) {
      console.log("subscriber imsi is:", Subscriber.imsi);
      console.log("subscriber is: ", Subscriber.ambr);
    }
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setIsTyping(false);
    event.preventDefault();
    // handle form submit
  }
  return (
    <>
      <ModalsProvider>
        <form onSubmit={handleSubmit}>
          <StyledInput
            icon={<IconSearch size="1.1rem" stroke={1.5} />}
            radius="xl"
            size="lg"
            rightSection={
              <ActionIcon
                size={22}
                radius="xl"
                color={theme.primaryColor}
                variant="filled"
                maw={320}
              >
                {theme.dir === "ltr" ? (
                  <IconArrowRight size="1.1rem" stroke={1.5} />
                ) : (
                  <IconArrowLeft size="1.1rem" stroke={1.5} />
                )}
              </ActionIcon>
            }
            placeholder="IMSI"
            rightSectionWidth={22}
            value={value}
            onChange={handleOnInput}
            onKeyDown={handleKeyPress}
            {...props}
          />
        </form>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error Fetching Subscriber data</div>}
        {isSuccess && (
          <>
            <Modal
              opened={opened}
              onClose={() => setOpened(false)}
              className="w-[600px]"
              withCloseButton={false}
              classNames={{ body: 'pt-0 pl-0' }}
              size="75%"
            >
              <div className="h-[50px] bg-gray-100 text-[20px] pt-2">
                <span className="p-6">IMSI: {Subscriber.imsi}</span>
              </div>{" "}
              <div className="mt-6 pl-3">
                <h3 className="font-bold mb-3 text-[18px]">Subscriber Configuration</h3>
                <div className="grid grid-cols-2 gap-[200px]">
                  <div className="col-span-1 text-[16px]">
                    {/* <p>{Subscriber.imeisv}...</p> */}
                    <p>
                      {Subscriber.security.k}
                      <span className="text-gray-400 text-[14px]">...K</span>
                    </p>
                    <p>
                      {Subscriber.security.opc}
                      <span className="text-gray-400 text-[14px]">...OPc</span>
                    </p>
                    <p>
                      {Subscriber.security.amf}
                      <span className="text-gray-400 text-[14px]">...AMF</span>
                    </p>
                    <p>
                      {Subscriber.security.sqn}
                      <span className="text-gray-400 text-[14px]">...SQN</span>
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p>
                      {Subscriber.ambr.downlink.value} Gbps
                      <span className="text-gray-300 text-sm">...DL</span>
                    </p>
                    <span>{Subscriber.ambr.uplink.value} Gbps</span>
                    <span className="text-gray-300 text-sm">...UL</span>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="font-bold mb-3">SST:1 (Default S-NSSAI)</h3>

                  <div className="grid grid-cols-8">
                    <div className="col-span-1 text-gray-400 text-sm">
                      DNN/APN
                    </div>
                    <div className="col-span-1 text-gray-400 text-sm">Type</div>
                    <div className="col-span-1 text-gray-400 text-sm">
                      5QI/QCI
                    </div>
                    <div className="col-span-1 text-gray-400 text-sm">ARP</div>
                    <div className="col-span-1 text-gray-400 text-sm">
                      Capability
                    </div>
                    <div className="col-span-1 text-gray-400 text-sm">
                      Vulnerability
                    </div>
                    <div className="col-span-1 text-gray-400 text-sm">
                      MBR DL/UL
                    </div>
                    <div className="col-span-1 text-gray-400 text-sm">
                      GBR DL/UL
                    </div>
                  </div>
                  <div className="grid grid-cols-8 mt-3">
                    <div className="col-span-1 text-sm">{Subscriber.slice[0].session[0].name}</div>
                    <div className="col-span-1 text-sm">{Subscriber.slice[0].session[0].type}</div>
                  </div>
                </div>
              </div>
            </Modal>
            <Group position="center" onClick={() => setOpened(true)}>
              <Box
                component="a"
                target="_blank"
                className="w-[300px] h-6 grid content-center"
                sx={(theme) => ({
                  // display: 'block',
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[3],
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.blue[4]
                      : theme.colors.blue[8],
                  padding: theme.spacing.xl,
                  borderRadius: theme.radius.md,
                  cursor: "pointer",

                  "&:hover": {
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[5]
                        : theme.colors.gray[5],
                  },
                })}
              >
                <div>IMSI: {Subscriber.imsi} </div>
              </Box>
            </Group>
          </>
        )}
      </ModalsProvider>
    </>
  );
}
export default IMSIInput;
