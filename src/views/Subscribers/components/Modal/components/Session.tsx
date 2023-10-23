// Mantine Components
import { Divider, Select, Button, List, TextInput } from "@mantine/core";
// Static data
import qciItems from "@/data/qci.json";

const apr = Array.from({ length: 15 }, (_, index) => index + 1);

interface SessionProps {
  hiddenSession: boolean;
  onClickDeleteSession: () => void;
  onClickAddSession: () => void;
  subscriberData: {
    qci: string;
    arp: string;
    type: string;
    capability: string;
    vulnerability: string;
    ambrDownlink: string;

    ambrUplink: string;

    ambrDownUnit: string;

    ambrUpUnit: string;

    ueIpv4: string;
    ueIpv6: string;
    smfIpv4: string;
    smfIpv6: string;
  };
  updateSubscriberData: (field: string, value: string) => void;
}
const Session: React.FC<SessionProps> = ({
  hiddenSession,
  onClickAddSession,
  onClickDeleteSession,
  updateSubscriberData,
  subscriberData,
}) => {
  const apn = localStorage.getItem("apn");
  const handleUnitChange = (field: string) => (value: string) => {
    updateSubscriberData(field, value);
  };
  
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
                  value={subscriberData.type}
                  onChange={handleUnitChange('type')}
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
                value={subscriberData.qci}
                onChange={handleUnitChange('qci')}
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
                value={subscriberData.arp}
                onChange={handleUnitChange('type')}
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
                  value={subscriberData.capability}
                  onChange={handleUnitChange('capability')}
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
                  value={subscriberData.vulnerability}
                  onChange={handleUnitChange('vulnerability')}
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
                  value={subscriberData.ambrDownlink}
                  onChange={(e) => updateSubscriberData('ambrDownlink',e.target.value)}
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
                  value={subscriberData.ambrDownUnit}
                  onChange={handleUnitChange('ambrDownUnit')}
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
                  value={subscriberData.ambrUplink}
                  onChange={(e) => updateSubscriberData('ambrUplink',e.target.value)}
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
                  value={subscriberData.ambrUpUnit}
                  onChange={handleUnitChange('ambrUpUnit')}
                />
              </div>
              <div className="flex mt-3">
                <TextInput
                  classNames={{
                    label: "static",
                  }}
                  label="UE IPv4 Address"
                  className="w-[200px]"
                  value={subscriberData.ueIpv4}
                  onChange={(e) => updateSubscriberData('ueIpv4',e.target.value)}
                />
                <TextInput
                  classNames={{
                    label: "static",
                  }}
                  label="UE IPv6 Address"
                  className="w-[200px] ml-6"
                  value={subscriberData.ueIpv6}
                  onChange={(e) => updateSubscriberData('ueIpv6',e.target.value)}
                />
              </div>
              <div className="flex mt-3">
                <TextInput
                  classNames={{
                    label: "static",
                  }}
                  label="SMF IPv4 Address"
                  className="w-[200px]"
                  value={subscriberData.smfIpv4}
                  onChange={(e) => updateSubscriberData('smfIpv4',e.target.value)}
                />
                <TextInput
                  classNames={{
                    label: "static",
                  }}
                  label="SMF IPv6 Address"
                  className="w-[200px] ml-6"
                  value={subscriberData.smfIpv6}
                  onChange={(e) => updateSubscriberData('smfIpv6',e.target.value)}
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
