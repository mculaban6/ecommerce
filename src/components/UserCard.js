import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UserCard({ userProp }) {
  const {
    email,
    firstName,
    lastName,
    mobileNo,
    permanentAddress,
    shippingAddress,
  } = userProp;

  return (
    <div className="userCard">
      <Card key={email} style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            {firstName} {lastName}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Email: {email}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            mobile: {mobileNo}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Permanent Address: {permanentAddress}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Shipping Address: {shippingAddress}
          </Card.Subtitle>
          <Link to={`/updateUser/${email}`}>
            <Button variant="primary">Update User</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}
