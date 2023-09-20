// Hooks
import { useEffect, useState } from "react";
// Mantine Hooks
import { useDisclosure } from "@mantine/hooks";
// Mantine Form
import { useForm } from "@mantine/form";
// Services
import { useAddSubscriberMutation } from "@/services/subscribers";
// Mantine Components
import { Modal, Button, Group, ModalProps, Box } from "@mantine/core";
// Components
import SubscriberConfig from "./components/SubscriberConfig";
import Slice from "./components/Slice";
import Session from "./components/Session";
import PccRules from "./components/PccRules";
// Types
import { pccRules } from "@/redux/Types/subscriberTypes";

import { useGetSubscribersQuery } from "@/services/subscribers";
import Detail from "./components/edit/components/Detail";
import EditConfig from "./components/edit/components/Config";

function AddSubscriber() {
  const [opened, { open, close }] = useDisclosure(false);
  const [editOpened, setEditOpened] = useState(false);
  const [hiddenSession, setHiddenSession] = useState(true);
  const [hiddenSlice, setHiddenSlice] = useState(false);
  const [imsi, setImsi] = useState("");
  const [msisdn, setMsisdn] = useState([]);
  const [imeisv, setImeisv] = useState([]);
  const [subK, setSubk] = useState("465B5CE8 B199B49F AA5F0A2E E238A6BC");
  const [opType, setOpType] = useState("OPc");
  const [opKey, setOpKey] = useState("E8ED289D EBA952E4 283B54E8 8E6183CA");
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
  // PCC Rules
  const [inputs, setInputs] = useState<pccRules[]>([
    {
      flow: [],
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
  const [isFetching, setIsFetching] = useState(false);
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

  // const handleAddInput = () => {
  //   setInputs((prevInputs) => [
  //     ...prevInputs,
  //     {
  //       flow: [],
  //       qos: {
  //         index: 1,
  //         arp: {
  //           priority_level: 0,
  //           pre_emption_capability: 1,
  //           pre_emption_vulnerability: 1,
  //         },
  //         gbr: {
  //           downlink: { value: 1, unit: 3 },
  //           uplink: { value: 1, unit: 3 },
  //         },
  //         mbr: {
  //           downlink: { value: 1, unit: 3 },
  //           uplink: { value: 1, unit: 3 },
  //         },
  //       },
  //     },
  //   ]);
  // };
  // const handleRemoveInput = (index: number) => {
  //   setInputs((prevInputs) => {
  //     const updatedInputs = [...prevInputs];
  //     updatedInputs.splice(index, 1);
  //     return updatedInputs;
  //   });
  // };
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
    console.log("imsi is", imsi);
    setIsFetching(true);
  }, [subscriber, isFetching, imsi]);

  const handleSubmit = () => {
    addSubscriber({
      imsi: imsi,
      msisdn: msisdn,
      imeisv: imeisv,
      schema_version: 1,
      security: {
        k: subK,
        op: opType === "OP" ? opKey : null,
        opc: opType === "OPc" ? opKey : null,
        amf: amf,
      },
      mme_host: [],
      mme_realm: [],
      purge_flag: [],
      ambr: {
        downlink: { value: Number(downValue), unit: Number(downUnit) },
        uplink: { value: Number(upValue), unit: Number(upUnit) },
      },
      slice: [
        {
          sst: sst,
          // sd: sd,
          default_indicator: true,
          session: [
            {
              name: "internet",
              type: +type,
              ambr: {
                downlink: {
                  value: +ambrDownlink,
                  unit: +ambrDownUnit,
                },
                uplink: {
                  value: +ambrUplink,
                  unit: +ambrUpUnit,
                },
              },
              qos: {
                index: +qci,
                arp: {
                  priority_level: +arp,
                  pre_emption_capability: +capability,
                  pre_emption_vulnerability: +vulnerability,
                },
              },
              ue: {
                addr: ueIpv4,
                addr6: ueIpv6,
              },
              smf: {
                addr: smfIpv4,
                addr6: smfIpv6,
              },
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
            onSubmit={form.onSubmit(handleSubmit)}
            className="block relative"
          >
            <SubscriberConfig
              imsi={imsi}
              setImsi={setImsi}
              msisdn={msisdn}
              setMsisdn={setMsisdn}
              subK={subK}
              setSubk={setSubk}
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
              handleSST={setSst}
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
            <PccRules inputs={inputs} onInputChange={handleInputChange} />

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
                        onSubmit={form.onSubmit(handleSubmitUpdate)}
                        className="block relative"
                      >
                        <EditConfig
                          searchedSubscriber={subscriber}
                          // imsi={imsi}
                          // handleImsi={handleImsi}
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
                          handleSST={setSst}
                          sd={sd}
                          handleSD={handleSD}
                        />
                        <Session
                          hiddenSession={hiddenSession}
                          onClickDeleteSession={onClickDeleteSession}
                          onClickAddSession={onClickAddSession}
                        />
                        {subscriber.slice[0].session[0].pcc_rule !== undefined
                          ? subscriber.slice[0].session[0].pcc_rule.map(
                              (item: pccRules) => <PccRules item={item} />
                            )
                          : null}

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
}

export default AddSubscriber;
