import { Outlet, useNavigate } from "react-router-dom";

function isAuthenticated() {
  const token = localStorage.getItem("access-token");
  return token != null;
}

function ProtectedRoute() {
  const navigate = useNavigate();

  if (!isAuthenticated()) {
    navigate("/login");
    return null;
  }

  return <Outlet />;
}

export default ProtectedRoute;
