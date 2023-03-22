import { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import React from "react";

export default function UpdateProductPage({ productId, authToken }) {
  const [product, setProduct] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productImage1, setProductImage1] = useState("");
  const [productImage2, setProductImage2] = useState("");
  const [productImage3, setProductImage3] = useState("");
  const [productStock, setProductStock] = useState("");

  useEffect(() => {
    const getProductDetails = () => {
      fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);
          setProductName(data.productName);
          setProductDescription(data.productDescription);
          setPrice(data.price);
          setProductImage1(data.productImage1);
          setProductImage2(data.productImage2);
          setProductImage3(data.productImage3);
          setProductStock(data.productStock);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getProductDetails();
  }, [productId, authToken]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      `${process.env.REACT_APP_API_URL}/products/updateProduct/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          productName,
          productDescription,
          price,
          productImage1,
          productImage2,
          productImage3,
          productStock,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // if (!product) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Form onSubmit={handleSubmit} className="updateForm">
      <Form.Group controlId="productName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="productDescription">
        <Form.Label>Product Description</Form.Label>
        <Form.Control
          type="text"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="productImage1">
        <Form.Label>Product Image</Form.Label>
        <Form.Control
          type="text"
          value={productImage1}
          onChange={(e) => setProductImage1(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="productImage2">
        <Form.Label>Product Image</Form.Label>
        <Form.Control
          type="text"
          value={productImage2}
          onChange={(e) => setProductImage2(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="productImage1">
        <Form.Label>Product Image</Form.Label>
        <Form.Control
          type="text"
          value={productImage3}
          onChange={(e) => setProductImage3(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="productStock">
        <Form.Label>Product Stock</Form.Label>
        <Form.Control
          type="number"
          value={productStock}
          onChange={(e) => setProductStock(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update Product
      </Button>
    </Form>
  );
}
