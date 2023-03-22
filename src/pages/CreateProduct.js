import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { BarLoader } from "react-spinners";

export default function CreateProductComponent({ onSubmit }) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [isActive, setIsActive] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const refreshPage = () => {
      window.location.reload();
    };

    fetch(`${process.env.REACT_APP_API_URL}/products/createProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName: productName,
        productDescription: productDescription,
        price: price,
        productStock: productStock,
        productImage1: imageUrl1,
        productImage2: imageUrl2,
        productImage3: imageUrl3,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(JSON.stringify(result));
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Create",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Created",
              "Product has been successfully added",
              "success"
            ).then(() => {
              window.location.reload();
            });
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error.message);
      });
  };

  const handleImageUrl1Change = (event) => {
    setImageUrl1(event.target.value);
  };

  const handleImageUrl2Change = (event) => {
    setImageUrl2(event.target.value);
  };
  const handleImageUrl3Change = (event) => {
    setImageUrl3(event.target.value);
  };
  const handleImageUrlSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (
      productName !== "" &&
      productDescription !== "" &&
      price !== "" &&
      productStock !== ""
    ) {
      // Enables the submit button if the form data has been verified
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [productName, productDescription, price, productStock]);

  return (
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
          as="textarea"
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

      <Form.Group controlId="productStock">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Quantity"
          value={productStock}
          onChange={(event) => setProductStock(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="imageUrl1">
        <Form.Label>Image URL 1</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image URL 1"
          value={imageUrl1}
          onChange={handleImageUrl1Change}
        />
        <Form.Label>Image URL 2</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image URL 2"
          value={imageUrl2}
          onChange={handleImageUrl2Change}
        />
        <Form.Label>Image URL 3</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image URL 3"
          value={imageUrl3}
          onChange={handleImageUrl3Change}
        />
      </Form.Group>

      {isActive ? (
        <div className={`btnCreate ${isActive ? "show" : ""}`}>
          <Button
            variant="transparent"
            type="submit"
            id="submitBtn"
            className="animate__backInRight"
          >
            <div className="btnText">Create</div>
          </Button>
        </div>
      ) : (
        <div className={`btnLoadCreateProduct ${!isActive ? "show" : ""}`}>
          <BarLoader color="#36d7b7" size={13} />
        </div>
      )}
    </Form>
  );
}
