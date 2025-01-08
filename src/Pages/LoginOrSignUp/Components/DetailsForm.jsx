import React, { useState } from "react";

const DetailsForm = () => {
  const [phone, setPhone] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  function handleValChange(e) {
    setPhone(e.target.value);
  }

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full">
      <div className="font-semibold mt-[140px] text-[18px]">Login / SignUp</div>
      <div className="text-gray-500">
        Join us now to be a part of Bewakoof® family.
      </div>
      <form className="mt-12" onSubmit={handleFormSubmit}>
        <div className="w-full">
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
          <div className="">
            {isFocused && phone === "" && (
              <p className="text-red-400 text-xs">Mobile number required</p>
            )}
            {isFocused && phone.length !== 10 && phone !== "" && (
              <p className="text-red-400 text-xs">
                Mobile number must be 10 digits
              </p>
            )}
          </div>
          <button
            className="w-full text-center mt-8 rounded-md h-[40px]  "
            style={{
              backgroundColor:
                phone.length === 10 ? "rgb(255,210,50)" : "rgb(227,229,233)",
              cursor: phone.length === 10 ? "pointer" : "not-allowed",
            }}
          >
            CONTINUE
          </button>
          <div className="flex items-center mt-6">
            <div className="flex grow border-t border-gray-400"></div>
            <span className="mx-2 text-gray-1000">OR</span>
            <div className="flex grow border-t border-gray-400"></div>
          </div>
          <div className="w-full gap-2 flex mt-8">
            <div className="flex w-1/2 rounded-md items-center justify-center text-gray-500 border-[1px] border-gray-400 h-12">
              <img
                src="https://cdn-teams-slug.flaticon.com/google.jpg"
                className="w-7 h-7"
              ></img>
              Google
            </div>
            <div className="w-1/2 rounded-md flex items-center justify-center text-gray-500 border-[1px] border-gray-400 h-12">
              <img
                className="w-7 h-7"
                src="https://static.vecteezy.com/system/resources/previews/018/930/476/non_2x/facebook-logo-facebook-icon-transparent-free-png.png"
              ></img>
              Facebook
            </div>
          </div>
        </div>
      </form>
      <p className="w-full mt-8">
        By creating an account or logging in, you agree with Bewakoof®'s{" "}
        <span className="text-[rgb(74,123,180)] font-semibold cursor-pointer">
          Terms and{" "}
        </span>
      </p>
      <p className="w-full text-center flex items-center justify-center gap-2">
        <span className="text-[rgb(74,123,180)] inline-flex font-semibold cursor-pointer">
          Conditions
        </span>
        <span className="inline-flex">and</span>
        <span className="text-[rgb(74,123,180)] inline-flex font-semibold cursor-pointer">
          Privacy Policy
        </span>
      </p>
    </div>
  );
};

export default DetailsForm;
