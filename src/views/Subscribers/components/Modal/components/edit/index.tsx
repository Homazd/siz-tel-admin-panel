import { useEffect, useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { pccRules } from "@/redux/Types/subscriberTypes"
// Mantine
import { Box, Modal, Group, Button, ModalProps, Text } from "@mantine/core";
// Mantine Form
import { useForm } from "@mantine/form";
import {
  useGetSubscribersQuery,
  useDeleteSubscriberMutation,
  useUpdateSubscriberMutation,
} from "../../../../../../services/subscribers";
import { ModalsProvider } from "@mantine/modals";
// Styles
import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDisclosure } from "@mantine/hooks";
// Components
import Slice from "../Slice";
import Session from "../Session";
import PccRules from "@/views/Subscribers/components/Modal/components/edit/components/PccRule";
import EditConfig from "./components/Config";
import Search from "../../Search/Search";
import Detail from "./components/Detail";

function IMSIInput() {
  const [value, setValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hiddenSession, setHiddenSession] = useState(true);
  const [hiddenSlice, setHiddenSlice] = useState(false);
  const [opened, { open, close }] = useDisclosure();
  const [editOpened, setEditOpened] = useState(false);
  const [deleteOpened, setDeleteOpened] = useState(false);
  // Config States
  const [imeisv, setImeisv] = useState("");
  const [msisdn, setMsisdn] = useState("");
  const [subK, setSubK] = useState("");
  const [opKey, setOpKey] = useState("");
  const [opType, setOpType] = useState("");
  const [amf, setAmf] = useState("");
  const [downValue, setDownValue] = useState("1");
  const [downUnit, setDownUnit] = useState("3");
  const [upValue, setUpValue] = useState("1");
  const [upUnit, setUpUnit] = useState("3");
  // Slice States
  const [sst, setSst] = useState("1");
  const [sd, setSd] = useState("");
  const [deleteSubscriber] = useDeleteSubscriberMutation();
  const [updateSubscriber] = useUpdateSubscriberMutation();
  // Session States

  // Validation

  const {
    data: searchedSubscriber,
    isLoading,
    isSuccess,
    isError,
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
      setSst(searchedSubscriber.slice[0].sst)
    }
    console.log("searchedSubscriber is:", searchedSubscriber);
  }, [searchedSubscriber]);

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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("Subscriber is:", searchedSubscriber);
    }
  };

  const handleOnInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
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
  const handleSubmitUpdate = async () => {
    try {
      await updateSubscriber({
        imsi: searchedSubscriber.imsi,
        security: {
          k: subK,
          op: opKey,
          opc: opKey,
          amf: amf,
        },
        imeisv: [imeisv],
        msisdn: [msisdn],

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
            sd: sd,
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
                ue: {
                  addr: "",
                  addr6: "",
                },
                smf: {
                  addr: "",
                  addr6: "",
                },
              },
            ],
          },
        ],
      });
      console.log("Data updated");
      setEditOpened(false);
    } catch (error) {
      console.log("Failed to update the data!");
    }
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
      <ModalsProvider>
        <form onSubmit={handleSubmit}>
          <Search
            value={value}
            handleOnInput={handleOnInput}
            handleKeyPress={handleKeyPress}
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
              <Detail searchedSubscriber={searchedSubscriber} />
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
                          onSubmit={form.onSubmit(handleSubmitUpdate)}
                          className="block relative"
                        >
                          <EditConfig
                            searchedSubscriber={searchedSubscriber}
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
                          {searchedSubscriber.slice[0].session[0].pcc_rule !== undefined
                            ? searchedSubscriber.slice[0].session[0].pcc_rule.map(
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
          </>
        )}
      </ModalsProvider>
    </>
  );
}
export default IMSIInput;
