import React from "react";
import { useState } from "react";

const Gender = ({ filters, setFilters }) => {
  const [showContainer, setShowContainer] = useState(true); // Toggle for container visibility

  const handleFilterChange = (gender) => {
    const newFilters = filters.gender.includes(gender)
      ? filters.gender.filter((g) => g !== gender)
      : [...filters.gender, gender];
    setFilters({ ...filters, gender: newFilters });
  };

  // Toggle the visibility of the color container
  const handleContainerStatus = () => {
    setShowContainer((prev) => !prev);
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div
            className="h-2 w-2 border-2 rounded-full"
            style={{
              background:
                filters.gender.length > 0
                  ? "rgb(32,123,180"
                  : "rgb(199,203,212",
              borderColor:
                filters.gender.length > 0
                  ? "rgb(32,123,180"
                  : "rgb(199,203,212",
            }}
          ></div>{" "}
          <h4 className="">Gender</h4>
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
        <label className="flex items-center capitalize text-gray-500 text-sm mb-2 ">
          <input
            type="checkbox"
            className="mr-4 text-gray-400 h-4 w-4 cursor-pointer"
            checked={filters?.gender?.includes("men")}
            onChange={() => handleFilterChange("men")}
          />
          Male
        </label>
      </div>

      <div className="ml-2 mt-2">
        <label className="flex items-center capitalize text-gray-500 text-sm mb-2">
          <input
            type="checkbox"
            className="mr-4 text-gray-400 h-4 w-4 cursor-pointer"
            checked={filters?.gender?.includes("women")}
            onChange={() => handleFilterChange("women")}
          />
          Female
        </label>
      </div>
    </div>
  );
};

export default Gender;
