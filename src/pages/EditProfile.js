import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import "../style/EditProfile.css";
import MovieNavbar from "../components/MovieNavbar";
import ImageUploading from "react-images-uploading";
import { getUser, userEdit } from "../features/authSlice";

function Register() {
  const dispatch = useDispatch();
  const cuurrentData = useSelector(getUser);
  console.log(cuurrentData, "currentData");

  const [newData, setNewData] = useState({
    firstName: cuurrentData.first_name,
    lastName: cuurrentData.last_name,
    email: cuurrentData.email,
  });

  console.log(newData, "data edit in form");

  const [images, setImages] = useState();
  console.log(images, "images");

  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const handleInputNewData = (e) => {
    setNewData({
      ...newData,
      [e.target.id]: e.target.value,
    });
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", images[0].file);
    console.log(images[0].file, "test");
    data.append("first_name", newData.firstName);
    data.append("last_name", newData.lastName);
    data.append("email", newData.email);
    try {
      let response = await dispatch(userEdit(data));
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="editProfile-wrapper">
      <MovieNavbar />
      <Row className="login justify-content-center mb-5 w-100">
        <Col md="4" className="title-login text-center">
          <h1 className="fw-bold text-white">Edit Profile</h1>
        </Col>
      </Row>

      <Row className="justify-content-center w-100 mx-auto">
        <Col md="4" className="login-form mb-5">
          <ImageUploading
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({ imageList, onImageUpload, isDragging, dragProps }) => (
              // write your building UI
              <div className="upload__image-wrapper mb-3 text-center">
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img
                      src={image.data_url}
                      alt="profile"
                      width="100"
                      height="100"
                      className="rounded-circle"
                    />
                  </div>
                ))}
                <button
                  className="btn-drop me-auto fw-bold rounded-0 border-0 text-decoration-none px-5 py-2 mt-2"
                  style={isDragging ? { color: "red" } : null}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here{" "}
                  <span
                    className="text-white fw-lighter d-block"
                    style={{ fontSize: "12px" }}
                  >
                    ( jpg / png / jpeg )
                  </span>
                </button>
              </div>
            )}
          </ImageUploading>
          <Form onSubmit={handleEditProfile}>
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
            <Button className="btn-login w-100" type="submit" variant="primary">
              Update Profile
            </Button>{" "}
          </Form>
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

export default Register;
