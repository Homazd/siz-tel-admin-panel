import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import styled from "@emotion/styled";

const StyledInput = styled(TextInput)`
  & .mantine-TextInput-wrapper {
    width: 700px;
    text-align: center;
    margin: 0 auto;
  }
`;
function InputWithButton(props: TextInputProps) {
  const theme = useMantineTheme();

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
      {...props}
    />
  );
}
export default InputWithButton;
