// Hooks
import { useState } from "react";
// Mantine Components
import { Checkbox, Divider, Group, Radio } from "@mantine/core";
import styled from "@emotion/styled";

// Components
import ReusableInput from "../../../../../components/Input";

const StyledCheckbox = styled(Checkbox)`
  & .mantine-Checkbox-label {
    color: red;
    width: 120px;
    margin-left: 10px;
  }
  &. mantine-checkbox-body {
    place-content: center start;
  }
`;
const Slice = () => {
  const [checked, setChecked] = useState(true);
  return (
    <div className="mt-10">
      <h3>Slice Configuration</h3>
      <Divider />
      <div className="flex">
        <Radio.Group name="SST" label="SST" withAsterisk>
          <Group mt="xs">
            <Radio value="1" label="1" />
            <Radio value="2" label="2" />
            <Radio value="3" label="3" />
            <Radio value="4" label="4" />
          </Group>
        </Radio.Group>
        <ReusableInput label="SD" className="ml-6 w-[300px]" />
        {checked ? (
          <Checkbox
            label="Default S-NSSAI"
            className="mt-6 ml-6"
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
        ) : (
          <StyledCheckbox
            label="Default S-NSSAI +At least 1 Default S-NSSAI is required"
            className="mt-6 ml-6 w-14"
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
        )}
      </div>
    </div>
  );
};

export default Slice;
