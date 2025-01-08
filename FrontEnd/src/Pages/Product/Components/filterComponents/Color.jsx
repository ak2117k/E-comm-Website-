import React from "react";
import { useSelector } from "react-redux";

const Color = () => {
  const Color = useSelector((state) => state.product.colors);
  return (
    <div className="">
      <div className="flex gap-2">
        <div className="h-2 w-2 border-2 border-gray-400 rounded-full"></div>
        <h2 className="">Color</h2>
      </div>
      <div className="">
        {Color.map((color) => (
          <label key={color} className="block capitalize">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => handleFilterChange()}
            />
            {color}
          </label>
        ))}{" "}
      </div>
    </div>
  );
};

export default Color;
