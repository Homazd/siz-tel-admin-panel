import { Divider, Select } from "@mantine/core";
import ReusableInput from "../../../../../components/Input";
import qciItems from ""
const Session = () => {
  return (
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
        data={qciItems.map((option) => ({
          value: option.title,
          label: option.title,
        }))}
      />
    </div>
  );
};
export default Session;
