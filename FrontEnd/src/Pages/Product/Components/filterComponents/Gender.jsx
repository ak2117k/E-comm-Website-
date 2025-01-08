import React from "react";

const Gender = () => {
  return (
    <div className="">
      <div className="flex gap-2">
        <div className="h-2 w-2 border-2 border-gray-400 rounded-full"></div>
        <h2 className="">Gender</h2>
      </div>

      <div className="">
        <label className="capitalize">
          <input
            type="checkbox"
            className="mr-2"
            onChange={() => handleFilterChange("brand", brand)}
          />
          Male
        </label>
      </div>

      <div className="">
        <label className="capitalize">
          <input
            type="checkbox"
            className="mr-2"
            onChange={() => handleFilterChange("brand", brand)}
          />
          Female
        </label>
      </div>
    </div>
  );
};

export default Gender;
