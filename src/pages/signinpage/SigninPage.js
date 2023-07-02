import React, { Fragment, useContext } from "react";
import { Navbar, Signinform, Footer } from "../../components/Index";
import { allData } from "../../context/Context";
import "./signinpage.css";

function SigninPage() {
  const { darkTheme, logolighttheme, logodarktheme } = useContext(allData);
  return (
    <Fragment>
      <Navbar />
      <div className={darkTheme ? "signin-body dark-theme" : "signin-body"}>
        <div className="signin-leftside">
          <img src={darkTheme ? logodarktheme : logolighttheme} alt="logo" />
          <div className="signin-leftside-content">
            Connect with friends and people around you on SociaLink.
          </div>
        </div>
        <div className="signin-rightside">
            <Signinform />
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}

export default SigninPage;
