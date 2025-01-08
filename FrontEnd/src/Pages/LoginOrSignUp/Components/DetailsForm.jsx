import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DetailsForm = () => {
  const [email, setEmail] = useState("");
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailFocus = () => {
    setIsFocusedEmail(true);
  };

  const handleEmailBlur = () => {
    setIsFocusedEmail(false);
  };

  const validateEmail = (email) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  const userValidation = async () => {
    return await axios.post(
      "http://localhost:3000/users/emailCheck",
      JSON.stringify({ email }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (validateEmail(email)) {
      setEmailError("");
      try {
        const response = await userValidation();
        console.log(response);

        if (response.status === 200 && response.data.findUser) {
          localStorage.setItem("userEmail", JSON.stringify(email));
          navigate("/login-in"); // Navigate to password page for existing users
        }
      } catch (error) {
        if (error.response.status === 404) {
          localStorage.setItem("userEmail", JSON.stringify(email));
          navigate("/signup"); // Navigate to signup page for new users
        }
        console.error("Validation failed", error);
      }
    } else {
      setEmailError("Please enter a valid email.");
    }
  };

  return (
    <div className="w-full">
      <div className="font-semibold mt-[140px] text-[18px]">Login / SignUp</div>
      <div className="text-gray-500">
        Join us now to be a part of Bewakoof® family.
      </div>
      <form className="mt-12" onSubmit={handleFormSubmit}>
        <div className="w-full">
          <div className="flex flex-col gap-4">
            {/* Email Input */}
            <div className="flex flex-col gap-1">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={handleEmailChange}
                className="border-[1px] border-gray-300 h-14 rounded-md pl-2 focus:outline-none"
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
              />
              {isFocusedEmail && email === "" && (
                <p className="text-red-400 text-xs">Email is required</p>
              )}
              {isFocusedEmail && !validateEmail(email) && email !== "" && (
                <p className="text-red-400 text-xs">Invalid email format</p>
              )}
            </div>
          </div>

          <button
            className="w-full text-center mt-8 rounded-md h-[40px]"
            style={{
              backgroundColor: email ? "rgb(255,210,50)" : "rgb(227,229,233)",
              cursor: email ? "pointer" : "not-allowed",
            }}
            type="submit"
            disabled={!email}
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
                alt="google-logo"
              />
              Google
            </div>
            <div className="w-1/2 rounded-md flex items-center justify-center text-gray-500 border-[1px] border-gray-400 h-12">
              <img
                className="w-7 h-7"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxhtnyrLl1djITLJP8l95AbM0u-qcVTI8oug"
                alt="facebook-logo"
              />
              Facebook
            </div>
          </div>

          {/* Display error message if email validation fails */}
          {emailError && (
            <div className="mt-4 p-2 text-white bg-red-600 text-center rounded-md">
              {emailError}
            </div>
          )}
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
