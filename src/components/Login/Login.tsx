import React, { useState } from "react";
import axios from "axios";
// Hooks
import { Navigate } from "react-router-dom";
// Mantine Components
import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
} from "@mantine/core";
import backImage from "../../images/background-admin.png";
// Styles
import { labelStyles, checkboxLabelStyle } from "./style.module";

interface Credentials {
  username: string;
  password: string;
}

export default function LoginPage() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.0.205:8000/api/auth/login/",
        credentials
      );
      console.log(response.data);
      // const { access_token } = response.data;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("access_token", JSON.stringify(response.data.key));
      setLoggedIn(true);

      // Handle successful login
    } catch (error) {
      console.error("error is", error);
      // Handle login error
    }
  };
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
    <>
      {loggedIn && <Navigate to="/dashboard" replace={true} />}

      <div
        className="bg-cover min-h-full"
        style={{ backgroundImage: `url(${backImage})` }}
      >
        <Paper className="p-[30px] rounded-none max-w-md min-h-screen">
          <form onSubmit={handleSubmit} className="grid grid-cols-1">
            <div className="">
              <Title
                order={2}
                className="text-3xl font-bold text-center block"
                ta="center"
                mt="md"
                mb={50}
              >
                Welcome back!
              </Title>
              <TextInput
                name="username"
                label="username address"
                placeholder="hello@gmail.com"
                size="md"
                onChange={handleInputChange}
                styles={{
                  label: labelStyles,
                }}
              />
              <PasswordInput
                name="password"
                label="Password"
                placeholder="Your password"
                mt="md"
                size="md"
                onChange={handleInputChange}
                styles={{
                  label: labelStyles,
                }}
              />
              <Checkbox
                label="Keep me logged in"
                mt="xl"
                size="md"
                styles={{
                  label: checkboxLabelStyle,
                }}
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-14 bg-blue-600"
              size="md"
              onClick={() => console.log(credentials)}
            >
              Login
            </Button>
          </form>
        </Paper>
      </div>
    </>
  );
}
