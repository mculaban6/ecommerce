// import Button from "react-bootstrap/Button";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

// Destructure Importation - para paliitin ang type sa imports sa babw

import { Button, Row, Col } from "react-bootstrap";
export default function Banner() {
  return (
    <>
      <div className="bannerHome">
        <Row>
          <Col>
            <h1 className="bannerTitle">Aperture Avenue</h1>
            <p>"Preserve memories, one click at a time."</p>
          </Col>
        </Row>
      </div>
      <div className="shopBtn">
        <Row>
          <Col>
            <Button className="shopBtn" variant="transparent">
              <p className="btnText">Shop Now</p>
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}
