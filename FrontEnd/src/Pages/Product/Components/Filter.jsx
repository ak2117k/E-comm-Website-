import React, { useEffect, useState } from "react";
import Brand from "./filterComponents/Brand";
import Category from "./filterComponents/Category";
import Gender from "./filterComponents/Gender";
import Size from "./filterComponents/Size";
import Color from "./filterComponents/Color";
import Discount from "./filterComponents/Discount";
import { useSelector } from "react-redux";

const Filter = ({ Products }) => {
  const [genders, setGenders] = useState([]);
  const [filters, setFilters] = useState({
    brands: [],
    color: [],
    discount: [],
    sizes: [],
  });
  useEffect(() => {}, [Products]);

  const allGender = useSelector((state) => state.product.gender);
  const discounts = useSelector((state) => state.product.discounts);
  const allBrands = [...new Set(Products.map((product) => product.brand))];
  const allColor = [...new Set(Products.map((product) => product.color))];

  console.log(allBrands, allColor, allGender, discounts);

  console.log(Products);
  return (
    <div className="p-4 ">
      <div className="border-b border-gray-300">
        <h2 className="">Filters</h2>
      </div>

      {allGender.length > 1 && (
        <div className="">
          <Gender />
        </div>
      )}

      {allGender.length == 1 && (
        <div className="">
          <Category />
        </div>
      )}

      <div className="">
        <Size />
      </div>
      <div className="">
        <Brand />
      </div>

      <div className="">
        <Color />
      </div>

      {discounts.length > 0 && (
        <div className="">
          <Discount />
        </div>
      )}
    </div>
  );
};

export default Filter;
