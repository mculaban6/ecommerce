import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import "../App.css";
import { useNavigate } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function AppNavbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const handleModalSubmit = () => {
    setModalData("");

    // close ang modal
    setShowModal(false);

    // Navigate to the My Profile page with the modal data
    navigate(`/myProfile/${modalData}`);
  };

  // Use useEffect to fetch the logged-in user's details and determine whether the user is an admin or not
  useEffect(() => {
    if (user.id) {
      fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser((prevState) => ({ ...prevState, isAdmin: data.isAdmin }));
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    }
  }, [user, setUser, navigate]);
  console.log("isAdmin:", user.isAdmin);
  return (
    <Navbar className="navBar" expand="lg">
      <Navbar.Brand className="logoNav" as={Link} to="/">
        AAve™
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="ml-auto">
          <Nav.Link as={NavLink} to="/products/getAllActiveProducts">
            Products
          </Nav.Link>
          {user.isAdmin && user ? (
            // Show admin links if the user is an admin
            <>
              {/* 
              <Nav.Link as={NavLink} to="/products/createProducts">
                Manage Products
              </Nav.Link> */}

              <NavDropdown title="Manage" id="navbarScrollingDropdown">
                <NavDropdown.Item
                  href={`${process.env.PUBLIC_URL}/products/createProduct`}
                >
                  Create Products
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item
                  href={`${process.env.PUBLIC_URL}/users/getAllUsers`}
                >
                  All Users
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href={`${process.env.PUBLIC_URL}/AllOrders`}>
                  Users Orders
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href={`${process.env.PUBLIC_URL}/admin/ManageProducts`}
                >
                  Managing Products
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item href="#action5">Others</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link as={NavLink} to="/logout">
                Logout
              </Nav.Link>
            </>
          ) : (
            // Show user links if the user is logged in but not an admin
            <>
              {user.id ? (
                <>
                  <Nav.Link variant="link" onClick={() => setShowModal(true)}>
                    My Profile
                  </Nav.Link>

                  <Nav.Link
                    as={NavLink}
                    to="/products"
                    className="justify-content-end"
                  >
                    Cart
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/logout">
                    Logout
                  </Nav.Link>
                </>
              ) : (
                // Show login and register links if the user is not logged in
                <>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/register">
                    Register
                  </Nav.Link>
                </>
              )}
            </>
          )}
        </Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="secondary" className="searchBtn"></Button>
        </Form>
      </Navbar.Collapse>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Verify your Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Enter email:</p>
          <input
            type="text"
            value={modalData}
            onChange={(e) => setModalData(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}
