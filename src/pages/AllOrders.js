import React, { useState, useEffect } from "react";
import { Form, Table, Button, Modal } from "react-bootstrap";

import Swal from "sweetalert2";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const refreshPage = () => {
    window.location.reload();
  };

  const getAllOrders = () => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/getAllOrders`)
      .then((response) => response.json())
      .then((data) => setOrders(data));
  };

  const getAllUsers = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };

  const getAllProducts = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    getAllOrders();
    getAllUsers();
    getAllProducts();
  }, []);

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.email : "Unknown";
  };

  const getProductName = (productId) => {
    const product = products.find((product) => product._id === productId);
    return product ? product.productName : "Unknown";
  };

  const groupedOrders = orders.reduce((acc, order) => {
    const userEmail = getUserName(order.userId);
    if (!acc[userEmail]) {
      acc[userEmail] = [];
    }
    acc[userEmail].push(order);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(groupedOrders).map(([email, orders]) => (
        <div key={email}>
          <h3>Orders for {email}</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Purchased On</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{getProductName(order.products[0].productId)}</td>
                  <td>
                    {order.products.map((product) => (
                      <div key={product.productId}>
                        {products.find((p) => p._id === product.productId)
                          ?.name || ""}
                      </div>
                    ))}
                  </td>
                  <td>{order.totalAmount}</td>
                  <td>{new Date(order.purchasedOn).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
    </>
  );
}
