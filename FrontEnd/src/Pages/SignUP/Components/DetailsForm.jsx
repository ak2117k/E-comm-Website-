import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../../Storee/User";
import { useDispatch } from "react-redux";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState("Male");
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(JSON.parse(storedEmail));
    }
  }, []);

  const handleGenderSelection = (selectedGender) => {
    setGender(selectedGender);
  };

  const lastLoc = localStorage.getItem("lastlocation");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateMobileNumber(mobileNumber)) {
      showNotification("Enter a valid Mobile Number", "error");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/users/signUp",
        {
          email,
          firstName,
          lastName,
          password,
          gender,
          subscribedToWhatsApp: false,
          contactNumber: mobileNumber,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data) {
        await dispatch(addUser(response.data.response));
        const cookieValue = JSON.stringify(response.data.response);
        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 604800000);
        showNotification("Signin Successful", "success");
        document.cookie = `user=${cookieValue};expires=${expirationTime.toUTCString()};path=/;secure;`;

        setTimeout(() => {
          clearForm();
          navigate(lastLoc || "/");
        }, 1000);
      }
    } catch (error) {
      showNotification(
        "Internal server error, please try again later",
        "error"
      );
    }
  };

  const validateMobileNumber = (number) => {
    const regex = /^(?:\+91|91)?[7-9][0-9]{9}$/;
    return regex.test(number);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const showNotification = (message, type) => {
    setNotification(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotification("");
      setNotificationType("");
      if (type === "success") {
        navigate(lastLoc || "/"); // Navigate after success
      }
    }, 3000); // Notification stays visible for 3 seconds
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setMobileNumber("");
    setPassword("");
    setGender("Male");
  };

  return (
    <div className="w-full relative">
      <div className="font-semibold mt-[10px] text-[18px]">
        Just a few more details
      </div>
      <div className="text-gray-400">
        We need a few more details to personalize your experience.
      </div>
      <form className="mt-12" onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-4">
          {/* First Name Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName" className="text-gray-600">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border-[1px] border-gray-300 h-14 rounded-md pl-2 focus:outline-none"
            />
          </div>

          {/* Last Name Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className="text-gray-600">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border-[1px] border-gray-300 h-14 rounded-md pl-2 focus:outline-none"
            />
          </div>

          {/* Mobile Number Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="mobileNumber" className="text-gray-600">
              Mobile Number
            </label>
            <div className="relative">
              <div className="absolute left-0 top-0 h-full flex items-center pl-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
                  alt="India Flag"
                  className="w-5 h-5 mr-2 rounded-full"
                />
                <span className="text-gray-600 text-md">+91</span>
              </div>
              <input
                id="mobileNumber"
                type="tel"
                placeholder="Enter mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="pl-20 pr-4 py-3 border-[1px] border-gray-300 h-14 rounded-md w-full focus:outline-none"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              readOnly
              className="border-[1px] border-gray-300 h-14 rounded-md pl-2 bg-gray-100 focus:outline-none cursor-not-allowed"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password" className="text-gray-600">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-[1px] border-gray-300 h-14 rounded-md pl-2 focus:outline-none"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
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
          </div>

          {/* Gender Selection */}
          <div className="flex flex-col gap-1 mt-4">
            <label className="text-gray-600">Gender</label>
            <div className="flex gap-4">
              <div
                className={`flex-1 text-center border-[1px] border-gray-300 h-14 rounded-md flex items-center justify-center cursor-pointer ${
                  gender === "Male" ? "bg-[rgb(255,246,216)]" : ""
                }`}
                onClick={() => handleGenderSelection("Male")}
              >
                Male
              </div>
              <div
                className={`flex-1 text-center border-[1px] border-gray-300 h-14 rounded-md flex items-center justify-center cursor-pointer ${
                  gender === "Female" ? "bg-[rgb(255,246,216)]" : ""
                }`}
                onClick={() => handleGenderSelection("Female")}
              >
                Female
              </div>
              <div
                className={`flex-1 text-center border-[1px] border-gray-300 h-14 rounded-md flex items-center justify-center cursor-pointer ${
                  gender === "Other" ? "bg-[rgb(255,246,216)]" : ""
                }`}
                onClick={() => handleGenderSelection("Other")}
              >
                Other
              </div>
            </div>
          </div>
        </div>

        <button
          className="w-full text-center mt-8 rounded-md h-[40px]"
          style={{
            backgroundColor:
              firstName &&
              lastName &&
              mobileNumber &&
              email &&
              password &&
              gender
                ? "rgb(255,210,50)"
                : "rgb(227,229,233)",
            cursor:
              firstName &&
              lastName &&
              mobileNumber &&
              email &&
              password &&
              gender
                ? "pointer"
                : "not-allowed",
          }}
          type="submit"
          disabled={
            !(
              firstName &&
              lastName &&
              mobileNumber &&
              email &&
              password &&
              gender
            )
          }
        >
          CONTINUE
        </button>
      </form>

      {notification && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-white text-center transition-opacity duration-300 ${
            notificationType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification}
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
