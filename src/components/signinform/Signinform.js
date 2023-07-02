import React, { Fragment, useContext, useEffect, useState } from "react";
import "./signinform.css";
import { allData } from "../../context/Context";
import axios from "axios";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router";

function Signinform() {
  const { setSignedInUser, darkTheme } = useContext(allData);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [users, setUsers] = useState([]);
  const [showIsWrongDiv, setShowIsWrongDiv] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5001/users").then((res) => setUsers(res.data));
  }, []);

  const signInHandler = (e) => {
    e.preventDefault();
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === emailValue) {
        if (users[i].password === passwordValue) {
          navigate("/postfeed");
          sessionStorage.setItem("loginkey", JSON.stringify(users[i]));
          setSignedInUser(JSON.parse(sessionStorage.getItem("loginkey")));
          return;
        }
      }
    }
    setShowIsWrongDiv(true);
  };

  return (
    <Fragment>
      <h2 className="signin-title">Welcome back</h2>
      <form className="signin-form">
        <input
          type="text"
          className={darkTheme ? "signin-input dark-theme" : "signin-input"}
          placeholder="E-mail"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        ></input>
        <div className="signin-password-container">
          <input
            type={isPasswordVisible ? "text" : "password"}
            className={darkTheme ? "signin-input dark-theme" : "signin-input"}
            placeholder="Password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          ></input>
          <div
            className="signin-eye-container"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
          </div>
          <div
            className={
              showIsWrongDiv ? "signin-wrong-info block" : "signin-wrong-info"
            }
          >
            E-mail or password are wrong
          </div>
        </div>
        <div className="signup-btn-container">
          <input
            type="submit"
            value="Sign In"
            className={darkTheme ? "submit-btn dark-theme" : "submit-btn"}
            onClick={(e) => signInHandler(e)}
          ></input>
        </div>
      </form>
    </Fragment>
  );
}

export default Signinform;
