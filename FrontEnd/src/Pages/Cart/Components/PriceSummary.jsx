import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PriceSummary = () => {
  const [totalOfferPrice, setTotalOfferPrice] = useState(null);
  const [totalActualPrice, setTotalActualprice] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(null);

  const dispatch = useDispatch();
  const Products = useSelector((state) => state.cart.cart);
  console.log(Products);

  useEffect(() => {
    let totalOPrice = 0;
    let totalPrice = 0;
    Products.forEach((product) => {
      totalOPrice += product?.oprice * product?.quantity;
      totalPrice += product?.price * product?.quantity;
    });
    setTotalOfferPrice(totalOPrice);
    setTotalActualprice(totalPrice);
    if (totalOPrice > 500) setDeliveryFee(0);
    else setDeliveryFee(98);
  }, [dispatch, Products]);

  return (
    <div className="p-4 border-[1px] border-gray-400 rounded-md mt-8">
      <div className="font-semibold text-gray-600">PRICE SUMMARY</div>
      <div className="flex justify-between p-2">
        <div className="text-gray-500">Total MRP (Incl. of taxes)</div>
        <div className="text-gray-500 pr-2">₹ {totalOfferPrice}</div>
      </div>
      {totalOfferPrice !== totalActualPrice && (
        <div className="flex justify-between p-2">
          <div className="text-gray-500">Bag Discount</div>
          <div className="text-[rgb(2,141,47)] pr-2">
            - ₹ {totalActualPrice - totalOfferPrice}
          </div>
        </div>
      )}
      <div className="flex justify-between p-2">
        <div className="text-gray-500">Delivery Fee</div>
        <div
          className="pr-2"
          style={{ color: deliveryFee === 0 ? "rgb(2,141,47)" : "black" }}
        >
          {deliveryFee === 0 ? "Free" : " ₹ 98"}
        </div>
      </div>
      <div className="">
        <hr className="my-4 border-gray-300" />
      </div>
      <div className="flex justify-between p-2">
        <div className="text-black font-semibold">Subtotal</div>
        <div className="text-black font-semibold">
          ₹ {totalOfferPrice + deliveryFee}
        </div>
      </div>
      {deliveryFee === 0 && (
        <div className="text-sm text-gray-500 flex items-center justify-center bg-[rgb(233,255,225)]  bg-gradient-to-t from-[rgb(233,255,225)] to-transparent w-full h-8 rounded-md">
          Yayy! You get<span> </span>
          <span className="text-[rgb(48,145,14)] font-semibold">
            {" "}
            FREE Delivery
          </span>{" "}
          <span> </span>
          on this order
        </div>
      )}
      <div className="mt-4 w-full flex items-center justify-center">
        <Link className="w-full h-10">
          <button className="bg-[rgb(255,210,50)] text-black flex justify-center items-center w-full h-10 font-semibold rounded-md">
            PROCEED
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PriceSummary;
