import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Category = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (user?.myWishlist) {
      const uniqueCategories = [
        ...new Set(user.myWishlist.map((item) => item.category)),
      ];
      setCategories(uniqueCategories);
    }
  }, [user?.myWishlist]);
  return (
    <div>
      <div className=" mt-6 flex gap-4">
        {categories.map((category) => (
          <div
            className="inline-flex h-[30px] w-[120px] text-center items-center justify-center border-[1px] border-gray-400 rounded-md text-gray-600"
            key={category}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
