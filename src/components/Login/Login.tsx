import React, { useState, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username"
        value={username}
        onChange={handleUsernameChange}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </form>
  );
}
