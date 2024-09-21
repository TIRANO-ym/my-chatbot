import React from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../service/authService";

export default function ProtectedRoute({children}) {
  const res = authService.checkLogin();
  if (res) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}