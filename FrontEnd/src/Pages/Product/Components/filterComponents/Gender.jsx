import React, { useEffect, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

const Gender = ({ filters, setFilters }) => {
  const [showContainer, setShowContainer] = useState(true); // Toggle for container visibility
  const [isExpanded, setIsExpanded] = useState(false); // Track expanded state
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Sync filters with URL parameters
  const syncFiltersWithURL = () => {
    const urlGender = searchParams.get("gender");
    if (urlGender) {
      const genderArray = urlGender.split("_");

      // Avoid redundant updates
      if (
        JSON.stringify(filters.gender.sort()) !==
        JSON.stringify(genderArray.sort())
      ) {
        setFilters({ ...filters, gender: genderArray });
      }
    }
  };

  // Handle gender filter changes
  const handleFilterChange = (gender) => {
    const newFilters = filters.gender.includes(gender)
      ? filters.gender.filter((g) => g !== gender)
      : [...filters.gender, gender];
    setFilters({ ...filters, gender: newFilters });

    // Update URL without reloading
    const params = new URLSearchParams(location.search);
    if (newFilters.length > 0) {
      params.set("gender", newFilters.join("_"));
    } else {
      params.delete("gender");
    }
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  // Sync filters on component mount and retrieve saved expanded state
  useEffect(() => {
    syncFiltersWithURL();
    const savedExpandedState = sessionStorage.getItem("isExpandedGender");
    if (savedExpandedState !== null) {
      setIsExpanded(JSON.parse(savedExpandedState));
    }
  }, []); // Only runs once, on component mount

  // Save expanded state to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("isExpandedGender", JSON.stringify(isExpanded)); // Save expanded state to sessionStorage
  }, [isExpanded]);

  // Toggle between showing or hiding the gender options
  const toggleGenderView = () => setIsExpanded((prev) => !prev);

  // Toggle the visibility of the gender container
  const handleContainerStatus = () => setShowContainer((prev) => !prev);

  return (
    <div className="w-[100%] text-black text-lg border-t border-gray-200 mt-4">
      <div className="flex justify-between mt-4">
        <div className="flex gap-2 items-center">
          <div
            className="h-2 w-2 border-2 rounded-full"
            style={{
              background:
                filters.gender.length > 0
                  ? "rgb(32,123,180)"
                  : "rgb(199,203,212)",
              borderColor:
                filters.gender.length > 0
                  ? "rgb(32,123,180)"
                  : "rgb(199,203,212)",
            }}
          ></div>
          <h4 className="">Gender</h4>
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
        {showContainer && (
          <>
            <label className="flex items-center capitalize text-gray-500 text-sm mb-2">
              <input
                type="checkbox"
                className="mr-4 text-gray-400 h-4 w-4 cursor-pointer"
                checked={filters?.gender?.includes("men")}
                onChange={() => handleFilterChange("men")}
              />
              Male
            </label>

            <label className="flex items-center capitalize text-gray-500 text-sm mb-2">
              <input
                type="checkbox"
                className="mr-4 text-gray-400 h-4 w-4 cursor-pointer"
                checked={filters?.gender?.includes("women")}
                onChange={() => handleFilterChange("women")}
              />
              Female
            </label>
          </>
        )}

        {/* Show/Hide button for toggling gender options */}
        {showContainer && (
          <button
            onClick={toggleGenderView}
            className="text-[rgb(69,165,165)] underline font-semibold text-sm"
          >
            {isExpanded ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Gender;
