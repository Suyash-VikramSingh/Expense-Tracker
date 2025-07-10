import React from "react";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <div>You must be logged in.</div>;
  }
  return children;
}
