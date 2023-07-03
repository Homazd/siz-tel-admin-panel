import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import { useGetProfileByNameQuery } from "./services/api";

function App() {
  const { data, error, isLoading } = useGetProfileByNameQuery("bulbasaur");
  return (
    <div className="App">
      {error ? (
        <>Oh, no! there was as error!</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
        </>
      ) : null}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
