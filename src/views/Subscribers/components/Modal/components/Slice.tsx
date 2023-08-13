// Mantine Components
import { Divider, Group, Radio, Checkbox  } from "@mantine/core";
import ReusableInput from "../../../../../components/Input";
import { useState } from "react";

const Slice = () => {
    const [checked, setChecked] = useState(false)
  return (
    <div className="mt-10">
      <h3>Slice Configuration</h3>
      <Divider />
      <div className="flex">
      <Radio.Group
      name="SST"
      label="SST"
      withAsterisk
      >
        <Group mt="xs">
            <Radio value="1" label="1" />
            <Radio value="2" label="2" />
            <Radio value="3" label="3" />
            <Radio value="4" label="4" />
        </Group>
      </Radio.Group>
      <ReusableInput
      label="SD"
      className="ml-6 w-[300px]"
      />
      <Checkbox label="Default S-NSSAI" className="mt-6 ml-6"  checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)} />
      </div>
    </div>
  );
};

export default Slice;
