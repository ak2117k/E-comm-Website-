import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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

  const handleClearFilter = () => {
    setFilters({
      ...filters,
      gender: [],
      Category: [],
      sizes: [],
      brand: [],
      color: [],
      discount: [],
    });
    navigate(window.location.pathname, { replace: true });
  };

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
      {!Loader && (
        <div className="flex w-full h-[100vh]">
          <div className="w-[27%] h-full p-10 overflow-y-auto scrollbar-none">
            <Filter filters={filters} setFilters={setFilters} />
          </div>
          {!Loader && Products.length > 0 && (
            <div className="w-[73%] h-full overflow-y-auto pt-10">
              <ProductContainer
                loaderRef={loaderRef}
                filters={filters}
                fetchProducts={fetchProducts}
              />
            </div>
          )}

          {!Loader && Products.length === 0 && (
            <div className=" w-full flex justify-center items-center h-full overflow-hidden">
              <div className="">
                <img
                  className="w-full "
                  src="data:image/png;base64,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"
                ></img>
                <div className="">
                  <p className="text-gray-600">No Products Found</p>
                  <p className="text-gray-400">
                    Sorry, We couldn’t find any matches
                  </p>
                  <button
                    className="p-2 mt-4 bg-[rgb(255,210,50)] w-40 rounded-md  cursor-pointer"
                    onClick={handleClearFilter}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
