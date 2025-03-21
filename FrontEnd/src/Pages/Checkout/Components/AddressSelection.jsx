import React, { useState } from "react";

const AddressSelection = ({ myAddresses, setSelectedAddress }) => {
  const [selected, setSelected] = useState(myAddresses[0]?._id || "");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (address) => {
    setSelected(address._id);
    setSelectedAddress(address);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold">Select Delivery Address</h3>
        <span className="text-xl">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="mt-3 space-y-2">
          {myAddresses.map((address) => (
            <button
              key={address._id}
              onClick={() => handleSelect(address)}
              className={`w-full text-left px-4 py-2 border rounded ${
                selected === address._id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              {address.street}, {address.city}, {address.state} -{" "}
              {address.zipcode}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressSelection;
