import React from "react";
import { Route, Navigate } from "react-router-dom";

const AdminRoute = ({ component: Component, isAdmin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin === true ? <Component {...props} /> : <Navigate to="*" />
      }
    />
  );
};

export default AdminRoute;
