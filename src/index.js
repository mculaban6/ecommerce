import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
// Import the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </> // limiter sa syntax or possible errors, parang sencond debugger
);

// const user = {
//   firstName: "Mark",
//   lastName: "Culaban",
// };
// function formatName(user) {
//   return user.firstName + " " + user.lastName;
// }
// const element = <h1>Hello, {formatName(user)}</h1>;
// root.render(element); // dito ung react dom or dito ngyayari ung pg rrender
// render - to transmit to another
//dom - to transfer to another element
