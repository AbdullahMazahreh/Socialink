import React, { createContext, useEffect, useState } from "react";
import logolighttheme from "./socialink-low-resolution-logo-black-on-transparent-background.png";
import logodarktheme from "./socialink-low-resolution-logo-white-on-transparent-background.png";
import axios from "axios";
export const allData = createContext();

export function ContextProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(false);
  const [signedInUser, setSignedInUser] = useState();
  const [refresh, setRefresh] = useState(false);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    if (sessionStorage.loginkey !== null) {
      setSignedInUser(JSON.parse(sessionStorage.getItem("loginkey")));
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5001/posts")
      .then((res) => setAllPosts(res.data));
  }, [refresh]);

  const darkThemeHandler = () => {
    setDarkTheme(!darkTheme);
  };

  const valueToshare = {
    darkTheme,
    darkThemeHandler,
    logolighttheme,
    logodarktheme,
    signedInUser,
    setSignedInUser,
    refresh,
    setRefresh,
    allPosts,
    setAllPosts,
  };

  return <allData.Provider value={valueToshare}>{children}</allData.Provider>;
}
