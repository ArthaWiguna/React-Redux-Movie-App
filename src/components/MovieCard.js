import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Col } from "react-bootstrap";
import rating from "../asset/StarFill.svg";
import "../style/MovieCard.css";
import plus from "../asset/plus.svg";
import play from "../asset/play-trailer.svg";
import logo from "../asset/logo.png";
import { Link } from "react-router-dom";

const MovieCard = (props) => {
  const movie = props.data;
  return (
    <Col md="3">
      <div className="card-wrapper mb-4">
        <Link className="link" to={{ pathname: `MovieDetail/${movie._id}` }}>
          <LazyLoadImage
            alt="poster"
            src={`https://image.tmdb.org/t/p/original/${movie.poster}`}
            className="poster"
            effect="blur"
            placeholderSrc={logo}
          />
        </Link>
        {/* <a href="/">
          <img alt="" src={favorite} width="30" className="add-favorite" />
        </a> */}
        <div className="position-relative px-3 py-3 mt-3">
          <div>
            <p className="genre px-2 py-1 ">Science Fiction</p>
          </div>
          <div className="d-flex rating px-3 mb-3">
            <img
              alt=""
              src={rating}
              width="80"
              height="16"
              className="star mt-1"
            />
            <p className="value-rating fw-bold px-1">4.9 / 5</p>
          </div>
          <h3 className="movie-title text-white">{movie.title}</h3>
          <button className="btn-watchlist w-100 text-center fw-bold border-0 text-decoration-none py-2 mt-3">
            <img alt="" src={plus} className="icon-plus me-1" /> Watchlist
          </button>
          <button className="btn-trailer w-100 text-center text-white fw-bold border-0 text-decoration-none py-2 mt-2">
            <img alt="" src={play} className="icon-play me-1" /> Trailer
          </button>
        </div>
      </div>
    </Col>
  );
};

export default MovieCard;
