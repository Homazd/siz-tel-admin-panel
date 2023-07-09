import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

function App() {
  // const dispatch = useDispatch();
  // const users = useSelector(selectAllUsers);
  // const status = useSelector(selectUsersStatus);
  // const error = useSelector(selectUsersError);

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, [dispatch]);
  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  // if (status === "failed") {
  //   return <div>{error}</div>;
  // }


  // useEffect(() => {
  //   console.log("data is:", status);
  //   console.log(status, users, error);
  // }, []);

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
