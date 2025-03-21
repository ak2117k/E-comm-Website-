import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Address from "./Adress";
import { useNavigate } from "react-router-dom";
const PriceSummary = () => {
  const [totalOfferPrice, setTotalOfferPrice] = useState(0);
  const [totalActualPrice, setTotalActualPrice] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(98);
  const [openAddressForm, setOpenAddressForm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user && user.myCart && user.myCart[0]?.items?.length > 0) {
      let totalOPrice = 0;
      let totalPrice = 0;

      user.myCart[0]?.items.forEach((product) => {
        console.log(product);
        const oprice = parseFloat(product?.productId?.oprice) || 0;
        const price = parseFloat(product?.productId?.price) || 0;
        const quantity = parseInt(product?.quantity) || 0;

        totalOPrice += oprice * quantity;
        totalPrice += price * quantity;
      });

      setTotalOfferPrice(totalOPrice);
      setTotalActualPrice(totalPrice);
      setDeliveryFee(totalOPrice > 500 ? 0 : 98); // Free delivery if total price is greater than 500
    }
  }, [user]);

  const bagDiscount = totalActualPrice - totalOfferPrice;

  const handleRedirect = () => {
    if (user?.myAddresses?.length === 0) setOpenAddressForm(true);
    else navigate("orders/checkout");
  };

  return (
    <>
      {!openAddressForm && (
        <div className="p-4 border-[1px] border-gray-400 rounded-md mt-8 shadow-lg">
          <div className="font-semibold text-gray-600 mb-2">PRICE SUMMARY</div>

          {/* Total MRP */}
          <div className="flex justify-between p-2">
            <div className="text-gray-500">Total MRP (Incl. of taxes)</div>
            <div className="text-gray-500 pr-2">₹ {totalOfferPrice}</div>
          </div>

          {/* Bag Discount */}
          {bagDiscount > 0 && (
            <div className="flex justify-between p-2">
              <div className="text-gray-500">Bag Discount</div>
              <div className="text-[rgb(2,141,47)] pr-2">- ₹ {bagDiscount}</div>
            </div>
          )}

          {/* Delivery Fee */}
          <div className="flex justify-between p-2">
            <div className="text-gray-500">Delivery Fee</div>
            <div
              className="pr-2"
              style={{ color: deliveryFee === 0 ? "rgb(2,141,47)" : "black" }}
            >
              {deliveryFee === 0 ? "Free" : "₹ 98"}
            </div>
          </div>

          <hr className="my-4 border-gray-300" />

          {/* Subtotal */}
          <div className="flex justify-between p-2">
            <div className="text-black font-semibold">Subtotal</div>
            <div className="text-black font-semibold">
              ₹ {totalOfferPrice + deliveryFee}
            </div>
          </div>

          {/* Free Delivery Message */}
          {deliveryFee === 0 && (
            <div className="text-sm text-gray-500 flex items-center justify-center bg-[rgb(233,255,225)] bg-gradient-to-t from-[rgb(233,255,225)] to-transparent w-full h-8 rounded-md mt-2">
              Yayy! You get{" "}
              <span className="text-[rgb(48,145,14)] font-semibold">
                FREE Delivery
              </span>{" "}
              on this order
            </div>
          )}

          {/* Proceed Button */}
          <div className="mt-4 w-full flex items-center justify-center">
            <button
              className="bg-[rgb(255,210,50)] text-black w-full h-10 font-semibold rounded-md shadow-md hover:bg-yellow-400 transition"
              onClick={handleRedirect}
            >
              PROCEED
            </button>
          </div>
        </div>
      )}

      {openAddressForm && (
        <div className="">
          <Address onCancel={() => setOpenAddressForm(false)} />
        </div>
      )}
    </>
  );
};

export default PriceSummary;
