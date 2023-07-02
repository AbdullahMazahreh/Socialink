import React, { useContext } from "react";
import { Fragment } from "react";
import "./navbar.css";
import { allData } from "../../context/Context";
import { BiSun } from "react-icons/bi";
import { BsMoon } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import darkThemeLogoSmallWidth from "./socialink-website-favicon-color.png";
import lightThemeLogoSmallWidth from "./socialink-website-favicon-black.png";

function Navbar() {
  const {
    darkTheme,
    darkThemeHandler,
    logolighttheme,
    logodarktheme,
    signedInUser,
    setSignedInUser,
  } = useContext(allData);

  const navigate = useNavigate();

  const signOutHandler = () => {
    setSignedInUser("");
    navigate("/");
    sessionStorage.removeItem("loginkey");
  };

  return (
    <Fragment>
      <header className={darkTheme ? "header dark-theme" : "header"}>
        <div className="header-leftside">
          <div className="logo-container-small-width">
            {signedInUser ? (
              <Link to="/postfeed">
                <img
                  src={
                    darkTheme
                      ? darkThemeLogoSmallWidth
                      : lightThemeLogoSmallWidth
                  }
                  alt="logo"
                />
              </Link>
            ) : (
              <Link to="/">
                <img
                  src={
                    darkTheme
                      ? darkThemeLogoSmallWidth
                      : lightThemeLogoSmallWidth
                  }
                  alt="logo"
                />
              </Link>
            )}
          </div>
          <div className="logo-container-big-width">
            {signedInUser ? (
              <Link to="/postfeed">
                <img
                  src={darkTheme ? logodarktheme : logolighttheme}
                  alt="logo"
                />
              </Link>
            ) : (
              <Link to="/">
                <img
                  src={darkTheme ? logodarktheme : logolighttheme}
                  alt="logo"
                />
              </Link>
            )}
          </div>
        </div>
        <div className="header-rightside">
          {signedInUser ? (
            <Fragment>
              <div className="navbar-profile-picture">
                <Link to={`/profile/${signedInUser.id}`}>
                  <img src={signedInUser.image} alt="profile-pic" />
                </Link>
              </div>
              <button
                className={
                  darkTheme ? "sign-out-btn dark-theme" : "sign-out-btn"
                }
                onClick={() => signOutHandler()}
              >
                Sign Out
              </button>
            </Fragment>
          ) : (
            <Link
              className={darkTheme ? "signin-btn dark-theme" : "signin-btn"}
              to="/signin"
            >
              Sign In
            </Link>
          )}
          <div
            className={
              darkTheme ? "dark-theme-toggler dark-theme" : "dark-theme-toggler"
            }
            onClick={() => darkThemeHandler()}
          >
            {darkTheme ? <BiSun /> : <BsMoon />}
          </div>
        </div>
      </header>
    </Fragment>
  );
}

export default Navbar;
