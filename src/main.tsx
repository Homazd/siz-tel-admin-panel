import { BrowserRouter as Router } from "react-router-dom";
import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";

import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <MantineProvider
          // theme={{ colorScheme: "dark" }}
          withGlobalStyles
          withNormalizeCSS
          withCSSVariables
          theme={{ colorScheme: "dark" }}
        >
          <App />
        </MantineProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
