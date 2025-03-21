import React, { useState, useEffect } from "react";
import AddressForm from "./Components/AddressForm";
import SideContainer from "../../Components/Account";
import { useSelector } from "react-redux";
import AddressCard from "./Components/AddressCard";

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!showForm) setShowEditForm(false);
  }, [showForm]);

  return (
    <div className="flex flex-col lg:flex-row">
      <SideContainer />
      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">My Addresses</h1>

        {/* Address List */}
        {!showForm && (
          <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap">
            {user?.myAddresses?.length > 0 && (
              <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                {user?.myAddresses.map((AddressData, index) => (
                  <AddressCard
                    key={index}
                    AddressData={AddressData}
                    setShowEditForm={setShowEditForm}
                    setShowForm={setShowForm}
                  />
                ))}
              </div>
            )}

            {/* Add New Address Button */}
            {!showEditForm && (
              <div
                className="w-full sm:w-60 h-60 border border-gray-200 p-4 flex items-center justify-center cursor-pointer mt-4 sm:mt-0"
                onClick={() => setShowForm(true)}
              >
                <div className="text-center">
                  <div className="text-[rgb(32,123,180)] text-[24px] mb-2">
                    +
                  </div>
                  <div className="text-[rgb(32,123,180)] text-lg">Add New</div>
                  <div className="text-[rgb(32,123,180)]">Address</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Address Form */}
        {showForm && <AddressForm onCancel={() => setShowForm(false)} />}
      </div>
    </div>
  );
};

export default Index;
