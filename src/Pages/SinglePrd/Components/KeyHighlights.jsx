import React from "react";

const KeyHighlights = () => {
  return (
    <div className="w-full ml-2 mt-4">
      <h2 className="font-semibold">Key Highights</h2>
      <div className="flex w-full justify-between mt-4">
        <div className="w-[48%]">
          <div className="">
            <div className="text-gray-400 text-sm mt-2">Design</div>
            <div className="font-semibold text-black pb-2 border-b border-gray-200 mt-2">
              Design Print
            </div>
          </div>
          <div className="">
            <div className="text-gray-400 text-sm mt-2">Neck</div>
            <div className="font-semibold text-black pb-2 border-b border-gray-200 mt-2">
              Product Neck
            </div>
          </div>
          <div className="">
            <div className="text-gray-400 text-sm mt-2">Sleeve Style</div>
            <div className="font-semibold text-black mt-2">Full Sleeve</div>
          </div>
        </div>
        <div className="w-[48%]">
          <div className="">
            <div className="text-gray-400 text-sm mt-2">Fit</div>
            <div className="font-semibold text-black pb-2 border-b border-gray-200 mt-2">
              Product Fit
            </div>
          </div>
          <div className="">
            <div className="text-gray-400 text-sm mt-2">occasion</div>
            <div className="font-semibold text-black pb-2 border-b border-gray-200 mt-2">
              Seasonal wear
            </div>
          </div>
          <div className="">
            <div className="text-gray-400 text-sm mt-2">Wash Care</div>
            <div className="font-semibold text-black mt-2">
              Machie wash as per tag
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyHighlights;
