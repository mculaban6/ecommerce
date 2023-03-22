import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const UpdateProductPage = ({ updateProduct }) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productImage1, setProductImage1] = useState("");
  const [productImage2, setProductImage2] = useState("");
  const [productImage3, setProductImage3] = useState("");
  const [productStock, setProductStock] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProduct(
      {
        productId: "yourProductId",
      },
      {
        productName,
        productDescription,
        price,
        productImage,
        productStock,
      }
    ).then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      <h1>Update Product</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="productDescription">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product description"
            value={productDescription}
            onChange={(event) => setProductDescription(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="productImage1">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product image URL"
            value={productImage1}
            onChange={(event) => setProductImage1(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="productImage2">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product image URL"
            value={productImage2}
            onChange={(event) => setProductImage2(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="productImage3">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product image URL"
            value={productImage3}
            onChange={(event) => setProductImage3(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="productStock">
          <Form.Label>Product Stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product stock"
            value={productStock}
            onChange={(event) => setProductStock(event.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Product
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProductPage;
