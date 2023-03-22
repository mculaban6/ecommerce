// import { Navigate } from "react-router-dom";
// import UserContext from "../UserContext";
// import { useContext, useEffect } from "react";

// export default function Logout() {
//   //Consume the UserContext object and destructure it to access the user state and unsetUser function from the context provider
//   const { unsetUser, setUser } = useContext(UserContext);

//   // localStorage.clear(); //to delete localStorage value
//   unsetUser();
//   // Placing the 'setUser' setter function insride of useEffect is neccessary why? because of updates within REACT JS that a state of anoter component cannot be updater while trying to render a different component
//   // By adding the useEffect, this also allow the Logout page to render first befiore triggering the useEffect which changes the state of our user

//   useEffect(() => {
//     // Set the user state back to it's original value
//     // setUser({ email: null });
//     setUser({ id: null });
//   });

//   return <Navigate to="/login" />;
// }

import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";
import { useEffect, useContext } from "react";

export default function Logout() {
  const { unsetUser, setUser } = useContext(UserContext);

  // Using the context, clear the contents of the local storage
  unsetUser();
  useEffect(() => {
    setUser({
      id: null,
      isAdmin: null,
    });
  });

  // An effect which removes the user email from the global user state that comes from the context

  return <Navigate to="/login" />;
}
