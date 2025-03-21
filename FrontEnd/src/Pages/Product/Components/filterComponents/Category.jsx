import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

const Category = ({ filters, setFilters }) => {
  const categories = useSelector((state) => state.product.category);
  const [showContainer, setShowContainer] = useState(true); // Toggle for category container visibility
  const [isExpanded, setIsExpanded] = useState(false); // Track expanded state
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Sort categories alphabetically
  const sortedCategory = categories
    ? [...categories].sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: "base" })
      )
    : [];

  // Sync filters with URL parameters
  const syncFiltersWithURL = () => {
    const urlCategories = searchParams.get("category");
    if (urlCategories) {
      const categoryArray = urlCategories.split("_");

      // Avoid redundant updates
      if (
        JSON.stringify(filters.category.sort()) !==
        JSON.stringify(categoryArray.sort())
      ) {
        setFilters({ ...filters, category: categoryArray });
      }
    }
  };

  // Handle category filter changes
  const handleFilterChange = (category) => {
    const newFilters = filters.category.includes(category)
      ? filters.category.filter((c) => c !== category) // Remove category
      : [...filters.category, category]; // Add category
    setFilters({ ...filters, category: newFilters });

    // Update URL without reloading
    const params = new URLSearchParams(location.search);
    if (newFilters.length > 0) {
      params.set("category", newFilters.join("_"));
    } else {
      params.delete("category");
    }
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  // Sync filters on component mount and retrieve saved expanded state
  useEffect(() => {
    syncFiltersWithURL();
    const savedExpandedState = sessionStorage.getItem("isExpandedCategory");
    if (savedExpandedState !== null) {
      setIsExpanded(JSON.parse(savedExpandedState)); // Set the initial state from sessionStorage
    }
  }, []); // Only runs once, on component mount

  // Save expanded state to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("isExpandedCategory", JSON.stringify(isExpanded)); // Save expanded state to sessionStorage
  }, [isExpanded]);

  // Toggle between showing all or first 5 categories
  const toggleCategoriesView = () => {
    setIsExpanded((prev) => !prev);
  };

  // Toggle the visibility of the category container
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
                filters.category.length > 0
                  ? "rgb(32,123,180)"
                  : "rgb(199,203,212)",
              borderColor:
                filters.category.length > 0
                  ? "rgb(32,123,180)"
                  : "rgb(199,203,212)",
            }}
          ></div>
          <h4>Category</h4>
        </div>
        <div className="cursor-pointer" onClick={handleContainerStatus}>
          {/* Add opacity transition and key for smooth change */}
          <div className="relative pr-6">
            <IoIosArrowUp
              key={showContainer ? "up" : "down"}
              className={`absolute transition-opacity duration-700 ${
                showContainer ? "opacity-100" : "opacity-0"
              }`}
            />
            <IoIosArrowDown
              key={showContainer ? "down" : "up"}
              className={`absolute transition-opacity duration-700 ${
                showContainer ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>
        </div>
      </div>

      <div className="ml-2 mt-2">
        {showContainer &&
          sortedCategory
            ?.slice(0, isExpanded ? sortedCategory.length : 5)
            .map((category) => (
              <label
                key={category}
                className="flex items-center capitalize text-gray-500 text-sm mb-2"
              >
                <input
                  type="checkbox"
                  className="mr-4 text-gray-400 h-4 w-4 cursor-pointer"
                  checked={filters.category?.includes(category)}
                  onChange={() => handleFilterChange(category)}
                />
                <span>{category}</span>
              </label>
            ))}

        {/* Show/Hide button for toggling categories */}
        {showContainer && (
          <button
            onClick={toggleCategoriesView}
            className="text-[rgb(69,165,165)] underline font-semibold text-sm"
          >
            {isExpanded ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Category;
