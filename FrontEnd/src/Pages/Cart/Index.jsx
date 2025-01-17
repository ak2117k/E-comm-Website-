import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Components/Header";
import FreeDeliveryTag from "./Components/FreeDeliveryTag";
import Card from "./Components/Card";
import CouponsAndoffers from "./Components/CouponsAndoffers";
import PriceSummary from "./Components/PriceSummary";

const Index = () => {
  const dispatch = useDispatch();

  const cartProducts = useSelector((state) => state.cart.cart);

  return (
    <div className="w-[1350px]  ml-20">
      <div className="">
        <Header />
      </div>
      <div className="w-full flex gap-6 ">
        <div className=" w-[65%]">
          <div className="w-full ">
            <FreeDeliveryTag />
          </div>
          <div className="w-full">
            <Card />
          </div>
        </div>
        <div className="w-[42%]">
          <div className="">
            <CouponsAndoffers />
          </div>
          <div className="">
            <PriceSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
