import "./App.css";
import { useState, useEffect } from "react";

import { UserProvider } from "./UserContext";
import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ActiveProducts from "./pages/ActiveProducts";
import ProductView from "./components/ProductView";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import ErrorPage from "./pages/ErrorPage";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ManageProductsPage from "./pages/ManageProductsPage";

import CreateProductComponent from "./pages/CreateProduct";
import AddOrder from "./pages/AddOrder";
import UpdateProductPage from "./pages/UpdateProduct";
import UserData from "./pages/AllUsers";
import AllOrders from "./pages/AllOrders";
import MyProfile from "./pages/MyProfile";
import UserCard from "./components/UserCard";
// import CreateProductComponent from "./components/CreateProductComponent";

function App() {
  const [user, setUser] = useState({
    id: null, // dapat nka null, para di always nka login, or png reset
    isAdmin: null,
    email: null,
  });

  const unsetUser = () => {
    localStorage.clear();
  };

  //Because our user state's values are reset to null every time the user reloads the page (thus logging the user out), we want to use React's useEffect hook to fetch the logged-in user's details when the page is reloaded. By using the token saved in localStorage when a user logs in, we can fetch the their data from the database, and re-set the user state values back to the user's details.
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Set the user states values with the user details upon successful login.
        if (typeof data._id !== "undefined") {
          setUser({
            email: data.email,
            id: data._id,
            isAdmin: data.isAdmin,
          });
          // ADMIN PAGE HERE

          // Else set the user states to the initial values
        } else {
          setUser({
            id: null,
            isAdmin: null,
            email: null,
          });
        }
      });
  }, []); // [] to check na dumoble, kung double add ,[]

  return (
    <>
      {/*Provides the user context throughout any component inside of it.*/}
      <UserProvider value={{ user, setUser, unsetUser }}>
        {/*Initializes that dynamic routing will be involved*/}
        <Router>
          <AppNavbar />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ProductView />} />
              <Route path="/users/getAllUsers" element={<UserData />} />
              <Route
                path="/products/createProduct"
                element={<CreateProductComponent />}
              />
              <Route path="/myProfile/:email" element={<MyProfile />} />
              <Route path="/UserCard/:email" component={<UserCard />} />
              <Route path="/allOrders" element={<AllOrders />} />
              <Route
                path="/products/updateProduct/:productId"
                element={<UpdateProductPage />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/products/getAllActiveProducts"
                element={<ActiveProducts />}
              />

              <Route
                exact
                path="/admin/products"
                component={ManageProductsPage}
              />

              <Route exact path="/addOrder" component={AddOrder} />
              <Route
                path="/admin/ManageProducts"
                element={<ManageProductsPage />}
              ></Route>
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Container>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
