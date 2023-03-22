// import React from "react";

// // Create a context object

// const UserContext = React.createContext(); // Base
// // Context objecet is a different approach in passing information between components and allows easier access by avoiding props-drilling

// // type of object that can be use to store information that can be shared to other components
// export const UserProvider = UserContext.Provider; // Deliver
// // The "Provider" component allows other components to consume or used the context object and supply the neccessary information need to the context object

// export default UserContext;

import React from "react";

const UserContext = React.createContext({
  user: null,
  isAdmin: false,
  email: null,
});

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;

export default UserContext;
