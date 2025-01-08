import React from "react";
import { useState } from "react";

const Return = () => {
  const [openproductCont, setopenproductCont] = useState(false);

  function handleopenProductDescription() {
    setopenproductCont(!openproductCont);
  }
  return (
    <div>
      <div
        className="flex w-full gap-4 mt-4 border-b border-gray-200 cursor-pointer pb-4"
        onClick={handleopenProductDescription}
      >
        <div className="w-[20px] pt-4">
          <span className="text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 12H5m7-7l-7 7 7 7"
              />
            </svg>
          </span>
        </div>

        <div className="w-[700px]">
          <div className="w-full font-semibold text-[18px]">
            15 Days Returns & Exchange
          </div>
          <div className="w-full text-gray-400 text-[13px]">
            know about return & exchange policy
          </div>
        </div>

        <div className="w-[20px] mr-4">
          <span className="text-gray-700 text-[35px]">
            {!openproductCont ? "+" : "-"}
          </span>
        </div>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out mt-4 w-full ml-4 overflow-hidden ${
          openproductCont
            ? "max-h-[1000px] opacity-100 visibility-visible"
            : "max-h-0 opacity-0 visibility-hidden"
        } text-gray-400 text-sm`}
      >
        Easy returns upto 15 days of delivery. Exchange available on select
        pincodes
      </div>
    </div>
  );
};

export default Return;
