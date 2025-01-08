import React, { useState } from "react";

const ProductDescription = () => {
  const [openproductCont, setopenproductCont] = useState(false);

  function handleopenProductDescription() {
    setopenproductCont(!openproductCont);
  }

  return (
    <div>
      <div
        className="flex w-full gap-4 mt-10 border-b border-gray-200 cursor-pointer pb-4"
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
                d="M6 2v16c0 .553.447 1 1 1h10c.553 0 1-.447 1-1V2"
              />
            </svg>
          </span>
        </div>

        <div className="w-[700px]">
          <div className="w-full font-semibold text-[18px]">
            Product Description
          </div>
          <div className="w-full text-gray-400 text-[13px]">
            Manufacture, Care and Fit
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
        }`}
      >
        <div className="w-[630px]">
          <p className="text-xs w-[630px]">
            Elevate your streetwear game with the Men's Black & White Graphic
            Printed Oversized Sweatshirt. Pair it with black joggers and white
            high-tops for a sleek, urban look that's effortlessly on-trend.
          </p>
          <div className="flex">
            <span className="inline-flex text-xs font-bold">
              Country of Origin-
            </span>
            <span className="inline-flex text-xs">India</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex">
            <span className="text-xs font-bold">Manufactured By-</span>
            <span className="text-xs">Bewakoof Brands Pvt Ltd.</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex">
            <span className="text-xs font-bold">Packed By-</span>
            <span className="text-xs">Bewakoof Brands Pvt Ltd.</span>
          </div>
          <p className="text-sm w-[630px]">
            Sairaj logistic hub #A5, BMC pipeline road, Opposite all saints high
            school, Amane, Bhiwandi, Thane, Maharashtra 421302
          </p>
        </div>
        <div className="flex mt-4">
          <span className="text-xs font-bold">Commodity-</span>
          <span className="text-xs">XYZ Category</span>
        </div>
        <div className="text-teal-300 mt-4">Product Specifications</div>
        <div className="mt-2">
          <ul className="list-disc pl-5">
            <li className="text-sm text-gray-400">
              Oversized fit - Super Loose On Body Thoda Hawa Aane De
            </li>
            <li className="text-sm text-gray-400">
              Terry 70% Cotton, 30% Poly - Soft & light weight fabric.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
