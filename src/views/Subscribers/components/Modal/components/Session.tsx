// Mantine Components
import { Divider, Select, Button, List, TextInput } from "@mantine/core";
// Static data
import qciItems from "@/data/qci.json";

const apr = Array.from({ length: 15 }, (_, index) => index + 1);

interface SessionProps {
  hiddenSession: boolean;
  onClickDeleteSession: () => void;
  onClickAddSession: () => void;
}
const Session: React.FC<SessionProps> = ({
  hiddenSession,
  onClickAddSession,
  onClickDeleteSession,
}) => {
  return (
    <div>
      {hiddenSession ? (
        <div>
          {hiddenSession && (
            <div className="mt-10">
              <h3>Session Configuration</h3>
              <Divider />
              <div className="flex mt-6">
                <TextInput
                  classNames={{
                    label: "static",
                  }}
                  label="DNN/APN"
                  
                  placeholder="Internet"
                  className="w-[300px]"
                />
                <Select
                  label="Type"
                  placeholder="IPv4v6"
                  
                  classNames={{
                    label: "static",
                  }}
                  clearable
                  data={[
                    { value: "ipv4", label: "IPv4" },
                    { value: "ipv6", label: "IPv6" },
                    { value: "ipv4v6", label: "IPv4v6" },
                  ]}
                  className="ml-6 w-[100px]"
                />
                <Button
                  className="font-bold bg-red-500 w-28 ml-6 mt-6"
                  onClick={onClickDeleteSession}
                >
                  ×
                </Button>
              </div>

              <Select
                label="5QI/QCI"
                className="mt-3 w-[425px]"
                classNames={{
                  label: "static",
                }}
                
                clearable
                data={qciItems.map((option) => ({
                  value: option.title,
                  label: option.title,
                }))}
              />
              <Select
                label="ARP Priority Level (1-15)"
                className="mt-3 w-[425px]"
                classNames={{
                  label: "static",
                }}
                
                clearable
                data={apr.map((num) => ({
                  value: num.toString(),
                  label: num.toString(),
                }))}
              />
              <div className="flex">
                <Select
                  label="Capability"
                  className="mt-3 w-[200px]"
                  classNames={{
                    label: "static",
                  }}
                  
                  clearable
                  data={[
                    { value: "Disabled", label: "Disabled" },
                    { value: "Enabeled", label: "Enabled" },
                  ]}
                />
                <Select
                  label="Vulnerability"
                  classNames={{
                    label: "static",
                  }}
                  className="mt-3 w-[200px] ml-6"
                  
                  clearable
                  data={[
                    { value: "Disabled", label: "Disabled" },
                    { value: "Enabeled", label: "Enabled" },
                  ]}
                />
              </div>
              <div className="flex mt-3">
                <TextInput
                  classNames={{
                    label: "static",
                  }}
                  label="Session-AMBR Downlink"
                  
                  placeholder="1"
                  className="w-[250px]"
                />
                <Select
                  label="unit"
                  className="ml-6 w-[150px]"
                  clearable
                  classNames={{
                    label: "static",
                  }}
                  placeholder="Gbps"
                  data={[
                    { value: "bps", label: "bps" },
                    { value: "kbps", label: "Kbps" },
                    { value: "mbps", label: "Mbps" },
                    { value: "gbps", label: "Gbps" },
                    { value: "tbps", label: "Tbps" },
                  ]}
                />
              </div>
              <div className="flex mt-3">
                <TextInput
                  classNames={{
                    label: "static",
                  }}
                  label="Session-AMBR Uplink"
                  
                  placeholder="1"
                  className="w-[250px]"
                />
                <Select
                  label="unit"
                  className="ml-6 w-[150px]"
                  classNames={{
                    label: "static",
                  }}
                  clearable
                  placeholder="Gbps"
                  data={[
                    { value: "bps", label: "bps" },
                    { value: "kbps", label: "Kbps" },
                    { value: "mbps", label: "Mbps" },
                    { value: "gbps", label: "Gbps" },
                    { value: "tbps", label: "Tbps" },
                  ]}
                />
              </div>
              <div className="flex mt-3">
                <TextInput
                  classNames={{
                    label: "static",
                  }}
                  label="UE IPv4 Address"
                  className="w-[200px]"
                />
                <TextInput
                  classNames={{
                    label: "static",
                  }}
                  label="UE IPv6 Address"
                  className="w-[200px] ml-6"
                />
              </div>
              <div className="flex mt-3">
                <TextInput
                  classNames={{
                    label: "static",
                  }}
                  label="SMF IPv4 Address"
                  className="w-[200px]"
                />
                <TextInput
                  classNames={{
                    label: "static",
                  }}
                  label="SMF IPv6 Address"
                  className="w-[200px] ml-6"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10">
          <h3>Session Configuration</h3>
          <Divider />
          <div className="flex">
            <List>
              <List.Item className="text-red-500 mt-2">
                At least one Session is required
              </List.Item>
            </List>
            <Button
              className="font-bold bg-sky-500 w-48 space-x-10 mt-2 mx-10"
              onClick={onClickAddSession}
            >
              +
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Session;
