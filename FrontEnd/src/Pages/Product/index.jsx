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
  clearData,
} from "../../Storee/Product";
import Filter from "./Components/Filter";
import ProductContainer from "./Components/ProductContainer";

const Index = () => {
  const [page, setPage] = useState(1);
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
  const totalProducts = useSelector((state) => state.product.totalProducts);

  // Helper function to format filters for query string
  const formatFilter = (filter) => (filter.length > 0 ? filter.join("_") : "");

  const allSizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "28",
    "30",
    "32",
    "34",
    "36",
    "38",
  ];

  const topSizes = ["XS", "S", "M", "L", "XL"];
  const bottomSizes = ["28", "30", "32", "34", "36", "38"];

  // Fetch products from the backend with formatted filters
  const fetchProducts = async (currentPage, appliedFilters) => {
    dispatch(setLoader(true));
    try {
      // Construct query parameters dynamically
      const params = {
        page: currentPage,
        gender: formatFilter(appliedFilters.gender),
        category: formatFilter(appliedFilters.category),
        sizes: formatFilter(appliedFilters.sizes),
        brand: formatFilter(appliedFilters.brand),
        color: formatFilter(appliedFilters.color),
        discount: formatFilter(appliedFilters.discount),
      };
      console.log(params);

      const response = await axios.get(
        `http://localhost:3000/product/getProducts`,
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
      console.log("Error fetching products:", error);
    } finally {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    dispatch(setLoader(true)); // loads the loader
    dispatch(setProductsCount(0)); // Reset products count
    dispatch(clearData()); // Clear existing products
    setPage(1); // Reset to page 1
    fetchProducts(1, filters); // Fetch new products
  }, [dispatch, filters]);

  return (
    <div>
      {Loader && (
        <div className="flex w-[100%] h-[100%] justify-center mt-[100px] bg-opacity-50">
          <img
            src="https://www.bewakoof.com/images/bwkf-loader.gif"
            className="h-[270px] w-[270px] justify-center"
          />
        </div>
      )}
      {!Loader && Products.length > 0 && (
        <div className="flex w-full h-[100vh]">
          <div className="w-[27%] h-full p-10">
            <Filter
              filters={filters}
              setFilters={setFilters}
              allSizes={allSizes}
              topSizes={topSizes}
              bottomSizes={bottomSizes}
            />
          </div>
          <div className="w-[73%] h-full overflow-y-auto pt-10">
            <ProductContainer
              loaderRef={loaderRef}
              fetchProducts={fetchProducts}
              filters={filters}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
