import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { userLogin } from "../features/authSlice";
import show from "../asset/show.svg";
import hide from "../asset/hide.svg";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router";
import "../style/Login.css";
import MovieNavbar from "../components/MovieNavbar";
import Footer from "../components/Footer";

const responseGoogle = (response) => {
  console.log(response);
};

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInputData = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const togglePassword = (e) => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let user = await dispatch(userLogin(data));
      user ? navigate("/") : navigate("/Login");
      window.location.reload(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <MovieNavbar />
      <Row className="login justify-content-center mb-5 w-100 align-items-center">
        <Col md="4" className="title-login text-center">
          <h1 className="fw-bold text-white">Sign in to Your Account</h1>
          <p>
            Choose movie to watch from 130.000 video with <br /> new additions
            published every week
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center w-100 mx-auto">
        <Col md="4">
          <div className="google mb-3">
            <div className="google-login">
              <GoogleLogin
                className="google-button w-100"
                clientId="966855084311-stjjsa2as2sg99gc2el2arggb6tgi5tf.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
        </Col>
        <p className="or text-center">-OR-</p>
        <Col md="4" className="login-form">
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Control
                className="form-login"
                id="email"
                type="email"
                placeholder="Input Your Email"
                value={data.email}
                onChange={handleInputData}
              />
            </Form.Group>
            <Form.Group className="mb-3 d-flex">
              <Form.Control
                className="form-login"
                id="password"
                type={passwordShown ? "text" : "password"}
                value={data.password}
                placeholder="Input Your Password"
                onChange={handleInputData}
              />
              <button className="showHide pe-3" onClick={togglePassword}>
                <img src={passwordShown ? show : hide} alt="showHide" />
              </button>
            </Form.Group>
            <Button className="btn-login w-100" type="submit" variant="primary">
              Login
            </Button>{" "}
          </Form>
          <p className="register text-center mt-4">
            Don't have an account yet ?{" "}
            <a className="register-link text-white ms-2" href="/Register">
              Register now
            </a>
          </p>
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

export default Login;
