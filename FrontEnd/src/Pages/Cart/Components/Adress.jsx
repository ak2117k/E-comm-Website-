import axios from "axios";
import React, { useEffect, useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../Storee/User";

const Address = ({ onCancel, AddressData }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [notification, setNotification] = useState("");

  const [formData, setFormData] = useState({
    Name: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: "",
    areaLocality: "",
    landmark: "",
    country: "India",
    countryCode: "IN",
    code: "",
  });

  const [isMobileValid, setIsMobileValid] = useState(true);

  useEffect(() => {
    if (AddressData) {
      setFormData({
        Name: AddressData.name,
        mobile: String(AddressData.contactNumber),
        pincode: AddressData.postalCode,
        city: AddressData.city,
        state: AddressData.state,
        addressLine: AddressData.flatNoOrBuildingNameAndStreetName,
        areaLocality: AddressData.AreaoRLocality,
        landmark: AddressData.landmark,
        country: "India", // Keep India as the country
        countryCode: "IN", // Keep India as the country code
      });
    }
  }, [AddressData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePostalCodeChange = (e) => {
    const value = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      pincode: value,
      ...(value === "" && {
        city: "",
        state: "",
        country: "India", // Keep India as the country
        countryCode: "IN", // Keep India as the country code
      }),
    }));

    if (value.length >= 6) {
      fetchLocationByPostalCode(value);
    }
  };

  async function fetchLocationByPostalCode(postalCode) {
    try {
      const response = await axios.get(
        `https://geocode.xyz/${postalCode}?json=1`
      );

      if (response.data && response.data.city) {
        const { city, statename, countryname } = response?.data?.standard;

        setFormData({
          ...formData,
          pincode: postalCode,
          city: city || "",
          state: statename || "",
          country: "India", // Hardcode country to India
          countryCode: "IN", // Hardcode country code to India
        });
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidPhoneNumber(formData.mobile) || formData.countryCode !== "IN") {
      setIsMobileValid(false);
      return;
    }

    try {
      // Send the address data to the backend
      const response = await axios.post(
        "http://localhost:3000/users/addAddress",
        {
          userId: user._id,
          addressData: formData,
        }
      );

      if (response.status === 201) {
        const result = response.data.result;
        dispatch(addUser(result));

        setFormData({
          Name: "",
          mobile: "",
          pincode: "",
          city: "",
          state: "",
          addressLine: "",
          areaLocality: "",
          landmark: "",
          country: "India",
          countryCode: "IN",
        });

        setNotification("Address added successfully!");
        onCancel();
      } else {
        setNotification("Error adding address.");
      }
    } catch (error) {
      console.error("Error while sending data:", error);
      setNotification("Error while adding address.");
    }
  };

  return (
    <form className="p-4 rounded max-w-4xl mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl mb-4">Add New Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 w-full">
        <div className="col-span-2">
          <label className="block mb-2 text-sm font-semibold">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-gray-300 p-2 w-full"
            type="text"
            name="Name"
            placeholder="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-2 text-sm font-semibold">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <PhoneInput
            international={false} // Disable international input
            defaultCountry="IN" // Set default country to India
            className="border border-gray-300 p-2 w-full rounded-md"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={(value) => {
              setFormData({ ...formData, mobile: value });
              setIsMobileValid(isValidPhoneNumber(String(value)));
            }}
            required
            style={{ borderLeft: "none" }}
          />
          {!isMobileValid && (
            <p className="text-red-500 text-sm mt-2">
              Please enter a valid Indian phone number.
            </p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block mb-2 text-sm font-semibold">
            Pincode <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-gray-300 p-2 w-full"
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handlePostalCodeChange}
            required
            maxLength={6}
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-2 text-sm font-semibold">
            Address Line <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-gray-300 p-2 w-full"
            type="text"
            name="addressLine"
            placeholder="Address Line"
            value={formData.addressLine}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-2 text-sm font-semibold">
            Area/Locality <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-gray-300 p-2 w-full"
            type="text"
            name="areaLocality"
            placeholder="Area/Locality"
            value={formData.areaLocality}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-2 text-sm font-semibold">
            Landmark <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-gray-300 p-2 w-full"
            type="text"
            name="landmark"
            placeholder="Landmark"
            value={formData.landmark}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-2 text-sm font-semibold">
            City <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-gray-300 p-2 w-full"
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-2 text-sm font-semibold">
            State <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-gray-300 p-2 w-full"
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-2 text-sm font-semibold">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            className="border border-gray-300 p-2 w-full"
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
            disabled
          />
        </div>
      </div>

      {notification && (
        <p
          className="text-sm mt-2"
          style={{
            color:
              notification === "Address added successfully" ? "green" : "red",
          }}
        >
          {notification}
        </p>
      )}

      <div className="flex justify-end mt-4">
        <button
          type="button"
          className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Address
        </button>
      </div>
    </form>
  );
};

export default Address;
