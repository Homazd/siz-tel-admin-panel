import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/routes/protectedRoute";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="profile" element={<Profile />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
