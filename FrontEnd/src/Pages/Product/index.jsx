import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  appendData,
  fetchBrands,
  fetchCategory,
  fetchColors,
  fetchDiscounts,
  fetchGender,
  fetchSizes,
  setLoader,
  setProductsCount,
} from "../../Storee/Product";
import Filter from "./Components/Filter";
import ProductContainer from "./Components/ProductContainer";

const index = () => {
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);

  const dispatch = useDispatch();

  const Products = useSelector((state) => state.product.data);
  const Loader = useSelector((state) => state.product.isLoading);
  const totalProducts = useSelector((state) => state.product.totalProducts);

  async function fetchProducts(currentPage) {
    dispatch(setLoader(true)); // Set loader to true before the request
    try {
      // Fetch the product data and unique attributes from the backend
      const response = await axios.get(
        `http://localhost:3000/product/getProducts?page=${currentPage}`
      );
      console.log(response);

      // Destructure the response data
      const {
        products = [],
        differentGenders = [],
        differentCategories = [],
        differentColors = [],
        differentSizes = [],
        differentBrands = [],
        differentDiscounts = [],
      } = response.data || {}; // Ensure that we handle cases where data might be undefined

      // Log the data (Optional for debugging)
      console.log(
        products,
        differentGenders,
        differentCategories,
        differentColors,
        differentSizes,
        differentBrands,
        differentDiscounts
      );

      const totalProducts = response.data.total;

      // Dispatch the fetched products to the store (you can adapt this as per your needs)
      if (products.length > 0) {
        dispatch(appendData(products));
        // dispatch(fetchData(products)); // Assuming fetchData is an action creator for setting products
        dispatch(fetchGender(differentGenders));
        dispatch(fetchCategory(differentCategories));
        dispatch(fetchSizes(differentSizes));
        dispatch(fetchBrands(differentBrands));
        dispatch(fetchColors(differentColors));
        dispatch(fetchDiscounts(differentDiscounts));
        dispatch(setProductsCount(totalProducts));
      }
    } catch (error) {
      console.log(error); // Log any error that occurs during the fetch
    } finally {
      dispatch(setLoader(false)); // Set loader to false after the request completes
    }
  }

  useEffect(() => {
    fetchProducts(page); // Call the fetch function to load the products and attributes
  }, [page]); // Effect dependency on page for infinite scrolling

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && Products.length < totalProducts) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, []);

  console.log(Products);

  return (
    <div className="">
      {Products.length > 0 && (
        <div className=" flex w-full h-[100vh] border-2 border-red-500">
          <div className="w-[27%] h-[1370px]">
            <Filter Products={Products} />
          </div>
          <div className="w-[73%] border-2 border-green-200 h-full scrollbar-none">
            <ProductContainer
              loaderRef={loaderRef}
              fetchProducts={fetchProducts}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default index;
