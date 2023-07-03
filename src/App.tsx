import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import { useGetTodosQuery } from "../src/services/api";
import { useEffect } from "react";

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
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();

  useEffect(() => {
    console.log("data is:", todos);
    console.log(isLoading, isSuccess, isError, error);
  }, []);
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
