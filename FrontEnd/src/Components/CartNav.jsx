import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CartNav = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="">
      <div className="flex p-4 justify-between w-screen">
        <div className=" ml-4 pl-40">
          <Link to="/" className="inline">
            <img
              title="bewakoof logo"
              alt="bewakoof logo"
              fetchpriority="high"
              loading="lazy"
              width="150"
              height="20"
              decoding="async"
              data-nimg="1"
              src="https://images.bewakoof.com/web/ic-desktop-bwkf-trademark-logo.svg"
              className="text-transparent"
            />
          </Link>
        </div>
        <div className="mr-4 pr-40">
          <h3 className="text-gray-400 text-[14px] font-semibold">Signed as</h3>
          <h2 className="font-semibold">{user?.profile?.email}</h2>
        </div>
      </div>
    </div>
  );
};

export default CartNav;
