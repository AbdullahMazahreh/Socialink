import React, { Fragment, useContext } from "react";
import "./friendssection.css";
import { allData } from "../../context/Context";
import { Onefriend } from "../Index";
import { FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";

function Friendssection() {
  const { signedInUser, darkTheme } = useContext(allData);

  const allFriends = signedInUser?.friends.map((friend) => {
    return <Onefriend id={friend.userid} key={friend.userid} />;
  });

  return (
    <Fragment>
      <div
        className={
          darkTheme
            ? "home-page-friends-container dark-theme"
            : "home-page-friends-container"
        }
      >
        <div
          className={
            darkTheme
              ? "friends-container-header dark-theme"
              : "friends-container-header"
          }
        >
          <div
            className={
              darkTheme
                ? "friends-container-header-profile-container dark-theme"
                : "friends-container-header-profile-container"
            }
          >
            <div className="friends-container-header-profile-image-container">
              <Link to={`/profile/${signedInUser?.id}`}>
                <img src={signedInUser?.image} alt="profile-pic" />
              </Link>
            </div>
            <div className="friends-container-header-profile-name-container">
              {signedInUser?.username}
            </div>
          </div>
          <div
            className={
              darkTheme
                ? "friends-container-header-friends-link-container dark-theme"
                : "friends-container-header-friends-link-container"
            }
          >
            <div className="friends-container-header-friends-link-container-icon">
              <FaUserFriends />
            </div>
            Search for people
          </div>
        </div>
        <div
          className={
            darkTheme
              ? "friends-container-body dark-theme"
              : "friends-container-body"
          }
        >
          <div className="friends-container-body-title">Friends</div>
          {allFriends}
        </div>
      </div>
    </Fragment>
  );
}

export default Friendssection;
