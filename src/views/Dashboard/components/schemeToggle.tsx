import { useState } from "react";
import {
  Switch,
  Group,
  useMantineTheme,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

function SwitchToggle(props: { colorScheme: ColorScheme }) {
  const theme = useMantineTheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    // setCookie("mantine-color-scheme", nextColorScheme, {
    //   maxAge: 60 * 60 * 24 * 30,
    // });
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <Group position="center" my={30}>
        <Switch
          checked={colorScheme === "dark"}
          onChange={() => toggleColorScheme()}
          size="lg"
          onLabel={<IconSun color={theme.white} size="1.25rem" stroke={1.5} />}
          offLabel={
            <IconMoonStars
              color={theme.colors.gray[6]}
              size="1.25rem"
              stroke={1.5}
            />
          }
        />
      </Group>
    </ColorSchemeProvider>
  );
}

export default SwitchToggle;
