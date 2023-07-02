import "./App.css";
import { Fragment } from "react";
import {
  Landingpage,
  Signinpage,
  Postfeed,
  Profilepage,
} from "./components/Index";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Landingpage />}></Route>
        <Route path="/signin" element={<Signinpage />}></Route>
        <Route path="/postfeed" element={<Postfeed />}></Route>
        <Route path="/Profile/:userId" element={<Profilepage />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
