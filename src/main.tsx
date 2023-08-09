import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { MantineProvider } from "@mantine/core";

import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>

          <App />
        {/* </MantineProvider> */}
    </Provider>
  </React.StrictMode>
);


// <MantineProvider
// // theme={{ colorScheme: "dark" }}
// withGlobalStyles
// withNormalizeCSS
// withCSSVariables
// theme={{
//   colorScheme: "dark",
//   colors: {
//     // Add your color
//     deepBlue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */],
//     // or replace default theme color
//     blue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */],
//   },

//   shadows: {
//     md: "1px 1px 3px rgba(0, 0, 0, .25)",
//     xl: "5px 5px 3px rgba(0, 0, 0, .25)",
//   },
// }}
// >