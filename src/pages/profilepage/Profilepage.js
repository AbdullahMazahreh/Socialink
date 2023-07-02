import React, { Fragment, useContext, useEffect, useState } from "react";
import "./profilepage.css";
import { Navbar } from "../../components/Index";
import { useParams } from "react-router";
import { allData } from "../../context/Context";
import axios from "axios";
import { Onepost, Onefriend } from "../../components/Index";
import { AiOutlinePicture, AiFillCloseCircle } from "react-icons/ai";
import { BsPersonFillAdd } from "react-icons/bs";

function Profilepage() {
  const { userId } = useParams();
  const { signedInUser, darkTheme, allPosts, setSignedInUser } =
    useContext(allData);
  const [currentUser, setCurrentUser] = useState({});
  const [changeProfilePicturePopup, setChangeProfilePicturePopup] =
    useState(false);
  const [newProfilePictureURL, setNewProfilePictureURL] = useState("");
  const [refresh, setRefresh] = useState(false);

  const changeProfilePictureHandler = () => {
    const newUserObjectToBeUploaded = {
      ...signedInUser,
      image: newProfilePictureURL,
    };
    setSignedInUser(newUserObjectToBeUploaded);
    axios.put(
      `http://localhost:5001/users/${signedInUser.id}`,
      newUserObjectToBeUploaded
    );
  };

  useEffect(() => {
    axios
      .get("http://localhost:5001/users")
      .then((res) =>
        setCurrentUser(res.data.find((user) => user.id == userId))
      );
  }, [userId, refresh]);

  const addFriendHandler = () => {
    const newFriend1 = {
      userid: userId,
    };
    const addingUserToSignedInUser = {
      ...signedInUser,
      friends: [...signedInUser.friends, newFriend1],
    };
    axios.put(
      `http://localhost:5001/users/${signedInUser.id}`,
      addingUserToSignedInUser
    );
    setSignedInUser(addingUserToSignedInUser);
    const newFriend2 = {
      userid: signedInUser.id,
    };
    const addingUserToTheRequested = {
      ...currentUser,
      friends: [...currentUser.friends, newFriend2],
    };
    axios.put(
      `http://localhost:5001/users/${userId}`,
      addingUserToTheRequested
    );
    setCurrentUser(addingUserToTheRequested);
  };

  const displayUserPosts = allPosts
    ?.filter((post) => post.userid == userId)
    .map((post) => {
      return (
        <Onepost
          id={post.id}
          key={post.id}
          user={post.username}
          userid={post.userid}
          content={post.content}
          likes={post.likes}
          comments={post.comments}
          image={post.image}
          date={post.date}
          time={post.time}
          edited={post.edited}
        />
      );
    });

  const displayAllFriends = currentUser.friends?.map((friend) => {
    return <Onefriend id={friend.userid} key={friend.userid} />;
  });

  return (
    <Fragment>
      <Navbar />
      <div
        className={
          darkTheme ? "profile-container dark-theme" : "profile-container"
        }
      >
        <div className="profile-header-container">
          <div className="profile-header-leftside-container">
            <div className="profile-header-profilepic-container">
              <img src={currentUser.image} alt="user-pic" />
              {signedInUser?.id == userId && (
                <div
                  className={
                    darkTheme
                      ? "profile-change-picture dark-theme"
                      : "profile-change-picture"
                  }
                  onClick={() => setChangeProfilePicturePopup(true)}
                >
                  <AiOutlinePicture />
                </div>
              )}
            </div>
            <div className="profile-header-username-firendscounter-container">
              <div className="profile-header-username-container">
                {currentUser.username}
              </div>
              <div className="profile-header-firendscounter-container">
                {currentUser.friends?.length || 0} Friends
              </div>
            </div>
          </div>
          {signedInUser?.id != userId && (
            <div className="profile-header-rightside-container">
              <button
                className={
                  darkTheme
                    ? "add-friend-btn-cta dark-theme"
                    : "add-friend-btn-cta"
                }
                onClick={() => addFriendHandler()}
              >
                <BsPersonFillAdd /> Add Friend
              </button>
            </div>
          )}
        </div>
        <div className="profile-body-container">
          <div className="profile-body-posts-container">
            <div className="profile-body-posts-name-container">
              {currentUser.username} Posts
            </div>
            {displayUserPosts.reverse()}
          </div>
          <div className="profile-body-friends-container">
            <div className="profile-body-friends-name-container">
              {currentUser.username}'s Friends
            </div>
            {currentUser.friends?.length > 0 ? displayAllFriends : "No Friends"}
          </div>
        </div>
      </div>
      {changeProfilePicturePopup && (
        <div
          className={
            darkTheme ? "change-pp-popup dark-theme" : "change-pp-popup"
          }
        >
          <div className="change-pp-popup-header">
            <div
              className="change-pp-popup-header-close-container"
              onClick={() => setChangeProfilePicturePopup(false)}
            >
              <AiFillCloseCircle />
            </div>
          </div>
          <div className="change-pp-popup-body">
            <input
              value={newProfilePictureURL}
              onChange={(e) => setNewProfilePictureURL(e.target.value)}
              type="text"
              className={
                darkTheme ? "pp-newurl-input dark-theme" : "pp-newurl-input"
              }
              placeholder="Enter URL for new Profile Picture"
            ></input>
          </div>
          <button
            className={
              darkTheme ? "pp-change-cta-btn dark-theme" : "pp-change-cta-btn"
            }
            disabled={!newProfilePictureURL > 0}
            onClick={() => {
              changeProfilePictureHandler();
              setChangeProfilePicturePopup(false);
              setRefresh(!refresh);
            }}
          >
            Change
          </button>
        </div>
      )}
    </Fragment>
  );
}

export default Profilepage;
