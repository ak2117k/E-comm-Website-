import React from "react";
import CardImg from "./CardImg";
import CartPrdDetails from "./CartPrdDetails";

const Card = ({
  Products,
  currentProduct,
  setCurrentProduct,
  currentSize,
  setCurrentSize,
  currentQty,
  setCurrentQty,
  filterProducts,
  setfilterProducts,
}) => {
  return (
    <div className="w-full border-2 border-yellow-400">
      {Products.map((product, index) => (
        <div
          className="w-full flex gap-2 border-2 border-green-300 rounded-md"
          key={product.id}
        >
          <div className="border-2 border-blue-300 w-[15%]">
            <CardImg PrdImg={product.image1} />
          </div>
          <div className="w-full border-2 border-black">
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
