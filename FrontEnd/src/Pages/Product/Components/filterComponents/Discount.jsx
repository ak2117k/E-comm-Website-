import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const Discount = ({ filters, setFilters }) => {
  const discounts = useSelector((state) => state.product.discounts);
  const sortedDiscount = discounts ? [...discounts].sort((a, b) => a - b) : [];
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContainer, setShowContainer] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Sync filters with URL parameters
  useEffect(() => {
    const urlDiscounts = searchParams.get("product_discount");
    if (urlDiscounts) {
      const discountArray = urlDiscounts.split("_");
      setFilters((prevFilters) => {
        if (
          JSON.stringify(prevFilters.discount.slice().sort()) !==
          JSON.stringify(discountArray.slice().sort())
        ) {
          return { ...prevFilters, discount: discountArray };
        }
        return prevFilters;
      });
    }

    const savedExpandedState =
      JSON.parse(sessionStorage.getItem("isExpandedDiscount")) || false;
    setIsExpanded(savedExpandedState);
  }, [searchParams, setFilters]);

  // Save expanded state to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("isExpandedDiscount", JSON.stringify(isExpanded));
  }, [isExpanded]);

  const handleFilterChange = (discount, skipNavigation = false) => {
    setFilters((prevFilters) => {
      const newDiscounts = prevFilters.discount.includes(discount)
        ? prevFilters.discount.filter((d) => d !== discount) // Remove discount
        : [...prevFilters.discount, discount]; // Add discount

      // Update the URL if required
      if (!skipNavigation) {
        const params = new URLSearchParams(location.search);
        if (newDiscounts.length > 0) {
          params.set("product_discount", newDiscounts.join("_"));
        } else {
          params.delete("product_discount");
        }
        navigate(
          {
            pathname: location.pathname,
            search: params.toString(),
          },
          { replace: true }
        );
      }

      return { ...prevFilters, discount: newDiscounts };
    });
  };

  const toggleDiscountsView = () => setIsExpanded((prev) => !prev);
  const handleContainerStatus = () => setShowContainer((prev) => !prev);

  const validDiscounts = sortedDiscount.filter((discount) => discount !== 0);

  return (
    <div className="w-[100%] text-black text-lg border-t border-gray-200 mt-4">
      <div className="flex justify-between mt-4">
        <div className="flex gap-2 items-center">
          <div
            className="h-2 w-2 border-2 rounded-full"
            style={{
              background:
                filters.discount.length > 0
                  ? "rgb(32,123,180)"
                  : "rgb(199,203,212)",
              borderColor:
                filters.discount.length > 0
                  ? "rgb(32,123,180)"
                  : "rgb(199,203,212)",
            }}
          ></div>
          <h4 className="">Discount</h4>
        </div>
        <div className="cursor-pointer" onClick={handleContainerStatus}>
          {showContainer ? (
            <IoIosArrowUp className="absolute transition-opacity duration-700 opacity-100" />
          ) : (
            <IoIosArrowDown className="absolute transition-opacity duration-700 opacity-100" />
          )}
        </div>
      </div>

      <div className="ml-2 mt-2">
        {showContainer && validDiscounts.length === 0 && (
          <p className="text-gray-500 text-sm">No discounts available.</p>
        )}
        {showContainer &&
          validDiscounts
            .slice(0, isExpanded ? validDiscounts.length : 5)
            .map((discount) => (
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
            ))}

        {showContainer && validDiscounts.length > 5 && (
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
