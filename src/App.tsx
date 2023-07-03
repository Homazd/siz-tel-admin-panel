import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  selectAllUsers,
  selectUsersStatus,
  selectUsersError,
} from "../src/redux/Reducers/ProfileReducer";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const status = useSelector(selectUsersStatus);
  const error = useSelector(selectUsersError);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
