import React, { useState } from "react";

const OrderSummary = ({ cartItems, subtotal, discount, finalTotal }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold">Order Summary</h3>
        <span className="text-xl">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <>
          <div className="space-y-3 mt-3">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center space-x-4">
                <img
                  src={item?.productId?.image1}
                  alt={item.name}
                  className="w-16 h-16 rounded"
                />
                <div>
                  <p className="text-sm">{item?.productId?.info}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-sm font-semibold">
                    ₹{item?.productId?.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between">
              <span>Total MRP:</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount:</span>
              <span>-₹{discount}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-2">
              <span>Subtotal:</span>
              <span>₹{finalTotal}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
