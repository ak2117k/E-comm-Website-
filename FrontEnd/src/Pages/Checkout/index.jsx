import React, { useState } from "react";
import PaymentMethods from "./Components/PaymentMethods";
import OrderSummary from "./Components/OrderSummary";
import AddressSelection from "./Components/AddressSelection";
import { useSelector } from "react-redux";
const PaymentPage = () => {
  const user = useSelector((state) => state.user.user);
  const { profile, myAddresses, myCart } = user;
  const [selectedAddress, setSelectedAddress] = useState(myAddresses[0] || {});
  const [selectedMethod, setSelectedMethod] = useState(null);
  const cartItems = myCart[0]?.items || [];
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.productId.oprice * item.quantity,
    0
  );
  const discount = 0;
  const finalTotal = subtotal - discount;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Choose Your Payment Method
      </h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <PaymentMethods
            finalTotal={finalTotal}
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
            selectedAddress={selectedAddress}
          />
        </div>
        <div>
          <AddressSelection
            myAddresses={myAddresses}
            setSelectedAddress={setSelectedAddress}
          />
          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            discount={discount}
            finalTotal={finalTotal}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
