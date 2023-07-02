import React, { Fragment, useContext, useEffect, useState } from "react";
import "./onefriend.css";
import { allData } from "../../context/Context";
import axios from "axios";

function Onefriend({ id }) {
  const { darkTheme } = useContext(allData);
  const [currentFriend, setCurrentFriend] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:5001/users/${id}`)
    .then(res => setCurrentFriend(res.data))
    ;
  }, []);

  return (
    <Fragment>
      <div
        className={
          darkTheme ? "friend-container dark-theme" : "friend-container"
        }
        id={id}
      >
        <div className="friend-image-container">
          <img src={currentFriend?.image} alt={currentFriend?.username} />
        </div>
        <div className="friend-name-container">{currentFriend?.username}</div>
      </div>
    </Fragment>
  );
}

export default Onefriend;
