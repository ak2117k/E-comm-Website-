import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

const Size = ({ filters, setFilters }) => {
  const category = useSelector((state) => state.product.category);
  console.log("category", category);
  const [isExpanded, setIsExpanded] = useState(false); // Track expanded state
  const [showContainer, setShowContainer] = useState(true); // Track visibility of the container
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to determine which sizes to display

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
  const bottomSizes = ["28", "30", "32", "34", "36", "38"];
  const topSizes = ["XS", "S", "M", "L", "XL"];
  const sizesToDisplay =
    category.length > 1 &&
    (category.includes("shorts") || category.includes("pants"))
      ? allSizes
      : category.includes("pants") || category.includes("shorts")
      ? bottomSizes
      : topSizes;

  // Sync filters with URL parameters
  const syncFiltersWithURL = () => {
    const urlSizes = searchParams.get("size");
    if (urlSizes) {
      const sizeArray = urlSizes.split("_");

      // Avoid redundant updates
      if (
        JSON.stringify(filters.sizes.sort()) !==
        JSON.stringify(sizeArray.sort())
      ) {
        setFilters({ ...filters, sizes: sizeArray });
      }
    }
  };

  // Handle size filter changes
  const handleFilterChange = (size) => {
    const newFilters = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size) // Remove size
      : [...filters.sizes, size]; // Add size
    setFilters({ ...filters, sizes: newFilters });

    // Update URL without reloading
    const params = new URLSearchParams(location.search);
    if (newFilters.length > 0) {
      params.set("size", newFilters.join("_"));
    } else {
      params.delete("size");
    }
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  // Sync filters on component mount and retrieve saved expanded state
  useEffect(() => {
    syncFiltersWithURL();
    const savedExpandedState = sessionStorage.getItem("isExpandedSize");
    if (savedExpandedState !== null) {
      setIsExpanded(JSON.parse(savedExpandedState));
    }
  }, []); // Only runs once, on component mount

  // Save expanded state to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("isExpandedSize", JSON.stringify(isExpanded)); // Save expanded state to sessionStorage
  }, [isExpanded]);

  // Toggle between showing all sizes or just the first 5
  const toggleSizeView = () => setIsExpanded((prev) => !prev);

  // Toggle the visibility of the size container
  const handleContainerStatus = () => setShowContainer((prev) => !prev);
  console.log("sizes", sizesToDisplay);

  return (
    <div className="w-[100%] text-black text-lg border-t border-gray-200 mt-4">
      <div className="flex justify-between mt-4">
        <div className="flex gap-2 items-center">
          <div
            className="h-2 w-2 border-2 rounded-full"
            style={{
              background:
                filters.sizes.length > 0
                  ? "rgb(32,123,180)"
                  : "rgb(199,203,212)",
              borderColor:
                filters.sizes.length > 0
                  ? "rgb(32,123,180)"
                  : "rgb(199,203,212)",
            }}
          ></div>
          <h4 className="">Sizes</h4>
        </div>
        <div className="cursor-pointer" onClick={handleContainerStatus}>
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
        {showContainer && sizesToDisplay?.length > 5 && (
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
