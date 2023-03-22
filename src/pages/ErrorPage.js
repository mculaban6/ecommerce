import { Link, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

export default function PageNotFound() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>
        Go back to the <Link to="/">homepage</Link>
      </p>
    </div>
  );
}
