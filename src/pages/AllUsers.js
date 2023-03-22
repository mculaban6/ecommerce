import React, { useState, useEffect } from "react";
import { Form, Table, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

export default function UserData() {
  // paang REFRESH ng page
  const [users, setUsers] = useState([]);
  const refreshPage = () => {
    window.location.reload();
  };

  const getAllUsers = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
    console.log(users);
  };

  const userToAdmin = (userId) => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Archive",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_API_URL}/users/userToAdmin/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            Swal.fire(
              "Archived!",
              "The product has been Acrchived.",
              "success"
            ).then(
              // refresh and page after button
              refreshPage
            );
          });
      }
    });
  };

  const userToNotAdmin = (userId) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/userToNotAdmin/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Swal.fire("Done!", "The product is now available.", "success").then(
          // refresh ang page after button
          refreshPage
        );
      });
  };

  const deleteUser = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_API_URL}/users/deleteUser/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            Swal.fire("Deleted!", "User has been deleted.", "success").then(
              // refresh and page after button
              refreshPage
            );
          });
      }
    });
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <div className="userTable">
        <Table striped bordered hover style={{ backgroundColor: "whitesmoke" }}>
          <thead className="userTableHead">
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile Number</th>
              <th>Shipping Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&
              users.map((user) => (
                <tr key={user.id}>
                  <td className="userTableDetails">{user.email}</td>
                  <td className="userTableDetails">{user.firstName}</td>
                  <td className="userTableDetails">{user.lastName}</td>
                  <td className="userTableDetails">{user.mobileNo}</td>
                  <td className="userTableDetails">{user.shippingAddress}</td>
                  <td className="userTableDetails"> {user.isAdmin}</td>
                  <td>
                    {user.isAdmin ? (
                      <Button
                        variant="warning"
                        onClick={() => userToNotAdmin(user._id)}
                      >
                        Set to not Admin
                      </Button>
                    ) : (
                      <Button
                        variant="info"
                        onClick={() => userToAdmin(user._id)}
                      >
                        Set To Admin
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
