import React from "react";

const CouponsAndoffers = () => {
  return (
    <div className="p-4 border-[1px] border-gray-400 rounded-md mt-4">
      <div className="text-gray-500">Coupons & offers</div>

      <div className="flex justify-between mt-2">
        <div className="flex gap-2">
          <span className="mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="text-green-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9l-6-5H8a2 2 0 0 0-2 2v2"
              />
            </svg>
          </span>
          <div className="">
            <div className="font-semibold">Apply Coupon / Gift Card</div>
            <div className="text-gray-400">
              Crazy deals and other amazing offers
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="text-[rgb(32,123,180)] cursor-pointer pr-2">
            VIEW
          </button>
        </div>
      </div>

      <div className="bg-[rgb(255,253,247)] w-full border-[1px] border-gray-200 rounded-md mt-8">
        <div className=" w-60 rounded-md bg-[rgb(255,231,144)] text-sm font-semibold flex justify-center mt-[-10px] px-4 ml-[24%] items-center text-gray-700">
          Best offer you’re missing out
        </div>
        <div className="flex gap-2  w-60 ml-6 mt-2">
          <span className="w-6 h-6 rounded-full">
            <img
              className="w-6 h-6 rounded-full"
              src="https://img.utdstc.com/icon/bce/137/bce1378ddde6df4d517665878a0066407ba8b11c91df4396afe5dbf60dbd2ae6:200"
            ></img>
          </span>
          <span className="font-semibold text-black text-sm">MAD10</span>
          <span className="font-semibold text-sm">|</span>
          <span className="font-semibold text-gray-500 text-sm">MAD10</span>
        </div>
        <div className="flex gap-2 mt-2">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="text-green-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 4H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9l-6-5H8a2 2 0 0 0-2 2v2"
              />
            </svg>
          </div>
          <div className="text-sm text-gray-500">
            Get instant 10% OFF on all orders above Rs.1699. Coupon code - MAD10
          </div>
          <div className="">
            <button className="text-[rgb(32,123,180)] cursor-pointer pr-2">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponsAndoffers;
