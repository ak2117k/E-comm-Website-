import React from "react";
import { Link } from "react-router-dom";

const ShopNow = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="text-center">
        <div className="mb-4 flex items-center justify-center">
          {/* Empty face SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="64"
            height="64"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path d="M8 10h8" stroke="currentColor" strokeWidth="2" />
            <path
              d="M8 14c1.5 1 3 1 4 0"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="font-semibold mb-2">Hey! Your wishlist is empty</div>
        <div className="text-gray-400 mb-4">
          Save items in your wishlist. Review and easily move them to your bag.
        </div>
        <Link to={"/"}>
          <button className="bg-[rgb(255,210,50)] text-center rounded-md w-[207px] h-[45px] font-bold cursor-pointer">
            SHOP NOW
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ShopNow;
