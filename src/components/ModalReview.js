import React, { useState } from "react";
import "../style/ModalReview.css";
import { Modal, Button, Form } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import {
  createAsyncReviewsMovie,
  getUserReviewsStatus,
} from "../features/movieSlice";
import { useDispatch, useSelector } from "react-redux";
// import star from "react-rating-stars-component/dist/star";

const ModalReview = (props) => {
  const dispatch = useDispatch();

  const [stars, setStars] = useState(0);
  const [reviewTitle, setReviewTitle] = useState();
  const [reviewContent, setReviewContent] = useState();

  let reviewStatus = useSelector(getUserReviewsStatus);

  const ratingChanged = (newRating) => {
    setStars(newRating);
  };

  // const handleInputNewReview = (e) => {
  //   setReview({
  //     ...review,
  //     [e.target.id]: [e.target.value],
  //   });
  // };

  // console.log(props.id);
  // console.log(stars);
  // console.log(reviewContent, reviewTitle);

  const hendleCreateReview = async (e) => {
    e.preventDefault();
    try {
      let userReview = await dispatch(
        createAsyncReviewsMovie({
          id: props.id,
          data: {
            rating: stars,
            title: reviewTitle,
            content: reviewContent,
          },
        })
      );
      console.log(userReview, "result di modal");
    } catch (error) {
      console.log(error);
    }
  };

  const refreshPage = () => {
    window.location.reload();
  };

  console.log(reviewStatus);

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <div className="d-flex gap-3">
          <img
            src={`https://image.tmdb.org/t/p/original/${props.imagePath}`}
            alt="header"
            width="40px"
            height="60px"
          />
          <div>
            <h4 className="align-self-center mb-0">{props.title}</h4>
            <p>(2018)</p>
          </div>
        </div>
      </Modal.Header>
      {reviewStatus === "success" ? (
        <div className="p-4">
          <h3 className="fs-6">Thank you for contributing to MOVIEX!</h3>
          <p
            className="text-secondary"
            style={{ fontSize: "14px", lineHeight: "24px" }}
          >
            The information you have supplied is now to be the expression about
            your love to the this movie. Your contributions will be displaying
            as quickly as possible. Our time to publication changes based on the
            type of data you are contributing. You can find more details on our
            processing times page.
          </p>
          <Button className="w-100 bg-success mt-3" onClick={refreshPage}>
            OK
          </Button>
        </div>
      ) : (
        <div>
          <Modal.Body>
            <h4>Your Rating</h4>
            <div className="d-flex">
              {/* https://www.npmjs.com/package/react-rating-stars-component */}
              <ReactStars
                count={5}
                size={24}
                id="rating"
                activeColor="#ffd700"
                onChange={ratingChanged}
              />
              <p className="d-block my-auto ms-2">{stars}/5</p>
            </div>
          </Modal.Body>
          <Modal.Body>
            <h4>Your Review</h4>
            <Form onSubmit={hendleCreateReview}>
              <Form.Group className="mb-3">
                <Form.Control
                  id="title"
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="Write headline of your review"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  id="content"
                  as="textarea"
                  rows={3}
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  placeholder="Write your review description"
                />
              </Form.Group>
              <Modal.Footer>
                <Button type="submit">Submit</Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </div>
      )}
    </Modal>
  );
};

export default ModalReview;
