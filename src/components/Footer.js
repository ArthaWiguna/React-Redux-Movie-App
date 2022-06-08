import React from "react";
import instagram from "../asset/instagram.svg";
import facebook from "../asset/facebook.svg";
import twitter from "../asset/twitter.svg";
import twitch from "../asset/twitch.svg";
import youtube from "../asset/youtube.svg";
import amazon from "../asset/amazon.svg";
import copyright from "../asset/copyright.svg";

const Footer = () => {
  return (
    <div className="wrapper-footer py-5" style={{ marginTop: "94px" }}>
      <div className="social-media d-flex justify-content-center gap-sm-5 gap-3">
        <a href="/">
          <img
            alt="instagram"
            src={instagram}
            width="24"
            height="24"
            className="instagram"
          />
        </a>
        <a href="/">
          <img
            alt="facebook"
            src={facebook}
            width="24"
            height="24"
            className="facebook"
          />
        </a>
        <a href="/">
          <img
            alt="twitter"
            src={twitter}
            width="24"
            height="24"
            className="twitter"
          />
        </a>
        <a href="/">
          <img
            alt="twitch"
            src={twitch}
            width="24"
            height="24"
            className="twitch"
          />
        </a>
        <a href="/">
          <img
            alt="youtube"
            src={youtube}
            width="24"
            height="24"
            className="youtube"
          />
        </a>
      </div>
      <div className="footer-content d-flex justify-content-center gap-3 gap-sm-5 flex-row flex-wrap mt-5">
        <div md="2">
          <a href="/" className="text-decoration-none text-white">
            <p>Get the Moviex App</p>
          </a>
        </div>
        <div md="2">
          <a href="/" className="text-decoration-none text-white">
            <p>Help</p>
          </a>
        </div>
        <div md="2">
          <a href="/" className="text-decoration-none text-white">
            <p>Site Index</p>
          </a>
        </div>
        <div md="2">
          <a href="/" className="text-decoration-none text-white">
            <p>MoviexPro</p>
          </a>
        </div>
        <div md="2">
          <a href="/" className="text-decoration-none text-white">
            <p>Box Office Mojo</p>
          </a>
        </div>
        <div md="2">
          <a href="/" className="text-decoration-none text-white">
            <p>Moviex Developer</p>
          </a>
        </div>
      </div>
      <div className="footer-content d-flex justify-content-center gap-sm-5 gap-3 flex-row flex-wrap">
        <div md="2">
          <a href="/" className="text-decoration-none text-white">
            <p>Press Room</p>
          </a>
        </div>
        <div md="2">
          <a href="/" className="text-decoration-none text-white">
            <p>Interest-Based Ads</p>
          </a>
        </div>
        <div md="2">
          <a href="/" className="text-decoration-none text-white">
            <p>Advertising</p>
          </a>
        </div>
        <div md="2">
          <a href="/" className="text-decoration-none text-white">
            <p>Jobs</p>
          </a>
        </div>
        <div md="2">
          <a href="/" className="text-decoration-none text-white">
            <p>Condition of Use</p>
          </a>
        </div>
        <div md="2">
          <a href="/" className="text-decoration-none text-white">
            <p>Privacy Policy</p>
          </a>
        </div>
      </div>
      <div className="partner text-center mt-3">
        <p className="text-white">
          An{" "}
          <img
            alt="amazon"
            src={amazon}
            width="24"
            height="24"
            className="amazon"
          />{" "}
          Amazon Company Partner
        </p>
      </div>
      <div className="copyright text-center mt-3 pb-0 mb-0">
        <p style={{ color: "#bbbbbb", fontSize: "14px" }}>
          <img
            alt="copyright"
            src={copyright}
            width="18"
            height="18"
            className="copyright"
          />{" "}
          2022 by Moviex.com, Inc.
        </p>
      </div>
    </div>
  );
};

export default Footer;
