// Mantine Components
import { Divider, Select, Button, List, TextInput } from "@mantine/core";
// Static data
import qciItems from "@/data/qci.json";

const apr = Array.from({ length: 15 }, (_, index) => index + 1);

interface SessionProps {
  hiddenSession: boolean;
  onClickDeleteSession: () => void;
  onClickAddSession: () => void;
  qci: string;
  setQci: (data: string) => void;
  arp: string;
  setArp: (data: string) => void;
  type: string;
  setType: (data: string) => void;
  capability: string;
  setCapability: (data: string) => void;
  vulnerability: string;
  setVulnerability: (data: string) => void;
  ambrDownlink: string;
  setAmbrDownlink: (data: string) => void;
  ambrUplink: string;
  setAmbrUplink: (data: string) => void;
  ambrDownUnit: string;
  setAmbrDownUnit: (data: string) => void;
  ambrUpUnit: string;
  setAmbrUpUnit: (data: string) => void;
  ueIpv4: string;
  setUeIpv4: (data: string) => void;
  ueIpv6: string;
  setUeIpv6: (data: string) => void;
  smfIpv4: string;
  setSmfIpv4: (data: string) => void;
  smfIpv6: string;
  setSmfIpv6: (data: string) => void;
}
const Session: React.FC<SessionProps> = ({
  hiddenSession,
  onClickAddSession,
  onClickDeleteSession,
  type,
  setType,
  qci,
  setQci,
  arp,
  setArp,
  capability,
  setCapability,
  vulnerability,
  setVulnerability,
  ambrDownUnit,
  setAmbrDownUnit,
  ambrDownlink,
  setAmbrDownlink,
  ambrUplink,
  setAmbrUplink,
  ambrUpUnit,
  setAmbrUpUnit,
  ueIpv4,
  ueIpv6,
  setSmfIpv4,
  setUeIpv4,
  setSmfIpv6,
  setUeIpv6,
  smfIpv4,
  smfIpv6,
}) => {
  const apn = localStorage.getItem("apn");
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
                  required
                  disabled
                  className="w-[300px]"
                  defaultValue={apn ? apn : ""}
                />
                <Select
                  label="Type"
                  placeholder="IPv4v6"
                  classNames={{
                    label: "static",
                  }}
                  clearable
                  data={[
                    { value: "1", label: "IPv4" },
                    { value: "2", label: "IPv6" },
                    { value: "3", label: "IPv4v6" },
                  ]}
                  className="ml-6 w-[100px]"
                  required
                  defaultValue={"3"}
                  value={type}
                  onChange={setType}
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
                required
                data={qciItems.map((option) => ({
                  value: option.title,
                  label: option.title,
                }))}
                value={qci}
                onChange={setQci}
              />
              <Select
                label="ARP Priority Level (1-15)"
                className="mt-3 w-[425px]"
                classNames={{
                  label: "static",
                }}
                clearable
                required
                data={apr.map((num) => ({
                  value: num.toString(),
                  label: num.toString(),
                }))}
                value={arp}
                onChange={setArp}
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
                    { value: "1", label: "Disabled" },
                    { value: "2", label: "Enabled" },
                  ]}
                  required
                  placeholder="Disabled"
                  value={capability}
                  onChange={setCapability}
                />
                <Select
                  label="Vulnerability"
                  classNames={{
                    label: "static",
                  }}
                  className="mt-3 w-[200px] ml-6"
                  clearable
                  required
                  placeholder="Disabled"
                  data={[
                    { value: "1", label: "Disabled" },
                    { value: "2", label: "Enabled" },
                  ]}
                  value={vulnerability}
                  onChange={setVulnerability}
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
                  value={ambrDownlink}
                  onChange={(e) => setAmbrDownlink(e.target.value)}

                />
                <Select
                  label="downUnit"
                  className="ml-6 w-[150px]"
                  clearable
                  classNames={{
                    label: "static",
                  }}
                  placeholder="Gbps"
                  data={[
                    { value: "0", label: "bps" },
                    { value: "1", label: "Kbps" },
                    { value: "2", label: "Mbps" },
                    { value: "3", label: "Gbps" },
                    { value: "4", label: "Tbps" },
                  ]}
                  value={ambrDownUnit}
                  onChange={setAmbrDownUnit}
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
                  value={ambrUplink}
                  onChange={(e) => setAmbrUplink(e.target.value)}
                />
                <Select
                  label="upUnit"
                  className="ml-6 w-[150px]"
                  classNames={{
                    label: "static",
                  }}
                  clearable
                  placeholder="Gbps"
                  data={[
                    { value: "0", label: "bps" },
                    { value: "1", label: "Kbps" },
                    { value: "2", label: "Mbps" },
                    { value: "3", label: "Gbps" },
                    { value: "4", label: "Tbps" },
                  ]}
                  value={ambrUpUnit}
                  onChange={setAmbrUpUnit}
                />
              </div>
              <div className="flex mt-3">
                <TextInput
                  classNames={{
                    label: "static",
                  }}
                  label="UE IPv4 Address"
                  className="w-[200px]"
                  value={ueIpv4}
                  onChange={(e) => setUeIpv4(e.target.value)}
                />
                <TextInput
                  classNames={{
                    label: "static",
                  }}
                  label="UE IPv6 Address"
                  className="w-[200px] ml-6"
                  value={ueIpv6}
                  onChange={(e) => setUeIpv6(e.target.value)}
                />
              </div>
              <div className="flex mt-3">
                <TextInput
                  classNames={{
                    label: "static",
                  }}
                  label="SMF IPv4 Address"
                  className="w-[200px]"
                  value={smfIpv4}
                  onChange={(e) => setSmfIpv4(e.target.value)}
                />
                <TextInput
                  classNames={{
                    label: "static",
                  }}
                  label="SMF IPv6 Address"
                  className="w-[200px] ml-6"
                  value={smfIpv6}
                  onChange={(e) => setSmfIpv6(e.target.value)}
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
