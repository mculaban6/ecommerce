import { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../UserContext";
import Swal from "sweetalert2";
import "../App.css";
import RiseLoader from "react-spinners/RiseLoader";
// import image from "../pics/background-login.jpg";

export default function Login() {
  // Initializes the use of the properties from the UserProvider in App.js file
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Initialize useNavigate
  // const navigate = useNavigate()

  // For determining if button is disabled or not
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const retrieveUser = (token) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // Store the user details retrieved from the token into the global user state
        setUser({
          id: result._id,
          isAdmin: result.isAdmin,
          userId: result.userId,
        });
        setLoading(false);
        if (result.isAdmin) {
          navigate("/");
        } else {
          navigate("/products/getAllActiveProducts");
        }
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          title: "Oops!",
          icon: "error",
          text: "Something went wrong. Please try again.",
        });
      });
  };

  function authenticate(event) {
    event.preventDefault();

    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (typeof result.access !== "undefined") {
          localStorage.setItem("token", result.access);

          retrieveUser(result.access);
          const Toast = Swal.mixin({
            toast: true,
            position: "middle-center",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: "success",
            title: "Logged in successfully",
          });
        } else {
          Swal.fire({
            title: "Authentication Failed!",
            icon: "error",
            text: "Invalid Email or password",
          });
        }
      });
  }

  useEffect(() => {
    if (email !== "" && password !== "") {
      // Enables the submit button if the form data has been verified
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return user.id !== null ? (
    <Navigate to="/" />
  ) : (
    <div className="loginGroup">
      {/* style={{ backgroundImage: `url(${image})` }} */}

      <div className="loginForm"></div>
      <Form onSubmit={(event) => authenticate(event)}>
        <Form.Group controlId="userEmail">
          <Form.Label id="emailText" className="loginText">
            Email
          </Form.Label>
          <Form.Control
            className="emailBox"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        {/* <div>
          <h1 className="headerLogin">KAMPO.ph</h1>
        </div> */}

        <div className="campfire">
          <div class="flame" id="flame-2"></div>
          <div class="flame" id="flame-1"></div>
          <div class="flame" id="flame-3"></div>
          <div class="small-element" id="small-element-1"></div>
          <div class="small-element" id="small-element-2"></div>
          <div class="fire-bottom">
            <div class="main-fire"></div>
          </div>
          <div class="wood" id="wood-1"></div>
          <div class="wood" id="wood-2"></div>
        </div>
        <p className="loginParagraph">
          Don't have an Account yet? Click <a href="/register">here</a> to
          register
        </p>
        <Form.Group controlId="password">
          <Form.Label id="passText" className="loginText">
            Password
          </Form.Label>
          <Form.Control
            className="passBox"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Group>
        {isActive ? (
          <div className={`btnTrans ${isActive ? "show" : ""}`}>
            <Button
              variant="transparent"
              type="submit"
              id="submitBtn"
              className="animate__backInRight"
            >
              <div className="btnText">LOGIN</div>
            </Button>
          </div>
        ) : (
          <div className={`btnLoad ${!isActive ? "show" : ""}`}>
            <RiseLoader color="white" size={13} />
          </div>
        )}
      </Form>
    </div>
  );
}
