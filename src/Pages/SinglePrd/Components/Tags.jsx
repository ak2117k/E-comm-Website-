import React from "react";

const Tags = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {/* 100% Secure Product Icon */}
      <div className="flex flex-col items-center">
        <span className="text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 17l-5-5h3V9h4v3h3l-5 5z"
            />
          </svg>
        </span>
        <span className="text-sm text-gray-700 mt-2">100% Secure Product</span>
      </div>

      {/* Easy Return Icon */}
      <div className="flex flex-col items-center">
        <span className="text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </span>
        <span className="text-sm text-gray-700 mt-2">Easy Return</span>
      </div>

      {/* 100% Genuine Product Icon */}
      <div className="flex flex-col items-center">
        <span className="text-yellow-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2l1.092 3.365L16 7.6l-2.464 2.2L14 13l-3.092-2.1L8 13l.464-3.2L4 7.6l2.908-.235L12 2z"
            />
          </svg>
        </span>
        <span className="text-sm text-gray-700 mt-2">100% Genuine Product</span>
      </div>
    </div>
  );
};

export default Tags;
