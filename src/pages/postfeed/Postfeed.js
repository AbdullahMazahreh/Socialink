import React, { Fragment, useContext } from "react";
import { Navbar, Friendssection, Posts, Newpost } from "../../components/Index";
import { allData } from "../../context/Context";
import "./postfeed.css";

function Postfeed() {
  const { darkTheme } = useContext(allData);

  return (
    <Fragment>
      <Navbar />
      <div
        className={
          darkTheme ? "postfeed-container dark-theme" : "postfeed-container"
        }
      >
        <div className="friends-section-container">
          <Friendssection />
        </div>
        <div className="posts-section-container">
          <Newpost />
          <Posts />
        </div>
      </div>
    </Fragment>
  );
}

export default Postfeed;
