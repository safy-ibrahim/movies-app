import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function AuthProtectedRoute({ children }) {
  const { userToken } = useContext(UserContext);
  return <>{userToken ? <Navigate to={"/"} /> : children}</>;
}
