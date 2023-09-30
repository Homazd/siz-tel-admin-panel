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
import backImage from "../../images/5g-login.jpeg";
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

  const formData = new FormData();
  formData.append("username", credentials.username);
  formData.append("password", credentials.password);

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
        "http://192.168.0.203:8008/token",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("resonse.data is:", response.data);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("access_token", response.data.access_token);
      setLoggedIn(true);
      alert("شما با موفقیت وارد شدید.");
    } catch (error) {
      console.error("error is", error);
      alert("ورود ناموفق");
    }
  };

  return (
    <>
      {loggedIn && <Navigate to="/dashboard" replace={true} />}

      <div
        className="bg-cover min-h-full"
        style={{ backgroundImage: `url(${backImage})` }}
      >
        <Paper className="p-[30px] rounded-none max-w-md min-h-screen bg-sky-800">
          <form onSubmit={handleSubmit} className="grid grid-cols-1">
            <div className="">
              <Title
                order={2}
                className="text-2xl font-bold text-center block text-sky-100"
                ta="center"
                mt="md"
                mb={50}
              >
                سامانه مدیریت سیمکارت
              </Title>
              <TextInput
                name="username"
                label="نام کاربری"
                placeholder="hello@gmail.com"
                size="md"
                onChange={handleInputChange}
                styles={{
                  label: labelStyles,
                }}
              />
              <PasswordInput
                name="password"
                label="رمز عبور"
                placeholder="رمز عبور"
                mt="md"
                size="md"
                onChange={handleInputChange}
                styles={{
                  label: labelStyles,
                 
                }}
              />
              {/* <Checkbox
                label="Keep me logged in"
                mt="xl"
                size="md"
                styles={{
                  label: checkboxLabelStyle,
                }}
              /> */}
            </div>
            <Button
              type="submit"
              className="w-full mt-14 bg-sky-600"
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
