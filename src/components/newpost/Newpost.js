import React, { Fragment, useContext, useState } from "react";
import "./newpost.css";
import { allData } from "../../context/Context";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";

function Newpost() {
  const { darkTheme, signedInUser, setRefresh, refresh } = useContext(allData);
  const [isNewPostPopup, setIsNewPostPopup] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");

  const addNewPostHandler = () => {
    const d = new Date();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    const months = d.getMonth() + 1;
    const days = d.getDate();
    const newPost = {
      username: signedInUser.username,
      userid: signedInUser.id,
      image: signedInUser.image,
      content: newPostContent,
      edited: false,
      likes: [],
      comments: [],
      time: {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      },
      date: {
        month: months,
        day: days,
      },
    };
    axios.post("http://localhost:5001/posts", newPost);
    setIsNewPostPopup(false);
    setRefresh(!refresh)
  };

  return (
    <Fragment>
      <div
        className={
          darkTheme
            ? "newpost-creater-container dark-theme"
            : "newpost-creater-container"
        }
      >
        <div className="newpost-currentuser-image-container">
          <img src={signedInUser?.image} alt="user-pic" />
        </div>
        <div
          className={
            darkTheme ? "create-new-post dark-theme" : "create-new-post"
          }
          onClick={() => setIsNewPostPopup(true)}
        >
          {signedInUser?.username} what's in your mind ?
        </div>
      </div>
      {isNewPostPopup ? (
        <div
          className={
            darkTheme ? "post-creater-popup dark-theme" : "post-creater-popup"
          }
        >
          <div className="post-creater-popup-header">
            <div
              className="post-creater-popup-header-close-container"
              onClick={() => setIsNewPostPopup(false)}
            >
              <AiFillCloseCircle />
            </div>
          </div>
          <div className="post-creater-popup-body">
            <textarea
              type="text"
              placeholder="What's in your mind"
              className={
                darkTheme
                  ? "post-creater-content dark-theme"
                  : "post-creater-content"
              }
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            ></textarea>
          </div>
          <button
            className={
              darkTheme
                ? "create-new-post-cta-btn dark-theme"
                : "create-new-post-cta-btn"
            }
            disabled={!newPostContent.length > 0}
            onClick={() => addNewPostHandler()}
          >
            Post
          </button>
        </div>
      ) : null}
    </Fragment>
  );
}

export default Newpost;
