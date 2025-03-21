import axios from "axios";
import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import AddressForm from "./AddressForm";
import { addUser } from "../../../Storee/User";

const AddressCard = ({ AddressData, setShowEditForm, setShowForm }) => {
  const [showForm, setShowFormLocal] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleShowForm = () => {
    setShowEditForm(true);
    setShowFormLocal(true);
    setShowForm(false);
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(
        `http://localhost:3000/users/deleteAddress?addressId=${addressId}&userId=${user?._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const user = response?.data?.updatedUser;
        dispatch(addUser(user));
        console.log("Item successfully removed from the cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      {!showForm && (
        <div className="w-full h-auto border border-gray-200 p-4 rounded-md">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="pt-2 text-[32px] text-[rgb(32,123,180)]">
              <CiLocationOn />
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-semibold">{AddressData.name}</h1>
              <h2 className="text-sm">
                {AddressData.flatNoOrBuildingNameAndStreetName} ,{" "}
                {AddressData.AreaoRLocality}
              </h2>
              <h2 className="text-sm">
                {AddressData.city} , {AddressData.state} ,{" "}
                {AddressData.postalCode}
              </h2>
              <h2 className="text-sm">Mobile : {AddressData.contactNumber}</h2>
              <div className="mt-4 flex flex-col md:flex-row gap-2 w-full">
                <button
                  className="flex items-center justify-center text-[rgb(32,123,180)] font-semibold cursor-pointer border border-gray-200 w-full md:w-[48%] rounded-md h-10"
                  onClick={handleShowForm}
                >
                  Edit
                </button>
                <button
                  className="flex items-center justify-center text-[rgb(32,123,180)] font-semibold cursor-pointer border border-gray-200 w-full md:w-[48%] rounded-md h-10 mt-2 md:mt-0"
                  onClick={() => handleDeleteAddress(AddressData._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <AddressForm
          onCancel={() => {
            setShowFormLocal(false);
            setShowForm(true);
          }}
          AddressData={AddressData}
          className="w-full"
        />
      )}
    </div>
  );
};

export default AddressCard;
