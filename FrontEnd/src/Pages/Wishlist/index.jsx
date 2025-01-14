import React from "react";
import Items from "./Components/Items";
import Header from "./Components/Header";
import Category from "./Components/Category";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const index = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="mt-10 p-6 ml-20">
      <div className="">
        <Header />
      </div>
      <div className="">
        <Category />
      </div>
      <div className="">
        <Items />
      </div>
    </div>
  );
};

export default index;
