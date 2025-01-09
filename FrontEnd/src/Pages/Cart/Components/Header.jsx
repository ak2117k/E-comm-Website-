import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const Products = useSelector((state) => state.cart.cart);
  return (
    <div className="w-full">
      <h1 className="flex gap-2 font-semibold text-[18px]">
        My Bag
        <span className="font-bold">{`(${Products.length} Items )`}</span>
      </h1>
    </div>
  );
};

export default Header;
