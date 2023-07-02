import React, { Fragment, useContext } from "react";
import heroimage from "./new-is-it-healthy-to-chat-with-random-people-online-1.jpg";
import { allData } from "../../context/Context";
import "./herosection.css";
import { Signupform } from "../Index";

function Herosection() {
  const { darkTheme, logolighttheme, logodarktheme } = useContext(allData);
  return (
    <Fragment>
      <div className={darkTheme ? "hero-section dark-theme" : "hero-section"}>
        <div className="hero-section-leftside">
          <div className="herosection-logo-container">
            <img src={darkTheme ? logodarktheme : logolighttheme} alt="logo" />
          </div>
          <div className="herosection-title">
            Welcome to sociaLink, Here you can post, comment and chat with your
            friends. All in one place sociaLink
          </div>
          <div className="herosection-content">
            Start now by signing up and join thousands of people building our
            community .
          </div>
          <div className="signupform-container">
            <Signupform />
          </div>
        </div>
        <div className="hero-section-rightside">
          <img src={heroimage} alt="hero" className={darkTheme ? "image-darktheme" : null} />
        </div>
      </div>
    </Fragment>
  );
}

export default Herosection;
