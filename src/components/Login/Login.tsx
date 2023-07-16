import React, { useState, FormEvent } from "react";
// Mantine Components
import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  rem,
} from "@mantine/core";

// import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: rem(900),
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: rem(900),
    maxWidth: rem(450),
    paddingTop: rem(80),

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export default function LoginPage() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const { classes } = useStyles();

  // const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setUsername(event.target.value);
  // };
  // const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setPassword(event.target.value);
  // };

  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  // TODO: handle login logic here
  // fetch("/api/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ username, password }),
  // })
  //   .then((response) => {
  //     if (response.ok) {
  //       return response.json();
  //     } else {
  //       throw new Error("Login failed");
  //     }
  //   })
  //   .then((data) => {
  //     localStorage.setItem("token", data.token); // store the token in local storage
  //     const navigate = useNavigate(); // get the navigate function from the hook
  //     navigate("/dashboard"); // navigate to the dashboard page
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back!
        </Title>

        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
        />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button fullWidth mt="xl" size="md">
          Login
        </Button>
      </Paper>
    </div>
  );
}
