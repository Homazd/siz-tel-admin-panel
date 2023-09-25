// Hooks
import { useState } from "react";
// Mantine Components
import {
  Checkbox,
  Divider,
  Group,
  Radio,
  Button,
  List,
  TextInput,
} from "@mantine/core";
// Style
import { StyledCheckbox } from "../../style/style.module";

interface SlicePropsTypes {
  hiddenSlice: boolean;
  onClickDelete: () => void;
  onClickAdd: () => void;
  sst: string;
  sd?: string;
  setSst: (data: string) => void;
  setSd: (data: string) => void;
}

const EditSlice: React.FC<SlicePropsTypes> = ({
  hiddenSlice,
  onClickDelete,
  onClickAdd,
  sst,
  sd,
  setSd,
  setSst,
}) => {
  const [checked, setChecked] = useState(true);

  return (
    <div className="mt-10">
      <h3>Slice Configuration</h3>
      <Divider />
      {!hiddenSlice ? (
        <div className="flex">
          <Radio.Group
            name="sst"
            label="SST"
            required
            withAsterisk
            value={String(sst)}
            onChange={setSst}
          >
            <Group mt="xs">
              <Radio
                value="1"
                label="1"
                classNames={{
                  label: "static",
                }}
              />
              <Radio
                value="2"
                label="2"
                classNames={{
                  label: "static",
                }}
              />
              <Radio
                value="3"
                label="3"
                classNames={{
                  label: "static",
                }}
              />
              <Radio
                value="4"
                label="4"
                classNames={{
                  label: "static",
                }}
              />
            </Group>
          </Radio.Group>
          <TextInput
            classNames={{
              label: "static",
            }}
            label="SD"
            className="ml-6 w-[300px]"
            value={sd}
            onChange={(e) => setSd(e.currentTarget.value)}
          />
          {checked ? (
            <Checkbox
              label="Default S-NSSAI"
              classNames={{
                label: "static",
              }}
              className="mt-6 ml-6"
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
            />
          ) : (
            <StyledCheckbox
              label="Default S-NSSAI +At least 1 Default S-NSSAI is required"
              className="mt-6 ml-6 mr-16 w-14"
              checked={checked}
              classNames={{
                label: "static",
              }}
              onChange={(event) => setChecked(event.currentTarget.checked)}
            />
          )}
          <Button
            className="font-bold bg-red-500 w-20 ml-6 mt-6"
            onClick={onClickDelete}
          >
            ×
          </Button>
        </div>
      ) : (
        <div className="flex place-content-between">
          <List>
            <List.Item className="text-red-500 mt-2">
              At least one slice is required
            </List.Item>
          </List>
          <Button
            className="font-bold bg-sky-500 w-48 space-x-10 mt-2 mx-10"
            onClick={onClickAdd}
          >
            +
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditSlice;
