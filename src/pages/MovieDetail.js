import React, { useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import rating from "../asset/StarFill.svg";
import like from "../asset/like.svg";
import dislike from "../asset/dislike.svg";
import cevRight from "../asset/cev-right.svg";
import "../style/MovieDetail.css";
import MovieNavbar from "../components/MovieNavbar";
import Footer from "../components/Footer";
import ModalReview from "../components/ModalReview";
// import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { fetchAsyncDetailMovie, getDetailMovie } from "../features/movieSlice";
import { Container } from "react-bootstrap";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector(getDetailMovie);

  // modal
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchAsyncDetailMovie(id));
  }, [dispatch, id]);

  return (
    <div>
      <Container>
        <MovieNavbar />
      </Container>
      <div className="wide-wrapper mt-4">
        <Container className="wrapper-detail d-sm-flex justify-content-between gap-0 p-3 flex-row mx-auto">
          <div className="wrapper-poster">
            <h1 className="title text-white fw-bold d-sm-none">
              {detail.title}
            </h1>
            <img
              alt="poster"
              src={`https://image.tmdb.org/t/p/original/${detail.poster}`}
              className="poster"
            />
          </div>
          <div className="desc-detail position-relative me-auto w-100">
            <h1 className="title text-white fw-bold d-none d-sm-block">
              {detail.title}
            </h1>
            <div className="d-flex gap-2 mt-3 mt-sm-0 w-100 flex-wrap">
              {detail.genres &&
                detail.genres.map((item) => (
                  <p className="genre px-2 py-1 ">{item}</p>
                ))}
            </div>
            <button className="my-button py-3 fw-bold mt-2 d-block w-100 d-sm-none">
              Watch Trailer
            </button>
            <div className="d-flex rating-detail px-3 justify-content-start mt-4 mb-2">
              <img
                alt=""
                src={rating}
                width="80"
                height="16"
                className="star-detail position-absolute start-0"
              />
              <p
                className="value-rating-detail fw-bold ms-2 "
                style={{ marginTop: "-3px", color: "#bbbbbb" }}
              >
                {" "}
                4.9 / 5
              </p>
            </div>
            <h4 className="overview text-white">Overview</h4>
            <p className="synopsis">{detail.synopsis}</p>
            <h4 className="actor-title text-white">Main Actors</h4>
            <div className="actors-name d-flex gap-4 mt-3 w-100 flex-wrap">
              {detail.casts &&
                detail.casts.slice(0, 4).map((item) => (
                  <div>
                    <img
                      alt=""
                      src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                      width="60"
                      height="62"
                      className="star-detail d-block text-center m-auto rounded-circle"
                    />{" "}
                    <p className="text-white" style={{ fontSize: "14px" }}>
                      {item.name}
                    </p>
                  </div>
                ))}
            </div>
            <button className="my-button py-3 fw-bold mt-2 d-none d-sm-block">
              Watch Trailer
            </button>
          </div>
        </Container>
      </div>
      <Container className="px-5">
        <div className="wrapper-reviews">
          <div className="header-reviews d-sm-flex justify-content-between">
            <h2 className="text-white fw-bold">
              User Reviews{" "}
              <img
                src={cevRight}
                alt="cevRight"
                width="22px"
                height="22px"
                className="ms-2"
              />
            </h2>
            <button
              onClick={() => setModalShow(true)}
              className="btn-review me-auto fw-bold border-0 text-decoration-none px-1 px-sm-4 mt-2"
            >
              <span className="me-2">+</span>Add Review
            </button>
          </div>
          {/* modal */}
          <ModalReview
            imagePath={detail.poster}
            title={detail.title}
            show={modalShow}
            onHide={() => setModalShow(false)}
            id={detail._id}
          />
          {detail.reviews &&
            detail.reviews.map((i) => (
              <div className="mb-5">
                <div
                  className="review p-4 shadow-lg mt-4 rounded-1 position-relative"
                  style={{ backgroundColor: "#292929", color: "#bbbbbb" }}
                >
                  <div className="title-review d-flex justify-content-between ">
                    <h3 className="text-white">{i.title}</h3>
                    <div className="d-flex rating-review px-3 mt-2 gap-0">
                      <img
                        alt="rating"
                        src={rating}
                        width="80"
                        height="16"
                        className="star-review"
                      />
                      <p
                        className="value-rating-detail fw-bold ms-2 "
                        style={{ marginTop: "-3px", color: "#bbbbbb" }}
                      >
                        {i.rating} / 5
                      </p>
                    </div>
                  </div>
                  <p className="desc-review mt-2">{i.content}</p>
                  <div className="d-flex gap-4 mt-2">
                    <div className="d-flex gap-2">
                      <button className="bg-transparent border-0">
                        <img alt="like" src={like} className="like" />
                      </button>
                      <p className="my-auto text-white">
                        helpful - <span>380</span>
                      </p>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="bg-transparent border-0">
                        <img alt="like" src={dislike} className="dislike" />
                      </button>

                      <p className="my-auto text-white">19</p>
                    </div>
                  </div>
                  <div className="triangle"></div>
                </div>
                <div className="reviewer mt-4">
                  <p>
                    <span className="author">{i.reviewer.first_name}</span> -{" "}
                    <span className="date-created text-white">May 7, 2022</span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default MovieDetail;
