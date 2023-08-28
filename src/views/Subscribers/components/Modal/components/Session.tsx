import { useState } from "react";
// Mantine Components
import { Divider, Select, Button } from "@mantine/core";
// Components
import ReusableInput from "../../../../../components/Input";
// Static data
import qciItems from "@/data/qci.json";

const apr = Array.from({ length: 15 }, (_, index) => index + 1);

interface SessionProps {
  hiddenSession: boolean;
}
const Session: React.FC<SessionProps> = ({ hiddenSession }) => {
  const [sessionVisible, setSessionVisible] = useState(true);

  const onClickDelete = () => {
    setSessionVisible(false);
  };

  return (
    <div>
      {!hiddenSession && (
        <div>
          {sessionVisible && (
            <div className="mt-10">
              <h3>Session Configuration</h3>
              <Divider />
              <div className="flex mt-6">
                <ReusableInput
                  label="DNN/APN"
                  required
                  placeholder="Internet"
                  className="w-[300px]"
                />
                <Select
                  label="Type"
                  placeholder="IPv4v6"
                  required
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
                  onClick={onClickDelete}
                >
                  ×
                </Button>
              </div>

              <Select
                label="5QI/QCI"
                className="mt-3 w-[425px]"
                required
                clearable
                data={qciItems.map((option) => ({
                  value: option.title,
                  label: option.title,
                }))}
              />
              <Select
                label="ARP Priority Level (1-15)"
                className="mt-3 w-[425px]"
                required
                clearable
                data={apr.map((num) => ({
                  value: num.toString(),
                  label: num.toString(),
                }))}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Session;
