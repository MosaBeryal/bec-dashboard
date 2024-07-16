import { Outlet, Navigate, useNavigate } from "react-router-dom";
import useAuthContext from "../utils/hooks/useAuthContext";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // check if token is expired or not
  useEffect(() => {
    if (checkToken()) {
      navigate("/login", { replace: true });
    }
  }, []);

  // User state has been loaded, proceed with other instructions
  if (user && Object.keys(user).length > 0) {
    if (allowedRoles.includes(user.role)) {
      return <Outlet />;
    } else {
      // Redirect to unauthorized page if the user's role is not allowed
      return <Navigate to="/page-not-found" replace />;
    }
  } else {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" replace />;
  }
};

function checkToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return true;
  }

  const decodedToken = jwtDecode(token);

  // Check if the token is expired
  if (Date.now() / 1000 >= decodedToken.exp) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return true;
  }
  return false;
}

export default RequireAuth;
