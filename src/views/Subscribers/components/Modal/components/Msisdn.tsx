import { TextInput } from "@mantine/core";
// Icons
import { IconArrowDown } from "@tabler/icons-react";
import { IconArrowUp } from "@tabler/icons-react";
import React from "react";
import { IconX } from "@tabler/icons-react";

interface msisdnProps {
  msisdn: string[];
  setmsisdn: (data: string[]) => void;
  onStateChange: () => void;
}
const Msisdn: React.FC<msisdnProps> = ({
  msisdn,
  setmsisdn,
  onStateChange,
}) => {
  return (
    <>
      <div className="grid grid-cols-2 my-4">
        <TextInput
          label="MSISDN"
          name="msisdn"
          classNames={{
            label: "static",
          }}
          className="w-[300px]"
          required
          value={msisdn[0]}
          onChange={(e) => setmsisdn([e.target.value])}
        />

        <div className="w-[90px] h-[30px] flex  border-solid border-2 border-indigo-200 mt-6">
          <div className="w-[30px] border-solid border-r-2 border-indigo-200 flex justify-center items-center">
            <IconArrowDown size="1.3rem" stroke={1.5} />
          </div>
          <div className="w-[30px] border-solid border-r-2 border-indigo-200 flex justify-center items-center">
            <IconArrowUp size="1.3rem" stroke={1.5} />
          </div>
          <div
            className="w-[30px] bg-red-500 flex justify-center items-center"
            onClick={onStateChange}
          >
            <IconX className="" color="white" size="1.3rem" stroke={1.5} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Msisdn;
