import React from "react";

const Categories = [
  "DEALS HUB",
  "MEN",
  "WOMEN",
  "WINTERWEAR",
  "ACCESSORIES",
  "SNEAKERS",
  "BEWAKOOF AIR",
  "HEAVY DUTY",
  "CUSTOMIZATION",
  "OFFICIAL MERCH",
  "PLUS SIZE",
];

const PostNav = () => {
  return (
    <div className=" w-[1510px] hide-scrollbar overflow-x-auto whitespace-nowrap  ">
      {Categories.map((category, index) => (
        <div
          key={index}
          className="inline-block px-4 py-2 mx-2 my-2 text-xl text-black-500 rounded-md cursor-pointer hover:bg-gray-100 transition-all duration-300 ease-in-out"
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default PostNav;
