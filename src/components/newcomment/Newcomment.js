import React, { Fragment, useContext, useState } from "react";
import "./newcomment.css";
import { allData } from "../../context/Context";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";

function Newcomment({ setShowAddCommentPopup, id, postObject, setPostObject }) {
  const { darkTheme, signedInUser, setRefresh, refresh } = useContext(allData);
  const [newCommentValue, setNewCOmmentValue] = useState("");

  const addNewCommentHandler = () => {
    const d = new Date();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    const months = d.getMonth() + 1;
    const days = d.getDate();
    const newComment = {
      content: newCommentValue,
      username: signedInUser.username,
      userid: signedInUser.id,
      likes: [],
      time: {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      },
      date: {
        month: months,
        day: days,
      },
      id: d,
      image: signedInUser.image,
    };
    const newPostObject = {
      ...postObject,
      comments: [...postObject.comments, newComment],
    };
    setPostObject(newPostObject);
    axios.put(`http://localhost:5001/posts/${id}`, newPostObject);
    setShowAddCommentPopup(false);
    setRefresh(!refresh);
  };

  return (
    <Fragment>
      <div
        className={
          darkTheme
            ? "newcomment-popup-container dark-theme"
            : "newcomment-popup-container"
        }
      >
        <div className="newcomment-popup-header">
          <div
            className="newcomment-popup-exit"
            onClick={() => setShowAddCommentPopup(false)}
          >
            <AiFillCloseCircle />
          </div>
        </div>
        <div className="newcomment-popup-body">
          <textarea
            className={
              darkTheme
                ? "comment-creater-content dark-theme"
                : "comment-creater-content"
            }
            placeholder="Your comment"
            value={newCommentValue}
            onChange={(e) => setNewCOmmentValue(e.target.value)}
          ></textarea>
        </div>
        <button
          className={
            darkTheme
              ? "create-new-comment-cta-btn dark-theme"
              : "create-new-comment-cta-btn"
          }
          disabled={!newCommentValue.length > 0}
          onClick={() => addNewCommentHandler()}
        >
          Comment
        </button>
      </div>
    </Fragment>
  );
}

export default Newcomment;
