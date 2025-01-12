import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Brand = ({ filters, setFilters }) => {
  const Brands = useSelector((state) => state.product.brands);

  // Create a copy of the array and then sort it
  const sortedBrands = Brands
    ? [...Brands].sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: "base" })
      )
    : [];

  const [isExpanded, setIsExpanded] = useState(false); // Track whether the brands list is expanded
  const [showContainer, setShowContainer] = useState(true);

  const handleFilterChange = (brand) => {
    const newFilters = filters.brand.includes(brand)
      ? filters.brand.filter((b) => b !== brand)
      : [...filters.brand, brand];
    setFilters({ ...filters, brand: newFilters });
  };

  // Handle Show/Hide button click
  const toggleBrandsView = () => {
    setIsExpanded((prev) => !prev); // Toggle between true and false
  };

  function handleContainerStatus() {
    setShowContainer((prev) => !prev);
  }

  return (
    <div className="w-[100%] text-black text-lg border-t border-gray-200 mt-4">
      <div className="flex justify-between mt-4">
        <div className="flex gap-2 items-center">
          <div
            className="h-2 w-2 border-2 rounded-full"
            style={{
              background:
                filters.brand.length > 0 ? "rgb(32,123,180" : "rgb(199,203,212",
              borderColor:
                filters.brand.length > 0 ? "rgb(32,123,180" : "rgb(199,203,212",
            }}
          ></div>
          <h4>Brands</h4>
        </div>
        <div className="cursor-pointer" onClick={handleContainerStatus}>
          {/* Add opacity transition and key for smooth change */}
          <div className="relative pr-6">
            <IoIosArrowUp
              key={showContainer ? "up" : "down"} // Change key to trigger transition
              className={`absolute transition-opacity duration-700 ${
                showContainer ? "opacity-100" : "opacity-0"
              }`}
            />
            <IoIosArrowDown
              key={showContainer ? "down" : "up"} // Change key to trigger transition
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
                <span className="">{brand}</span>
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
