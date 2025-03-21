import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Brand = ({ filters, setFilters }) => {
  const Brands = useSelector((state) => state.product.brands);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Create a sorted copy of the brands array
  const sortedBrands = Brands
    ? [...Brands].sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: "base" })
      )
    : [];

  const [isExpanded, setIsExpanded] = useState(false); // Track whether the brands list is expanded
  const [showContainer, setShowContainer] = useState(true);

  useEffect(() => {
    const urlBrands = searchParams.get("manufacturer_brand");

    // Load expanded state from sessionStorage
    const savedExpandedState = sessionStorage.getItem("isExpandedBrands");
    if (savedExpandedState !== null) {
      setIsExpanded(JSON.parse(savedExpandedState));
    }

    // Process brands from URL
    if (urlBrands) {
      const brandsArray = urlBrands.split("_");
      setFilters((prev) => ({
        ...prev,
        brand: brandsArray,
      }));
    }
  }, [searchParams]); // Empty dependency ensures this runs only on mount

  useEffect(() => {
    // Save expanded state to sessionStorage
    sessionStorage.setItem("isExpandedBrands", JSON.stringify(isExpanded));
  }, [isExpanded]); // Runs only when `isExpanded` changes

  const handleFilterChange = (brand) => {
    const updatedBrands = filters.brand.includes(brand)
      ? filters.brand.filter((b) => b !== brand)
      : [...filters.brand, brand];

    setFilters({ ...filters, brand: updatedBrands });
    const params = new URLSearchParams(location.search);
    if (updatedBrands.length > 0) {
      params.set("manufacturer_brand", updatedBrands.join("_"));
    } else {
      params.delete("manufacturer_brand");
    }
    navigate({ pathname: location.pathname, search: params.toString() });
  };

  // Handle Show/Hide button click
  const toggleBrandsView = () => {
    setIsExpanded((prev) => !prev); // Toggle between true and false
  };

  const handleContainerStatus = () => {
    setShowContainer((prev) => !prev);
  };

  return (
    <div className="w-[100%] text-black text-lg border-t border-gray-200 mt-4">
      <div className="flex justify-between mt-4">
        <div className="flex gap-2 items-center">
          <div
            className="h-2 w-2 border-2 rounded-full"
            style={{
              background:
                filters.brand.length > 0
                  ? "rgb(32,123,180)"
                  : "rgb(199,203,212)",
              borderColor:
                filters.brand.length > 0
                  ? "rgb(32,123,180)"
                  : "rgb(199,203,212)",
            }}
          ></div>
          <h4>Brands</h4>
        </div>
        <div className="cursor-pointer" onClick={handleContainerStatus}>
          <div className="relative pr-6">
            <IoIosArrowUp
              className={`absolute transition-opacity duration-700 ${
                showContainer ? "opacity-100" : "opacity-0"
              }`}
            />
            <IoIosArrowDown
              className={`absolute transition-opacity duration-700 ${
                showContainer ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>
        </div>
      </div>
      <div className="ml-2 mt-2">
        {showContainer &&
          sortedBrands
            ?.slice(0, isExpanded ? sortedBrands.length : 5)
            .map((brand) => (
              <label
                key={brand}
                className="flex items-center capitalize text-gray-500 text-sm mb-2"
              >
                <input
                  type="checkbox"
                  className="mr-4 text-gray-400 h-4 w-4 cursor-pointer"
                  checked={filters?.brand?.includes(brand)}
                  onChange={() => handleFilterChange(brand)}
                />
                <span>{brand}</span>
              </label>
            ))}
        {showContainer && (
          <button
            onClick={toggleBrandsView}
            className="text-[rgb(69,165,165)] underline font-semibold text-sm"
          >
            {isExpanded ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Brand;
