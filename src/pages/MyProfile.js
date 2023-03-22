// import React, { useState, useEffect } from "react";
// import UserContext from "../UserContext";
// import { useContext } from "react";

// export default function MyProfile() {
//   const { user, isAdmin } = useContext(UserContext);
//   const [userData, setUserData] = useState({});

//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_API_URL}/users/details/${email}`)
//       .then((res) => res.json())
//       .then((data) => setUserData(data));
//   }, [props.id]);

//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>User Profile</h1>
//       <p>First Name: {userData.firstName}</p>
//       <p>Last Name: {userData.lastName}</p>
//       <p>Email: {userData.email}</p>
//       <p>Mobile No: {userData.mobileNo}</p>
//       <p>Permanent Address: {userData.permanentAddress}</p>
//       <p>Shipping Address: {userData.shippingAddress}</p>
//       <button>Update Profile</button>
//     </div>
//   );
// }
import UserCard from "../components/UserCard";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import UserContext from "../UserContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export default function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const { email } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // If it detects the data coming from fetch, the set isloading going to be false
    fetch(`${process.env.REACT_APP_API_URL}/users/details/${email}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setUsers(
          [result].map((user) => {
            // kung result.map is not a function, put [] haha
            return <UserCard key={user.email} userProp={user} />;
          })
        );

        // Sets the loading state to false
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="userBackground">
      {isLoading ? <Loading /> : <>{users}</>}
    </div>
  );
}
