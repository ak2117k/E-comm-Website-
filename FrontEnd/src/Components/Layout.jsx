import React from "react";
import NavBar from "./NavBar.jsx";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./Footer.jsx";

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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behaviour: "smooth",
    });
  });
  return (
    <>
      <NavBar />
      <div className="Content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
