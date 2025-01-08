import React from "react";

const FreeDeliveryTag = () => {
  return (
    <div className="w-full bg-[rgb(255, 249, 240)] flex gap-2 text-sm h-10 items-center justify-center">
      <span className="inline-flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M4 16c0 2.21 1.79 4 4 4s4-1.79 4-4m0 0c0 1.11-.9 2-2 2s-2-.89-2-2m0 0H4m0 0c0-2.21 1.79-4 4-4s4 1.79 4 4m0 0H4m16 0c0 2.21-1.79 4-4 4s-4-1.79-4-4m0 0c0 1.11-.9 2-2 2s-2-.89-2-2m0 0h8m0 0c0-2.21-1.79-4-4-4s-4 1.79-4 4m0 0h8m1-12H3c-1.1 0-1.99.9-1.99 2L1 14h22l-.01-6c0-1.1-.9-2-2-2zm-5 6V6H8v8z" />
        </svg>
      </span>
      Yay! you get
      <span className="inline-flex font-semibold">Free Delivery</span>
      on this order
    </div>
  );
};

export default FreeDeliveryTag;
