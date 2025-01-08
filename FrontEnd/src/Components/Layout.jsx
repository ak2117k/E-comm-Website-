import React from "react";
import NavBar from "./NavBar.jsx";
import { Outlet, useLocation } from "react-router-dom";
import store from "../Storee/Store.js";
import { Provider } from "react-redux";
import { useEffect } from "react";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    const lastloc = location.pathname;
    if (
      !lastloc.includes("login") &&
      !lastloc.includes("signup") &&
      !lastloc.includes("sign-in")
    ) {
      localStorage.setItem("lastlocation", lastloc);
    }
  }, [location]);
  return (
    <Provider store={store}>
      <NavBar />
      <div className="Content">
        <Outlet />
      </div>
    </Provider>
  );
};

export default Layout;
