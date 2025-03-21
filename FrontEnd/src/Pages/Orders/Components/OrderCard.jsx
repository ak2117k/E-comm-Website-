const OrderCard = ({ order }) => {
  console.log("order card", order);
  return (
    <div className="border p-4 mb-4 rounded-md shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">
            {`#${order?._id}`} {order?.OrderStatus}
          </h2>
          <p>
            Order placed on:{" "}
            {new Date(order?.shipping_info?.shipping_date).toDateString()}
          </p>
        </div>
      </div>
      <div className="mt-2">
        {order?.products?.map((product, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border-b pb-2 mb-2"
          >
            <img
              src={product.image1}
              alt={product.info}
              className="w-16 h-16 object-cover"
            />
            <div>
              <h3 className="font-medium">{product.name}</h3>
              <p>Size: {product.size}</p>
              <p>Price: ₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
