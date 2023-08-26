import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
// Mantine
import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import styled from "@emotion/styled";
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
  const [value, setValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const theme = useMantineTheme();

  const {
    data: Subscriber,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSubscribersQuery(
    { imsi: value },
    {
      skip: isTyping,
    }
  );

  const handleOnInput = (event: ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    setValue(event.target.value);
    console.log(Subscriber, isLoading, isSuccess, isError, error);
    console.log(Subscriber.imsi);
    
  };
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setIsTyping(false);
    event.preventDefault();
    // handle form submit
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
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
      </form>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error Fetching Subscriber data</div>}
      {isSuccess && <div>{Subscriber.imsi}</div>}
 
    </>
  );
}
export default IMSIInput;
