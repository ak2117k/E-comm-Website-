import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";

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
  clearData,
} from "../../Storee/Product";
import Filter from "./Components/Filter";
import ProductContainer from "./Components/ProductContainer";

const Index = () => {
  // const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    gender: [],
    category: [],
    sizes: [],
    brand: [],
    color: [],
    discount: [],
  });

  const loaderRef = useRef(null);
  const dispatch = useDispatch();
  const Products = useSelector((state) => state.product.data);
  const Loader = useSelector((state) => state.product.isLoading);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Parse filters from the query parameters
  const parseFilters = () => {
    const parsedFilters = {
      gender: searchParams.get("gender")?.split("_") || [],
      category: searchParams.get("category")?.split("_") || [],
      sizes: searchParams.get("size")?.split("_") || [],
      brand: searchParams.get("manufacturer_brand")?.split("_") || [],
      color: searchParams.get("color")?.split("_") || [],
      discount: searchParams.get("discount")?.split("_") || [],
    };
    setFilters(parsedFilters);
  };

  // Fetch products with dynamic parameters
  const fetchProducts = async (currentPage) => {
    console.log("index page no-", currentPage);
    const pathname = location.pathname.split("/").pop();

    let params = {
      gender: [],
      category: [],
      sizes: [],
      brand: [],
      color: [],
      discount: [],
      page: currentPage,
    };

    // Modify params based on pathname
    switch (pathname) {
      case "men-clothing":
        params.gender = ["men"];
        break;
      case "women-clothing":
        params.gender = ["women"];
        break;
      case "kids-clothing":
        params.gender = ["kids"];
        break;
      default:
        break;
    }

    // Merge filters from the query params
    Object.keys(filters).forEach((filterKey) => {
      if (filterKey !== "gender") params[filterKey] = filters[filterKey];
    });

    dispatch(setLoader(true));

    // If it's the first page, clear existing data
    if (currentPage === 1) {
      dispatch(clearData());
      // setPage(1); // Reset to page 1
    }

    try {
      console.log("response", params);
      const response = await axios.get(
        "http://localhost:3000/product/getProducts",
        { params }
      );
      console.log(response);

      const {
        products = [],
        differentGenders = [],
        differentCategories = [],
        differentColors = [],
        differentSizes = [],
        differentBrands = [],
        differentDiscounts = [],
        total,
      } = response.data;

      if (products.length > 0) {
        dispatch(appendData(products));
        dispatch(fetchGender(differentGenders));
        dispatch(fetchCategory(differentCategories));
        dispatch(fetchSizes(differentSizes));
        dispatch(fetchBrands(differentBrands));
        dispatch(fetchColors(differentColors));
        dispatch(fetchDiscounts(differentDiscounts));
        dispatch(setProductsCount(total));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      dispatch(setLoader(false));
    }
  };

  // Handling changes in pathname or query parameters
  useEffect(() => {
    parseFilters(); // Update filters when query params change
    fetchProducts(1); // Fetch products based on the current page and filters
  }, [location.pathname, searchParams]); // Trigger when pathname or query params change

  return (
    <div>
      {Loader && Products.length < 20 && (
        <div className="flex w-[100%] h-[100%] justify-center mt-[100px] bg-opacity-50">
          <img
            src="https://www.bewakoof.com/images/bwkf-loader.gif"
            className="h-[270px] w-[270px] justify-center"
          />
        </div>
      )}
      {/* {!Loader && Products.length > 0 && ( */}
      <div className="flex w-full h-[100vh]">
        <div className="w-[27%] h-full p-10 overflow-y-auto scrollbar-none">
          <Filter filters={filters} setFilters={setFilters} />
        </div>
        <div className="w-[73%] h-full overflow-y-auto pt-10">
          <ProductContainer
            loaderRef={loaderRef}
            filters={filters}
            fetchProducts={fetchProducts}
          />
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default Index;
