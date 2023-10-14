// Hooks
import { ChangeEvent, useEffect, useState } from "react";
// Mantine Hooks
import { useDisclosure } from "@mantine/hooks";
// Mantine Form
import { useForm } from "@mantine/form";
// Services
import {
  useAddSubscriberMutation,
  useDeleteSubscriberMutation,
  useGetSubscribersQuery,
} from "@/services/subscribers";
// Mantine Components
import { Box, Button, Group, Modal, ModalProps, Text } from "@mantine/core";
// Components
import PccRules from "./components/PccRules";
import Session from "./components/Session";
import Slice from "./components/Slice";
import SubscriberConfig from "./components/SubscriberConfig";
import EditConfig from "./components/edit/components/Config";
import Detail from "./components/edit/components/Detail";
// Types
import { DataType, pccRules } from "@/redux/Types/subscriberTypes";
// Icons
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

interface addSubscriberProps {
  onNewSub: (data: string) => void;
}
const AddSubscriber: React.FC<addSubscriberProps> = ({ onNewSub }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [editOpened, setEditOpened] = useState(false);
  const [deleteOpened, setDeleteOpened] = useState(false);
  const [hiddenSession, setHiddenSession] = useState(true);
  const [hiddenSlice, setHiddenSlice] = useState(false);
  const [imsi, setImsi] = useState("");
  const [msisdn, setMsisdn] = useState<string[]>([]);
  const [msisdn1, setMsisdn1] = useState<string>("");
  const [msisdn2, setMsisdn2] = useState<string>("");
  const [subK, setSubK] = useState("465B5CE8 B199B49F AA5F0A2E E238A6BC");
  const [opType, setOpType] = useState("OPc");
  const [opKey, setOpKey] = useState<string | null>(
    "E8ED289D EBA952E4 283B54E8 8E6183CA"
  );
  const [amf, setAmf] = useState("8000");
  const [downValue, setDownValue] = useState("1");
  const [downUnit, setDownUnit] = useState("3");
  const [upValue, setUpValue] = useState("1");
  const [upUnit, setUpUnit] = useState("3");
  // Slice States
  const [sst, setSst] = useState("1");
  const [sd, setSd] = useState("");
  // Session States
  const [type, setType] = useState("3");
  const [qci, setQci] = useState("9");
  const [arp, setArp] = useState("8");
  const [capability, setCapability] = useState("1");
  const [vulnerability, setVulnerability] = useState("1");
  const [ambrDownlink, setAmbrDownlink] = useState("1");
  const [ambrUplink, setAmbrUplink] = useState("1");
  const [ambrDownUnit, setAmbrDownUnit] = useState("3");
  const [ambrUpUnit, setAmbrUpUnit] = useState("3");
  const [ueIpv4, setUeIpv4] = useState("");
  const [ueIpv6, setUeIpv6] = useState("");
  const [smfIpv4, setSmfIpv4] = useState("");
  const [smfIpv6, setSmfIpv6] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  // PCC Rules
  const [inputs, setInputs] = useState<pccRules[]>([
    {
      qos: {
        index: 1,
        arp: {
          priority_level: 2,
          pre_emption_capability: 2,
          pre_emption_vulnerability: 2,
        },
        gbr: {
          downlink: { value: 1, unit: 2 },
          uplink: { value: 1, unit: 2 },
        },
        mbr: {
          downlink: { value: 1, unit: 2 },
          uplink: { value: 1, unit: 2 },
        },
      },
    },
  ]);

  const [deleteSubscriber] = useDeleteSubscriberMutation();

  const { data: subscriber } = useGetSubscribersQuery(imsi, {
    skip: isFetching,
  });

  const handleInputChange = (index: number, inputData: pccRules) => {
    setInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index] = inputData;
      return updatedInputs;
    });
  };

  const [addSubscriber] = useAddSubscriberMutation();

  const handleOnEditModal = () => {
    close();
    setEditOpened(true);
  };
  const handleSD = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSd(e.currentTarget.value);
  };

  const handleOnDelete = () => {
    setHiddenSlice(true);
    setHiddenSession(false);
  };
  const handleDelete = () => {
    if (subscriber) {
      deleteSubscriber(subscriber.imsi);
    }
  };
  const handleOnDeleteModal = () => {
    close();
    setDeleteOpened(true);
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
  useEffect(() => {
    setIsFetching(true);
  }, [subscriber, isFetching, imsi]);

  const apn = localStorage.getItem("apn");
  const addingSubscriber = {
    schema_version: 1,
    imsi: imsi,
    msisdn: [],
    imeisv: [],
    mme_host: [],
    mme_realm: [],
    purge_flag: [],
    security: {
      k: subK,
      op: opType === "OP" ? opKey : null,
      opc: opType === "OPc" ? opKey : null,
      amf: amf
    },
    ambr: {
      downlink: { value: +downValue, unit: +downUnit },
      uplink: { value: +upValue, unit: +upUnit }
    },
    slice: [
      {
        sst: +sst,
        sd: sd || undefined,
        default_indicator: true,
        session: [
          {
            name: apn ? apn : "GAS",
            type: +type,
            qos: {
              index: +qci,
              arp: {
                priority_level: +arp,
                pre_emption_capability: +capability,
                pre_emption_vulnerability: +vulnerability
              }
            },
            ambr: {
              downlink: {
                value: +ambrDownlink,
                unit: +ambrDownUnit
              },
              uplink: {
                value: +ambrUplink,
                unit: +ambrUpUnit
              }
            },
            ue:
              {
                addr: ueIpv4 || undefined,
                addr6: ueIpv6 || undefined
              } || undefined,
            smf:
              {
                addr: smfIpv4 || undefined,
                addr6: smfIpv6 || undefined
              } || undefined,
            pcc_rule: []
            //  {
            //   qos: {
            //     index: 1,
            //     arp: {
            //       priority_level: 1,
            //       pre_emption_capability: 1,
            //       pre_emption_vulnerability: 1,
            //     },
            //     gbr: {
            //       downlink: { value: 1, unit: 1 },
            //       uplink: { value: 1, unit: 1 },
            //     },
            //     mbr: {
            //       downlink: { value: 1, unit: 1 },
            //       uplink: { value: 1, unit: 1 },
            //     },
            //   },
            // },
          },
        ],
      },
    ],
    access_restriction_data: 32,
    subscriber_status: 0,
    network_access_mode: 0,
    subscribed_rau_tau_timer: 12,
    __v: 0
  };
  const handleInputChangeMsisdn = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setMsisdn1(value);
    if (msisdn.length < 2) {
      setMsisdn((current) => current.concat(msisdn1));
    }
    console.log("msisdn", msisdn);
  };

  const handleSubmit = (addingSubscriber: DataType) => {
    event?.preventDefault();
    console.log("msisdn1", msisdn1);
    // (msisdn1.length !== 0 && msisdn.length <= 2) ?   setMsisdn((current) => current.concat(msisdn1)) : null;
    // (msisdn2.length !== 0 && msisdn.length <= 2) ?   setMsisdn((current) => current.concat(msisdn2)) : null;
    console.log("msisdn", msisdn);
    try {
      setImsi(imsi);

      // console.log("msisdn2", msisdn2);
      // if (msisdn1.length != 0 && msisdn.length <= 2) {
      // setMsisdn(current => current.concat(['homa']));
      // }

      // (msisdn2.length !== 0 && msisdn.length <= 2) ? setMsisdn(current => [...current, msisdn2]) : null;

      addSubscriber(addingSubscriber)
        .unwrap()
        .then(() => {
          setMsisdn([]);
        });
      console.log("addingSubscriber", addingSubscriber);
      // console.log("msisdn is:", msisdn);
      // setMsisdn([])
      // setMsisdn1('');
      // console.log('msisdn1', msisdn1)
    } catch (error) {
      console.error(error);
    }
    if (onNewSub) {
      onNewSub(addingSubscriber.imsi);
    }

    close();
  };
  const form = useForm({
    initialValues: {
      imsi: "55",
      msisdn: "",
      subK: "",
    },
  });

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
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(addingSubscriber);
            }}
            className="block relative"
          >
            <SubscriberConfig
              imsi={imsi}
              setImsi={setImsi}
              msisdn1={msisdn1}
              handleInputChangeMsisdn={handleInputChangeMsisdn}
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
            <>
              <Slice
                hiddenSlice={hiddenSlice}
                onClickDelete={handleOnDelete}
                onClickAdd={handleOnAdd}
                sst={sst}
                setSst={setSst}
                sd={sd}
                handleSD={handleSD}
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
              {hiddenSession && (
                <PccRules inputs={inputs} onInputChange={handleInputChange} />
              )}
            </>

            {/* <Slice
              hiddenSlice={hiddenSlice}
              onClickDelete={handleOnDelete}
              onClickAdd={handleOnAdd}
              sst={sst}
              setSst={setSst}
              sd={sd}
              handleSD={handleSD}
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
            {hiddenSession && (
              <PccRules inputs={inputs} onInputChange={handleInputChange} />
            )} */}
            <p className="text-center ml-[300px] mt-6">
              <Button className="bg-sky-500 text-white font-semibold w-28">
                +
              </Button>
            </p>
            <p className="text-center ml-[600px] mt-6">
              <Button className="bg-sky-500 text-white font-semibold w-28">
                +
              </Button>
            </p>
            {/* {addSlice && (
              <>
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
                {hiddenSession && (
                  <PccRules inputs={inputs} onInputChange={handleInputChange} />
                )}
              </>
            )} */}
            {/* <p className="text-center ml-[300px] mt-6">
              <Button className="bg-sky-500 text-white font-semibold w-28">
                +
              </Button>
            </p>

            <p className="text-center ml-[600px] mt-6">
              <Button
                className="bg-sky-500 text-white font-semibold w-28"
                onClick={() => addSliceArray(addingSubscriber, newSlice)}
              >
                add slice
              </Button>
            </p> */}
            <Button className="font-bold bg-blue-500 mt-3" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>

      <Group position="center">
        <Button
          className={`${apn == "GAS" ? "bg-blue-500" : "bg-yellow-500"} ${
            apn === "GAS" ? "text-white" : "text-yellow-950"
          } rounded-full mt-7 w-40 animate__animated animate__swing"`}
          onClick={open}
        >
          Add Subscriber
        </Button>
      </Group>
      {subscriber !== undefined && (
        <div>
          <Modal
            opened={opened}
            onClose={close}
            className="w-[600px]"
            withCloseButton={false}
            classNames={{ body: "pt-0 pl-0" }}
            size="75%"
          >
            <Detail searchedSubscriber={subscriber} />
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
                    ? theme.colors.dark[9]
                    : theme.colors.gray[3],
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.blue[2]
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
                IMSI: {subscriber.imsi}
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
                        <EditConfig
                          searchedSubscriber={subscriber}
                          imsi={imsi}
                          subK={subK}
                          setSubK={setSubK}
                          msisdn={msisdn}
                          setMsisdn={setMsisdn}
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
                        <Slice
                          hiddenSlice={hiddenSlice}
                          onClickDelete={handleOnDelete}
                          onClickAdd={handleOnAdd}
                          sst={sst}
                          setSst={setSst}
                          sd={sd}
                          handleSD={handleSD}
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
                        {/* {subscriber.slice[0].session[0].pcc_rule !== undefined
                          ? subscriber.slice[0].session[0].pcc_rule.map(
                              (item: pccRules) => <PccRules item={item} />
                            )
                          : null} */}

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
        </div>
      )}
    </>
  );
};

export default AddSubscriber;
