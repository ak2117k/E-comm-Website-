import React from "react";
import { useSelector } from "react-redux";

const Discount = () => {
  const Discount = useSelector((state) => state.product.discounts);
  return (
    <div className="">
      <div className="flex gap-2">
        <div className="h-2 w-2 border-2 border-gray-400 rounded-full"></div>
        <h2 className="">Discount</h2>
      </div>
      <div className="">
        {Discount.map(
          (discount) =>
            discount !== 0 && (
              <label key={discount} className="block capitalize">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={() => handleFilterChange()}
                />
                {discount}% Or More
              </label>
            )
        )}{" "}
      </div>
    </div>
  );
};

export default Discount;
