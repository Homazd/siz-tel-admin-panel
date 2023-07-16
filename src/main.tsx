import { BrowserRouter as Router } from "react-router-dom";
import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";

import "./index.css";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./services/api";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <Router>
        <MantineProvider
          // theme={{ colorScheme: "dark" }}
          withGlobalStyles
          withNormalizeCSS
        >
          <App />
        </MantineProvider>
      </Router>
    </ApiProvider>
  </React.StrictMode>
);
