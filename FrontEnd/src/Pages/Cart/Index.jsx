import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Components/Header";
import FreeDeliveryTag from "./Components/FreeDeliveryTag";
import Card from "./Components/Card";

const Index = () => {
  const dispatch = useDispatch();

  const cartProducts = useSelector((state) => state.cart.cart);

  return (
    <div className="w-[1350px] border-2 border-red-400 ml-20">
      <div className="w-full h-20  flex items-center justify-center">
        <Header />
      </div>
      <div className="w-full flex gap-6 border-2 border-blue-300">
        <div className=" w-[65%]">
          <div className="w-full ">
            <FreeDeliveryTag />
          </div>
          <div className="w-full">
            <Card />
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default Index;
