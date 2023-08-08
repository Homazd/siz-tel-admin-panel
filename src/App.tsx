import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Views
import LoginPage from "./views/Login/Login";
import Dashboard from "./views/Dashboard";
import Subscribers from "./views/Subscribers";
import Profile from "./views/Profile";
// import ProtectedRoute from "./components/Routes/protectedRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />}/>
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/" element={<ProtectedRoute />}> */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="subscribers" element={<Subscribers />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          {/* <Route path="profile" element={<Profile />} /> */}
          {/* </Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
