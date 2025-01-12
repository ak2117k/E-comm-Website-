import React from "react";
import CardImg from "./CardComponents/CardImg";
import CartPrdDetails from "./CardComponents/CartPrdDetails";
import { useSelector } from "react-redux";

const Card = () => {
  const Products = useSelector((state) => state.cart.cart);
  return (
    <div className="w-full border-2 border-yellow-400">
      {Products.length > 0 && (
        <>
          {Products.map((product, index) => (
            <div
              className="w-full flex gap-2 border-2 border-green-300 rounded-md"
              key={product._id}
            >
              <div className="border-2 border-blue-300 w-[15%]">
                <CardImg PrdImg={product.image1} />
              </div>
              {/* <div className="w-full border-2 border-black">
                <CartPrdDetails
                  Product={product}
                  currentProduct={currentProduct}
                  setCurrentProduct={setCurrentProduct}
                  currentSize={currentSize}
                  setCurrentSize={setCurrentSize}
                  currentQty={currentQty}
                  setCurrentQty={setCurrentQty}
                  filterProducts={filterProducts}
                  setfilterProducts={setfilterProducts}
                  index={index}
                />
              </div> */}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Card;
