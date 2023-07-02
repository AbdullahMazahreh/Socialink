import React, { Fragment, useContext, useState, useEffect } from "react";
import "./onecomment.css";
import { allData } from "../../context/Context";
import axios from "axios";

function Onecomment({ username, userid, content, date, time, postid }) {
  const { darkTheme } = useContext(allData);
  const [commentUserImage, setCommentUserImage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5001/users/${userid}`)
      .then((res) => setCommentUserImage(res.data.image));
  });

  const displayTimeHandler = () => {
    const d = new Date();
    const seconds = d.getSeconds();
    const minutes = d.getMinutes();
    const hours = d.getHours();
    const days = d.getDate();
    const month = d.getMonth() + 1;
    if (date.month - month === 0) {
      if (date.day - days === 0) {
        if (time.hours - hours === 0) {
          if (time.minutes - minutes === 0) {
            if (time.seconds - seconds) {
              return "Now";
            } else {
              return `${seconds - time.seconds} seconds ago`;
            }
          } else {
            return `${minutes - time.minutes} minutes ago`;
          }
        } else {
          return `${hours - time.hours} hours ago`;
        }
      } else {
        return `${days - date.day} days ago`;
      }
    } else {
      return `${month - date.month} months ago`;
    }
  };

  return (
    <Fragment>
      <div
        className={
          darkTheme ? "onecomment-container dark-theme" : "onecomment-container"
        }
        id={userid}
      >
        <div className="onecomment-user-container">
          <div className="onecomment-user-image-container">
            <img src={commentUserImage} alt="user-pic" />
          </div>
          <div className="onecomment-user-name-time-container">
            <div className="onecomment-user-name-container">{username}</div>
            <div className="onecomment-user-time-container">
              {displayTimeHandler()}
            </div>
          </div>
        </div>
        <div className="onecomment-user-content-container">{content}</div>
      </div>
    </Fragment>
  );
}

export default Onecomment;
