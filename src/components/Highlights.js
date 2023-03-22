import { Row, Col, Card } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Highlights() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    Swal.fire({
      icon: "success",
      title: "Thank you!",
      text: "Your message has been sent.",
    });
    // Reset form inputs
    setName("");
    setEmail("");
    setMessage("");
  };
  return (
    <>
      <section className="carouselSection">
        <Carousel className="carouselHighlights">
          <Carousel.Item interval={1500}>
            <img
              className="d-block w-100"
              src="https://c4.wallpaperflare.com/wallpaper/684/371/737/nikon-photography-camera-depth-of-field-wallpaper-preview.jpg"
              alt="First slide"
              style={{ height: "500px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h1 className="carousel1">"Every picture tells a story."</h1>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1500}>
            <img
              className="d-block w-100"
              src="https://c4.wallpaperflare.com/wallpaper/330/669/215/nikon-lens-macro-camera-wallpaper-preview.jpg"
              alt="Second slide"
              style={{ height: "500px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h1 className="carousel2">
                Discover a clearer perspective with our lenses.
              </h1>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1500}>
            <img
              className="d-block w-100"
              src="https://c1.wallpaperflare.com/preview/570/220/41/lens-digital-camera-fujifilm-black.jpg"
              alt="Third slide"
              style={{ height: "500px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3 className="carousel3">New Fujifilm Cameras</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      <section className="categorySection">
        <h2 className="categoryTxt">CATEGORIES</h2>
        <Row className="mt-3 mb-3">
          <Col xs={12} md={4}>
            <Link to="/products/getAllActiveProducts" className="card-link">
              <Card className="cardHighlight p-3">
                <Card.Body>
                  <Card.Title>
                    <h2>BODIES</h2>
                  </Card.Title>
                  <img
                    className="d-block w-100"
                    src="https://c4.wallpaperflare.com/wallpaper/316/521/165/5c1cacc9b0dae-wallpaper-preview.jpg"
                    alt="Third slide"
                    style={{
                      height: "400px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col xs={12} md={4}>
            <Link to="/products/getAllActiveProducts" className="card-link">
              <Card className="cardHighlight p-3">
                <Card.Body>
                  <Card.Title>
                    <h2>LENSES</h2>
                  </Card.Title>
                  <img
                    className="d-block w-100"
                    src="https://c4.wallpaperflare.com/wallpaper/665/174/407/lens-white-blue-black-wallpaper-preview.jpg"
                    alt="Third slide"
                    style={{
                      height: "400px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col xs={12} md={4}>
            <Link to="/products/getAllActiveProducts" className="card-link">
              <Card className="cardHighlight p-3">
                <Card.Body>
                  <Card.Title>
                    <h2>ACCESORIES</h2>
                  </Card.Title>
                  <img
                    className="d-block w-100"
                    src="https://c1.wallpaperflare.com/preview/983/110/425/flatlay-gear-tech-device.jpg"
                    alt="Third slide"
                    style={{
                      height: "400px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </section>
      <section className="contactSection">
        <Row className="mt-3 mb-3">
          <Col xs={12} md={4}>
            <Card className="cardHighlight p-3">
              <Card.Body>
                <Card.Title>
                  <h2>Leave Message Here</h2>
                </Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter your message here"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="contactBtn"
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={8}>
            <Card className="contactPicCard">
              <Card.Img
                variant="top"
                className="contactPic"
                src="https://c4.wallpaperflare.com/wallpaper/81/560/13/canon-camera-girl-hands-wallpaper-preview.jpg"
                style={{
                  height: "450px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Card>
          </Col>
        </Row>
      </section>
    </>
  );
}
