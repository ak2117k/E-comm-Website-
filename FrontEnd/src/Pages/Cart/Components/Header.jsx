import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const Products = useSelector((state) => state.cart.cart);
  return (
    <div className="">
      <div className="font-bold text-[22px] text-[rgb(54,53,55)]">
        My Bag{" "}
        {Products?.length > 0 && (
          <span className="font-light text-[15px]">
            {Products?.length} Items
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
