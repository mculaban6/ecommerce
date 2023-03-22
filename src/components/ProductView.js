import { useState, useEffect, useContext } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  CardImg,
  Form,
} from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import UserContext from "../UserContext";
import Swal from "sweetalert2";
import { Spinner } from "react-bootstrap";
export default function ProductView() {
  // Gets the courseId from the URL of the route that this component is connected to. '/courses/:courseId'
  const { productId } = useParams();

  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [productName, setName] = useState("");
  const [productDescription, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [productStock, setProductStock] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [productImage1, setProductImage1] = useState("");
  const [productImage2, setProductImage2] = useState("");
  const [productImage3, setProductImage3] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isAdmin, setIsAdmin] = useState("false");
  const totalPrice = quantity * price;

  const addToCart = (order) => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/addOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        productId: productId,
        // userId: user.id,
        userEmail: order.email,
        quantity: quantity,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          // Update product stock in database
          fetch(
            `${process.env.REACT_APP_API_URL}/products/updateProduct/${productId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                productStock: productStock,
              }),
            }
          )
            .then((response) => response.json())
            .then((result) => {
              console.log(result);

              // Update product stock state by subtracting the quantity ordered
              setProductStock(productStock - quantity);
            })
            .catch((error) => {
              console.log(error);
            });

          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "You have enrolled successfully!",
          });

          navigate("/products/getAllActiveProducts");
        } else {
          console.log(result);

          Swal.fire({
            title: "Something went wrong!",
            icon: "error",
            text: "Please try again :(",
          });
        }
      });
  };
  const handleQuantityChange = (event) => {
    let newQuantity = Number(event.target.value);
    if (newQuantity >= 0) {
      setProductStock(productStock + quantity - newQuantity);
      setQuantity(newQuantity);
    }
  };
  {
    /*<CardImg top src="https://media.npr.org/assets/img/2021/11/25/gettyimages-1351143298-e0023f4640974350830dc818ef1bb2672bb43830.jpg"/>*/
  }
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.productName);
        console.log(result.price);
        console.log(result.image);
        setName(result.productName);
        setDescription(result.productDescription);
        setPrice(result.price);
        setProductStock(result.productStock);
        setImage(result.image);
      });
  }, [productId]);

  return (
    <>
      <Container className="productViewContainer">
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Body className="text-center">
                <Card.Title>{productName}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{productDescription}</Card.Text>
                <Card.Subtitle>Price:</Card.Subtitle>
                {/*<CardImg top src={price}/>*/}
                <Card.Text>PhP {price}</Card.Text>
                <Card.Subtitle>Stocks Available:</Card.Subtitle>
                <Card.Text>{productStock}</Card.Text>
                <Card.Subtitle>Quantity:</Card.Subtitle>
                <Form.Control
                  type="number"
                  min={0}
                  max={productStock + quantity}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="mb-3"
                />
                {quantity > productStock && (
                  <Form.Control.Feedback type="invalid">
                    Maximum quantity reached.
                  </Form.Control.Feedback>
                )}

                <Card.Subtitle>Total Price:</Card.Subtitle>
                <Card.Text>{totalPrice}</Card.Text>
                {user.id !== null && !user.isAdmin ? (
                  <Button
                    variant="primary"
                    onClick={() => addToCart(user.id)}
                    disabled={quantity < 1}
                  >
                    Checkout
                  </Button>
                ) : (
                  <Link
                    className="btn btn-danger btn-block"
                    to={user.isAdmin ? "/" : "/login"}
                  >
                    {user.isAdmin ? "Admin Cannot Add" : "Log-in first"}
                  </Link>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
