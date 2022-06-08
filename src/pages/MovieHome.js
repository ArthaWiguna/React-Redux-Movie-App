import { React, useEffect } from "react";
import MovieNavbar from "../components/MovieNavbar";
import "../style/MovieHome.css";
import MovieHeader from "../components/MovieHeader";
import MovieCard from "../components/MovieCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper";
import Footer from "../components/Footer";
import { Row, Col, Spinner, Container, Pagination } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncMoviesGenre,
  fetchAsyncMovieSelected,
  fetchAsyncSearchMovie,
  getAllMovies,
  getTotalPages,
  getAllMoviesGenre,
  getStatus,
  getTitleSearch,
  setSearchMovie,
  setCurrentPage,
  setGenre,
  getCurrentPage,
  getGenre,
} from "../features/movieSlice";
//import { motion } from "framer-motion";

const MovieHome = () => {
  const dispatch = useDispatch();
  const movies = useSelector(getAllMovies);
  const totalPages = useSelector(getTotalPages);
  const moviesGenre = useSelector(getAllMoviesGenre);
  const status = useSelector(getStatus);
  const titleSearch = useSelector(getTitleSearch);
  const page = useSelector(getCurrentPage);
  const genre = useSelector(getGenre);

  // const [genre, setGenre] = useState("All");

  useEffect(() => {
    dispatch(fetchAsyncMovies({ page: 1, limit: 12, search: "" }));
    dispatch(fetchAsyncMoviesGenre());
    dispatch(setSearchMovie(null));
  }, [dispatch]);

  //Pagination
  //https://github.com/lukaaspl/ellipsis-pagination/blob/master/src/components/Pagination.js
  const onPageNumberClick = (number) => {
    dispatch(setCurrentPage(number));
  };

  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        className="me-2"
        key={number}
        onClick={() => onPageNumberClick(number)}
        active={number === page}
      >
        {number}
      </Pagination.Item>
    );
  }

  // const tesClick = () => {
  //   console.log("test click");
  // };

  console.log(movies);

  return (
    <div>
      <MovieNavbar />
      <MovieHeader />
      <Container className="feature-movie">
        <Row className="justify-content-between mt-5 w-100">
          <Col md="8">
            <h2 className="feature-title text-white fw-bold mt-0 mb-4">
              Browse by category
            </h2>
          </Col>
        </Row>
        {/* Genre */}
        <div className="carousel-genre w-100">
          <Swiper
            slidesPerView={2.6}
            spaceBetween={10}
            breakpoints={{
              576: {
                slidesPerView: 5.6,
                spaceBetween: 30,
              },
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="genre-item">
                <button
                  className={
                    genre === "All"
                      ? "btn active mb-2 w-100 text-decoration-none text-white"
                      : "btn mb-2 w-100 text-decoration-none text-white"
                  }
                  onClick={() => {
                    dispatch(fetchAsyncMovies({ page: 1, limit: 12 }));
                    onPageNumberClick(1);
                    // setGenre("All");
                    dispatch(setGenre("All"));
                  }}
                >
                  All
                </button>
              </div>
            </SwiperSlide>
            {moviesGenre &&
              moviesGenre.map((item) => (
                <SwiperSlide>
                  <div className="genre-item">
                    <button
                      className={
                        genre === item
                          ? "btn active mb-2 w-100 text-decoration-none text-white rounded-0"
                          : "btn mb-2 w-100 text-decoration-none text-white rounded-0"
                      }
                      onClick={() => {
                        // setGenre(item.genre);
                        dispatch(setGenre(item));
                        onPageNumberClick(1);
                        dispatch(
                          fetchAsyncMovieSelected({
                            page: 1,
                            limit: 12,
                            genre: item,
                          })
                        );
                      }}
                    >
                      {item}
                    </button>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        {/* Movies Card */}
        {status === "loading" ? (
          <div className="text-center mt-5" style={{ height: "100vh" }}>
            <Spinner animation="grow" variant="white" />
            <Spinner animation="grow" variant="white" />
            <Spinner animation="grow" variant="white" />
          </div>
        ) : (
          <Row className="mt-5">
            {movies &&
              movies.map((item) => <MovieCard key={item._id} data={item} />)}
          </Row>
        )}

        {/* Pagination */}
        <div className="pagination mt-5 d-flex justify-content-center">
          {(() => {
            if (genre === "All" && !titleSearch) {
              return (
                <Pagination
                  onClick={(e) => {
                    dispatch(
                      fetchAsyncMovies({
                        page: e.target.innerHTML,
                        limit: 12,
                        search: " ",
                      })
                    );
                  }}
                >
                  {items}
                </Pagination>
              );
            } else if (genre !== "All" && !titleSearch) {
              return (
                <Pagination
                  onClick={(e) => {
                    dispatch(
                      fetchAsyncMovieSelected({
                        page: e.target.innerHTML,
                        limit: 12,
                        genre: genre,
                      })
                    );
                    console.log(genre);
                  }}
                >
                  {items}
                </Pagination>
              );
            } else if (titleSearch) {
              return (
                <Pagination
                  onClick={(e) => {
                    dispatch(
                      fetchAsyncSearchMovie({
                        page: e.target.innerHTML,
                        limit: 12,
                        search: titleSearch,
                      })
                    );
                    console.log(genre);
                  }}
                >
                  {items}
                </Pagination>
              );
            }
          })()}
        </div>
        <Footer />
      </Container>
      {/* // </motion.div> */}
    </div>
  );
};

export default MovieHome;
