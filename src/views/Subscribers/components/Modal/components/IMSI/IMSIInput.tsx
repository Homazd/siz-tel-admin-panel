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
  Button,
  ModalProps,
} from "@mantine/core";
// Mantine Form
import { useForm } from "@mantine/form";

import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import { useGetSubscribersQuery } from "../../../../../../services/subscribers";
import { ModalsProvider } from "@mantine/modals";
// Styles
import StyledInput from "./style";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDisclosure } from "@mantine/hooks";
// Components
import SubscriberConfig from "../../components/SubscriberConfig";
import Slice from "../../components/Slice";
import Session from "../../components/Session";
import PccRules from "../../components/PccRules";

export interface SubscriberType {
  imsi: string;
  security: object;
}

function IMSIInput(props: TextInputProps) {
  const [value, setValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const [hiddenSession, setHiddenSession] = useState(true);
  const [hiddenSlice, setHiddenSlice] = useState(false);
  const [opened, { open, close }] = useDisclosure();
  const [editOpened, setEditOpened] = useState(false);
  const theme = useMantineTheme();
  const [imsi, setImsi] = useState("");
  const [subK, setSubk] = useState("");
  // const [op, setOp] = useState('');
  const [opKey, setOpKey] = useState("");
  const [amf, setAmf] = useState("");
  const [downValue, setDownValue] = useState("1");
  const [downUnit, setDownUnit] = useState<string | null>("Gbps");
  const [upValue, setUpValue] = useState("1");
  const [upUnit, setUpUnit] = useState<string | null>("Gbps");
  // Slice States
  const [sst, setSst] = useState("1");
  const [sd, setSd] = useState("");
  // Session States

  const form = useForm({
    initialValues: {
      imsi: "55",
      msisdn: "",
      subK: "",
    },
  });

  useEffect(() => {
console.log(Subscriber);

  }, []);
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

  const {
    data: Subscriber,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubscribersQuery(value, {
    skip: isTyping,
  });

  useEffect(() => {
    console.log("Subscriber is:", Subscriber);
  });

  const sessionType = () => {
    const sessionItem = Subscriber.ambr.downlink.unit;
    switch (sessionItem) {
      case 1:
        return "IPv4";
      case 2:
        return "IPv6";
      case 3:
        return "IPv4v6";
      default:
        break;
    }
  };

  const capabilityApr = () => {
    const aprCapability =
      Subscriber.slice[0].session[0].qos.arp.pre_emption_capability;
    switch (aprCapability) {
      case 1:
        return "Disabled";
      case 2:
        return "Enabled";

      default:
        break;
    }
  };

  const vulnerabilitySST = () => {
    const vulnerability =
      Subscriber.slice[0].session[0].qos.arp.pre_emption_vulnerability;
    switch (vulnerability) {
      case 1:
        return "Disabled";
      case 2:
        return "Enabled";

      default:
        break;
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log(Subscriber, isLoading, isSuccess, isError, error);
    }
  };

  const handleOnInput = (event: ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    setValue(event.target.value);
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setIsTyping(false);
    event.preventDefault();
    // handle form submit
  }
  const handleOnEditModal = () => {
    close();
    setEditOpened(true);
  };
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
              onClose={close}
              className="w-[600px]"
              withCloseButton={false}
              classNames={{ body: "pt-0 pl-0" }}
              size="75%"
            >
              <div className="h-[50px] bg-gray-100 text-[20px] pt-2">
                <span className="p-6">IMSI: {Subscriber.imsi}</span>
              </div>{" "}
              <div className="mt-6 pl-3">
                <h3 className="font-bold mb-3 text-[18px]">
                  Subscriber Configuration
                </h3>
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
                    <div className="col-span-1 text-sm">
                      {Subscriber.slice[0].session[0].name}
                    </div>
                    <div className="col-span-1 text-sm">{sessionType()}</div>
                    <div className="col-span-1 text-sm">
                      {Subscriber.slice[0].session[0].qos.index}
                    </div>
                    <div className="col-span-1 text-sm">
                      {Subscriber.slice[0].session[0].qos.arp.priority_level}
                    </div>
                    <div className="col-span-1 text-sm">{capabilityApr()}</div>
                    <div className="col-span-1 text-sm">
                      {vulnerabilitySST()}
                    </div>
                    <div className="col-span-1 text-sm">{}</div>
                  </div>
                </div>
              </div>
            </Modal>
            <Group position="center">
              <Box
                component="a"
                target="_blank"
                className="w-[400px] h-6 grid content-center relative mt-6"
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
                <div className="" onClick={open}>
                  IMSI: {Subscriber.imsi}
                </div>
                <div className="right-0 justify-center absolute grid grid-cols-2 w-16">
                  <div className="col-span-1">
                    <Modal
                      opened={editOpened}
                      onClose={() => setEditOpened(false)}
                      styles={contentStyles}
                      className="bg-gray-300 rounded-lg shadow-lg w-[1200px]"
                    >
                      <Box mx="auto" className="w-[800px]">
                        <form
                          onSubmit={form.onSubmit(handleSubmit)}
                          className="block relative"
                        >
                          <SubscriberConfig
                            imsi={Subscriber.imsi}
                            handleImsi={handleImsi}
                            subK={Subscriber.security.k}
                            handleSubk={handleSubk}
                            // op={op}
                            opKey={Subscriber.security.opc}
                            handleOpKey={handleOpKey}
                            amf={Subscriber.security.amf}
                            handleAmf={handleAmf}
                            downValue={Subscriber.ambr.downlink.value}
                            handleDownValue={handleDownValue}
                            downUnit={Subscriber.ambr.downlink.unit}
                            handleDownUnit={setDownUnit}
                            upValue={Subscriber.ambr.uplink.value}
                            handleUpValue={handleUpValue}
                            upUnit={upUnit}
                            handleUpUnit={setUpUnit}
                          />
                          <Slice
                            hiddenSlice={hiddenSlice}
                            onClickDelete={handleOnDelete}
                            onClickAdd={handleOnAdd}
                            sst={Subscriber.slice[0].sst}
                            handleSST={setSst}
                            sd={Subscriber.slice[0].sd}
                            handleSD={handleSD}
                          />
                          <Session
                            hiddenSession={hiddenSession}
                            onClickDeleteSession={onClickDeleteSession}
                            onClickAddSession={onClickAddSession}
                          />
                          <PccRules />

                          <Button
                            className="font-bold bg-blue-500 absolute w-36 right-0 mt-6"
                            type="submit"
                          >
                            Save
                          </Button>
                        </form>
                      </Box>
                    </Modal>
                    <Button
                      className="text-sky-500 p-0 m-0 min-w-0 hover:bg-inherit"
                      onClick={handleOnEditModal}
                    >
                      <FaPencilAlt />
                    </Button>
                  </div>
                  <div className="col-span-1">
                    <Button className="text-sky-500 p-0 m-0 min-w-0 hover:bg-inherit">
                      <RiDeleteBinLine />
                    </Button>
                  </div>
                </div>
              </Box>
            </Group>
          </>
        )}
      </ModalsProvider>
    </>
  );
}
export default IMSIInput;
