import React from "react";
import OrderCard from "./OrderCard";

const OrderList = ({ orders }) => {
  console.log("order list", orders);
  return (
    <div className="w-full bg-white shadow-md p-4 rounded-md">
      {orders?.length > 0 ? (
        orders[0]?.bookings?.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderList;
