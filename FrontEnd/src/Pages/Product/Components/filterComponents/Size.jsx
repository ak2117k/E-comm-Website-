import React from "react";
import { useSelector } from "react-redux";

const Size = () => {
  const category = useSelector((state) => state.product.category);
  const allSizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "28",
    "30",
    "32",
    "34",
    "36",
    "38",
  ];
  const topSizes = ["XS", "S", "M", "L", "XL"];
  const bottomSizes = ["28", "30", "32", "34", "36", "38"];
  return (
    <div className="">
      <div className="flex gap-2">
        <div className="h-2 w-2 border-2 border-gray-400 rounded-full"></div>
        <h2 className="">Sizes</h2>
      </div>{" "}
      {category.length > 1 &&
      (category.includes("shorts") || category.includes("pants")) ? (
        <div className="">
          {allSizes.map((size) => (
            <label key={size} className="block capitalize">
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => handleFilterChange()}
              />
              {size}
            </label>
          ))}{" "}
        </div>
      ) : category.includes("pants") || category.includes("shorts") ? (
        <div className="">
          {bottomSizes.map((size) => (
            <label key={size} className="block capitalize">
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => handleFilterChange()}
              />
              {size}
            </label>
          ))}
        </div>
      ) : (
        <div className="">
          {topSizes.map((size) => (
            <label key={size} className="block capitalize">
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => handleFilterChange()}
              />
              {size}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Size;
