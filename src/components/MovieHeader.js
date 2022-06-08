import "../style/MovieHeader.css";
import Slide1 from "../asset/Slide1.png";
import rating from "../asset/StarFill.svg";

import { Row, Col, Container } from "react-bootstrap";

const MovieHeader = () => {
  return (
    <div
      className="header-image w-100 py-sm-0"
      style={{ backgroundImage: `url(${Slide1})` }}
    >
      <Container>
        <Row className="header-content" style={{ marginTop: "190px" }}>
          <Col className="header-items">
            <p className="genre px-2 py-1">Science Fiction</p>
            <div className="d-flex justify-content-start gap-2">
              <img alt="rating" src={rating} width="16" height="16" />
              <p className="value-rating fw-bold">4.9 / 5</p>
            </div>
            <h1 className="title text-white">Godzilla vs. Kong</h1>
            <p className="desc text-white mt-2">
              In a time when monsters walk the Earth, humanity’s fight for its
              future sets Godzilla and <br /> Kong on a collision course that
              will see the two most powerful forces of nature on the <br />{" "}
              planet collide in a spectacular battle for the agess.
            </p>
            <button className="my-button py-3">Watch Trailer</button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieHeader;
