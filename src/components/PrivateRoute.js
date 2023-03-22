import { Route } from "react-router-dom";
import PageNotFound from "../pages/ErrorPage";

export default function PrivateRoute({ element, isAdmin, ...rest }) {
  return (
    <Route
      {...rest}
      element={
        isAdmin ? (
          element
        ) : (
          <PageNotFound message="You need to log in to view this page" />
        )
      }
    />
  );
}
