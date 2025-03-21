import React from "react";
import { useNavigate } from "react-router-dom";

import Brand from "./filterComponents/Brand";
import Category from "./filterComponents/Category";
import Gender from "./filterComponents/Gender";
import Size from "./filterComponents/Size";
import Color from "./filterComponents/Color";
import Discount from "./filterComponents/Discount";
import { useSelector } from "react-redux";

const Filter = ({ setFilters, filters, allSizes, topSizes, bottomSizes }) => {
  const allGender = useSelector((state) => state.product.gender);
  const discounts = useSelector((state) => state.product.discounts);
  const categories = useSelector((state) => state.product.category);
  console.log("categories", categories);

  const navigate = useNavigate();

  const handleClearFilter = () => {
    setFilters({
      ...filters,
      gender: [],
      Category: [],
      sizes: [],
      brand: [],
      color: [],
      discount: [],
    });
    navigate(window.location.pathname, { replace: true });
  };

  const filtersCount = Object.values(filters).filter(
    (val) => val.length > 0
  ).length;

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="font-semibold text-md">
          Filters {filtersCount > 0 && `(${filtersCount})`}
        </h1>
        {filtersCount > 0 && (
          <button
            className="text-[rgb(51,157,156)] cursor-pointer"
            onClick={handleClearFilter}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Render Gender filter */}
      {/* {allGender.length > 1 && (
        <div>
          <Gender filters={filters} setFilters={setFilters} />
        </div>
      )} */}

      {/* Render Category filter */}
      {/* {allGender.length === 1 && (
        <div>
          <Category filters={filters} setFilters={setFilters} />
        </div>
      )} */}

      {/* Render Size filter */}
      <div>
        <Size
          filters={filters}
          setFilters={setFilters}
          allSizes={allSizes}
          topSizes={topSizes}
          bottomSizes={bottomSizes}
        />
      </div>

      {/* Render Brand filter */}
      <div>
        <Brand filters={filters} setFilters={setFilters} />
      </div>

      {/* Render Color filter */}
      <div>
        <Color filters={filters} setFilters={setFilters} />
      </div>

      {/* Render Discount filter */}
      {discounts.length > 0 && (
        <div>
          <Discount filters={filters} setFilters={setFilters} />
        </div>
      )}
    </div>
  );
};

export default Filter;
