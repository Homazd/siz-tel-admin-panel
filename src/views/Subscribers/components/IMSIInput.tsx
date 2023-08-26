import { ChangeEvent } from 'react';

import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import styled from "@emotion/styled";
import { useState } from "react";
import { useGetSubscribersQuery } from "../../../services/subscribers";



const StyledInput = styled(TextInput)`
  & .mantine-TextInput-wrapper {
    width: 700px;
    text-align: center;
    margin: 0 auto;
  }
`;
export interface SubscriberType {
  imsi: string;
}

function IMSIInput(props: TextInputProps) {
  const [value, setValue] = useState<string>('');
  const theme = useMantineTheme();

  const {
    data: Subscribers,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubscribersQuery({ imsi : value});

  const handleOnInput = (event : ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setValue(event.target.value);
    console.log("value is:", value)
    console.log(Subscribers, isLoading, isSuccess, isError, error)
  }

  return (
    <StyledInput
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="lg"
      rightSection={
        <ActionIcon
          size={22}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
          maw={320}
        >
          {theme.dir === "ltr" ? (
            <IconArrowRight size="1.1rem" stroke={1.5} />
          ) : (
            <IconArrowLeft size="1.1rem" stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder="IMSI"
      rightSectionWidth={22}
      value={value}
      onChange={handleOnInput}
      {...props}
    />
  );
}
export default IMSIInput;
