import React, { useState } from "react";

const DetailsForm = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full">
      <div className="">Just few more details</div>
      <div className="">
        We need few more details to personalize your experience
      </div>
      <form onSubmit={handleFormSubmit}>
        <label>Full Name</label>
        <input type="text" placeholder="Ex- Jhon Sharma"></input>
        <label>Mobile Number</label>
        <div className="flex gap-2 items-center border-[1px] border-gray-300 h-14 rounded-md pl-2">
          <div className="w-4 h-4">
            <img
              className="object-cover"
              src="https://images.bewakoof.com/web/india-flag-round-1639566913.png"
            />
          </div>
          <div className="">+91</div>
          <input
            type="tel"
            placeholder="Enter Mobile Number"
            value={phone}
            onChange={handleValChange}
            className="focus:outline-none focus:border-none "
            pattern="\d{10}"
            maxLength="10"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <label>Email Id</label>
        <input type="email" placeholder="ex.yourmailid@gmail.com"></input>
        <label>Gender</label>
        <div className="w-[80%] flex gap-4">
          <div className="w-1/3 rounded-sm border-[1px] border-gray-200 text-center">
            Male
          </div>
          <div className="w-1/3 rounded-sm border-[1px] border-gray-200 text-center">
            Female
          </div>
          <div className="w-1/3 rounded-sm border-[1px] border-gray-200 text-center">
            Other
          </div>
        </div>
      </form>
    </div>
  );
};

export default DetailsForm;
