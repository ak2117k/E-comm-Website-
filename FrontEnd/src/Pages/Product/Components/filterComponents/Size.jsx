import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useDispatch } from "react-redux";

const Size = ({ filters, setFilters, allSizes, topSizes, bottomSizes }) => {
  const category = useSelector((state) => state.product.category);
  const dispatch = useDispatch();

  // State to track whether the size list is expanded or not
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContainer, setShowContainer] = useState(true); // Track visibility of the container

  const handleFilterChange = (size) => {
    const newFilters = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size) // Remove size
      : [...filters.sizes, size]; // Add size
    setFilters({ ...filters, sizes: newFilters }); // Update 'sizes' field in 'filters'
  };

  useEffect(() => {
    const savedExpandedState = sessionStorage.getItem("isExpandedBrand");
    if (savedExpandedState !== null) {
      setIsExpanded(JSON.parse(savedExpandedState)); // Set the initial state from sessionStorage
    }
  }, [dispatch]);

  useEffect(() => {
    sessionStorage.setItem("isExpandedBrand", JSON.stringify(isExpanded)); // Save state to sessionStorage
  }, [dispatch, isExpanded]);

  // Toggle between showing all sizes or just the first 5
  const toggleSizeView = () => {
    setIsExpanded((prev) => !prev); // Toggle the state
  };

  // Toggle the visibility of the size container
  const handleContainerStatus = () => {
    setShowContainer((prev) => !prev);
  };

  // Determine which sizes to display
  const sizesToDisplay =
    category.length > 1 &&
    (category.includes("shorts") || category.includes("pants"))
      ? allSizes
      : category.includes("pants") || category.includes("shorts")
      ? bottomSizes
      : topSizes;

  return (
    <div className="w-[100%] text-black text-lg border-t border-gray-200 mt-4">
      <div className="flex justify-between mt-4">
        <div className="flex gap-2 items-center">
          <div
            className="h-2 w-2 border-2 rounded-full"
            style={{
              background:
                filters.sizes.length > 0 ? "rgb(32,123,180" : "rgb(199,203,212",
              borderColor:
                filters.sizes.length > 0 ? "rgb(32,123,180" : "rgb(199,203,212",
            }}
          ></div>{" "}
          <h4 className="">Sizes</h4>
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
        {/* Conditionally render sizes based on showContainer */}
        {showContainer &&
          sizesToDisplay
            ?.slice(0, isExpanded ? sizesToDisplay.length : 5)
            .map((size) => (
              <label
                key={size}
                className="flex items-center capitalize text-gray-500 text-sm mb-2"
              >
                <input
                  type="checkbox"
                  className="mr-4 text-gray-400 h-4 w-4 cursor-pointer"
                  checked={filters?.sizes?.includes(size)}
                  onChange={() => handleFilterChange(size)}
                />
                {size}
              </label>
            ))}

        {/* Show/Hide button for toggling size list */}
        {showContainer && (
          <button
            onClick={toggleSizeView}
            className="text-[rgb(69,165,165)] underline font-semibold text-sm"
          >
            {isExpanded ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Size;
