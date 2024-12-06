import React from "react";
import NavBar from "./NavBar.jsx";
import { Outlet } from "react-router-dom";
import store from "../Storee/Store.js";
import { Provider } from "react-redux";

const Layout = () => {
  return (
    <div>
      <Provider store={store}>
        <NavBar />
        <div className="Content">
          <Outlet />
        </div>
      </Provider>
    </div>
  );
};

export default Layout;
