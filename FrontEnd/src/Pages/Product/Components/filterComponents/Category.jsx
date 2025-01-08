import React from "react";
import { useSelector } from "react-redux";

const Category = () => {
  const category = useSelector((state) => state.product.category);
  return (
    <div className="">
      <div className="flex gap-2">
        <div className="h-2 w-2 border-2 border-gray-400 rounded-full"></div>
        <h2 className="">Category</h2>
      </div>{" "}
      <div className="">
        {category.map((category) => (
          <label key={category} className="block capitalize">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => handleFilterChange()}
            />
            {category}
          </label>
        ))}{" "}
      </div>
    </div>
  );
};

export default Category;
