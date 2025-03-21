import React from "react";
import SideContainer from "../../Components/Account";
import OrderList from "./Components/OrderList";
import { useSelector } from "react-redux";

const index = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="flex flex-col lg:flex-row">
      <SideContainer />
      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>
        <div className="w-full">
          <OrderList orders={user.myOrders} />
        </div>
      </div>
    </div>
  );
};

export default index;
