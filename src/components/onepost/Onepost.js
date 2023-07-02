import React, { Fragment, useContext, useEffect, useState } from "react";
import "./onepost.css";
import { allData } from "../../context/Context";
import {
  AiFillLike,
  AiOutlineLike,
  AiFillCloseCircle,
  AiOutlineEdit,
  AiFillDelete,
} from "react-icons/ai";
import { Onecomment, Newcomment } from "../Index";
import axios from "axios";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { FaRegCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Onepost({
  user,
  userid,
  content,
  likes,
  comments,
  id,
  date,
  time,
  edited,
}) {
  const { darkTheme, signedInUser, setRefresh, refresh } = useContext(allData);
  const [isShowComments, setIsShowComments] = useState(false);
  const [isLikeForSignedInUser, setIsLikeForSignedInUser] = useState(false);
  const [postObject, setPostObject] = useState({});
  const [updatedLikes, setUpdatedLikes] = useState(likes);
  const [showLikes, setShowLikes] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [postContent, setPostContent] = useState(content);
  const [showAddCommentPopup, setShowAddCommentPopup] = useState(false);
  const [postUserImage, setPostUserImage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5001/posts/${id}`)
      .then((res) => setPostObject(res.data));
    for (let i = 0; i < likes.length; i++) {
      if (signedInUser.id === likes[i].userid) {
        setIsLikeForSignedInUser(true);
        break;
      }
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/users/${userid}`)
      .then((res) => setPostUserImage(res.data.image));
  });

  const deleteLikeHandler = () => {
    const updatedLikesToBeStored = likes.filter(
      (item) => item.userid !== signedInUser.id
    );
    setUpdatedLikes(updatedLikesToBeStored);
    const updatedPostObject = { ...postObject, likes: updatedLikesToBeStored };
    setIsLikeForSignedInUser(false);
    axios.put(`http://localhost:5001/posts/${id}`, updatedPostObject);
  };

  const addLikeHandler = () => {
    const updatedLikesToBeStored = [
      ...updatedLikes,
      {
        name: signedInUser.username,
        userid: signedInUser.id,
        image: signedInUser.image,
      },
    ];
    setUpdatedLikes(updatedLikesToBeStored);
    const updatedPostObject = { ...postObject, likes: updatedLikesToBeStored };
    setIsLikeForSignedInUser(true);
    axios.put(`http://localhost:5001/posts/${id}`, updatedPostObject);
  };

  const addLikeClassNameHandler = () => {
    if (darkTheme && isLikeForSignedInUser) {
      return "onepost-delete-like dark-theme";
    } else if (darkTheme && !isLikeForSignedInUser) {
      return "onepost-add-like dark-theme";
    } else if (isLikeForSignedInUser && !darkTheme) {
      return "onepost-delete-like";
    } else if (!isLikeForSignedInUser && !darkTheme) {
      return "onepost-add-like";
    }
  };

  const deletePostHandler = () => {
    axios.delete(`http://localhost:5001/posts/${id}`);
    setRefresh(!refresh);
  };

  const editPostHandler = () => {
    const newPostObjectToBeUploaded = {
      ...postObject,
      content: postContent,
      edited: true,
    };
    axios.put(`http://localhost:5001/posts/${id}`, newPostObjectToBeUploaded);
    setRefresh(!refresh);
  };

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

  const displayComments = comments.map((comment) => {
    return (
      <Onecomment
        key={Math.random()}
        username={comment.username}
        userid={comment.userid}
        content={comment.content}
        image={comment.image}
        date={comment.date}
        time={comment.time}
        postid={id}
      />
    );
  });

  const displayLikes = updatedLikes.map((item) => {
    return (
      <Fragment>
        <div className="specific-like-container">
          <div className="specific-like-image-container">
            <Link to={`/profile/${item.userid}`}>
              <img src={item.image} alt="user-pic" />
            </Link>
          </div>
          <div className="specific-like-name-container">{item.name}</div>
        </div>
      </Fragment>
    );
  });

  return (
    <Fragment>
      <div
        className={
          darkTheme ? "onepost-container dark-theme" : "onepost-container"
        }
        id={userid}
      >
        <div className="onepost-user-container">
          <div className="onepost-user-container-header">
            <div className="onepost-user-image-container">
              <Link to={`/profile/${userid}`}>
                <img src={postUserImage} alt="user-pic" />
              </Link>
            </div>
            <div className="onepost-user-name-time-container">
              <div className="onepost-user-name-container">{user}</div>
              <div className="onepost-user-time-container">
                {displayTimeHandler()} {edited ? ". Edited" : null}
              </div>
            </div>
          </div>
          {signedInUser?.id === userid ? (
            <div className="onepost-user-container-edit-delete">
              <div
                className="onepost-user-container-edit"
                onClick={() => setShowEditPopup(true)}
              >
                <AiOutlineEdit />
              </div>
              <div
                className="onepost-user-container-delete"
                onClick={() => setShowDeleteAlert(true)}
              >
                <AiFillDelete />
              </div>
            </div>
          ) : null}
        </div>
        <div className="onepost-content">{content}</div>
        <div className="onepost-likes-container">
          <div
            className="onepost-likes-counter"
            onClick={() => {
              setShowLikes(true);
            }}
          >
            <AiFillLike /> {updatedLikes.length}
          </div>
          {comments.length === 0 ? (
            <div className="onepost-comments-counter no-comments">
              No Comments
            </div>
          ) : (
            <div
              className="onepost-comments-counter"
              onClick={() => setIsShowComments(!isShowComments)}
            >
              {comments.length} Comments
            </div>
          )}
        </div>
        <div className="onepost-add-like-comment">
          {isLikeForSignedInUser ? (
            <div
              className={addLikeClassNameHandler()}
              onClick={() => deleteLikeHandler()}
            >
              <AiFillLike /> Like
            </div>
          ) : (
            <div
              className={addLikeClassNameHandler()}
              onClick={() => addLikeHandler()}
            >
              <AiOutlineLike /> Like
            </div>
          )}
          <div
            className={
              darkTheme
                ? "onepost-add-comment dark-theme"
                : "onepost-add-comment"
            }
            onClick={() => setShowAddCommentPopup(true)}
          >
            <FaRegCommentAlt /> Comment
          </div>
        </div>
        <div
          className={
            isShowComments
              ? "onepost-comments-container"
              : "onepost-comments-container none"
          }
        >
          Comments
          {displayComments}
        </div>
      </div>
      {showLikes ? (
        <div
          className={
            darkTheme ? "showlikes-container dark-theme" : "showlikes-container"
          }
        >
          <div className="showlike-header-container">
            <div
              className={
                darkTheme
                  ? "showlike-header-like dark-theme"
                  : "showlike-header-like"
              }
            >
              <AiFillLike />
            </div>
            <div
              className="showlike-header-close"
              onClick={() => {
                setShowLikes(false);
              }}
            >
              <AiFillCloseCircle />
            </div>
          </div>
          <div className="showlike-header-body">{displayLikes.reverse()}</div>
        </div>
      ) : null}
      {showDeleteAlert ? (
        <div
          className={
            darkTheme ? "delete-post-popup dark-theme" : "delete-post-popup"
          }
        >
          <div className="delete-post-popup-content">
            Are you sure you want to delete your post ?
          </div>
          <div className="delete-post-popup-options">
            <div
              className={
                darkTheme
                  ? "delete-post-popup-true-option dark-theme"
                  : "delete-post-popup-true-option"
              }
              onClick={() => deletePostHandler()}
            >
              <TiTick />
            </div>
            <div
              className={
                darkTheme
                  ? "delete-post-popup-false-option dark-theme"
                  : "delete-post-popup-false-option"
              }
              onClick={() => setShowDeleteAlert(false)}
            >
              <ImCross />
            </div>
          </div>
        </div>
      ) : null}
      {showEditPopup ? (
        <div
          className={
            darkTheme
              ? "edit-post-popup-container dark-theme"
              : "edit-post-popup-container"
          }
        >
          <div className="post-creater-popup-header">
            <div
              className="post-creater-popup-header-close-container"
              onClick={() => setShowEditPopup(false)}
            >
              <AiFillCloseCircle />
            </div>
          </div>
          <div className="post-creater-popup-body">
            <textarea
              type="text"
              placeholder="Type your new post content"
              className={
                darkTheme
                  ? "post-creater-content dark-theme"
                  : "post-creater-content"
              }
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            ></textarea>
          </div>
          <button
            className={
              darkTheme
                ? "create-new-post-cta-btn dark-theme"
                : "create-new-post-cta-btn"
            }
            disabled={!postContent.length > 0}
            onClick={() => {
              editPostHandler();
              setShowEditPopup(false);
            }}
          >
            Edit
          </button>
        </div>
      ) : null}
      {showAddCommentPopup ? (
        <Newcomment
          setShowAddCommentPopup={setShowAddCommentPopup}
          id={id}
          postObject={postObject}
          setPostObject={setPostObject}
        />
      ) : null}
    </Fragment>
  );
}

export default Onepost;
