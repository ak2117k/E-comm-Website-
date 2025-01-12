import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Color = ({ filters, setFilters }) => {
  const colors = useSelector((state) => state.product.colors);
  console.log(colors);

  // Filter out null/undefined and sort alphabetically
  const sortedColors = colors
    ? [...colors.filter((color) => color !== null && color !== undefined)].sort(
        (a, b) => a.localeCompare(b, undefined, { sensitivity: "base" })
      )
    : [];

  // State to track whether the colors list is expanded or not
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContainer, setShowContainer] = useState(true); // Toggle for container visibility

  // Handle color filter changes
  const handleFilterChange = (color) => {
    const newFilters = filters.color.includes(color)
      ? filters.color.filter((c) => c !== color) // Remove color
      : [...filters.color, color]; // Add color
    setFilters({ ...filters, color: newFilters });
  };

  // Toggle between showing all colors or just the first 5
  const toggleColorsView = () => {
    setIsExpanded((prev) => !prev); // Toggle the state
  };

  // Toggle the visibility of the color container
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
                filters.color.length > 0 ? "rgb(32,123,180" : "rgb(199,203,212",
              borderColor:
                filters.color.length > 0 ? "rgb(32,123,180" : "rgb(199,203,212",
            }}
          ></div>{" "}
          <h4 className="">Color</h4>
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
        {/* Conditionally render the color list only when showContainer is true */}
        {showContainer &&
          sortedColors
            ?.slice(0, isExpanded ? sortedColors.length : 5)
            .map((color) => (
              <label
                key={color}
                className="flex items-center capitalize text-gray-500 text-sm mb-2"
              >
                <input
                  type="checkbox"
                  className="mr-4 text-gray-400 h-4 w-4 cursor-pointer"
                  checked={filters?.color?.includes(color)}
                  onChange={() => handleFilterChange(color)}
                />
                <span
                  className="inline-block w-5 h-5 mr-2 rounded-[3px] ml-2"
                  style={{ backgroundColor: color }}
                ></span>
                {color}
              </label>
            ))}

        {/* Show/Hide button for expanding the color list */}
        {showContainer && (
          <button
            onClick={toggleColorsView}
            className="text-[rgb(69,165,165)] underline font-semibold text-sm"
          >
            {isExpanded ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Color;
