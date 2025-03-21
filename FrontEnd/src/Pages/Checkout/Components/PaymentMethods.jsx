import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../../Storee/User";
import axios from "axios";
import { useState } from "react";

const PaymentMethods = ({
  finalTotal,
  selectedMethod,
  setSelectedMethod,
  selectedAddress,
}) => {
  if (!setSelectedMethod) {
    console.error(
      "setSelectedMethod is undefined! Make sure it's passed correctly."
    );
  }

  const codTotal = finalTotal + 20;
  console.log(finalTotal, codTotal);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState(""); // success or error

  const handleCreateBooking = async () => {
    if (!user || !selectedAddress || !selectedMethod || codTotal === 20) {
      alert("Please ensure all required details are selected.");
      return;
    }

    // Prepare the product data to send
    const productDetails = user?.myCart[0]?.items?.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
      size: item.size,
      price: item?.productId?.oprice,
      total_price: item?.productId?.oprice * item.quantity,
    }));

    try {
      const response = await axios.post(
        "http://localhost:3000/users/createBooking",
        {
          userId: user._id,
          selectedAddressId: selectedAddress._id,
          paymentType: selectedMethod,
          totalAmount: selectedMethod === "cod" ? codTotal : finalTotal, // Send total amount separately
          products: productDetails,
        }
      );
      if (response.status === 201) {
        setNotification("Order Placed Successfully");
        setNotificationType("success"); // Success notification type
        console.log(response.data.result);
        dispatch(addUser(response.data.result));
        setTimeout(() => {
          window.location.href = "/";
        }, 4000);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      setNotification(
        error.response?.data?.error || "Booking failed. Please try again."
      );
      setNotificationType("error"); // Error notification type
    }
  };

  return (
    <div className="relative">
      {/* Notification Banner */}
      {notification && (
        <div
          className={`absolute top-0 left-0 w-full p-4 text-white font-semibold ${
            notificationType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <p>{notification}</p>
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow mt-16">
        {" "}
        {/* Added margin-top to avoid overlap with notification */}
        <h3 className="text-lg font-semibold mb-3">
          Choose Your Payment Method
        </h3>
        <div className="space-y-2">
          {["card", "wallet", "upi", "netbanking", "cod"].map((method) => (
            <button
              key={method}
              onClick={() => setSelectedMethod && setSelectedMethod(method)} // Check before calling
              className={`w-full text-left px-4 py-2 border rounded ${
                selectedMethod === method
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              {method === "card" && "Debit & Credit Card"}
              {method === "wallet" && "Wallet"}
              {method === "upi" && "UPI"}
              {method === "netbanking" && "Net Banking"}
              {method === "cod" && "Cash on Delivery"}
            </button>
          ))}
        </div>
        {selectedMethod === "card" && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter Card Number"
              className="w-full border p-2 rounded mb-2"
            />
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-1/2 border p-2 rounded"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-1/2 border p-2 rounded"
              />
            </div>
            <input
              type="text"
              placeholder="Name on Card"
              className="w-full border p-2 rounded mt-2"
            />
            <button className="w-full mt-4 bg-[rgb(255,210,50)] text-black py-2 rounded">
              PAY ₹{finalTotal}
            </button>
          </div>
        )}
        {selectedMethod === "cod" && (
          <div className="mt-4 p-4 border rounded bg-gray-50">
            <h4 className="font-semibold text-lg">Pay Cash on Delivery</h4>
            <p className="text-sm text-gray-600 mb-2">
              Additional cash collection charges of ₹20 is applicable.
            </p>
            <button
              className="w-full bg-[rgb(255,210,50)] text-black py-2 rounded font-semibold"
              onClick={handleCreateBooking}
            >
              PAY ₹{codTotal}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;
