import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { userRegister } from "../features/authSlice";
import "../style/Register.css";
import show from "../asset/show.svg";
import hide from "../asset/hide.svg";
import MovieNavbar from "../components/MovieNavbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);

  const [newData, setNewData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  // const [errors, setErrors] = useState({});

  const handleInputNewData = (e) => {
    setNewData({
      ...newData,
      [e.target.id]: e.target.value,
    });
  };

  console.log(newData);
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      let newUser = await dispatch(userRegister(newData));
      newUser ? navigate("/login") : navigate("/register");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-wrapper">
      <MovieNavbar />
      <Row className="login justify-content-center mb-5 w-100">
        <Col md="4" className="title-login text-center">
          <h1 className="fw-bold text-white">Setup Your New Account</h1>
          <p>
            Choose movie to watch from 130.000 video with <br /> new additions
            published every week
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center w-100 mx-auto">
        <Col md="4" className="login-form">
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Control
                className="form-login"
                id="firstName"
                type="text"
                placeholder="Input Your First Name"
                value={newData.firstName}
                onChange={handleInputNewData}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                className="form-login"
                id="lastName"
                type="text"
                placeholder="Input Your Last Name"
                value={newData.lastName}
                onChange={handleInputNewData}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                className="form-login"
                id="email"
                type="email"
                value={newData.email}
                placeholder="Input Your Email"
                onChange={handleInputNewData}
              />
            </Form.Group>
            <Form.Group className="mb-3 d-flex">
              <Form.Control
                className="form-login"
                id="password"
                type={passwordShown ? "text" : "password"}
                value={newData.password}
                placeholder="Input Your Password"
                onChange={handleInputNewData}
              />
              <Button className="showHide pe-3" onClick={togglePassword}>
                <img src={passwordShown ? show : hide} alt="showHide" />
              </Button>
            </Form.Group>
            <Form.Group className="mb-3 d-flex">
              <Form.Control
                className="form-login"
                id="password_confirmation"
                type={passwordShown ? "text" : "password"}
                value={newData.password_confirmation}
                placeholder="Confirm Your Password"
                onChange={handleInputNewData}
              />
              <Button className="showHide pe-3" onClick={togglePassword}>
                <img src={passwordShown ? show : hide} alt="showHide" />
              </Button>
            </Form.Group>
            <Button className="btn-login w-100" type="submit" variant="primary">
              Register
            </Button>{" "}
          </Form>
          <p className="register text-center mt-4">
            Already have an account ?{" "}
            <a className="register-link text-white ms-2" href="/Login">
              Sign in here
            </a>
          </p>
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

export default Register;
