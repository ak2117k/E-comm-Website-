import React from "react";

const SinglePrdDetails = (SingleProduct) => {
  const Product = SingleProduct.singleProduct;
  return (
    <div className=" w-full h-auto">
      <div className=" text-black font-bold mb-0">{Product.brand}</div>
      <div className="text-gray-400 text-sm mt-0">{Product.info}</div>

      <div className="inline-flex gap-2 mt-4">
        <div className="text-black font-bold text-xl">₹{Product.oprice}</div>
        <div className="text-gray-500 relative mt-[2px]">
          <div className="absolute top-1/2 left-0 right-0 border-b-2 border-gray-500 z-10 text-md "></div>
          ₹{Product.price}
        </div>
        {Product.price !== Product.oprice && (
          <div className="text-green-500">
            {(((Product.price - Product.oprice) / Product.price) * 100).toFixed(
              0
            )}
            % OFF
          </div>
        )}
      </div>
      <div className="w-full inline-flex gap-2 justify-between mt-0 ">
        <div className="text-sm text-gray-400 mt-0 tracking-wider">
          inclusive of all taxes
        </div>
        <div className="inline-flex  h-auto gap-2 pb-4">
          <div className="text-yellow-400 pt-[1px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="22"
              height="22"
            >
              <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
            </svg>
          </div>
          <div className="font-bold text-gray-600">
            {(Math.random() * (5 - 3) + 3).toFixed(1)}
          </div>
          <div className="text-gray-500"> |</div>
          <div className="font-semibold text-teal-600">
            {Product.noproductReviews} Reviews
          </div>
        </div>
      </div>
      <div className="block w-[350px] mt-2">
        <div className="text-teal-600 text-sm font-semibold bg-gradient-to-r from-cyan-100 to-transparent p-2 rounded-md inline-flex items-center w-[350px] ">
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="16"
              height="16"
            >
              <path d="M7 4v2h10V4H7zM5 6c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1H5zM4 7h16v10H4V7z" />
            </svg>
          </span>
          <span>
            {Math.floor(Math.random() * 12) + 1} people bought this in the last
            7 days
          </span>
        </div>
      </div>
      <div className="inline-flex gap-2 items-center justify-center mt-4">
        {Product?.toptag && (
          <div
            className="text-[12px] font-bold text-white uppercase w-[130px] h-[20px] max-w-fit pl-2 pr-2"
            style={{
              backgroundColor:
                Product.toptag === "BUY 3 FOR"
                  ? "Green"
                  : Product.toptag === "SALE"
                  ? "Red"
                  : "Gray",
            }}
          >
            {Product.toptag}
          </div>
        )}
        <div className="w-[130px] h-[20px] text-white text-[12px] font-bold bg-gray-400 uppercase max-w-fit pl-2 pr-2">
          {Product.category}
        </div>
        {Product?.bottomtag && (
          <div className="block border-2 border-gray-400 text-[12px] text-gray-500 w-[130px] h-[20px] max-w-fit pl-2 pr-2 whitespace-nowrap overflow-hidden">
            {Product.bottomtag}
          </div>
        )}{" "}
      </div>
    </div>
  );
};

export default SinglePrdDetails;
