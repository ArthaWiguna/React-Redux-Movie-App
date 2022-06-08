import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import "../style/MovieNavbar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncSearchMovie,
  setSearchMovie,
  setCurrentPage,
  setGenre,
} from "../features/movieSlice";
import { getUser } from "../features/authSlice";
import logo from "../asset/logo.png";
import avatar from "../asset/avatar.jpg";

const MovieNavbar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  // const userData = localStorage.getItem("user");
  // const user = JSON.parse(userData);
  // // console.log(user.fullname);

  const userLogged = useSelector(getUser);
  console.log(userLogged, "user-logged");

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchQuery !== "") {
      dispatch(
        fetchAsyncSearchMovie({ page: 1, limit: 12, search: searchQuery })
      );
      window.scrollTo(0, 670);
    } else {
      dispatch(fetchAsyncMovies({ page: 1, limit: 12, search: "All" }));
      window.scrollTo(100, 0);

      dispatch(setSearchMovie(searchQuery));
      dispatch(setCurrentPage(1));
      dispatch(setGenre("All"));
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload(true);
  };

  return (
    <div className="w-100">
      <Navbar className="navbar w-100 py-3 pb-md-1" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="text-light fw-bold">
            <img
              alt=""
              src={logo}
              width="36"
              height="36"
              className="d-inline-block align-top me-2"
            />{" "}
            MOVIEX
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            className="bg-secondary"
          />
          <Navbar.Collapse id="navbarScroll">
            <Form
              className="form d-flex ms-sm-5 text-white mt-3 mt-sm-0"
              onSubmit={handleSearchSubmit}
            >
              <FormControl
                id="search"
                type="search"
                placeholder="Search your favorite to watch"
                className="search me-sm-2 bg text-decoration-none border-0 rounded-0 text-dark py-3 px-sm-4 py-sm-2"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchQuery}
              />
            </Form>
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {!userLogged ? (
                <Nav.Link href="/Login" className="text-light me-4">
                  Sign In
                </Nav.Link>
              ) : (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="transparent"
                    id="dropdown-basic"
                    className="dropdown text-white me-2 border-0 rounded-0 text-decoration-none d-flex justify-content-sm-between gap-2 align-items-center justify-content-center pt-2  py-sm-2 mt-2 mt-sm-0"
                  >
                    <h5 className="d-sm-none fs-6">My Dashboard</h5>
                    <span className="d-none d-sm-block">Hello,</span>
                    {userLogged.image === null ? (
                      <img
                        src={avatar}
                        alt="avatar"
                        width="40"
                        height="40"
                        className="rounded-circle d-none d-sm-block"
                      />
                    ) : (
                      <img
                        src={userLogged.image}
                        alt="avatar"
                        width="40"
                        height="40"
                        className="rounded-circle d-none d-sm-block"
                      />
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="me-5">
                    <Dropdown.Item href="#/action-1">
                      Your Watchlist
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Your Ratings
                    </Dropdown.Item>
                    <Dropdown.Item href="/editprofile">
                      Edit Profile
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3" onClick={handleSignOut}>
                      Sign Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default MovieNavbar;
