import React, { useState, useEffect } from "react";
import { Form, Table, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function AdminPage() {
  // paang REFRESH ng page
  const [products, setProducts] = useState([]);
  const refreshPage = () => {
    window.location.reload();
  };

  const [showModal, setShowModal] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const handleShowModal = (product) => {
    setShowModal(true);
    setUpdatedProduct(product);
  };
  const handleUpdateProduct = async () => {
    try {
      await updateProduct(updatedProduct._id, updatedProduct);
      setShowModal(false);
      setUpdatedProduct(initialUpdatedProduct);
    } catch (error) {
      console.error(error);
    }
  };
  const getAllProducts = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  };
  //================updating Product===================================

  const updateProduct = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/products/updateProduct/${updatedProduct._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedProduct),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setShowModal(false);
        refreshPage();
      });
  };

  const initialUpdatedProduct = {
    productName: "",
    productDescription: "",
    price: 0,
    productImage: "",
    productQuantity: 0,
    isActive: true,
  };

  const archiveProduct = (productId) => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Archive",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `${process.env.REACT_APP_API_URL}/products/archive/${productId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
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

  const unarchiveProduct = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/unarchive/${productId}`, {
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

  const deleteProduct = (productId) => {
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
        fetch(
          `${process.env.REACT_APP_API_URL}/products/deleteProduct/${productId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            Swal.fire(
              "Deleted!",
              "The product has been deleted.",
              "success"
            ).then(
              // refresh and page after button
              refreshPage
            );
          });
      }
    });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <div className="productTable">
        <Table striped bordered hover style={{ backgroundColor: "whitesmoke" }}>
          <thead className="productTableHead">
            <tr>
              <th>Product Name</th>
              <th>Product Description</th>
              <th>Price</th>
              <th>Product Image</th>
              <th>Product Quantity</th>
              <th>Product status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="productTableDetails">{product.productName}</td>
                <td className="productTableDetails">
                  {product.productDescription}
                </td>
                <td className="productTableDetails">{product.price}</td>
                <td className="productTableDetails">{product.productImage}</td>
                <td className="productTableDetails">{product.productStock}</td>
                <td className="productTableDetails"> {product.isActive}</td>
                <td>
                  <div className="productButtons">
                    <Button
                      className="btn btn-primary"
                      onClick={() => handleShowModal(product)}
                    >
                      Update
                    </Button>
                    {product.isActive ? (
                      <Button
                        variant="warning"
                        onClick={() => archiveProduct(product._id)}
                      >
                        Archive
                      </Button>
                    ) : (
                      <Button
                        variant="info"
                        onClick={() => unarchiveProduct(product._id)}
                      >
                        Unarchive
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={updatedProduct.productName}
                value={updatedProduct.productName}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    productName: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                placeholder={updatedProduct.productDescription}
                value={updatedProduct.productDescription}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    productDescription: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder={updatedProduct.price}
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formProductImage">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="text"
                placeholder={updatedProduct.productImage}
                value={updatedProduct.productImage}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    productImage: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formProductQuantity">
              <Form.Label>Product Quantity</Form.Label>
              <Form.Control
                type="text"
                placeholder={updatedProduct.productStocky}
                value={updatedProduct.productStock}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    productStock: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateProduct}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
