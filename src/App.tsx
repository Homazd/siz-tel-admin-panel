import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Views
import LoginPage from "./views/Login/Login";
import Dashboard from "./views/Dashboard";
import Subscribers from "./views/Subscribers";
import Profile from "./views/Profile";
// Mantine Components
.

import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
// Redux Toolkit
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { subscriberApi } from "./services/subscribers";

// import ProtectedRoute from "./components/Routes/protectedRoute";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ApiProvider api={subscriberApi}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme,
            colors: {
              dark: [
                "#d5d7e0",
                "#acaebf",
                "#8c8fa3",
                "#666980",
                "#4d4f66",
                "#34354a",
                "#2b2c3d",
                "#1d1e30",
                "#0c0d21",
                "#01010a",
              ],
            },
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              {/* <Route path="/" element={<ProtectedRoute />}> */}
              <Route path="/dashboard/*" element={<Dashboard />}>
                <Route path="subscribers" element={<Subscribers />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              {/* <Route path="profile" element={<Profile />} /> */}
              {/* </Route> */}
            </Routes>
          </Router>
        </MantineProvider>
      </ColorSchemeProvider>
    </ApiProvider>
  );
}

export default App;
