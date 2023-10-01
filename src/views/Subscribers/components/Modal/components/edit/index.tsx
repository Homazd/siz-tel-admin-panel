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
  Text,
} from "@mantine/core";
// Mantine Form

import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import {
  useGetSubscribersQuery,
  useDeleteSubscriberMutation,
  useUpdateSubscriberMutation,
} from "@/services/subscribers";
import { ModalsProvider } from "@mantine/modals";
// Styles
import StyledInput from "./style";
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDisclosure } from "@mantine/hooks";
// Components
import Session from "../Session";
// import PccRules from "../PccRules";
import EditConfig from "./components/Config";
import EditSlice from "./components/EditSlice";

function IMSIInput(props: TextInputProps) {
  const [value, setValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const [hiddenSession, setHiddenSession] = useState(true);
  const [hiddenSlice, setHiddenSlice] = useState(false);
  const [opened, { open, close }] = useDisclosure();
  const [editOpened, setEditOpened] = useState(false);
  const [deleteOpened, setDeleteOpened] = useState(false);
  const theme = useMantineTheme();
  // Config States
  const [imsi, setImsi] = useState("");
  const [msisdn, setMsisdn] = useState([]);
  const [imeisv, setImeisv] = useState([]);
  const [subK, setSubK] = useState("");
  const [opType, setOpType] = useState("OPc");
  const [opKey, setOpKey] = useState("");
  const [amf, setAmf] = useState("");
  const [downValue, setDownValue] = useState("1");
  const [downUnit, setDownUnit] = useState("3");
  const [upValue, setUpValue] = useState("1");
  const [upUnit, setUpUnit] = useState("3");
  // Slice States
  const [sst, setSst] = useState("1");
  const [sd, setSd] = useState("");
  const [ueIpv4, setUeIpv4] = useState("");
  const [ueIpv6, setUeIpv6] = useState("");
  const [smfIpv4, setSmfIpv4] = useState("");
  const [smfIpv6, setSmfIpv6] = useState("");
  const [deleteSubscriber] = useDeleteSubscriberMutation();
  const [updateSubscriber] = useUpdateSubscriberMutation();
  // Session States
  const [type, setType] = useState("3");
  const [qci, setQci] = useState("");
  const [arp, setArp] = useState("");
  const [capability, setCapability] = useState("");
  const [vulnerability, setVulnerability] = useState("");
  const [ambrDownlink, setAmbrDownlink] = useState("");
  const [ambrUplink, setAmbrUplink] = useState("");
  const [ambrDownUnit, setAmbrDownUnit] = useState("");
  const [ambrUpUnit, setAmbrUpUnit] = useState("");

  // PCC Rules
  const [pcc, setPcc] = useState([]);

  // Validation

  const {
    data: searchedSubscriber,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetSubscribersQuery(value, {
    skip: isTyping,
  });

  useEffect(() => {
    if (searchedSubscriber) {
      let downLinkUnit: string;
      let upLinkUnit: string;

      switch (searchedSubscriber.ambr.downlink.unit) {
        case 0:
          downLinkUnit = "0";
          break;
        case 1:
          downLinkUnit = "1";
          break;
        case 2:
          downLinkUnit = "2";
          break;
        case 3:
          downLinkUnit = "3";
          break;
        case 4:
          downLinkUnit = "4";
          break;

        default:
          downLinkUnit = "3";
          break;
      }
      switch (searchedSubscriber.ambr.uplink.unit) {
        case 0:
          upLinkUnit = "0";
          break;
        case 1:
          upLinkUnit = "1";
          break;
        case 2:
          upLinkUnit = "2";
          break;
        case 3:
          upLinkUnit = "3";
          break;
        case 4:
          upLinkUnit = "4";
          break;

        default:
          upLinkUnit = "3";
          break;
      }
      setSubK(searchedSubscriber.security.k);
      setAmf(searchedSubscriber.security.amf);
      setMsisdn(searchedSubscriber.msisdn[0]);
      setOpKey(
        searchedSubscriber.security.opc !== null
          ? searchedSubscriber.security.opc
          : searchedSubscriber.security.op
      );
      setDownUnit(downLinkUnit);
      setDownValue(searchedSubscriber.ambr.downlink.value);
      setUpValue(searchedSubscriber.ambr.uplink.value);
      setUpUnit(upLinkUnit);
      setSst(searchedSubscriber.slice[0].sst);
      setSd(searchedSubscriber.slice[0].sd);
      setPcc(searchedSubscriber.slice[0].session[0].pcc_rule)
    }
    console.log("searchedSubscriber is:", searchedSubscriber);
  }, [searchedSubscriber]);

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

  const sessionType = () => {
    const sessionItem = searchedSubscriber.ambr.downlink.unit;
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
      searchedSubscriber.slice[0].session[0].qos.arp.pre_emption_capability;
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
      searchedSubscriber.slice[0].session[0].qos.arp.pre_emption_vulnerability;
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
      console.log("Subscriber is:", searchedSubscriber);
    }
  };

  const handleOnInput = (event: ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    setValue(event.target.value);
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setIsTyping(false);
    event.preventDefault();
  }
  const handleOnDeleteModal = () => {
    close();
    setDeleteOpened(true);
  };
  const handleOnEditModal = () => {
    close();
    setEditOpened(true);
  };
  const handleDelete = () => {
    deleteSubscriber(searchedSubscriber.imsi);
  };
  const handleSubmitUpdate = () => {
    console.log("submit edit");

    updateSubscriber({
      imsi: imsi,
      msisdn: msisdn,
      imeisv: imeisv,
      schema_version: 1,
      security: {
        k: subK,
        // op:opType === "OP" ? opKey : null,
        opc: opType === "OP" ? opKey : null,
        amf: amf,
      },
      mme_host: [],
      mme_realm: [],
      purge_flag: [],
      ambr: {
        downlink: { value: +downValue, unit: +downUnit },
        uplink: { value: +upValue, unit: +upUnit },
      },
      slice: [
        {
          sst: +sst,
          // sd: sd ? sd : "",
          default_indicator: true,
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
              // ue: {
              //   addr: "",
              //   addr6: "",
              // },
              // smf: {
              //   addr: "",
              //   addr6: "",
              // },
              pcc_rule: [],
            },
          ],
        },
      ],
      access_restriction_data: 32,
      subscriber_status: 0,
      network_access_mode: 0,
      subscribed_rau_tau_timer: 12,
      __v: 0,
    });
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
        {isError && error && <p className="text-16px font-bold text-blue-600">Error Fetching Subscriber data</p>}
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
                <span className="p-6">IMSI: {searchedSubscriber.imsi}</span>
              </div>{" "}
              <div className="mt-6 pl-3">
                <h3 className="font-bold mb-3 text-[18px]">
                  Subscriber Configuration
                </h3>
                <div className="grid grid-cols-2 gap-[200px]">
                  <div className="col-span-1 text-[16px]">
                    {/* <p>{Subscriber.imeisv}...</p> */}
                    <p>
                      {searchedSubscriber.security.k}
                      <span className="text-gray-400 text-[14px]">...K</span>
                    </p>
                    <p>
                      {searchedSubscriber.security.opc}
                      <span className="text-gray-400 text-[14px]">...OPc</span>
                    </p>
                    <p>
                      {searchedSubscriber.security.amf}
                      <span className="text-gray-400 text-[14px]">...AMF</span>
                    </p>
                    <p>
                      {searchedSubscriber.security.sqn}
                      <span className="text-gray-400 text-[14px]">...SQN</span>
                    </p>
                  </div>
                  <div className="col-span-1">
                    <p>
                      {searchedSubscriber.ambr.downlink.value} Gbps
                      <span className="text-gray-300 text-sm">...DL</span>
                    </p>
                    <span>{searchedSubscriber.ambr.uplink.value} Gbps</span>
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
                      {searchedSubscriber.slice[0].session[0].name}
                    </div>
                    <div className="col-span-1 text-sm">{sessionType()}</div>
                    <div className="col-span-1 text-sm">
                      {searchedSubscriber.slice[0].session[0].qos.index}
                    </div>
                    <div className="col-span-1 text-sm">
                      {
                        searchedSubscriber.slice[0].session[0].qos.arp
                          .priority_level
                      }
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
                  IMSI: {searchedSubscriber.imsi}
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
                          onSubmit={handleSubmitUpdate}
                          className="block relative"
                        >
                          <EditConfig
                            searchedSubscriber={searchedSubscriber}
                            imsi={imsi}
                            msisdn={msisdn}
                            setMsisdn={setMsisdn}
                            subK={subK}
                            setSubK={setSubK}
                            opType={opType}
                            setOpType={setOpType}
                            opKey={opKey}
                            setOpKey={setOpKey}
                            amf={amf}
                            setAmf={setAmf}
                            downValue={downValue}
                            setDownValue={setDownValue}
                            downUnit={downUnit}
                            setDownUnit={setDownUnit}
                            upValue={upValue}
                            setUpValue={setUpValue}
                            upUnit={upUnit}
                            setUpUnit={setUpUnit}
                          />
                          <EditSlice
                            hiddenSlice={hiddenSlice}
                            onClickDelete={handleOnDelete}
                            onClickAdd={handleOnAdd}
                            sst={sst}
                            setSst={setSst}
                            sd={sd}
                            setSd={setSd}
                          />
                          <Session
                            hiddenSession={hiddenSession}
                            onClickDeleteSession={onClickDeleteSession}
                            onClickAddSession={onClickAddSession}
                            type={type}
                            setType={setType}
                            qci={qci}
                            setQci={setQci}
                            arp={arp}
                            setArp={setArp}
                            capability={capability}
                            setCapability={setCapability}
                            vulnerability={vulnerability}
                            setVulnerability={setVulnerability}
                            ambrUplink={ambrUplink}
                            setAmbrUplink={setAmbrUplink}
                            ambrDownlink={ambrDownlink}
                            setAmbrDownlink={setAmbrDownlink}
                            ambrDownUnit={ambrDownUnit}
                            setAmbrDownUnit={setAmbrDownUnit}
                            ambrUpUnit={ambrUpUnit}
                            setAmbrUpUnit={setAmbrUpUnit}
                            ueIpv4={ueIpv4}
                            setUeIpv4={setUeIpv4}
                            ueIpv6={ueIpv6}
                            setUeIpv6={setUeIpv6}
                            smfIpv4={smfIpv4}
                            setSmfIpv4={setSmfIpv4}
                            smfIpv6={smfIpv6}
                            setSmfIpv6={setSmfIpv6}
                          />
                          {/* <PccRules /> */}

                          <Button
                            className="font-bold bg-blue-500 absolute w-36 right-0 mt-6"
                            type="submit"
                            onClick={() => setEditOpened(false)}
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
                    <Modal
                      opened={deleteOpened}
                      onClose={() => setDeleteOpened(false)}
                      centered
                      // styles={contentStyles}
                      className="bg-gray-300 rounded-lg shadow-lg w-[200px]"
                    >
                      <Text className="text-center">
                        Are you sure to delete this subscriber?
                      </Text>
                      <div className="flex mt-5 justify-center">
                        <Button className="text-black hover:bg-slate-300">
                          Cancel
                        </Button>
                        <Button
                          className="text-red-400 ml-5"
                          onClick={handleDelete}
                        >
                          Delete
                        </Button>
                      </div>
                    </Modal>
                    <Button
                      className="text-sky-500 p-0 m-0 min-w-0 hover:bg-inherit"
                      onClick={handleOnDeleteModal}
                    >
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
