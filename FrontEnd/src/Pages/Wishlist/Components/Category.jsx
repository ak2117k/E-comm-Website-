import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Category = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const user = useSelector((state) => state.user.user);

  const fetchProductDetails = async (productId) => {
    try {
      const result = await axios.get(
        `http://localhost:3000/product/getProducts/${productId}`
      );
      if (result.status === 200) return result.data.isProduct;
    } catch (error) {
      console.log(result);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      if (!user || !user.myWishlist) return;

      // Array to store product categories
      const categoryPromises = user.myWishlist.map((itemId) =>
        fetchProductDetails(itemId)
      );

      try {
        // Wait for all category fetch promises to resolve
        const products = await Promise.all(categoryPromises);

        // Filter out any null or undefined products (in case fetch fails)
        const validProducts = products.filter(Boolean);

        // Create a Set to hold unique categories
        const categorySet = new Set();

        validProducts.forEach((product) => {
          if (product && product.category) {
            categorySet.add(product.category); // Add category to the set
          }
        });

        // Convert Set to an array and update state with unique categories
        setCategories(Array.from(categorySet));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [dispatch, user]); // Re-run this effect when `user` changes

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
