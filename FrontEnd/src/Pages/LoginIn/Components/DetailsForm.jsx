import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../../Storee/User";

const DetailsForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [notification, setNotification] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(JSON.parse(storedEmail));
    }
  }, []);

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handlePasswordFocus = () => {
    setIsFocusedPassword(true);
  };

  const handlePasswordBlur = () => {
    setIsFocusedPassword(false);
  };

  const lastLoc = localStorage.getItem("lastlocation");

  const userValidation = async () => {
    return await axios.post(
      "http://localhost:3000/users/login",
      JSON.stringify({
        email: email,
        password: password,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const userCheck = await userValidation();
      console.log(userCheck.data.findUser);
      if (userCheck.status === 200) {
        const cart = await getCart(userCheck.data.findUser._id);
        const cookieValue = JSON.stringify(userCheck.data.findUser);
        const cartCookie = JSON.stringify(cart);
        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 604800000);
        await dispatch(addUser(userCheck.data.findUser));
        document.cookie = `user=${encodeURIComponent(
          cookieValue
        )};expires=${expirationTime.toUTCString()};path=/;`;
        document.cookie = `userCart=${encodeURIComponent(
          cartCookie
        )};expires=${expirationTime.toUTCString()};path=/;`;
        navigate(lastLoc || "/");
      }
    } catch (error) {
      console.error("Login failed", error);
      if (error.response && error.response.status === 401) {
        await setNotification("Invalid Email or Password.");
        HideNotification();
      } else {
        await setNotification(
          "An unexpected error occurred. Please try again."
        );
        HideNotification();
      }
    }
  };

  function HideNotification() {
    setTimeout(() => {
      setNotification("");
    }, 2000);
  }
  async function getCart(userId) {
    try {
      const result = await axios.get(
        `http://localhost:3000/cart/getItems/${userId}`
      );
      if (result.status === 200) {
        return result.data.cartItems;
      }
    } catch (error) {
      if (error.response.status === 404) {
        return [];
      } else {
        console.log(error);
      }
    }
  }

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
                value={email}
                readOnly
                className="border-[1px] border-gray-300 h-14 rounded-md pl-2 bg-gray-100 focus:outline-none cursor-not-allowed"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1 relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
                className="border-[1px] border-gray-300 h-14 rounded-md pl-2 focus:outline-none"
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-4 text-gray-500"
                title={isPasswordVisible ? "Hide Password" : "Show Password"}
              >
                {isPasswordVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8.418-2.668-10.537-6.825a.875.875 0 010-.35C3.582 8.668 7.582 6 12 6c.65 0 1.292.05 1.927.147M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3.98 8.457a10.051 10.051 0 000 7.086c2.12 4.157 6.12 6.825 10.54 6.825 1.228 0 2.43-.213 3.564-.608M9 9l10 10m-5-5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
              {isFocusedPassword && password === "" && (
                <p className="text-red-400 text-xs">Password is required</p>
              )}
            </div>
          </div>

          <button
            className="w-full text-center mt-8 rounded-md h-[40px]"
            style={{
              backgroundColor:
                email && password ? "rgb(255,210,50)" : "rgb(227,229,233)",
              cursor: email && password ? "pointer" : "not-allowed",
            }}
            type="submit"
            disabled={!email || !password}
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
      {notification && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-md">
          {notification}
        </div>
      )}
    </div>
  );
};
export default DetailsForm;
