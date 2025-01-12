import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Discount = ({ filters, setFilters }) => {
  const discounts = useSelector((state) => state.product.discounts);

  const sortedDiscount = discounts ? [...discounts].sort((a, b) => a - b) : [];

  // State to track whether the discounts list is expanded or not
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContainer, setShowContainer] = useState(true); // Track the visibility of the container

  // Handle discount filter changes
  const handleFilterChange = (discount) => {
    const newFilters = filters.discount.includes(discount)
      ? filters.discount.filter((d) => d !== discount) // Remove discount
      : [...filters.discount, discount]; // Add discount
    setFilters({ ...filters, discount: newFilters });
  };

  // Toggle between showing all discounts or just the first 5
  const toggleDiscountsView = () => {
    setIsExpanded((prev) => !prev); // Toggle the state
  };

  // Toggle the visibility of the discount container
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
                filters.discount.length > 0
                  ? "rgb(32,123,180"
                  : "rgb(199,203,212",
              borderColor:
                filters.discount.length > 0
                  ? "rgb(32,123,180"
                  : "rgb(199,203,212",
            }}
          ></div>{" "}
          <h4 className="">Discount</h4>
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
        {/* Conditionally render the discount list only when showContainer is true */}
        {showContainer &&
          sortedDiscount
            ?.slice(0, isExpanded ? sortedDiscount.length : 5)
            .map((discount) =>
              discount !== 0 ? (
                <label
                  key={discount}
                  className="flex items-center capitalize text-gray-500 text-sm mb-2"
                >
                  <input
                    type="checkbox"
                    className="mr-4 text-gray-400 h-4 w-4 cursor-pointer"
                    checked={filters?.discount?.includes(discount)}
                    onChange={() => handleFilterChange(discount)}
                  />
                  {discount}% Or More
                </label>
              ) : null
            )}

        {/* Show/Hide button for toggling discount list */}
        {showContainer && (
          <button
            onClick={toggleDiscountsView}
            className="text-[rgb(69,165,165)] underline font-semibold text-sm"
          >
            {isExpanded ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Discount;
