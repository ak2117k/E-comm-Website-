import React, { useState, useEffect } from "react";
import { FaBox } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { useLocation } from "react-router-dom";

const Account = () => {
  const [activePage, setActivePage] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const page = location.pathname.split("/")[2];
    setActivePage(page);
  }, [location]);

  return (
    <div className="w-full lg:w-1/4 p-4 border-1 border-gray-200 rounded-md ml-4 mt-4 h-auto">
      {/* For large screens (lg and above) */}
      <div className="hidden lg:block">
        <h2 className="text-lg m-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="none"
            viewBox="0 0 14 15"
            className="mr-2"
            style={{ fontSize: "12px" }}
          >
            <rect
              width="5"
              height="7"
              x="0.5"
              y="0.5"
              stroke="#292D35"
              rx="0.5"
            ></rect>
            <rect
              width="5"
              height="7"
              x="8.5"
              y="7.5"
              stroke="#292D35"
              rx="0.5"
            ></rect>
            <rect
              width="5"
              height="6"
              x="7.5"
              y="5.5"
              stroke="#292D35"
              rx="0.5"
              transform="rotate(-90 7.5 5.5)"
            ></rect>
            <rect
              width="5"
              height="6"
              x="0.5"
              y="14.5"
              stroke="#292D35"
              rx="0.5"
              transform="rotate(-90 .5 14.5)"
            ></rect>
          </svg>
          Overview
        </h2>
        <hr />
        <ul className="mt-2 space-y-4">
          <li
            className="m-2 cursor-pointer flex items-center py-4"
            style={{
              color: activePage === "orders" ? "rgb(32,123,180)" : "black",
            }}
          >
            <FaBox className="mr-3 text-xl" />
            <span>My Orders</span>
          </li>
          <hr />
          <li
            className="m-2 cursor-pointer flex items-center py-4"
            style={{
              color: activePage === "payments" ? "rgb(32,123,180)" : "black",
            }}
          >
            <MdOutlinePayment className="mr-3 text-xl" />
            <span>My Payments</span>
          </li>
          <hr />
          <li
            className="m-2 cursor-pointer flex items-center py-4"
            style={{
              color: activePage === "addresses" ? "rgb(32,123,180)" : "black",
            }}
          >
            <CiLocationOn className="mr-3 text-xl" />
            <span>My Addresses</span>
          </li>
          <hr />
          <li
            className="m-2 cursor-pointer flex items-center py-4"
            style={{
              color: activePage === "profile" ? "rgb(32,123,180)" : "black",
            }}
          >
            <CgProfile className="mr-3 text-xl" />
            <span>My Profile</span>
          </li>
          <hr />
          <li className="m-2 cursor-pointer flex items-center py-4 text-red-500">
            <CiLogout className="mr-3 text-xl text-red-500" />
            <span>Logout</span>
          </li>
        </ul>
      </div>

      {/* For small and medium screens */}
      <div className="lg:hidden">
        <ul className="mt-2 space-y-4">
          <li
            className="m-2 cursor-pointer flex items-center py-4"
            style={{
              color: activePage === "orders" ? "rgb(32,123,180)" : "black",
            }}
          >
            <FaBox className="mr-3 text-xl" />
            <span>My Orders</span>
          </li>
          <hr />
          <li
            className="m-2 cursor-pointer flex items-center py-4"
            style={{
              color: activePage === "payments" ? "rgb(32,123,180)" : "black",
            }}
          >
            <MdOutlinePayment className="mr-3 text-xl" />
            <span>My Payments</span>
          </li>
          <hr />
          <li
            className="m-2 cursor-pointer flex items-center py-4"
            style={{
              color: activePage === "addresses" ? "rgb(32,123,180)" : "black",
            }}
          >
            <CiLocationOn className="mr-3 text-xl" />
            <span>My Addresses</span>
          </li>
          <hr />
          <li
            className="m-2 cursor-pointer flex items-center py-4"
            style={{
              color: activePage === "profile" ? "rgb(32,123,180)" : "black",
            }}
          >
            <CgProfile className="mr-3 text-xl" />
            <span>My Profile</span>
          </li>
          <hr />
          <li className="m-2 cursor-pointer flex items-center py-4 text-red-500">
            <CiLogout className="mr-3 text-xl text-red-500" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Account;
