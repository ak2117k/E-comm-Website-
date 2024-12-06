import React from "react";
import { useState } from "react";

const Delievery = () => {
  const [pinValue, setpinValue] = useState(null);

  function handlePinChange(e) {
    setpinValue(e.target.value);
  }
  function handleDelieveryTime(Value) {}
  return (
    <div className="w-full mt-4">
      <div className="inline-flex gap-2">
        <span className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-600"
            viewBox="0 0 30 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2C8.13 2 5 5.13 5 9c0 3.94 5 11 7 11s7-7.06 7-11c0-3.87-3.13-7-7-7zm0 10c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
            />
          </svg>
        </span>
        <span className="text-[18px] font-semibold">
          Check for Delivery Details
        </span>
      </div>
      <div className="flex justify-between w-full border-[0.5px] border-gray-500 rounded-md h-[45px] mt-2">
        <input
          className="w-[200px] ml-2 focus:border-none focus:outline-none"
          type="tel"
          pattern="[0-9]{6}"
          placeholder="Enter Pincode"
          value={pinValue}
          onChange={handlePinChange}
        ></input>
        <button
          className="text-teal-600 mr-4"
          onClick={() => handleDelieveryTime(pinValue)}
        >
          CHECK
        </button>
      </div>
    </div>
  );
};

export default Delievery;
