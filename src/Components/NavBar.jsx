import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/products/${searchVal}`);
      setSearchVal("");
    }
  };
  function handleSearchValChange(e) {
    setSearchVal(e.target.value);
  }

  return (
    <>
      <div className="inline-flex w-screen">
        <div className="inline-flex w-[400px] items-center ml-40 justify-evenly">
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

          <nav className="inline">
            <ul className="flex space-x-4">
              <li className="list-none inline-flex">
                <Link
                  to="/products/men"
                  className="no-underline text-black-400  hover:underline hover:decoration-yellow-500 hover:decoration-4"
                >
                  Men
                </Link>
              </li>

              <li className="inline-block text-black">
                <Link
                  to="products/women"
                  className="no-underline text-black-400  hover:underline hover:decoration-yellow-500 hover:decoration-4"
                >
                  Women
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div
          className="inline-flex p-2
      w-[750px] ml-20 justify-around"
        >
          <ul className="inline-flex  items-center justify-evenly w-auto">
            <li className=" inline-flex  w-[300px] rounded-md bg-gray-200 h-12 items-center">
              <form className="inline-block " onSubmit={handleSubmit}>
                <div className="ml-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="text-[20px] inline-block mb-1"
                  >
                    <path
                      stroke="#303030"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M18.926 11.338a7.588 7.588 0 1 1-15.176 0 7.588 7.588 0 0 1 15.176 0Zm-1.692 5.896L21 21"
                    ></path>
                  </svg>
                  <input
                    className="bg-transparent text-sm ml-4 text-black border-none focus:border-none focus:outline-none"
                    type="text"
                    placeholder="Search by products"
                    value={searchVal}
                    onChange={handleSearchValChange}
                    onSubmit={() => handeleSearchItem(searchVal)}
                  />
                </div>
              </form>
            </li>
            <li className="inline-block ml-4"></li>

            <li className="inline-block w-[200px] h-auto ">
              <div className="inline-flex justify-evenly w-full">
                <div className="inline-block">
                  <span className="text-gray-400 text-[20px]">|</span>
                </div>
                <div className="inline-block w-auto  ">
                  <Link to="/login">
                    <span className="text-[13px] font-[500] w-auto h-auto">
                      LOGIN
                    </span>
                  </Link>
                </div>
                <div className="inline-flex  w-18 h-auto  ">
                  <Link to="/wishlist" className=" w-auto h-auto inline-flex ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="text-center text-[24px]  "
                    >
                      <path
                        stroke="#303030"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 20S3 14.91 3 8.727c0-1.093.375-2.152 1.06-2.997a4.672 4.672 0 0 1 2.702-1.638 4.639 4.639 0 0 1 3.118.463A4.71 4.71 0 0 1 12 6.909a4.71 4.71 0 0 1 2.12-2.354 4.639 4.639 0 0 1 3.118-.463 4.672 4.672 0 0 1 2.701 1.638A4.756 4.756 0 0 1 21 8.727C21 14.91 12 20 12 20Z"
                      ></path>
                      <defs>
                        <clipPath id="header_icon_wishlist_svg__a">
                          <path fill="#fff" d="M0 0h24v24H0z"></path>
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>
                </div>
                <div className="inline-block">
                  <Link to="/cart">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1.2em"
                      fill="none"
                      viewBox="0 0 16 20"
                    >
                      <path
                        stroke="#303030"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M.75 4.8c0-.02.003-.037.006-.05h14.488c.003.013.006.03.006.05v14.4c0 .02-.003.037-.006.05H.756a.196.196 0 0 1-.006-.05V4.8ZM4.5 3.75c0-.73.395-1.429 1.098-1.945C6.302 1.29 7.255 1 8.25 1c.995 0 1.948.29 2.652.805C11.605 2.321 12 3.021 12 3.75"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className=" block w-[100%] text-black text-lg border-b border-gray-200 mt-4"></div>
    </>
  );
};

export default NavBar;
