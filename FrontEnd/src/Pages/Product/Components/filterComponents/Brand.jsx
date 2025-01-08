import React from "react";
import { useSelector } from "react-redux";

const Brand = () => {
  const Brands = useSelector((state) => state.product.brands);
  return (
    <div className="">
      <div className="flex gap-2">
        <div className="h-2 w-2 border-2 border-gray-400 rounded-full"></div>
        <h2 className="">Brands</h2>
      </div>
      <div className="">
        {Brands.map((brand) => (
          <label key={brand} className="block capitalize">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => handleFilterChange()}
            />
            {brand}
          </label>
        ))}{" "}
      </div>
    </div>
  );
};

export default Brand;
