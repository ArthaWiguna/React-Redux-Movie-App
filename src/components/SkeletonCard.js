import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Container } from "react-bootstrap";

export const SkeletonCard = (props) => {
  return (
    <div className="wide-wrapper mt-4">
      <Container className="wrapper-detail d-sm-flex justify-content-between gap-0 p-3 flex-row mx-auto">
        <div className="wrapper-poster">
          <Skeleton
            baseColor="#313131"
            highlightColor="#525252"
            borderRadius={0}
            width="70%"
            height={500}
          />
        </div>
        <div className="desc-detail position-relative me-auto w-100">
          <h1 className="title text-white fw-bold d-none d-sm-block">
            <Skeleton
              baseColor="#313131"
              highlightColor="#525252"
              borderRadius={0}
              width={260}
              height={26}
            />
          </h1>
          <button className="my-button py-3 fw-bold mt-2 d-block w-100 d-sm-none">
            Watch Trailer
          </button>
          <div className="rating-detail">
            <div className="d-flex gap-3">
              <Skeleton
                baseColor="#313131"
                highlightColor="#525252"
                borderRadius={0}
                width={80}
                height={26}
              />
              <Skeleton
                baseColor="#313131"
                highlightColor="#525252"
                borderRadius={0}
                width={80}
                height={26}
              />
              <Skeleton
                baseColor="#313131"
                highlightColor="#525252"
                borderRadius={0}
                width={80}
                height={26}
              />
            </div>
            <p className="mt-4">
              <Skeleton
                baseColor="#313131"
                highlightColor="#525252"
                borderRadius={0}
                width={100}
                height={26}
              />
            </p>
          </div>
          <h4 className="overview text-white">
            <Skeleton
              baseColor="#313131"
              highlightColor="#525252"
              borderRadius={0}
              width={100}
              height={26}
            />
          </h4>
          <p className="synopsis">
            {" "}
            <Skeleton
              baseColor="#313131"
              highlightColor="#525252"
              borderRadius={0}
              count={2}
              width={600}
              height={26}
            />
          </p>
          <h4 className="actor-title text-white">
            {" "}
            <Skeleton
              baseColor="#313131"
              highlightColor="#525252"
              borderRadius={0}
              width={100}
              height={26}
            />
          </h4>
          <div className="actors-name mt-3 w-100">
            <div className="d-flex gap-3">
              <Skeleton
                baseColor="#313131"
                highlightColor="#525252"
                circle={true}
                width={50}
                height={50}
              />
              <Skeleton
                baseColor="#313131"
                highlightColor="#525252"
                circle={true}
                width={50}
                height={50}
              />
              <Skeleton
                baseColor="#313131"
                highlightColor="#525252"
                circle={true}
                width={50}
                height={50}
              />
            </div>
          </div>
          <div className="mt-3">
            <Skeleton
              baseColor="#313131"
              highlightColor="#525252"
              borderRadius={0}
              width={200}
              height={60}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};
