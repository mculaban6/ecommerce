import { Form, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../UserContext";
import Swal from "sweetalert2";
import zxcvbn from "zxcvbn";
import { BounceLoader } from "react-spinners";

export default function Register() {
  // Activity
  const { user, setUser } = useContext(UserContext); // responsible to get, login, logout, usercontext
  const navigate = useNavigate();
  // Activity END

  const [firstName, setFirstName] = useState(""); // default na blank "", useState == initial state or behavior
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [passwordScore, setPasswordScore] = useState(0); // for password widget
  const [password2, setPassword2] = useState("");

  // For determining if button is disabled or not
  const [isActive, setIsActive] = useState(false);

  function registerUser(event) {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result === true) {
          Swal.fire({
            title: "Oops!",
            icon: "error",
            text: "Email already exist!",
          });
        } else {
          // ACTIVITY HERE
          fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              // parang pumapasok ng data sa server
              firstName: firstName,
              lastName: lastName,
              mobileNo: mobileNumber,
              email: email,
              password: password1,
            }),
          })
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              // "" clear values when tapos na
              setEmail("");
              setPassword1("");
              setPassword2("");
              setFirstName("");
              setLastName("");
              setMobileNumber("");

              if (result) {
                Swal.fire({
                  title: "Register Successful!",
                  icon: "success",
                  text: "Salamat sa pag-rehistro!",
                });

                navigate("/login");
              } else {
                Swal.fire({
                  title: "Registration Failed",
                  icon: "error",
                  text: "Tropa, mukang mali ang iyong inilagay! :(",
                });
              }
            });
        }
      });
  }

  useEffect(() => {
    //para mg submit button
    if (
      firstName !== "" &&
      lastName !== "" &&
      mobileNumber.length === 11 &&
      email !== "" &&
      password1 !== "" &&
      password2 !== "" &&
      password1 === password2
    ) {
      // Enables the submit button if the form data has been verified
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, mobileNumber, email, password1, password2]);

  return user.id !== null ? (
    <Navigate to="/products" />
  ) : (
    <Form
      className="registerFormGroup"
      onSubmit={(event) => registerUser(event)}
    >
      <Form.Group controlId="firstName" className="regInput">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter First Name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="lastName" className="regInput">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Last Name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="mobileNumber" className="regInput">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Mobile Number"
          value={mobileNumber}
          onChange={(event) => setMobileNumber(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="userEmail" className="regInput">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="password1" className="regInput">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password1}
          onChange={(event) => {
            setPassword1(event.target.value);
            setPasswordScore(zxcvbn(event.target.value).score);
          }}
          required
        />

        {password1 && (
          <div className="password-strength">
            <div
              className={`password-strength-bar strength-${passwordScore}`}
            ></div>
            <div className="password-strength-text">
              Password strength: {passwordScore}/4
            </div>
          </div>
        )}
        <div className="password-requirements">
          <div className="password-text"> Password must include:</div>
          <ul style={{ marginTop: "5px" }}>
            <li
              style={{
                color: password1.match(/[A-Z]/) ? "lightgreen" : "white",
              }}
            >
              Include at least one capital letter
            </li>
            <li
              style={{
                color: password1.match(/[0-9]/) ? "lightgreen" : "white",
              }}
            >
              Include at least one number
            </li>
            <li
              style={{
                color: password1.match(/[^A-Za-z0-9]/) ? "lightgreen" : "white",
              }}
            >
              Include at least one special character
            </li>
          </ul>
        </div>
      </Form.Group>

      <Form.Group controlId="password2" className="regInput">
        <Form.Label>Verify Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Verify Password"
          value={password2}
          onChange={(event) => setPassword2(event.target.value)}
          required
        />
      </Form.Group>

      {isActive ? (
        <div className={`registerFormGroup ${isActive ? "show" : ""}`}>
          <Button
            variant="transparent"
            type="submit"
            id="submitRegBtn"
            className="animate__backInRight"
          >
            <div className="btnTextCreate">CREATE</div>
          </Button>
        </div>
      ) : (
        <div
          id="registerLoader"
          className={`registerFormGroup ${!isActive ? "show" : ""}`}
        >
          <BounceLoader color="#36d7b7" size={50} />
        </div>
      )}
      <p className="registerFormGroup" id="regPara">
        Already have an Account? Click <a href="/login">here</a> to login
      </p>
    </Form>
  );
}
