import { Divider, Select } from "@mantine/core";
import ReusableInput from "../../../../../components/Input";
const qciItems = [
  {
    id: 1,
    title: "1",
  },
  {
    id: 2,
    title: "2",
  },
  {
    id: 3,
    title: "3",
  },
  {
    id: 4,
    title: "4",
  },
  {
    id: 5,
    title: "65",
  },
  {
    id: 6,
    title: "66",
  },
  {
    id: 7,
    title: "67",
  },
  {
    id: 8,
    title: "75",
  },
  {
    id: 9,
    title: "71",
  },
  {
    id: 10,
    title: "72",
  },
  {
    id: 11,
    title: "73",
  },
];
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
      <div className="flex">
       <Select
       label="5QI/QCI"
       required
       clearable
       data={qciItems.map((item) => (
        {value: {item.title}, label:{item.title}}
       )
      )}
      />
      </div>
    </div>
  );
};
export default Session;
