// Mantine Components
import { TextInput, ActionIcon, useMantineTheme } from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";

interface inputSearch {
  value: string;
  handleOnInput: (data: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (data: React.KeyboardEvent<HTMLInputElement>) => void;
}
const Search: React.FC<inputSearch> = ({
  value,
  handleOnInput,
  handleKeyPress,
}) => {
  const theme = useMantineTheme();
  return (
    <TextInput
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="xl"
      className="w-[500px]"
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
      label="IMSI"
      placeholder="IMSI"
      rightSectionWidth={22}
      value={value}
      onChange={handleOnInput}
      onKeyDown={handleKeyPress}
    />
  );
};

export default Search;
