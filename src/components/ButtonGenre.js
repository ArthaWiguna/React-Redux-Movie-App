import React, { useEffect } from "react";
import { Button, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchAsyncMovieSelected } from "../features/movieSlice";

function ButtonGenre({ genre, page }) {
  // console.log(genre, page);
  const dispatch = useDispatch();

  const getMovies = (genre, page) => {
    dispatch(fetchAsyncMovieSelected({ genre: genre, page: page }));
  };

  return (
    <Col md="2">
      <Button
        className="btn btn-prima mb-2"
        onClick={() => {
          dispatch(fetchAsyncMovieSelected({ genre: genre }));
        }}
      >
        {genre}
      </Button>
    </Col>
  );
}

export default ButtonGenre;
